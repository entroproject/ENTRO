import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useSelector } from 'react-redux'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()
  const isLoggedIn = useSelector(user => user.user.isLoggedIn);

  const { t } = useTranslation()

  const init = async () => {
    await setDefaultTheme({ theme: 'default', darkMode: null }) 
    navigateAndSimpleReset(isLoggedIn ? "MainNav" : "Login")
  }

  useEffect(() => {
    init()
  })

  return (
    <>
    </>
  )
}

export default StartupContainer
