import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  StartupContainer,
  IndexRegisterContainer,
  IndexLoginContainer,
  IndexHomeContainer,
  IndexRegisterCompanyUserContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'



const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* <Stack.Screen name="Startup" component={StartupContainer} />

          <Stack.Screen
            name="Login"
            component={IndexLoginContainer}
            options={{
              animationEnabled: false,
            }}
          />

          <Stack.Screen
            name="Register"
            component={IndexRegisterContainer}
            options={{
              animationEnabled: false,
            }}
          /> */}


          <Stack.Screen
            name="MainHome"
            component={IndexHomeContainer}
            options={{
              animationEnabled: false,
            }}
          />

          <Stack.Screen
          name="RegisterCompanyUser"
          component={IndexRegisterCompanyUserContainer}
          options={{
            animationEnabled: false,
          }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
