/**
 * This file contains all application's style relative to fonts
 */
 import { StyleSheet, PixelRatio } from 'react-native';
 import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
 /**
  *
  * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
  * @return {*}
  */
 export default function ({ FontSize, Colors }) {
   return StyleSheet.create({
     textSmall: {
       fontSize: FontSize.small,
       color: Colors.text,
     },
     textRegular: {
       fontSize: FontSize.regular,
       color: Colors.text,
     },
     textMedium: {
       fontSize: FontSize.medium,
       color: Colors.text,
     },
     textLarge: {
       fontSize: FontSize.large,
       color: Colors.text,
     },
     textWeightBold: {
       fontWeight: 'bold',
     },
     textWeightMedium: {
       fontWeight: '500',
     },
     header: {
       fontSize: FontSize.medium,
       fontWeight: '500',
       color: Colors.primary,
     },
     titleSmall: {
       fontSize: FontSize.small * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     titleRegular: {
       fontSize: FontSize.regular * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     titleLarge: {
       fontSize: FontSize.large * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     textAlignTop: {
       textAlignVertical: 'top',
     },
     textCenter: {
       textAlign: 'center',
     },
     textJustify: {
       textAlign: 'justify',
     },
     textLeft: {
       textAlign: 'left',
     },
     textRight: {
       textAlign: 'right',
     },
     textUnderline: {
       textDecorationLine: 'underline',
     },
 
     // custom
     cardHeading: {
       fontWeight: 'bold',
       color: Colors.primary,
       fontSize: 18,
     },
     cardTitle: {
       fontWeight: 'bold',
       color: Colors.secondary,
     },
     cardDate: {
       fontWeight: 'bold',
       color: Colors.bodyText,
     },
 
     h1: {
       fontFamily: 'NotoSans-SemiBold',
       fontSize: RFValue(24) / PixelRatio.getFontScale(),
       fontWeight: 'bold',
       // lineHeight: 34,
     },
     h2: {
       fontFamily: 'NotoSans-SemiBold',
       fontSize: RFValue(22) / PixelRatio.getFontScale(),
       fontWeight: 'bold',
       // lineHeight: 30,
     },
     h3: {
       fontFamily: 'NotoSans-SemiBold',
       fontSize: RFValue(16) / PixelRatio.getFontScale(),
       fontWeight: 'bold',
       // lineHeight: 40,
     },
     h3Bold: {
       fontFamily: 'NotoSans-SemiBold',
       fontSize: RFValue(16) / PixelRatio.getFontScale(),
       fontWeight: 'bold',
       // lineHeight: 40,
     },

     h4Bold: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: RFPercentage(5) / PixelRatio.getFontScale(),
      fontWeight: 'bold',
      // lineHeight: 40,
    },
     body: {
       fontFamily: 'NotoSans-Regular',
       fontSize: RFValue(13) / PixelRatio.getFontScale(),
       // lineHeight: 24,
     },
     bodyLink: {
       fontFamily: 'NotoSans-Regular',
       fontSize: RFValue(13) / PixelRatio.getFontScale(),
       textDecorationLine: 'underline',
       // lineHeight: 24,
     },
     bodyBold: {
       fontFamily: 'NotoSans-SemiBold',
       fontWeight: 'bold',
       fontSize: RFValue(13) / PixelRatio.getFontScale(),
       // lineHeight: 24,
     },
 
     caption: {
       fontFamily: 'NotoSans-Regular',
       fontSize: RFValue(12) / PixelRatio.getFontScale(),
       // lineHeight: 14,
     },
 
     captionBold: {
       fontFamily: 'NotoSans-SemiBold',
       fontWeight: 'bold',
       fontSize: RFValue(12) / PixelRatio.getFontScale(),
       // lineHeight: 14,
     },
   });
 }
 