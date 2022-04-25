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
import { useDispatch, useSelector } from 'react-redux'

const IndexEditUserContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValidFullName, setIsValidFullName] = useState(true)
  const [isValidEmailAddress, setIsValidEmailAddress] = useState(true)
  const [isValidCompanyName, setIsValidCompanyName] = useState(true)
  const [isValidcarPlateNum, setIsValidCarPlateNum] = useState(true)
  const user = useSelector(user => user.user.profile)
  const orientation = useOrientation()
  const [placeholder, setPlaceholder] = useState({
    fullName: 'Enter FullName',
    emailAddress: 'Enter Email Address',
    companyName: 'Enter Company Name',
    carPlateNum: 'Enter Car Plate Number',
  })

  const validate = type => {
    if (type === 'fullName') {
      setIsValidFullName(!regexStr.name.test(fullName))

      if (regexStr.name.test(fullName)) {
        showMessage({
          message: 'All field required to edit your profile!',
          backgroundColor: 'red',
          duration: 3000,
        })
      } else if (fullName === '') {
        showMessage({
          message: 'All field required to edit your profile!',
          backgroundColor: 'red',
          duration: 3000,
        })
      }
    } else if (type === 'emailAddress') {
      setIsValidEmailAddress(regexStr.email.test(emailAddress))
      if (!regexStr.email.test(emailAddress)) {
        showMessage({
          message: 'All field required to edit your profile!',
          backgroundColor: 'red',
          duration: 3000,
        })
      }
    } else if (type === 'companyName') {
      setIsValidCompanyName(companyName !== '')
      if (companyName === '') {
        showMessage({
          message: 'All field required to edit your profile!',
          backgroundColor: 'red',
          duration: 3000,
        })
      }
    } else if (type === 'carPlateNum') {
      setIsValidCarPlateNum(carPlateNum !== '')
      if (carPlateNum === '') {
        showMessage({
          message: 'All field required to edit your profile!',
          backgroundColor: 'red',
          duration: 3000,
        })
      }
    }
  }

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image)
    })
  }

  const SubmitForm = () => {
    if (
      fullName === '' ||
      emailAddress === '' ||
      companyName === '' ||
      carPlateNum === ''
    ) {
      setLoading(true)
      setTimeout(() => {
        validate()
        setLoading(false)
      }, 2000)
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate('UserProfile')
      }, 1000)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor:'#F1F1F1' }}>
      <View
        style={{
          height: 90,
          backgroundColor: '#184461',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontWeight: '700',
            marginLeft: 18,

            flex: 2,
          }}
        >
          Edit Profile
        </Text>

        <Image
        source={{ uri: `data:image/png;base64,${user.ProfileLogo}` }}
          style={{
            width: 60,
            height: 60,
            marginEnd: 20,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#FFFEFE',
          }}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            color: '#184461',
            marginTop: 35,
            fontSize: orientation === 'PORTRAIT' ? 12 : 16,
            fontWeight: '500',
          }}
        >
          Please fill up your information to edit profile
        </Text>
      </View>
      <ScrollView>

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
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 15,
          }}
        >
          <View
            style={{
              width: "90%",
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
            <View style={[Layout.center, { marginLeft: orientation === 'PORTRAIT' ? 70 : 90}]}>
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
                <Icon
                  name="camera"
                  type="Feather"
                  size={18}
                  color="white"
                 
                />
              </TouchableOpacity>
            </View>
    
            <View style={[Layout.center, { marginTop: 10, paddingVertical:20 }]}>
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
                      width:'85%'
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
                      width:'85%'
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
                      width:'85%'
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
                      width:'85%'
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
    
              <PrimaryButttonComponent
                loading={loading}
                label="Submit"
                style={{ width: orientation === 'PORTRAIT' ? 270 : 320, height: 40, marginTop: 20 }}
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
          </DropShadow>
     
      </ScrollView>
    </ScrollView>
  )
}

export default IndexEditUserContainer

