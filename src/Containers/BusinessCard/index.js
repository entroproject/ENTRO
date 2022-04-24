import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import Icon from 'react-native-dynamic-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal";
import { showMessage } from 'react-native-flash-message'
import Share from 'react-native-share';


const height = Dimensions.get("screen").height;


const CardComponent = ({businessCards, selectedCardID, Images, handleChangeSelectedCardID, handleDeleteCard}) => {
  const [showModal, setShowmodal] = useState(false);
  const [modalID, setModalID] = useState("");

  const navigation = useNavigation();


  const handleOpenModal = id => {
    setModalID(id)
    setShowmodal(true);
  }

  const onShare = async card => {
    try {
      await Share.open({
        title: "Business Card",
        message: 
        `
        Name: ${card.fullname}
        Company: ${card.businessname}
        Website: https://${card.businessWebsite}
        Phone: ${card.phone}
        `,
        urls: [`data:image/png;base64,${card.cardFrontChunks.join("")}`, `data:image/png;base64,${card.cardBackChunks.join("")}` ]
      })          
    } catch (error) {
      alert(error.message);
    }
  };

  return(
      <View style={{ marginTop: 20 }}>
        {Object.keys(businessCards).map(key => (
          <View key={key}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#184461',
              marginHorizontal: 20,
              marginBottom: 10,
              borderRadius: 10,
              overflow: 'hidden',
              paddingLeft: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 4,
            }}
          >
            <View
              style={{
                width: '50%',
                backgroundColor: '#fff',
                padding: 10,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {businessCards[key].fullname}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                }}
              >
                {businessCards[key].businessName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://' + businessCards[key].businessWebsite,
                  ).catch(err => console.log(err))
                }}
              >
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 15,
                    textDecorationColor: 'blue',
                    textDecorationLine: 'underline',
                  }}
                >
                  {businessCards[key].businessWebsite}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                }}
              >
                {businessCards[key].phone}
              </Text>
              {selectedCardID === businessCards[key].id && (
                <Image
                  source={Images.defaultCardIcon}
                  style={{ width: 20, height: 20, margin: 3 }}
                  resizeMode={'contain'}
                />
              )}
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                width: '50%',
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{
                width: "75%"
              }}>
              <Image
                source={{uri: `data:image/jpeg;base64,${businessCards[key].logoChunks.join("")}`}}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf:'center',
                  marginTop: 15, 
                }}
                resizeMode={'cover'}
              />
              </View>
              <TouchableOpacity 
              onPress={()=> handleOpenModal(businessCards[key].id)}
              style={{
                width: "25%",
                alignItems: "flex-end",
                padding: 15
              }}>
                <Icon type='FontAwesome' color='#000' size={30} name="ellipsis-v" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        ))}
        <Modal 
        isVisible={showModal}
        animationIn="slideInUp"
        onBackdropPress={()=> setShowmodal(false)}
        >
        <View style={{
          backgroundColor: "#fff",
          borderRadius: 10
        }}>
          <View style={{
            padding: 10,
            backgroundColor: "#184461"
          }}>
            <Text style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center"
            }}>Please select task</Text>
          </View>
          <View style={{
            paddingVertical: 20
          }}>
            <View style={{
              width: "55%",
              alignSelf: "center"
            }}>
            <TouchableOpacity 
            onPress={()=> {
              handleChangeSelectedCardID(modalID);
              setShowmodal(false);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15
            }}>
              <Icon type='Feather' name='check-square' size={30} color="#184461"/>
              <Text style={{
                color: "#184461",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold"
              }}>Set As Default</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=> {
              setShowmodal(false);
              onShare(businessCards[modalID])
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15
            }}>
              <Icon type='Entypo' name='share' size={30} color="#184461"/>
              <Text style={{
                color: "#184461",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold"
              }}>Share Business Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=> navigation.navigate("EditBusinessCard", {card: businessCards[modalID]})}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15
            }}>
              <Icon type='FontAwesome' name='edit' size={30} color="#184461"/>
              <Text style={{
                color: "#184461",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold"
              }}>Edit Business Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=> {
              setShowmodal(false);
              handleDeleteCard(modalID)
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15
            }}>
              <Icon type='Foundation' name='trash' size={30} color="#184461"/>
              <Text style={{
                color: "#184461",
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "bold"
              }}>Delete Business Card</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
        </Modal>
      </View>
  )
} 



