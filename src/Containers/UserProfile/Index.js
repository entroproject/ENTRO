import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-dynamic-vector-icons'
const [loading, setLoading] = useState(false)

const IndexUserProfileContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Colors, Images, MetricsSizes } = useTheme()
  const [cardPickedIndex, setcardPickedIndex] = useState([])

  const VirtualCard = [
    {
      id: '0',
      companyName: 'SURIA KLCC',
      cardIcon: Images.KlccLogo,
      cardExpries: '24 -01-2022  21:00: 00 pm',
      hostNumber: 'ST33223',
      selectedCard: Images.defaultCardIcon,
    },

    {
      id: '1',
      companyName: 'PLAZA 33',
      cardIcon: Images.Plaza33Logo,
      cardExpries: '22 -01-2022  22:00: 00 pm',
      hostNumber: 'ST33223',
      selectedCard: Images.defaultCardIcon,
    },
    {
      id: '2',
      companyName: 'SURIA KLCC',
      cardIcon: Images.KlccLogo,
      cardExpries: '24 -01-2022  21:00: 00 pm',
      hostNumber: 'ST33223',
      selectedCard: Images.defaultCardIcon,
    },
  ]

 
  const handCardSelected = (item, index) => {
    if (cardPickedIndex.indexOf(index) > -1) {
      let newArray = cardPickedIndex.filter(indexObject => {
        if (indexObject != index || indexObject == index) {
          return false
        }
        return true
      })
      setcardPickedIndex(newArray)
    } else {
      setcardPickedIndex([...cardPickedIndex, index])
    }

    navigation.navigate('VirtualAccessCard', {
      itemCardName: item.companyName,
      itemCompanyLogo: item.cardIcon,
    })
    console.log(index)
    console.log(item)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
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
          Profile
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

      <View style={[{ marginTop: 20 }]}>
        <View style={Layout.center}>
          <ImageBackground
            source={Images.userImageDisplay}
            style={{ height: 270, width: 300, elevation: 8 }}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            resizeMode={'cover'}
          />
        </View>

        <View style={[Layout.center, {}]}>
          <View
            style={{
              backgroundColor: '#D0F2EC',
              height: 90,
              width: 300,
              elevation: 8,
              marginBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginHorizontal: 5,
              }}
            >
              <View
                style={{ flexDirection: 'row', flex: 2, alignItems: 'center' }}
              >
                <Icon
                  name="user"
                  type="FontAwesome"
                  size={15}
                  color="#184461"
                  style={{ marginEnd: 5 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: '#184461',
                  }}
                >
                  Vilyn Fong Cho
                </Text>
              </View>

              <View>
                <Icon
                  name="edit"
                  type="Feather"
                  size={20}
                  color="#184461"
                  style={{ marginEnd: 5 }}
                  onPress={() => {
                    navigation.navigate('EditUserProfile')
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 2,
              }}
            >
              <View
                style={{ flexDirection: 'row', flex: 2, alignItems: 'center' }}
              >
                <Icon
                  name="phone"
                  type="FontAwesome"
                  size={15}
                  color="#184461"
                  style={{ marginEnd: 5 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#184461',
                  }}
                >
                  +601133939816
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 2,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="envelope"
                  type="FontAwesome"
                  size={13}
                  color="#184461"
                  style={{ marginEnd: 5 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#184461',
                  }}
                >
                  vilynfong@gmail.com
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 2,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="car"
                  type="FontAwesome"
                  size={13}
                  color="#184461"
                  style={{ marginEnd: 5 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#184461',
                  }}
                >
                  AVG 8801
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#184461',
            marginTop: 8,
            marginLeft: 16,
          }}
        >
          Virtual Access Card
        </Text>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={VirtualCard}
            extraData={cardPickedIndex}
            keyExtractor={key => key.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => handCardSelected(item, index)}
              >
                <View
                  style={[Layout.center, { marginTop: 5, marginBottom: 10 }]}
                >
                  <View
                    style={{
                      width: 320,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      elevation: 10,
                      shadowColor: '#000',
                      shadowRadius: 10,
                      shadowOpacity: 0.6,
                      elevation: 8,
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: 10,
                          backgroundColor: '#184461',
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}
                      />

                      <View style={{ flex: 3 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#184461',
                            marginTop: 5,
                            marginLeft: 2,
                          }}
                        >
                          {item.companyName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#184461',
                            marginLeft: 2,
                            marginTop: 5,
                          }}
                        >
                          Expires on:
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#184461',
                            marginLeft: 2,
                            marginTop: 5,
                          }}
                        >
                          {item.cardExpries}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#184461',
                            marginLeft: 2,
                            marginTop: 5,
                            marginBottom: 3,
                          }}
                        >
                          Host Number: <Text>{item.hostNumber}</Text>
                        </Text>

                        {cardPickedIndex.indexOf(index) > -1 ? (
                          <Image
                            source={item.selectedCard}
                            style={{ width: 20, height: 20, margin: 3 }}
                            resizeMode={'contain'}
                          />
                        ) : null}
                      </View>

                      <View style={{ justifyContent: 'center', flex: 2 }}>
                        <Image
                          source={item.cardIcon}
                          style={{ width: 90, height: 45, marginEnd: 3 }}
                          resizeMode={'contain'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  )
}

export default IndexUserProfileContainer