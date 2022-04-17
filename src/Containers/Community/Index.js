import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-dynamic-vector-icons'

const IndexCommunityContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)

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
        <Text
          style={{
            color: Colors.white,
            fontWeight: '700',
            marginLeft: 18,
            flex: 2,
          }}
        >
          Emergency
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
                    Ambulance
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
                      +601112228889
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

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
                    Hospital
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
                      +60346789092
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

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
                    FireService
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
                      +60399876580
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{ marginTop: 20 }}>
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
                    Entro Manager
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
                      +601112228889
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

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
                    Security Guard
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
                      +60399876580
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default IndexCommunityContainer
