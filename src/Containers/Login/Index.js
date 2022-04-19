import React, {useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PhoneInput from 'react-native-phone-number-input'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { navigate } from '@/Navigators/utils'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import { useOrientation } from '../useOrientation'
import axios from 'axios'

const IndexLoginContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const SCREEN_WIDTH = useWindowDimensions().width
  const SCREEN_HEIGHT = useWindowDimensions().height

  const navigation = useNavigation()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [numValidated, setNumValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState(false)
  const orientation = useOrientation();

  const submitPhoneNumber = () => {
    setLoading(true)
    if (phoneNumber.length < 13 || phoneNumber.length > 14) {
      showMessage({
        message: 'Please enter a valid phone number',
        backgroundColor: 'red',
        duration: 3000,
      });
      setLoading(false);
      return false;
    } 

    // make api call to validate phone number

      setTimeout(()=> {
        // send otp to phone
        showMessage({
          message: 'We have sent you an OTP.',
          backgroundColor: 'green',
          duration: 3000,
        })
        setLoading(false)
        setNumValidated(true)
      }, 2000)
  }

  const handleLogin = () => {
    if (otp.length !== 6) {
      showMessage({
        message: 'Please enter a valid OTP',
        backgroundColor: 'red',
        duration: 2000,
      })
      return false
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainNav' }],
      })
    }, 3000)
  }

  return (
    <View style={{ flex: 1, width: SCREEN_WIDTH, minHeight: SCREEN_HEIGHT }}>
 
    
    <ImageBackground
    source={Images.BackgroundImage}
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }}
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
    Welcome Back
  </Text>

  <Text
    style={{
      fontSize: 12,
      color: Colors.textColor,
      fontWeight: '500',
    }}
  >
    Login to access your entro account
  </Text>
</View>
<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal:5}}>
  <View
    style={{
      width:'90%',
      marginTop: 170,
      borderRadius: 20,
      backgroundColor: 'rgba(241, 241, 241, 0.8)',
      elevation: 10,
      shadowColor: '#000',
      shadowRadius: 10,
      shadowOpacity: 0.6,
      marginVertical: 8,
      shadowOffset: {
        width: 0,
        height: 4,
      },
     paddingHorizontal:30, 
     paddingBottom:25,
  
    }}
  >
    <Text
      style={[Fonts.bodyBold,{
        color: Colors.textColor,
        marginTop: 63,
        
      }]}
    >
      PHONE NUMBER
    </Text>

    <View style={{ marginTop: 10,  }}>
      <PhoneInput
        defaultValue={phoneNumber}
        layout="first"
        defaultCode="MY"
        withShadow
        autoFocus
        containerStyle={styleSheet.phoneNumberView}
        textContainerStyle={{ paddingVertical: 0 }}
        onChangeFormattedText={text => {
          setPhoneNumber(text)
        }}
      />

      <View
        style={{
          display: numValidated ? 'flex' : 'none',
        }}
      >
        <Text
          style={[Fonts.bodyBold,{
            color: Colors.textColor,
            marginTop: 20,
           
          }]}
        >
          OTP VERIFICATION
        </Text>
        <View style={{ alignSelf: 'center' }}>
          <OTPInputView
            pinCount={6}
            style={styleSheet.otpView}
            codeInputFieldStyle={styleSheet.underlineStyleBase}
            onCodeFilled={value => {
              setOtp(value)
            }}
          />
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: numValidated ? 0 : 100,
        }}
      >
        <PrimaryButttonComponent
          label="Login"
          loading={loading}
          style={{ width: orientation === 'PORTRAIT' ? 250 : 320}}
          onPress={() =>
            numValidated ? handleLogin() : submitPhoneNumber()
          }
        />

        <View style={{ marginTop: 2, flexDirection: 'row' }}>
          <Text
            style={[Fonts.caption,{
              color: '#363536',
            
            }]}
          >
            Don't have an account?{' '}
          </Text>

          <TouchableOpacity onPress={() => navigate('Register')}>
            <Text
              style={[Fonts.captionBold,{
                color: '#237A0C',
                textDecorationLine:'underline'
              }]}
            >
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
</View>
  
  </ScrollView>
   
  </ImageBackground>
    </View>
     

  )
}

export default IndexLoginContainer

const styleSheet = StyleSheet.create({
  phoneNumberView: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(241, 241, 241, 0.8)',
    marginStart: 29,
    marginEnd: 29,
    alignSelf:'center'
  },
  otpView: {
    alignSelf: 'center',
    width: '80%',
    height: 80,
    color: 'black',
    marginTop: -10,
  },
  underlineStyleBase: {
    width: 36,
    height: 44,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    borderColor: '#000',
    margin: 3,
  },
})
