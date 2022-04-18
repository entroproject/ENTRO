import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useOrientation } from '../useOrientation'
import Icon from 'react-native-dynamic-vector-icons'

const IndexAnnouncmentContainer = ({ navigation, route }) => {
  const orientation = useOrientation()
  const { Fonts, Gutters, Layout, Colors, Images, MetricsSizes } = useTheme()
  const { itemTitle, itemIcon, itemDesc, itemDate, itemTime, itemDistance } =
    route.params
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
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
            flex: 2,
          }}
        >
          Announcement
        </Text>

        <Image
          source={Images.userImageDisplay}
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
      <View style={{ marginTop: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={itemIcon}
            style={{ height: 250, width: '90%', borderRadius: 5 }}
            resizeMode={'cover'}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, marginVertical: 20, marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: orientation === 'PORTRAIT' ? 18 : 22,
            fontWeight: 'bold',
            color: '#184461',
          }}
        >
          {itemTitle}
        </Text>

        <Text
          style={{
            fontSize: orientation === 'PORTRAIT' ? 16 : 20,
            fontWeight: '600',
            color: '#184461',
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          {itemDesc}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon type="Feather" name="calendar" color="#184461" size={20} />
          <Text
            style={{
              fontSize: orientation === 'PORTRAIT' ? 14 : 20,
              fontWeight: '600',
              color: '#184461',
              marginTop: 5,
              marginStart: 5,
            }}
          >
            {itemDate}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon type="Feather" name="clock" color="#184461" size={20} />
          <Text
            style={{
              fontSize: orientation === 'PORTRAIT' ? 14 : 20,
              fontWeight: '600',
              color: '#184461',
              marginTop: 5,
              marginStart: 5,
            }}
          >
            {itemTime}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon type="Ionicons" name="location" color="#184461" size={20} />
          <Text
            style={{
              fontSize: orientation === 'PORTRAIT' ? 14 : 20,
              fontWeight: '600',
              color: '#184461',
              marginTop: 5,
              marginBottom: 10,
              marginStart: 5,
            }}
          >
            {itemDistance}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default IndexAnnouncmentContainer
