import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native'
import { useTheme } from '@/Hooks'
import LottieView from 'lottie-react-native'
import { logoutUser } from '@/Features/users'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch, useSelector } from 'react-redux'

const IndexSettingContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const [progress, setProgress] = useState(new Animated.Value(0))
  const user = useSelector(user => user.user.profile)
  const dispatch = useDispatch();

  const buttonRef = useRef < LottieView > null

  const signOutApp = () => {
    navigateAndSimpleReset("MainNav");
    dispatch(logoutUser())
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
            fontSize: 16,
            flex: 2,
          }}
        >
          Settings
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

      <View style={{}}>
        <TouchableOpacity onPress={() => signOutApp()}>
          <View
            style={{
              width: 60,
              height: 40,
              alignSelf: 'flex-end',
              marginEnd: 10,
              marginTop: 10,
            }}
          >
            <LottieView source={require('../../Assets/Lottie/switch.json')} />
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginEnd: 12,
              fontSize: 14,
              color: '#184461',
              fontWeight: '600',
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderColor: '#184461',
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 8,
        }}
      ></View>

      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, color: '#184461', fontWeight: '700' }}>
          Technical Support
        </Text>
        <Text style={{ fontSize: 14, color: '#184461', marginTop: 20 }}>
          Contact our support at{' '}
          <Text style={{ textDecorationLine: 'underline', fontWeight: '500', color:'#184461',  }}>
            Ezxcess@support.com
          </Text>
        </Text>
      </View>

      <View
        style={{
          borderColor: '#184461',
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 20,
        }}
      ></View>
      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, color: '#184461', fontWeight: '700' }}>
          About this App
        </Text>
        <View style={{flexDirection:'row', marginTop:20, justifyContent:'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              color: '#184461',
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}
          >
            Privacy Policy
           
          </Text>

          <Text
          style={{
            textDecorationLine: 'underline',
            fontWeight: '500',
            color: '#184461',
          }}
        >
          Terms & Conditions
        </Text>
        </View>
      </View>

      <View
        style={{
          borderColor: '#184461',
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 20,
        }}
      />

      <View style={{marginTop:30}}>
      <Image 
      source={Images.corporateLogo}   
      />

      </View>
    </ScrollView>
  )
}

export default IndexSettingContainer
