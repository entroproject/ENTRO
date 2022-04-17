import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import DropShadow from 'react-native-drop-shadow'

const IndexVirtualAccessContainer = ({ navigation }) => {

  const { Fonts, Gutters, Layout, Colors, Images, MetricsSizes } = useTheme()

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F1F1F1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            marginTop: 40,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#184461', fontSize: 20, fontWeight: 'bold' }}>
            SURIA KLCC
          </Text>
        </View>

        <View
          style={{
            marginTop: 40,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={Images.KlccLogo}
            style={{ width: 200, height: 120, resizeMode: 'contain' }}
          />
        </View>

        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
            width: 350,
          }}
        >
          <View style={[Layout.center, { marginBottom: 30 }]}>
          <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 1,
            shadowRadius: 5,
           
          }}
        >
        <View
        style={[
          Layout.center,
          {
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: '#ffffff',
            shadowColor: ' rgba(0, 0, 0, 0.25)',
            elevation:10
          },
        ]}
      >
      <Image
      source={Images.companyQrcode}
      width={200}
      height={200}/>
      </View>
        
        </DropShadow>
          
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default IndexVirtualAccessContainer
