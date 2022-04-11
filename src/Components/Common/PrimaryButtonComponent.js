import React from 'react'
import PropTypes from 'prop-types'

import LinearGradient from 'react-native-linear-gradient'
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
  Text,
} from 'react-native'

import { useTheme } from '@/Hooks'

function PrimaryButttonComponent({
  onPress,
  label,
  loading,
  style,
  labelStyle,
  iconRight,
  disabled,
}) {
  const { Fonts, Gutters, Layout, Colors } = useTheme()
  return (
    <View style={[Gutters.tinyBMargin, style]}>
      <TouchableOpacity
        activeOpacity={!disabled ? 0.8 : 1}
        onPress={
          disabled
            ? null
            : !loading
            ? () => {
                onPress()
                Keyboard.dismiss()
              }
            : null
        }
        style={{
          borderRadius: 16,
          shadowColor: Colors.black,
          shadowOffset: {
            height: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <LinearGradient
          colors={
            !disabled
              ? Colors.greenGradient
              : [Colors.mediumGray, Colors.mediumGray]
          }
          style={[
            Layout.rowCenter,
            Layout.buttonBorderRadius,
            Gutters.smallVPadding,
            Gutters.mediumHPadding,
            { height: 40 },
          ]}
        >
          {/** its either its loading and if not loading it just display the button text */}
          {loading ? (
            <ActivityIndicator size={30} color="#fff" />
          ) : (
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textCenter,
                { color: Colors.white },
                labelStyle,
              ]}
            >
              {label || 'Submit'}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

PrimaryButttonComponent.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

PrimaryButttonComponent.defaultProps = {
  loading: false,
  disabled: false,
  style: {},
  labelStyle: {},
}

export default PrimaryButttonComponent
