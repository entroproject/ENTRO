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
import FloatingLabel from 'react-native-floating-labels'

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

  const [placeholder, setPlaceholder] = useState({
    fname: 'Mohamad Faisal',
    bname: 'Servo Security Sdn Bhd',
    bwebsite: 'www.servosecurity.my',
    phone: '60176143035',
  })

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
    <ScrollView style={{ backgroundColor: '#F1F1F1', flex: 1 }}>
      {/* header start */}

      <View style={{ height: 51, backgroundColor: '#184461' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              showUploadScreen
                ? setShowUploadScreen(false)
                : navigation.goBack()
            }
          >
            <Icon name="arrow-left" type="Feather" size={30} color="#fff" />
          </TouchableOpacity>

          <Text
            style={{
              color: Colors.white,
              fontWeight: '600',
              marginLeft: 15,
            }}
          >
            Business Card
          </Text>
          <Icon
            name="x"
            type="Feather"
            size={30}
            color="#fff"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* header end */}
      <>
        <View
          style={{
            display: showUploadScreen ? 'flex' : 'none',
          }}
        >
          <CardUpload
            cardFront={cardFront}
            cardBack={cardBack}
            handleAttachCard={handleAttachCard}
            setShowUploadScreen={setShowUploadScreen}
          />
        </View>
        <View
          style={{
            display: showUploadScreen ? 'none' : 'flex',
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          {/* form start */}

          <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
            {/** business person starts here */}

            <View style={{}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#184461',
                  fontWeight: '500',
                  marginStart: 4,
                  marginBottom: 10,
                }}
              >
                Name
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#45969A',
                  fontSize: 20,
                  color: fname === 'Mohamad Faisal' ? '#C4C3C9' : '#457C9A',
                  fontWeight: '900',
                  paddingBottom: 0,
                }}
                value={fname}
                placeholder={placeholder.fname}
                onChangeText={text => setFname(text)}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, fname: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    fname: 'Mohamad Faisal',
                  })
                }}
              />
            </View>

            {/**business person name  starts here */}

            {/** business name starts here */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#184461',
                  fontWeight: '500',
                  marginStart: 4,
                  marginBottom: 10,
                }}
              >
                Business Name
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#45969A',
                  fontSize: 20,
                  color:
                    bname === 'Servo Security Sdn Bhd' ? '#C4C3C9' : '#457C9A',
                  fontWeight: '900',
                  paddingBottom: 0,
                }}
                value={bname}
                placeholder={placeholder.bname}
                onChangeText={text => setBname(text)}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, bname: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    bname: 'Servo Security Sdn Bhd',
                  })
                }}
              />
            </View>
            {/**business name name  starts here */}

            {/** business website starts here */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#184461',
                  fontWeight: '500',
                  marginStart: 4,
                  marginBottom: 10,
                }}
              >
                Business Website
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#45969A',
                  fontSize: 20,
                  color:
                    bwebsite === 'www.servosecurity.my' ? '#C4C3C9' : '#457C9A',
                  fontWeight: '900',
                  paddingBottom: 0,
                }}
                value={bwebsite}
                placeholder={placeholder.bwebsite}
                onChangeText={text => setBwebsite(text)}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, bwebsite: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    bwebsite: 'www.servosecurity.my',
                  })
                }}
              />
            </View>
            {/**business name name  starts here */}

            {/** business website starts here */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#184461',
                  fontWeight: '500',
                  marginStart: 4,
                  marginBottom: 10,
                }}
              >
                Phone Number
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#45969A',
                  fontSize: 20,
                  color: phone === '60176143035' ? '#C4C3C9' : '#457C9A',
                  fontWeight: '900',
                  paddingBottom: 0,
                }}
                value={phone}
                placeholder={placeholder.phone}
                keyboardType={'number-pad'}
                onChangeText={text => setPhone(text)}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, phone: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    phone: '60176143035',
                  })
                }}
              />
            </View>
            {/**bphone number ends  here */}

            <View
              style={{
                justifyContent: 'space-between',

                paddingRight: 20,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <DropShadow
                style={{
                  shadowColor: '#282828',
                  shadowOffset: {
                    width: 1,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <TouchableOpacity
                  onPress={handleAttachLogo}
                  style={{
                    borderWidth: 1,
                    borderColor: '#184461',
                    padding: 10,
                    borderRadius: 15,
                    width: 125,
                    backgroundColor: '#F0F0F0',
                  }}
                >
                  <Text style={{ color: '#000000', textAlign: 'center' }}>
                    Attach Logo
                  </Text>
                </TouchableOpacity>
              </DropShadow>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#184461',
                  marginTop: 5,
                  marginStart: 3,
                }}
              >
                Images.jpg
              </Text>

              <View style={{ marginTop: 6, alignItems: 'flex-end' }}>
                {logo ? (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${logo}` }}
                    style={{
                      resizeMode: 'cover',
                      width: 100,
                      height: 80,
                      marginTop: 5,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#184461',
                    }}
                  />
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
            <View
              style={{
                justifyContent: 'space-between',
                paddingRight: 20,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
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
                <TouchableOpacity
                  onPress={() => setShowUploadScreen(true)}
                  style={{
                    borderWidth: 1,
                    borderColor: '#184461',
                    padding: 10,
                    borderRadius: 15,
                    width: 125,
                    backgroundColor: '#F0F0F0',
                  }}
                >
                  <Text style={{ color: '#000000', textAlign: 'center' }}>
                    Business Card
                  </Text>
                </TouchableOpacity>
              </DropShadow>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#184461',
                  marginTop: 5,
                  marginStart: 3,
                }}
              >
                Images.jpg
              </Text>
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'flex-end',
                  marginBottom: 20,
                }}
              >
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
                        resizeMode: 'cover',
                        width: 50,
                        height: 80,
                        marginEnd: 2,
                      }}
                    />
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${cardBack}` }}
                      style={{
                        resizeMode: 'cover',
                        width: 50,
                        height: 80,
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
              style={{ marginBottom: 20 }}
            />
          </View>

          {/* form send */}
        </View>
      </>
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
