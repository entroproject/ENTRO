import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PhoneInput from 'react-native-phone-number-input'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { navigate } from '@/Navigators/utils'

const IndexLoginContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()

  const [phoneNumber, setPhoneNumber] = useState('')

  const submitPhoneNumber = () => {
    console.log(phoneNumber)
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

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 100,
                }}
              >
                <PrimaryButttonComponent
                  label="Enter Phone Number"
                  style={{ width: 250 }}
                  onPress={() => submitPhoneNumber()}
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

                  <TouchableOpacity onPress={() => navigate('Register')}>
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
})
