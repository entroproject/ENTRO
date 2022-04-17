import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import {launchImageLibrary} from 'react-native-image-picker'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-dynamic-vector-icons'



const CardUpload = ({cardFront, cardBack, handleAttachCard, setShowUploadScreen}) => {
  return (
    <ScrollView style={{
      flex: 1
    }}>
    <View style={{
      marginHorizontal: 20,
      marginTop: 50
    }}>
      <View style={{
        marginBottom: 20
      }}>
        <Text style={{
          color: "#000",
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10
        }}>Front</Text>
        <TouchableOpacity 
        onPress={()=> handleAttachCard("front")}
        style={{
          overflow: "hidden",
          borderWidth: 2,
          borderRadius: 20,
          borderColor: "#45969A",
          justifyContent: "center",
          alignItems: "center",
          height: 200
        }}>
          {
            cardFront
            ?<Image source={{uri: `data:image/jpeg;base64,${cardFront}`}} style={{
                resizeMode: "cover",
                width: "100%",
                height: "100%"
            }} />
            :<Icon 
              type='Feather'
              name='camera'
              size={45}
              color="#45969A"
            />
          }
        </TouchableOpacity>
      </View>
      <View style={{
        marginBottom: 20
      }}>
        <Text style={{
          color: "#000",
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10
        }}>Back</Text>
        <TouchableOpacity 
        onPress={()=> handleAttachCard("back")}
        style={{
          overflow: "hidden",
          borderWidth: 2,
          borderRadius: 20,
          borderColor: "#45969A",
          justifyContent: "center",
          alignItems: "center",
          height: 200
        }}>
          {
            cardBack
            ?<Image source={{uri: `data:image/jpeg;base64,${cardBack}`}} style={{
                resizeMode: "cover",
                width: "100%",
                height: "100%"
            }} />
            :<Icon 
              type='Feather'
              name='camera'
              size={45}
              color="#45969A"
            />
          }
        </TouchableOpacity>
      </View>
      <View style={{
        width: 150,
        alignSelf: "center"
      }}>
      <PrimaryButttonComponent
        label={"Update"}
        onPress={()=> setShowUploadScreen(false)}
      />
      </View>
    </View>
    </ScrollView>
  )
}


