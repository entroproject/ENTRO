import React, {useState} from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import woman from '../../Assets/Images/woman.jpg'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import {launchImageLibrary} from 'react-native-image-picker'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage';


const IndexAddBusinessCardContainer = ({navigation}) => {
  const [logo, setLogo] = useState(null);
  const [fname, setFname] = useState("");
  const [bname, setBname] = useState("");
  const [bwebsite, setBwebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAttachLogo = () => {
    launchImageLibrary({ noData: true, selectionLimit: 1, mediaType: "photo", includeBase64: true }, (response) => {
      if (!response.didCancel) {
        setLogo(response.assets[0].base64);
      }
    });
  };

  const handleSaveCard = async () => {
    // await AsyncStorage.removeItem("businesscards");
    // return
    try{
        // dummy form validation
        if(!fname || !bname || !bwebsite || !phone){
          showMessage({
            message: 'All fields are required',
            backgroundColor: 'red',
            duration: 3000,
          })
        }
        if(!logo){
          showMessage({
            message: 'Please upload company logo',
            backgroundColor: 'red',
            duration: 3000,
          })
        }
        // save card to device
        const cardID = `card-${Date.now()}`
        const newCard = {
          id: cardID,
          fullname: fname,
          businessWebsite: bwebsite,
          businessName: bname,
          phone,
          // logo
        }

        const keys = await AsyncStorage.getAllKeys();
        if(keys.includes("businesscards")){
          const ser_cards = await AsyncStorage.getItem("businesscards");
          const des_cards = JSON.parse(ser_cards);
          const businessCards = {
            ...des_cards,
            [cardID]: newCard
          }
          const _ser_cards = JSON.stringify(businessCards);
          await AsyncStorage.setItem("businesscards", _ser_cards);
          showMessage({
            message: 'Card added successfully',
            backgroundColor: 'green',
            duration: 3000,
          })
          navigation.goBack()
        }
        else{
          const businessCards = {
            [cardID]: newCard
          }
          const ser_cards = JSON.stringify(businessCards);
          await AsyncStorage.setItem("businesscards", ser_cards);
          showMessage({
            message: 'Card added successfully',
            backgroundColor: 'green',
            duration: 3000,
          })
          navigation.goBack()
        }
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
    <ScrollView style={{flex: 1}}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Business Card</Text>
          <Image source={woman} style={styles.profileImage} />
        </View>
      </View>
      {/* header end */}

      {/* create form wrap start */}
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
            borderColor: "#184461",
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
                    borderColor: "#0F9B0F",
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
                    borderColor: "#0F9B0F",
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
                    borderColor: "#0F9B0F",
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
                    borderColor: "#0F9B0F",
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
                    borderWidth: 1,
                    borderColor: "#0F9B0F",
                    padding: 15,
                    borderRadius: 10
                }}>
                    <Text>Attach Logo</Text>
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
            <PrimaryButttonComponent
                label='Save'
                loading={loading}
                onPress={handleSaveCard}
            />
        </View>
        {/* form send */}
      </View>
      {/* create form wrap end */}

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#184461",
    height: 150
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

export default IndexAddBusinessCardContainer