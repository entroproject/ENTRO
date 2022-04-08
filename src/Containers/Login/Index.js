import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useTheme } from '@/Hooks'
import PhoneInput from 'react-native-phone-number-input'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { navigate } from '@/Navigators/utils'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native'

const IndexLoginContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('')
  const [numValidated, setNumValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);

  const submitPhoneNumber = () => {
    if(phoneNumber.length < 12 || phoneNumber.length > 13){
      showMessage({message: "Please enter a valid phone number", backgroundColor: "red", duration: 3000})
    }else{
      showMessage({message: "We have sent you an OTP.", backgroundColor: "green", duration: 3000})
      setLoading(true);
      setTimeout(()=> {
        setLoading(false);
        setNumValidated(true)
      }, 3000)
    }
  }

  const handleLogin = () => {
    if(otp.length !== 6){
      showMessage({message: "Please enter a valid OTP", backgroundColor: "red", duration: 3000});
      return false;
    }
    setLoading(true);
    setTimeout(()=> {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes:[{name: "MainHome"}]
      });
    },3000)
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Images.BackgroundImage}
        style={{ width: '100%', height: '100%' }}
      >
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: 320,
              height: 370,
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
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: Colors.textColor,
                fontWeight: '700',
                marginTop: 63,
                marginStart: 29,
              }}
            >
              PHONE NUMBER
            </Text>

            <View style={{ marginTop: 10 }}>
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


            {
              numValidated
              &&(
                <>
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.textColor,
                    fontWeight: '700',
                    marginTop: 63,
                    marginStart: 29,
                  }}
                >
                  OTP VERIFICATION
                </Text>
                <View style={{alignSelf: "center"}}>
                  <OTPInputView
                    pinCount={6}
                    style={styleSheet.otpView}
                    codeInputFieldStyle={styleSheet.underlineStyleBase}
                    onCodeFilled={value => {
                      setOtp(value);
                    }}
                  />
                </View>
                </>
              )
            }

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: numValidated ? 0 : 100,
                }}
              >
                <PrimaryButttonComponent
                  loading={loading}
                  label="Login"
                  style={{ width: 250 }}
                  onPress={() => numValidated ? handleLogin() : submitPhoneNumber()}
                />

                <View style={{ marginTop: 2, flexDirection: 'row' }}>
                  <Text
                    style={{
                      color: '#363536',
                      fontSize: 12,
                      fontWeight: '500',
                    }}
                  >
                    Don't have an account?{' '}
                  </Text>

                  <TouchableOpacity onPress={() => navigate('RegisterCompanyUser')}>
                    <Text
                      style={{
                        color: '#237A0C',
                        fontSize: 12,
                        fontWeight: '500',
                      }}
                    >
                      Register Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default IndexLoginContainer

const styleSheet = StyleSheet.create({
  phoneNumberView: {
    height: 50,
    width: '80%',
    backgroundColor: 'rgba(241, 241, 241, 0.8)',
    marginStart: 29,
    marginEnd: 29,
  },
  otpView: {
    alignSelf: "center",
    width: '80%',
    height: 80,
    color: 'black',
    marginTop: -10
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderWidth: 1,
    color: 'black',
    borderColor: '#000',
  },
})