const IndexEditBusinessCardContainer = ({navigation, route}) => {
  const [logo, setLogo] = useState(null);
  const [cardFront, setCardFront] = useState(null);
  const [cardBack, setCardBack] = useState(null);
  const [fname, setFname] = useState("");
  const [bname, setBname] = useState("");
  const [bwebsite, setBwebsite] = useState("");
  const [c_id, set_id] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUploadScreen, setShowUploadScreen] = useState(false);

  useEffect(()=> {
      const {card} = route.params;
      setLogo(card.logoChunks.join(""));
      setCardFront(card.cardFrontChunks.join(""));
      setCardBack(card.cardBackChunks.join(""));
      setFname(card.fullname);
      setBname(card.businessName);
      setBwebsite(card.businessWebsite);
      setPhone(card.phone);
      set_id(card.id);
  },[])
  


  const handleAttachLogo = () => {
    launchImageLibrary({ noData: true, selectionLimit: 1, mediaType: "photo", includeBase64: true }, (response) => {
      if (!response.didCancel) {
        setLogo(response.assets[0].base64);
      }
    });
  };

  const handleAttachCard = (location="") => {
    launchImageLibrary({ noData: true, selectionLimit: 1, mediaType: "photo", includeBase64: true }, (response) => {
      if (!response.didCancel) {
        if(location === 'front'){
          setCardFront(response.assets[0].base64);
        }else{
          setCardBack(response.assets[0].base64);
        }
      }
    });
  };


  const handleSaveCard = async () => {
    // await AsyncStorage.removeItem("businesscards");
    // return
    try{
        // dummy form validation
        setLoading(true);
        if(!fname || !bname || !bwebsite || !phone){
          setLoading(false);
          showMessage({
            message: 'All fields are required',
            backgroundColor: 'red',
            duration: 3000,
          })
          return false;
        }
        if(!logo){
          setLoading(false);
          showMessage({
            message: 'Please upload company logo',
            backgroundColor: 'red',
            duration: 3000,
          })
          return false;
        }
        if(!cardFront || !cardBack){
          setLoading(false);
          showMessage({
            message: 'Please upload images of your business card',
            backgroundColor: 'red',
            duration: 3000,
          })
          return false;
        }
        // save card to device
        const newCard = {
          id: c_id,
          fullname: fname,
          businessWebsite: bwebsite,
          businessName: bname,
          phone,
          logoChunks: logo.match(/.{1,800}/g),
          cardFrontChunks: cardFront.match(/.{1,800}/g),
          cardBackChunks: cardBack.match(/.{1,800}/g)
        }

        const ser_cards = await AsyncStorage.getItem("businesscards");
        const des_cards = JSON.parse(ser_cards);
        const businessCards = {
        ...des_cards,
        [c_id]: newCard
        }
        const _ser_cards = JSON.stringify(businessCards);
        await AsyncStorage.setItem("businesscards", _ser_cards);
        setLoading(false)
        showMessage({
        message: 'Card updated successfully',
        backgroundColor: 'green',
        duration: 3000,
        })
        navigation.goBack();
    }  catch(err ){
      console.log(err);
      showMessage({
        message: 'Something went wrong',
        backgroundColor: 'red',
        duration: 3000,
      })
    }

  }

  return (
    <ScrollView>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={()=> showUploadScreen ? setShowUploadScreen(false) : navigation.goBack()}>
            <Icon type='Ionicons' name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Business Card</Text>
          <TouchableOpacity>
            <Icon  type='FontAwesome' name="search" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* header end */}

      {
        showUploadScreen
        ?<CardUpload 
          cardFront={cardFront} 
          cardBack={cardBack} 
          handleAttachCard={handleAttachCard}
          setShowUploadScreen={setShowUploadScreen}
        />
        :
        <View style={{
            marginTop: 20,
            marginHorizontal: 20
        }}>
        <Text style={{
            color: "#184461",
            fontWeight: "bold",
            marginVertical: 15
        }}>Please fill up your business card information</Text>
        {/* form start */}
        <View style={{
            borderWidth: 1,
            borderColor: "#45969A",
            padding: 10,
            borderRadius: 10
        }}>
            <TextInput 
                placeholder='Enter Full Name'
                placeholderTextColor={"#666666"}
                keyboardType="default"
                onChangeText = {text => setFname(text)}
                value={fname}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 15,
                    color: "#000",
                    marginVertical: 8
                }}
            />
            <TextInput 
                placeholder='Business Name'
                placeholderTextColor={"#666666"}
                keyboardType="default"
                onChangeText = {text => setBname(text)}
                value={bname}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 15,
                    color: "#000",
                    marginVertical: 8
                }}
            />
            <TextInput 
                placeholder='Business Website'
                placeholderTextColor={"#666666"}
                keyboardType="url"
                onChangeText = {text => setBwebsite(text)}
                value={bwebsite}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 15,
                    color: "#000",
                    marginVertical: 8
                }}
            />
            <TextInput 
                placeholder='Business Phone Number'
                placeholderTextColor={"#666666"}
                keyboardType="phone-pad"
                onChangeText = {text => setPhone(text)}
                value={phone}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 15,
                    color: "#000",
                    marginVertical: 8
                }}
            />
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 20,
                marginBottom: 10
            }}>
                <TouchableOpacity 
                onPress={handleAttachLogo}
                style={{
                    borderWidth: 2,
                    borderColor: "#184461",
                    padding: 15,
                    borderRadius: 15,
                    width: 125
                }}>
                    <Text style={{color: "#000000", textAlign: "center"}}>Attach Logo</Text>
                </TouchableOpacity>
                <View>
                    {
                      logo
                      ?<Image source={{uri: `data:image/jpeg;base64,${logo}`}} style={{
                        resizeMode: "cover",
                        width: 80,
                        height: 80
                    }} />
                      :<Text style={{
                        color: "#000",
                      }}>Logo will appear here</Text>
                    }
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 20,
                marginBottom: 10
            }}>
                <TouchableOpacity 
                onPress={()=> setShowUploadScreen(true)}
                style={{
                    borderWidth: 2,
                    borderColor: "#184461",
                    padding: 15,
                    borderRadius: 15,
                    width: 125
                }}>
                    <Text style={{color: "#000000", textAlign: "center"}}>Business Card</Text>
                </TouchableOpacity>
                <View>
                    {
                      cardFront
                      ?<View style={{
                        flexDirection: "row"
                      }}>
                        <Image source={{uri: `data:image/jpeg;base64,${cardFront}`}} style={{
                            resizeMode: "contain",
                            width: 60,
                            height: 50
                        }} />
                        <Image source={{uri: `data:image/jpeg;base64,${cardBack}`}} style={{
                            resizeMode: "contain",
                            width: 60,
                            height: 50
                        }} />
                      </View>
                      :<Icon 
                        type='Feather'
                        name='camera'
                        size={45}
                        color="#000"
                      />
                    }
                </View>
            </View>
            <PrimaryButttonComponent
                label='Update Card'
                loading={loading}
                onPress={handleSaveCard}
            />
        </View>
        {/* form send */}
      </View>
      }

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#184461",
  },
  headerContent:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  headerTitle:{
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff"
  },
  profileImage:{
    width: 50,
    height: 50,
    borderRadius: 50/2
  },
  cardWrap:{
    width: "100%",
    overflow: "hidden",
    marginTop: -60,
    width: 300,
    borderRadius: 10,
    alignSelf: "center"
  },
  cardContent:{
    padding: 15,
    backgroundColor: "#D0F2EC",
    width: 300,
    alignSelf: "center",
    justifyContent: "center"
  }
})

export default IndexEditBusinessCardContainer