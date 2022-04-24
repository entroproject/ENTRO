import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { launchImageLibrary } from 'react-native-image-picker'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'
import { useTheme } from '@/Hooks'

const CardUpload = ({
  cardFront,
  cardBack,
  handleAttachCard,
  setShowUploadScreen,
}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 50,
        }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Front
          </Text>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 2,
              shadowRadius: 1.5,
            }}
          >
            <TouchableOpacity
              onPress={() => handleAttachCard('front')}
              style={{
                overflow: 'hidden',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#45969A',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}
            >
              {cardFront ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${cardFront}` }}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Icon type="Feather" name="camera" size={45} color="#45969A" />
              )}
            </TouchableOpacity>
          </DropShadow>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Back
          </Text>

          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 2,
              shadowRadius: 1.5,
            }}
          >
            <TouchableOpacity
              onPress={() => handleAttachCard('back')}
              style={{
                overflow: 'hidden',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#45969A',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}
            >
              {cardBack ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${cardBack}` }}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Icon type="Feather" name="camera" size={45} color="#45969A" />
              )}
            </TouchableOpacity>
          </DropShadow>
        </View>
        <View
          style={{
            width: 150,
            alignSelf: 'center',
          }}
        >
          <PrimaryButttonComponent
            label={'Confirm'}
            onPress={() => setShowUploadScreen(false)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const IndexAddBusinessCardContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [logo, setLogo] = useState(null)
  const [cardFront, setCardFront] = useState(null)
  const [cardBack, setCardBack] = useState(null)
  const [fname, setFname] = useState('')
  const [bname, setBname] = useState('')
  const [bwebsite, setBwebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showUploadScreen, setShowUploadScreen] = useState(false)

  const handleAttachLogo = () => {
    launchImageLibrary(
      {
        noData: true,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setLogo(response.assets[0].base64)
        }
      },
    )
  }

  const handleAttachCard = (location = '') => {
    launchImageLibrary(
      {
        noData: true,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          if (location === 'front') {
            setCardFront(response.assets[0].base64)
          } else {
            setCardBack(response.assets[0].base64)
          }
        }
      },
    )
  }

  const handleSaveCard = async () => {
    // await AsyncStorage.removeItem("businesscards");
    // return
    try {
      // dummy form validation
      if (!fname || !bname || !bwebsite || !phone) {
        showMessage({
          message: 'All fields are required',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }
      if (!logo) {
        showMessage({
          message: 'Please upload company logo',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }
      if (!cardFront || !cardBack) {
        showMessage({
          message: 'Please upload images of your business card',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }
      // save card to device
      const cardID = `card-${Date.now()}`
      const newCard = {
        id: cardID,
        fullname: fname,
        businessWebsite: bwebsite,
        businessName: bname,
        phone,
        logoChunks: logo.match(/.{1,200}/g),
        cardFrontChunks: cardFront.match(/.{1,200}/g),
        cardBackChunks: cardBack.match(/.{1,200}/g),
      }

      const keys = await AsyncStorage.getAllKeys()
      if (keys.includes('businesscards')) {
        const ser_cards = await AsyncStorage.getItem('businesscards')
        const des_cards = JSON.parse(ser_cards)
        const businessCards = {
          ...des_cards,
          [cardID]: newCard,
        }
        const _ser_cards = JSON.stringify(businessCards)
        await AsyncStorage.setItem('businesscards', _ser_cards)
        showMessage({
          message: 'Card added successfully',
          backgroundColor: 'green',
          duration: 3000,
        })
        navigation.goBack()
      } else {
        const businessCards = {
          [cardID]: newCard,
        }
        const ser_cards = JSON.stringify(businessCards)
        await AsyncStorage.setItem('businesscards', ser_cards)
        await AsyncStorage.setItem('defaultBCard', cardID)
        showMessage({
          message: 'Card added successfully',
          backgroundColor: 'green',
          duration: 3000,
        })
        navigation.goBack()
      }
    } catch (err) {
      console.log(err)
      showMessage({
        message: 'Something went wrong',
        backgroundColor: 'red',
        duration: 3000,
      })
    }
  }

  return (
    <ScrollView style={{backgroundColor:'#F1F1F1', flex: 1}}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() =>
              showUploadScreen
                ? setShowUploadScreen(false)
                : navigation.goBack()
            }
          >
            <Icon type="Ionicons" name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Business Card</Text>
          <TouchableOpacity>
            <Icon type="FontAwesome" name="search" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* header end */}

      {showUploadScreen ? (
        <CardUpload
          cardFront={cardFront}
          cardBack={cardBack}
          handleAttachCard={handleAttachCard}
          setShowUploadScreen={setShowUploadScreen}
        />
      ) : (
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: '#184461',
              fontWeight: '500',
              marginVertical: 15,
            }}
          >
            Please fill up your business card information
          </Text>
          {/* form start */}
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 3,
                height: 1,
              },
              shadowOpacity: 2,
              shadowRadius: 5,
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderColor: '#45969A',
                padding: 10,
                borderRadius: 20,
                backgroundColor: '#F1F1F1',
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Enter Full Name"
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setFname(text)}
                    value={fname}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Business Name"
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setBname(text)}
                    value={bname}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Business Website"
                    placeholderTextColor={'#666666'}
                    keyboardType="url"
                    onChangeText={text => setBwebsite(text)}
                    value={bwebsite}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Business Phone Number"
                    placeholderTextColor={'#666666'}
                    keyboardType="phone-pad"
                    onChangeText={text => setPhone(text)}
                    value={phone}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 20,
                    marginBottom: 10,
                  }}
                >
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleAttachLogo}
                      style={{
                        borderWidth: 2,
                        borderColor: '#184461',
                        padding: 15,
                        borderRadius: 15,
                        width: 125,
                        backgroundColor: Colors.white,
                      }}
                    >
                      <Text style={{ color: '#000000', textAlign: 'center' }}>
                        Attach Logo
                      </Text>
                    </TouchableOpacity>
                  </DropShadow>

                  <View>
                    {logo ? (
                      <Image
                        source={{ uri: `data:image/jpeg;base64,${logo}` }}
                        style={{
                          resizeMode: 'cover',
                          width: 80,
                          height: 80,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: '#000',
                          marginStart: 7,
                        }}
                      >
                        Logo will appear here
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 20,
                    marginBottom: 10,
                  }}
                >
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setShowUploadScreen(true)}
                      style={{
                        borderWidth: 2,
                        borderColor: '#184461',
                        padding: 15,
                        borderRadius: 15,
                        width: 125,
                        backgroundColor: Colors.white,
                      }}
                    >
                      <Text style={{ color: '#000000', textAlign: 'center' }}>
                        Business Card
                      </Text>
                    </TouchableOpacity>
                  </DropShadow>

                  <View>
                    {cardFront ? (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}
                      >
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${cardFront}`,
                          }}
                          style={{
                            resizeMode: 'contain',
                            width: 60,
                            height: 50,
                          }}
                        />
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${cardBack}` }}
                          style={{
                            resizeMode: 'contain',
                            width: 60,
                            height: 50,
                          }}
                        />
                      </View>
                    ) : (
                      <DropShadow
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 2,
                            height: 1,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 3,
                        }}
                      >
                        <Icon
                          type="Feather"
                          name="camera"
                          size={45}
                          color="green"
                        />
                      </DropShadow>
                    )}
                  </View>
                </View>
                <PrimaryButttonComponent
                  label="Save"
                  loading={loading}
                  onPress={handleSaveCard}
                />
              </View>
            </View>
          </DropShadow>

          {/* form send */}
        </View>
      )}
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

export default IndexAddBusinessCardContainer
