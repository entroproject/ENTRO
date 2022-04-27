import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  TextInput,
  StyleSheet,
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
import { useSelector } from 'react-redux'
import FloatingLabel from 'react-native-floating-labels'

const IndexEditUserContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector(user => user.user.profile)
  const orientation = useOrientation()

  // const MyInput = props => {
  //   const inEditing = useState(false)
  //   const labelAnim = useRef(new Animated.Value(0)).current
  //   const onFocus = e => {
  //     Animated.spring(labelAnim, {
  //       toValue: 1,
  //       duration: 500,
  //     }).start()
  //   }
  //   const onBlur = () => {
  //     Animated.spring(labelAnim, {
  //       toValue: 0,
  //     }).start()
  //   }

  //   return (
  //     <View style={styles.container}>
  //       <Animated.Text
  //         style={[
  //           styles.label,
  //           {
  //             transform: [
  //               {
  //                 translateY: labelAnim.interpolate({
  //                   inputRange: [0, 1],
  //                   outputRange: [0, -20],
  //                 }),
  //               },
  //             ],
  //           },
  //           {
  //             fontSize: labelAnim.interpolate({
  //               inputRange: [0, 2],
  //               outputRange: [12, 15],
  //             }),
  //           },
  //         ]}
  //       >
  //         {props.label}
  //       </Animated.Text>
  //       <Animated.View
  //         style={[
  //           {
  //             flex: 1,
  //             paddingTop: labelAnim.interpolate({
  //               inputRange: [0, 1],
  //               outputRange: [10, 3],
  //             }),
  //           },
  //         ]}
  //       >
  //         <TextInput
  //           style={[styles.input]}
  //           autoCapitalize="none"
  //           defaultValue={props.defaultValue}
  //           onChangeText={props.onChangeText}
  //           keyboardType={props.keyboardType}
  //           editable={props.editable}
  //           onFocus={onFocus}
  //           onBlur={onBlur}
  //         />
  //       </Animated.View>
  //     </View>
  //   )
  // }

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
      !firstName ||
      !lastName ||
      !emailAddress ||
      !companyName ||
      !carPlateNum
    ) {
      showMessage({
        message: 'All fields are required',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    if (
      firstName !== '' ||
      lastName !== '' ||
      emailAddress !== '' ||
      companyName !== '' ||
      carPlateNum !== ''
    ) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate('UserProfile')
      }, 1000)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
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

              {/**submit form starts here */}
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
        </DropShadow>
      </ScrollView>
    </ScrollView>
  )
}

export default IndexEditUserContainer
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: 'white',
  },
  labelInput: {
    color: '#673AB7',
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
  },
  input: {
    borderWidth: 0,
  },
})
