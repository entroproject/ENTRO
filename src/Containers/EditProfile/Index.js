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

const IndexEditUserContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector(user => user.user.profile)
  const orientation = useOrientation()

  const [placeholder, setPlaceholder] = useState({
    fullName: 'Mohamad Faisal',
    contactNumber: ' 60176143035',
    emailAddress: 'servosecurity@gmail.com',
    carPlateNum: 'AVD 8801',
  })

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
      !fullName ||
      !emailAddress ||
      !contactNumber ||
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
      fullName !== '' ||
      emailAddress !== '' ||
      contactNumber !== '' ||
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
      <View style={{ height: 51, backgroundColor: '#184461' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Icon
            name="arrow-left"
            type="Feather"
            size={30}
            color="#fff"
            onPress={() => {
              navigation.goBack()
            }}
            style={{}}
          />
          <Text
            style={{
              color: Colors.white,
              fontWeight: '600',
              marginLeft: 15,
            }}
          >
            Update Profile
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

      <ScrollView style={{}}>
        <View style={{ paddingTop: 100, }}>
          <View style={[Layout.center, {}]}>
            <View
              style={[
                Layout.center,
                {
                  width: 139,
                  height: 139,
                  position: 'absolute',
                  borderRadius: 69.5,
                  borderColor: '#fff',
                  borderWidth: 7,
                  backgroundColor: '#C4c4c4',
                  shadowColor: ' rgba(0, 0, 0, 0.25)',
                },
              ]}
            >
              <Image
                source={photo ? { uri: photo.path } : Images.profilepic}
                style={{
                  width: 124,
                  height: 124,
                  zIndex: 1,
                  borderRadius: 62,
                }}
              />
            </View>
          </View>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
          >
            <View
              style={[
                Layout.center,
                { marginLeft: 90, marginTop: 25, elevation: 5 },
              ]}
            >
              <TouchableOpacity
                onPress={() => uploadPhoto()}
                activeOpacity={0.9}
                style={[
                  Layout.center,
                  {
                    backgroundColor: '#184461',
                    width: 46,
                    height: 46,
                    borderRadius: 23,
                  },
                ]}
              >
                <Icon name="camera" type="Feather" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </DropShadow>

          <View style={[Layout.center, { marginTop: 35 }]}>
            <Text style={{ color: '#184461', fontSize: 15, fontWeight: '900' }}>
              Last Successful Login
            </Text>
            <Text style={{ color: '#184461', fontSize: 12, fontWeight: '400', marginTop:8}}>
              20 Apr 2023 03:03 am
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 42,
          }}
        >
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
                color: fullName === 'Mohamad Faisal' ? '#C4C3C9' : '#457C9A',
                fontWeight: '900',
                paddingBottom: 0,
              }}
              value={fullName}
              placeholder={placeholder.fullName}
              onChangeText={text => setFullName(text)}
              onFocus={() => {
                setPlaceholder({ ...placeholder, fullName: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  fullName: 'Mohamad Faisal',
                })
              }}
            />
          </View>

      

          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Contact Number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                color: contactNumber === '+60176143035' ? '#C4C3C9' : '#457C9A',
                fontWeight: '900',
                paddingBottom: 0,
              }}
              value={contactNumber}
              placeholder={placeholder.contactNumber}
              onChangeText={text => setContactNumber(text)}
              keyboardType={'number-pad'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, contactNumber: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  contactNumber: '+60176143035',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Vehicle Number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                color:
                  carPlateNum === 'AVD 8801'
                    ? '#C4C3C9'
                    : '#457C9A',
                fontWeight: '900',
                paddingBottom: 0,
              }}
              value={carPlateNum}
              placeholder={placeholder.carPlateNum}
              onChangeText={text => setCarPlateNum(text)}
              onFocus={() => {
                setPlaceholder({ ...placeholder, carPlateNum: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  carPlateNum: 'AVD 8801',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                color:
                  emailAddress === 'servosecurity@gmail.com'
                    ? '#C4C3C9'
                    : '#457C9A',
                fontWeight: '900',
                paddingBottom: 0,
              }}
              value={emailAddress}
              placeholder={placeholder.emailAddress}
              onChangeText={text => setEmailAddress(text)}
              onFocus={() => {
                setPlaceholder({ ...placeholder, emailAddress: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  emailAddress: 'servosecurity@gmail.com',
                })
              }}
            />
          </View>
        </View>

        

        {/**submit form starts here */}
        <View style={{ justifyContent: 'center', alignItems: 'center' , marginTop: 40}}>
          <PrimaryButttonComponent
            loading={loading}
            label="Save"
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
