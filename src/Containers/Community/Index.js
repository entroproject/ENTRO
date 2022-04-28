import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-dynamic-vector-icons'
import { useSelector } from 'react-redux'

const IndexCommunityContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)
  const user = useSelector(user => user.user.profile);

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayContact(true)
    } else {
      setDisplayContact(false)
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
      <View
        style={{
          height: 90,
          backgroundColor: '#184461',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >

      <Icon
      name="arrow-left"
      type="Feather"
      size={35}
      color="#fff"
      style={{ margin: 20, flex:1}}
      onPress={() => {
        navigation.goBack();
      }}/>
        <Text
          style={{
            color: Colors.white,
            fontWeight: '700',
            marginEnd: 10
           
          }}
        >
          Emergency
        </Text>

       
      </View>

      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <TouchableOpacity
          style={{
            height: 45,
            width: 206,
            borderRadius: 15,
          }}
          activeOpacity={1.0}
        >
          <ButtonGroup
            buttons={['Emergency', 'Community']}
            selectedIndex={selectedIndex}
            onPress={value => {
              setSelectedIndex(value)
            }}
            containerStyle={{
              marginBottom: 20,
              borderRadius: 15,
              elevation: 10,
            }}
            selectedButtonStyle={{
              backgroundColor: '#184461',
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderTopLeftRadius: 15,
              elevation: 10,
            }}
            textStyle={{
              textAlign: 'center',
              color: '#000',
              fontWeight: 'bold',
            }}
            buttonContainerStyle={{ backgroundColor: '#D0F2EC' }}
            innerBorderStyle={{ color: 'transparent' }}
            activeOpacity={1.0}
          />
        </TouchableOpacity>
      </View>

      {displaycontact ? (
        <ScrollView style={{ marginTop: 20 }}>
          {
            user.Emergency.map((serv, key) => (
              <Pressable
              key={key}
              onPress={()=> {
                Linking.openURL(`tel:${serv.PhoneNo}`)
              }}
            >
              <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "80%",
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

                <View style={{ justifyContent: 'center', margin: 5 }}>
                  <Icon
                    type="FontAwesome"
                    name="user-circle"
                    color="#184461"
                    size={40}
                  />
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    marginStart: 5,
                    backgroundColor: '#fff',
                    marginEnd: 5,
                  }}
                >
                  <Text
                    style={{
                      color: '#184461',
                      fontWeight: 'bold',
                      marginBottom: 5,
                      flexWrap: 'wrap',
                      fontSize: 14,
                    }}
                  >
                    {serv.Name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <Icon
                      type="FontAwesome"
                      name="phone"
                      color="#184461"
                      size={20}
                    />
                    <Text
                      style={{
                        color: '#184461',
                        marginStart: 5,
                      }}
                    >
                      {serv.PhoneNo}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          </Pressable>
            ))
          }

        </ScrollView>
      ) : (
        <ScrollView style={{ marginTop: 20 }}>
        {
          user.Community.map((com, key) => (
            <Pressable
              key={key}
              onPress={()=> {
                Linking.openURL(`tel:${com.PhoneNo}`)
              }}
            >
            <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "80%",
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

                <View style={{ justifyContent: 'center', margin: 5 }}>
                  <Icon
                    type="FontAwesome"
                    name="user-circle"
                    color="#184461"
                    size={40}
                  />
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    marginStart: 5,
                    backgroundColor: '#fff',
                    marginEnd: 5,
                  }}
                >
                  <Text
                    style={{
                      color: '#184461',
                      fontWeight: 'bold',
                      marginBottom: 5,
                      flexWrap: 'wrap',
                      fontSize: 14,
                    }}
                  >
                    {com.Name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <Icon
                      type="FontAwesome"
                      name="phone"
                      color="#184461"
                      size={20}
                    />
                      <Text
                        style={{
                          color: '#184461',
                          marginStart: 5,
                        }}
                      >
                        {com.PhoneNo}
                      </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          </Pressable>
          ))
        }
        </ScrollView>
      )}
    </View>
  )
}

export default IndexCommunityContainer
