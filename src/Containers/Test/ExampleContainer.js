import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs'
import { useTheme } from '@/Hooks'
import {
  IndexBusinessCardContainer,
  IndexHomeContainer,
  IndexSettingContainer,
  IndexVisitorContainer,
} from '@/Containers'
import Icon from 'react-native-dynamic-vector-icons'
import * as Animatable from 'react-native-animatable'

const Tab = createBottomTabNavigator()

const TabButton = props => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = useRef(null)
  console.log(props)

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: '0deg' },
        1: { scale: 1.5, rotate: '360deg' },
      })
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: '360deg' },
        1: { scale: 1, rotate: '0deg' },
      })
    }
  }, [focused])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animatable.View
          ref={viewRef}
          duration={2000}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Icon
            type={item.type}
            name={item.typeName}
            color={focused ? '#184461' : 'red'}
            size={23}
          />
        </Animatable.View>
      </TouchableOpacity>
    </View>
  )
}

const TabBottomNavigation = () => {
  const { Fonts, Gutters, Layout, Images } = useTheme()

  const TabArr = [
    {
      route: 'Home',
      label: 'Home',
      type: 'FontAwesome',
      typeName: 'home',
      activeIconImg: Images.homeToggle,
      inactiveIconImg: Images.homeImgBlue,
      activeIcon: 'grid',
      component: IndexHomeContainer,
    },
    {
      route: 'Visitor',
      label: 'Visitor',
      type: 'MaterialCommunityIcons',
      typeName: 'account-group',
      activeIconImg: Images.visitorImg,
      inactiveIconImg: Images.visitorImgBlue,
      activeIcon: 'grid',
      component: IndexVisitorContainer,
    },
    {
      route: 'Business',
      label: 'Business Card',
      type: 'FontAwesome',
      typeName: 'vcard-o',
      activeIconImg: Images.businessCardImg,
      inactiveIconImg: Images.businessCardImgBlue,
      activeIcon: 'grid',
      component: IndexBusinessCardContainer,
    },
    {
      route: 'Settings',
      label: 'Settings',
      type: 'FontAwesome',
      typeName: 'cog',
      activeIconImg: Images.settingToggle,
      inactiveIconImg: Images.settingsImgBlue,
      activeIcon: 'grid',
      component: IndexSettingContainer,
    },
  ]
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: 'white',
          height: 60,
          position: 'absolute',
          bottom: 0,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <Icon
                    type={item.type}
                    name={item.typeName}
                    color="#184461"
                    size={27}
                  />
                ) : (
                  <Icon
                    type={item.type}
                    name={item.typeName}
                    color="#184461"
                    size={27}
                  />
                ),

              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default TabBottomNavigation
