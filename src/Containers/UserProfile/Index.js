import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-dynamic-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultCard } from '@/Features/virtualCards'

const IndexUserProfileContainer = ({ navigation }) => {
  const { Layout, Colors, Images } = useTheme()
  const user = useSelector(user => user.user.profile);
  const VirtualCard = useSelector(virtualCard => virtualCard.virtualCard.cards);
  const defaultCardID = useSelector(virtualCard => virtualCard.virtualCard.defaultCard);
  const dispatch = useDispatch();


 
  const handCardSelected = (item) => {
    dispatch(setDefaultCard(item.VirtualKey))
  }

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
          Profile
        </Text>

        <Image
          source={{uri: `data:image/png;base64,${user.ProfileLogo}`}}
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
        <View style={[Layout.center]}>
          <ImageBackground
            source={{uri: `data:image/png;base64,${user.ProfileLogo}`}}
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
                    textTransform: "capitalize"
                  }}
                >
                  {user.FirstName} {user.LastName}
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
                  {user.MobileNo}
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
                  {user.Email}
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
                  {user.VehicleNo}
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
        <View style={{ flex: 1, marginHorizontal: 16 }}>
        {
            VirtualCard.map((item, index) => (
              <TouchableOpacity
              style={{
                width: "100%",
                alignSelf: "center"
              }}
                key={index}
                activeOpacity={1.0}
                onPress={() => handCardSelected(item)}
              >
                <View
                  style={[ { marginTop: 5, marginBottom: 10 }]}
                >
                  <View
                    style={{
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
                          {item.BuildingName}
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
                          {new Date(Number(item.AccessEndAt.replace(/\/date\(/gi, "").replace(/\//gi, "").replace(/\)/gi, ""))).toLocaleString()}

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
                          Host Number: <Text>{item.VirtualKey}</Text>
                        </Text>

                        { item.VirtualKey ===  defaultCardID ? (
                          <Image
                            source={Images.defaultCardIcon}
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
            ))
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default IndexUserProfileContainer
