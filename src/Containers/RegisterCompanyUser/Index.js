import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { regexStr } from '@/Assets/Constants'
import { navigate } from '@/Navigators/utils'
import DropShadow from 'react-native-drop-shadow'
import ImagePicker from 'react-native-image-crop-picker'

const IndexRegisterCompanyUserContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isValidFullName, setIsValidFullName] = useState(true)
  const [isValidEmailAddress, setIsValidEmailAddress] = useState(true)
  const [isValidCompanyName, setIsValidCompanyName] = useState(true)
  const [isValidcarPlateNum, setIsValidCarPlateNum] = useState(true)
  const [placeholder, setPlaceholder] = useState({
    fullName: 'Enter FullName',
    emailAddress: 'Enter Email Address',
    companyName: 'Enter Company Name',
    carPlateNum: 'Enter Car Plate Number',
  })

  const validate = type => {
    let errorCtr = 0

    if (type === 'fullName') {
      if (regexStr.name.test(fullName)) {
        setIsValidFullName(!regexStr.name.test(fullName))
        if (regexStr.name.test(fullName)) errorCtr += 1
      } else {
        setIsValidFullName(fullName !== '')
        if (fullName === '') errorCtr += 1
      }
    } else if (type === 'emailAddress') {
      setIsValidEmailAddress(regexStr.email.test(emailAddress))
      if (!regexStr.email.test(emailAddress)) errorCtr += 1
    } else if (type === 'companyName') {
      setIsValidCompanyName(companyName !== '')
      if (companyName === '') errorCtr += 1
    } else if (type === 'carPlateNum') {
      setIsValidCarPlateNum(carPlateNum !== '')
      if (carPlateNum === '') errorCtr += 1
    }

    if (errorCtr > 0) {
      setHasError(true)
    }
  }

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image)
      console.log(image)
    })
  }

  const SubmitForm = () => {
    if (
      fullName === '' ||
      emailAddress === '' ||
      companyName === '' ||
      carPlateNum === ''
    ) {
      setHasError(true)
    } else {
      navigate('MainHome')
    }
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
                width: 320,
                height: 430,
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
                      width: 120,
                      height: 120,
                      position: 'absolute',
                      borderRadius: 60,
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
                      width: 110,
                      height: 110,
                      zIndex: 1,
                      borderRadius: 60,
                    }}
                  />
                </View>
              </View>
              <View style={[Layout.center, { marginLeft: 70 }]}>
                <TouchableOpacity
                  onPress={() => uploadPhoto()}
                  activeOpacity={0.5}
                  style={[
                    Layout.center,
                    {
                      backgroundColor: '#184461',
                      width: 31,
                      height: 31,
                      borderRadius: 15,
                    },
                  ]}
                >
                  <Icon
                    name="camera"
                    type="Feather"
                    size={18}
                    color="white"
                    onPress={() => {}}
                  />
                </TouchableOpacity>
              </View>

              <View style={[Layout.center, { marginTop: 10 }]}>
                {/**full name starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        width: 280,
                        height: 47,
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <TextInput
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: 10,
                      }}
                      value={fullName}
                      placeholder={placeholder.fullName}
                      onChangeText={text => setFullName(text)}
                      onEndEditing={() => validate('fullName')}
                      onFocus={() => {
                        setPlaceholder({ ...placeholder, fullName: '' })
                      }}
                      onBlur={() => {
                        setPlaceholder({
                          ...placeholder,
                          fullName: 'Enter FullName',
                        })
                      }}
                    />
                  </View>
                </DropShadow>
                {/**full name ends here */}

                {/**email starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        width: 280,
                        height: 47,
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <TextInput
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: 10,
                      }}
                      value={emailAddress}
                      placeholder={placeholder.emailAddress}
                      autoCapitalize={'none'}
                      onChangeText={text => setEmailAddress(text)}
                      onEndEditing={() => validate('emailAddress')}
                      onFocus={() => {
                        setPlaceholder({ ...placeholder, emailAddress: '' })
                      }}
                      onBlur={() => {
                        setPlaceholder({
                          ...placeholder,
                          emailAddress: 'Enter Email Address',
                        })
                      }}
                    />
                  </View>
                </DropShadow>
                {/**email ends here */}

                {/**Company name starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        width: 280,
                        height: 47,
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <TextInput
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: 10,
                      }}
                      value={companyName}
                      placeholder={placeholder.companyName}
                      onChangeText={text => setCompanyName(text)}
                      onEndEditing={() => validate('companyName')}
                      onFocus={() => {
                        setPlaceholder({ ...placeholder, companyName: '' })
                      }}
                      onBlur={() => {
                        setPlaceholder({
                          ...placeholder,
                          companyName: 'Enter Company Name',
                        })
                      }}
                    />
                  </View>
                </DropShadow>
                {/**Company name ends here */}

                {/**car plate number starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        width: 280,
                        height: 47,
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <TextInput
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: 10,
                      }}
                      value={carPlateNum}
                      placeholder={placeholder.carPlateNum}
                      onChangeText={text => setCarPlateNum(text)}
                      onEndEditing={() => validate('carPlateNum')}
                      onFocus={() => {
                        setPlaceholder({ ...placeholder, carPlateNum: '' })
                      }}
                      onBlur={() => {
                        setPlaceholder({
                          ...placeholder,
                          carPlateNum: 'Enter Car Plate Number',
                        })
                      }}
                    />
                  </View>
                </DropShadow>
                {/**car plate number ends here */}

                {hasError &&
                (!isValidFullName ||
                  !isValidEmailAddress ||
                  !isValidCompanyName ||
                  !isValidcarPlateNum) ? (
                  <View
                    style={[
                      Layout.justifyContentCenter,
                      Layout.selfCenter,
                      {
                        width: 280,
                        borderRadius: MetricsSizes.small,
                        backgroundColor: Colors.deepRed,
                      },
                    ]}
                  >
                    {!isValidFullName ||
                    !isValidEmailAddress ||
                    !isValidCompanyName ||
                    !isValidcarPlateNum ? (
                      <Text
                        style={[
                          Fonts.textCenter,
                          {
                            fontSize: 14,
                            fontWeight: '500',
                            color: Colors.white,
                            padding: MetricsSizes.tiny,
                          },
                        ]}
                      >
                        • All fields are required!
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                <PrimaryButttonComponent
                  label="Submit"
                  style={{ width: 270, height: 40, marginTop: 20 }}
                  onPress={() => {
                    validate('fullName')
                    validate('emailAddress')
                    validate('companyName')
                    validate('carPlateNum')
                    if (
                      isValidFullName &&
                      isValidEmailAddress &&
                      isValidCompanyName &&
                      isValidcarPlateNum
                    ) {
                      SubmitForm()
                    } else {
                      setHasError(true)
                    }
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
