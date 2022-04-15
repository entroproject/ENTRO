import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { useTheme } from '@/Hooks'
import woman from '../../Assets/Images/woman.jpg'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import Icon from 'react-native-dynamic-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const IndexBusinessCardContainer = ({ navigation }) => {
  const { Images } = useTheme()
  const isFocused = useIsFocused()

  const [selectedCardID, setSelectedCardID] = useState({})
  const [businessCards, setBusinessCards] = useState({})

  const handleChangeSelectedCardID = async id => {
    setSelectedCardID(id)
    await AsyncStorage.setItem('defaultBCard', id)
  }

  const retrieveCards = async () => {
    const defaultBCardID = await AsyncStorage.getItem('defaultBCard')
    const ser_cards = await AsyncStorage.getItem('businesscards')
    const cards = JSON.parse(ser_cards)
    if (cards) {
      setBusinessCards(cards)
    }
    setSelectedCardID(defaultBCardID)
  }

  useEffect(() => {
    retrieveCards()
  }, [isFocused])

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Business Card</Text>
          <Image source={woman} style={styles.profileImage} />
        </View>
      </View>
      {/* header end */}
      {/* card start */}
      <View style={styles.cardWrap}>
        <View style={styles.cardContent}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 5,
              color: '#184461',
              textAlign: 'center',
            }}
          >
            Vilyn Tan Cho
          </Text>
          {/* divider start */}
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#000',
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
          {/* divider end */}
          <Text
            style={{
              color: '#184461',
              textAlign: 'center',
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            Click the button below to add your card
          </Text>
          <PrimaryButttonComponent
            label="Add card"
            iconRight={'plussquare'}
            iconType={'AntDesign'}
            onPress={() => navigation.navigate('AddBusinessCard')}
          />
        </View>
      </View>
      {/* card end */}

      {/* business cards start */}
      <View style={{ marginTop: 20 }}>
        {Object.keys(businessCards).map(key => (
          <TouchableOpacity
            onPress={() => handleChangeSelectedCardID(businessCards[key].id)}
            key={key}
            style={{
              flexDirection: 'row',
              backgroundColor: '#D7E01F',
              marginHorizontal: 20,
              marginBottom: 10,
              borderRadius: 10,
              overflow: 'hidden',
              paddingLeft: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 4,
            }}
          >
            <View
              style={{
                width: '50%',
                backgroundColor: '#fff',
                padding: 5,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {businessCards[key].fullname}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                }}
              >
                {businessCards[key].businessName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://' + businessCards[key].businessWebsite,
                  ).catch(err => console.log(err))
                }}
              >
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 15,
                    textDecorationColor: 'blue',
                    textDecorationLine: 'underline',
                  }}
                >
                  {businessCards[key].businessWebsite}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                }}
              >
                {businessCards[key].phone}
              </Text>
              {selectedCardID === businessCards[key].id && (
                <Image
                  source={Images.defaultCardIcon}
                  style={{ width: 20, height: 20, margin: 3 }}
                  resizeMode={'contain'}
                />
              )}
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                width: '50%',
                padding: 5,
              }}
            >
              {/* <Image source={{uri: `data:image/jpeg;base64,${businessCards[key].logo}`}} style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain"
                        }} /> */}
              <Image
                source={Images.Plaza33Logo}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <TouchableOpacity>
                  <Icon name="share" type="Entypo" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="edit" type="FontAwesome" size={25} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* business cards end */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#184461',
    height: 150,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  cardWrap: {
    width: '100%',
    overflow: 'hidden',
    marginTop: -60,
    width: 300,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#D0F2EC',
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

export default IndexBusinessCardContainer
