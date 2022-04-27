import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { regexStr } from '@/Assets/Constants'
import { navigate } from '@/Navigators/utils'
import DropShadow from 'react-native-drop-shadow'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useOrientation } from '../useOrientation'
import { registerUser, requestProfile } from '@/api-utils'
import { loginUser } from '@/Features/users'
import { addCard, setDefaultCard } from '@/Features/virtualCards'
import { useDispatch } from 'react-redux'
import FloatingLabel from 'react-native-floating-labels'

const IndexRegisterCompanyUserContainer = ({navigation, routes}) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [loading, setLoading] = useState(false)
  const orientation = useOrientation()
  const dispatch = useDispatch()

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image)
    })
  }

  const SubmitForm = async () => {
    setLoading(true)
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !companyName ||
      !carPlateNum
    ) {
      setLoading(false)
      showMessage({
        message: 'All fields are required',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    // register user

    const req_register = await registerUser({
      Email: emailAddress,
      FirstName: firstName,
      LastName: lastName,
      CompanyName: companyName,
      VehicleNo: carPlateNum,
      MobileNo: phoneNumber,
    })
    const res_register = await req_register.json()

    if (res_register.StatusCode !== '200') {
      setLoading(false)
      showMessage({
        message: res_register.message,
        backgroundColor: 'red',
        duration: 2000,
      })
    } else {
      const req_prof = await requestProfile('')
      const prof = await req_prof.json()
      setLoading(false)
      dispatch(addCard(prof.VirtualKey))
      dispatch(setDefaultCard(prof.VirtualKey[0].VirtualKey))
      dispatch(loginUser(prof))
      console.log(prof);
      navigation.reset({
        index: 0,
        routes: [{ name: 'TutorialSlide' }],
      })
    }
    setLoading(false)
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground
        source={Images.BackgroundImage}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView>
          <Image
            source={Images.logoGreen}
            style={{ width: 230, height: 55, marginTop: 57, marginLeft: 20 }}
          />
          <View style={{ marginLeft: 32 }}>
            <Text
              style={{
                fontSize: 24,
                color: Colors.textColor,
                fontWeight: '700',
              }}
            >
              Almost there!
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: Colors.textColor,
                fontWeight: '500',
              }}
            >
              Create an account to begin your journey
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                width: '90%',
                marginTop: 110,
                borderRadius: 20,
                backgroundColor: '#F1F1F1',
                elevation: 10,
                shadowColor: '0px 13px 15px rgba(0, 0, 0, 0.25)',
                shadowRadius: 10,
                shadowOpacity: 0.6,
                marginVertical: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}
            >
              <View style={[Layout.center, { marginBottom: 30 }]}>
                <View
                  style={[
                    Layout.center,
                    {
                      width: orientation === 'PORTRAIT' ? 120 : 160,
                      height: orientation === 'PORTRAIT' ? 120 : 160,
                      position: 'absolute',
                      borderRadius: orientation === 'PORTRAIT' ? 60 : 80,
                      borderColor: '#184461',
                      borderWidth: MetricsSizes.zero + 1,
                      backgroundColor: '#C4c4c4',
                      shadowColor: ' rgba(0, 0, 0, 0.25)',
                    },
                  ]}
                >
                  <Image
                    source={photo ? { uri: photo.path } : Images.profilepic}
                    style={{
                      width: orientation === 'PORTRAIT' ? 110 : 150,
                      height: orientation === 'PORTRAIT' ? 110 : 150,
                      zIndex: 1,
                      borderRadius: orientation === 'PORTRAIT' ? 60 : 75.5,
                    }}
                  />
                </View>
              </View>
              <View
                style={[
                  Layout.center,
                  { marginLeft: orientation === 'PORTRAIT' ? 70 : 90 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => uploadPhoto()}
                  activeOpacity={0.9}
                  style={[
                    Layout.center,
                    {
                      backgroundColor: '#184461',
                      width: orientation === 'PORTRAIT' ? 35 : 40,
                      height: orientation === 'PORTRAIT' ? 35 : 40,
                      borderRadius: orientation === 'PORTRAIT' ? 15.5 : 20,
                    },
                  ]}
                >
                  <Icon name="camera" type="Feather" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <View>
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                  {/**first Name label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                      <FloatingLabel
                        labelStyle={{
                          color: '#A6A2A2',
                          fontSize: 14,
                          fontWeight: '500',
                          padding: firstName !== '' ? 5 : 3,
                        }}
                        inputStyle={{
                          borderWidth: 0,
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#000',
                        }}
                        Value={firstName}
                        onChangeText={text => setFirstName(text)}
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          padding: firstName !== '' ? 3 : 7,
                        }}
                      >
                        Enter first name
                      </FloatingLabel>
                    </View>
                  </DropShadow>
                  {/**first Name label ends here */}

                  {/**last Name label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                      <FloatingLabel
                        labelStyle={{
                          color: '#A6A2A2',
                          fontSize: 14,
                          fontWeight: '500',
                          padding: lastName !== '' ? 5 : 3,
                        }}
                        inputStyle={{
                          borderWidth: 0,
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#000',
                        }}
                        Value={lastName}
                        onChangeText={text => setLastName(text)}
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          padding: lastName !== '' ? 3 : 7,
                        }}
                      >
                        Enter last name
                      </FloatingLabel>
                    </View>
                  </DropShadow>
                  {/**last Name label ends here */}

                  {/**email address label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                      <FloatingLabel
                        labelStyle={{
                          color: '#A6A2A2',
                          fontSize: 14,
                          fontWeight: '500',
                          padding: emailAddress !== '' ? 5 : 3,
                        }}
                        inputStyle={{
                          borderWidth: 0,
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#000',
                        }}
                        Value={emailAddress}
                        onChangeText={text => setEmailAddress(text)}
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          padding: emailAddress !== '' ? 3 : 7,
                        }}
                      >
                        Enter email address
                      </FloatingLabel>
                    </View>
                  </DropShadow>
                  {/**email address label starts here */}

                  {/** company name label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                      <FloatingLabel
                        labelStyle={{
                          color: '#A6A2A2',
                          fontSize: 14,
                          fontWeight: '500',
                          padding: companyName !== '' ? 5 : 3,
                        }}
                        inputStyle={{
                          borderWidth: 0,
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#000',
                        }}
                        Value={companyName}
                        onChangeText={text => setCompanyName(text)}
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          padding: companyName !== '' ? 3 : 7,
                        }}
                      >
                        Enter company name
                      </FloatingLabel>
                    </View>
                  </DropShadow>
                  {/**company label starts here */}

                  {/** car number label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                      <FloatingLabel
                        labelStyle={{
                          color: '#A6A2A2',
                          fontSize: 14,
                          fontWeight: '500',
                          padding: carPlateNum !== '' ? 5 : 3,
                        }}
                        inputStyle={{
                          borderWidth: 0,
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#000',
                        }}
                        Value={carPlateNum}
                        onChangeText={text => setCarPlateNum(text)}
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          padding: carPlateNum !== '' ? 3 : 7,
                        }}
                      >
                        Enter vehicle number
                      </FloatingLabel>
                    </View>
                  </DropShadow>
                  {/**car number starts here */}
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <PrimaryButttonComponent
                  loading={loading}
                  label="Submit"
                  style={{
                    width: orientation === 'PORTRAIT' ? 270 : 320,
                    height: 40,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    SubmitForm()
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ScrollView>
  )
}

export default IndexRegisterCompanyUserContainer
