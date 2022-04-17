import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'


const IndexVisitorContainer = () => {
    const { Fonts, Gutters, Layout, Images } = useTheme()

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
    <View>
    <Text style={{fontSize:30, fontWeight: '700'}}>Visitors screen</Text>
    </View>
     
       
   
    </ScrollView>
  )
}

export default IndexVisitorContainer