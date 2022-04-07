import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const IndexHomeContainer = () => {
  const { Fonts, Gutters, Layout } = useTheme()

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.smallHPadding]}>
      <Text style={Fonts.textRegular}>Home Screen</Text>
    </View>
  )
}

export default IndexHomeContainer