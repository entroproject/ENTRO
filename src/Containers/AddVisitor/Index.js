import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native'

import { useTheme } from '@/Hooks'
import { regexStr } from '@/Assets/Constants'
import { navigate } from '@/Navigators/utils'
import DropShadow from 'react-native-drop-shadow'
import { useOrientation } from '../useOrientation'

import ImagePicker from 'react-native-image-crop-picker'
import { showMessage, hideMessage } from 'react-native-flash-message'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'

const IndexAddVisitorContainer = ({navigation}) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [fullName, setFullName] = useState('')
  const [ICNumber, setICNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isValidFullName, setIsValidFullName] = useState(true)
  const [isValidVisitorMobile, setIsValidVistorMobile] = useState(true)
  const [isValidICNumber, setIsValidICNumber] = useState(true)
  const [isValidcarPlateNum, setIsValidCarPlateNum] = useState(true)

  const orientation = useOrientation()

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
    if (!fullName || !ICNumber || !mobileNumber || !carPlateNum) {
        showMessage({
            message: 'All fields are required',
            backgroundColor: 'red',
            duration: 3000,
          })
          return false
    } 

    if (ICNumber.length < 12 || ICNumber.length > 14 ) {
        showMessage({
            message: 'Please Indicate a valid IC-Number',
            backgroundColor: 'red',
            duration: 3000,
          })
          return false
    }

    if (fullName !== '' || ICNumber !== '' ||  mobileNumber !== '' || carPlateNum !== '' ) {
        showMessage({
            message: 'Details successfully saved!',
            backgroundColor: 'green',
            duration: 3000,
          })
          navigation.navigate('VisitDateType')
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ height: 90, backgroundColor: '#184461' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontWeight: '700',
              marginLeft: 18,
            }}
          >
            Add Contact Visitor
          </Text>

          <Image
            source={Images.userImageDisplay}
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
      </View>

      <View>
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
                      width:  130,
                      height: 130,
                      position: 'absolute',
                      borderRadius: 65,
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
                      width: 150,
                      height: 150,
                      zIndex: 1,
                      borderRadius: 75.5,
                    }}
                  />
                </View>
              </View>
              <View
                style={[
                  Layout.center,
                  { marginLeft:  90 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => uploadPhoto()}
                  activeOpacity={0.9}
                  style={[
                    Layout.center,
                    {
                      backgroundColor: '#184461',
                      width: 40,
                      height:  40,
                      borderRadius: 20,
                    },
                  ]}
                >
                  <Icon name="camera" type="Feather" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <View style={{ marginHorizontal: 20, marginVertical: 12 }}>
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
                    onChangeText={text => setFullName(text)}
                    value={fullName}
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
                    placeholder="Enter IC Number"
                    placeholderTextColor={'#666666'}
                    keyboardType='number-pad'
                    onChangeText={text => setICNumber(text)}
                    value={ICNumber}
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
                    placeholder="Enter Mobile Number"
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setMobileNumber(text)}
                    value={mobileNumber}
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
                    placeholder="Enter Vehicle Number"
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setCarPlateNum(text)}
                    value={carPlateNum}
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

                <PrimaryButttonComponent
                  loading={loading}
                  label="Next"
                  style={{
                    height: 40,
                    marginTop: 20,
                  }}
                  onPress={() => SubmitForm()}
                />
              </View>
            </View>
          </View>
        </DropShadow>
      </View>
    </ScrollView>
  )
}

export default IndexAddVisitorContainer
