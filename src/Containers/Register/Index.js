import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const IndexRegisterContainer = () => {
  const { Fonts, Gutters, Layout } = useTheme()

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.smallHPadding]}>
  
      <Text style={Fonts.textRegular}>Register Screen</Text>
    </View>
  )
}

export default IndexRegisterContainer