const IndexBusinessCardContainer = ({ navigation }) => {
  const { Images } = useTheme()
  const isFocused = useIsFocused()
  const [selectedCardID, setSelectedCardID] = useState({});
  const [_businessCards, _setBusinessCards] = useState({});
  const [businessCards, setBusinessCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleChangeSelectedCardID = async id => {
    setSelectedCardID(id)
    await AsyncStorage.setItem('defaultBCard', id)
  }



  const resetCards = () => {
    setBusinessCards(_businessCards);
    setSearchText("");
  }

  const handleDeleteCard = async id => {
    try{
      const ser_cards = await AsyncStorage.getItem("businesscards");
      const des_cards = JSON.parse(ser_cards);
      const businessCards = {
        ...des_cards
      }
      delete businessCards[id];
      const _ser_cards = JSON.stringify(businessCards);
      await AsyncStorage.setItem("businesscards", _ser_cards);
      showMessage({
        message: 'Card deleted successfully',
        backgroundColor: 'green',
        duration: 3000,
      });
      retrieveCards();
    }catch(err){
      console.log(err);
      showMessage({
        message: 'Something went wrong',
        backgroundColor: 'red',
        duration: 3000,
      })
    }
  }

  const retrieveCards = async () => {
    const defaultBCardID = await AsyncStorage.getItem('defaultBCard')
    const ser_cards = await AsyncStorage.getItem('businesscards')
    const cards = JSON.parse(ser_cards)
    if (cards) {
      setBusinessCards(cards);
      _setBusinessCards(cards);
    }
    setSelectedCardID(defaultBCardID)
    setLoading(false);
  }

    const handleSearch = () =>{
    const _arrCards = [];
    Object.keys(_businessCards).map(key => {
      _arrCards.push(_businessCards[key]);
    });
    const _filtered_cards = _arrCards.filter(c => {
      if(c.fullname.toLocaleLowerCase().includes(searchText.toLocaleLowerCase().split(" ")[0]) 
      || c.phone.toLocaleLowerCase().includes(searchText.toLocaleLowerCase().split(" ")[0])
      || c.businessWebsite.toLocaleLowerCase().includes(searchText.toLocaleLowerCase().split(" ")[0])
      ){
        return true;
      }
      return false;
    });
    const _objCards = {}
    _filtered_cards.map(c => {
      _objCards[c.id] = c;
    })
    setBusinessCards(_objCards);
  }

  useEffect(()=> {
    if(searchText.length < 1){
      resetCards();
    }else{
      handleSearch();
    }
  }, [searchText])


  useEffect(() => {
    setLoading(true);
    retrieveCards()
  }, [isFocused])

  return (
    <ScrollView style={{ flex: 1,backgroundColor: '#f1f1f1'  }}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {!openSearch
          ?
          <>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Icon type='Ionicons' name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Business Card</Text>
          <TouchableOpacity onPress={()=> setOpenSearch(true)}>
            <Icon  type='FontAwesome' name="search" size={25} color="#fff" />
          </TouchableOpacity>
          </>
         :<View style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            maxWidth: 500,
            borderRadius: 10
          }}>
            <TextInput
              placeholder='Search by business name, phone or website'
              returnKeyType='search'
              keyboardType='web-search'
              placeholderTextColor="#666666"
              value={searchText}
              onChangeText={text => setSearchText(text)}
              // onBlur={()=> setOpenSearch(false)}
              // blurOnSubmit={()=> setOpenSearch(false)}
              // onSubmitEditing={()=> setOpenSearch(false)}
              autoFocus={true}
              style={{
                width: "90%"
              }}
            />
            <TouchableOpacity onPress={()=> {
              setOpenSearch(false);
              resetCards()
            }}>
              <Icon type='AntDesign' name='closecircleo' size={25} color="#000"/>
            </TouchableOpacity>
          </View>
          }
        </View>
      </View>
      {/* header end */}

      {/* Main Content START*/}
      <PrimaryButttonComponent
        label={"Add Card "}
        iconType="AntDesign"
        iconRight={"plussquare"}
        style={{
          width: "40%",
          marginTop: 30,
          marginLeft: 25
        }}
        onPress={()=> navigation.navigate("AddBusinessCard")}
      />

      {
        loading
        ?<View style={{
            minHeight: height * .6,
            justifyContent: "center"
          }}>
            <ActivityIndicator size={50} color="#184461" />
          </View>
        :Object.keys(businessCards).length > 0
        ?<CardComponent 
        businessCards={businessCards} 
        selectedCardID={selectedCardID} 
        Images={Images} 
        handleDeleteCard={handleDeleteCard}
        handleChangeSelectedCardID={handleChangeSelectedCardID}
        />
        :<View style={{
            minHeight: height * .6,
            justifyContent: "center"
          }}>
            <View style={{
              padding: 50
            }}>
              <Text style ={{
                fontSize: 22,
                fontWeight: "bold",
                color: '#184461', 
                textAlign: "center",
                marginBottom: 15
              }}>Virtual Business Card</Text>
              <Text style={{
                fontSize: 16,
                color: '#184461', 
                textAlign: "center"
              }}>
                Store your business card here will help you
                to find it back and save more space
              </Text>
            </View>
          </View>
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#184461',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  cardWrap: {
    width: '100%',
    overflow: 'hidden',
    marginTop: -60,
    width: 300,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#D0F2EC',
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

export default IndexBusinessCardContainer
