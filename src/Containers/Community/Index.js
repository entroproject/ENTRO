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
  TextInput,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'
import { useDispatch, useSelector } from 'react-redux'

const IndexCommunityContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)

  const user = useSelector(user => user.user.profile)

  const [searchEmergency, setSearchEmergency] = useState('')
  const [allEmergency, setAllEmergency] = useState(user.Emergency)
  const [userEmergencyFilter, setUserEmergencyFilter] = useState(user.Emergency)

  const [searchCommunity, setSearchCommunity] = useState('')
  const [allCommunity, setAllCommunity] = useState(user.Community)
  const [userCommunityFilter, setUserCommunityFilter] = useState(user.Community)

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayContact(true)
    } else {
      setDisplayContact(false)
    }
  })

  const handleSearchEmergency = () => {
    if (searchEmergency.length > 0) {
      const _filtered_emergerncy = allEmergency.filter(c => {
        if (
          c.Name.toLocaleLowerCase().includes(
            searchEmergency.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setUserEmergencyFilter(_filtered_emergerncy)
    } else {
      setUserEmergencyFilter(allEmergency)
    }
  }

  const handleSearchCommunity = () => {
    if (searchCommunity.length > 0) {
      const _filtered_community = allCommunity.filter(c => {
        if (
          c.Name.toLocaleLowerCase().includes(
            searchCommunity.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setUserCommunityFilter(_filtered_community)
    } else {
      setUserCommunityFilter(allCommunity)
    }
  }

  const resetEmerg = () => {
    setUserEmergencyFilter(allEmergency)
  }

  const resetComm = () => {
    setUserCommunityFilter(allCommunity)
  }

  useEffect(() => {
    if (searchEmergency.length < 1) {
      resetEmerg()
    }
    if (searchEmergency.length > 0) {
      handleSearchEmergency()
    }
  }, [searchEmergency])

  useEffect(() => {
    if (searchCommunity.length < 1) {
      resetComm()
    }
    if (searchCommunity.length > 0) {
      handleSearchCommunity()
    }
  }, [searchCommunity])

  return (
    <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
      <View
        style={{
          height: 144,
          backgroundColor: '#184461',
        }}
      >
        <View
          style={{
            marginStart: 22,
            marginTop: 27,
            marginBottom: 10,
            marginEnd: 8,
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              fontSize: 23,
              color: '#fff',
              flexWrap: 'wrap',
              textTransform: 'capitalize',
            }}
            numberOfLines={1}
          >
            Hi, {user.FirstName} {user.LastName}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 12,
              color: '#fff',
              flexWrap: 'wrap',
            }}
          >
            Dont worry your emergency line is here.
          </Text>
        </View>

        {/**search bar area starts here */}

        {!openSearch ? (
          <>
            <TouchableOpacity
              activeOpacity={1.2}
              onPress={() => setOpenSearch(true)}
            >
              <DropShadow
                style={{
                  shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  shadowOffset: {
                    width: 1,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    height: 40,
                    marginHorizontal: 27,
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: '#184461',
                    shadowColor: '#000',
                    shadowRadius: 10,
                    shadowOpacity: 0.6,
                    elevation: 8,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <DropShadow
                    style={{
                      shadowColor: '#282828',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 2,
                    }}
                  >
                    <Icon
                      type="Feathers"
                      name="search"
                      color="#184461"
                      size={27}
                    />
                  </DropShadow>

                  <Text
                    style={{
                      color: '#184461',
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    Search
                  </Text>
                </View>
              </DropShadow>
            </TouchableOpacity>
          </>
        ) : selectedIndex === 0 ? (
          <DropShadow
            style={{
              shadowColor: '#282828',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                backgroundColor: '#fff',
                height: 40,
                marginHorizontal: 27,
                borderRadius: 7,
                borderWidth: 1,
                borderColor: '#184461',
                elevation: 10,
                shadowColor: '#000',
                shadowRadius: 10,
                shadowOpacity: 0.6,
                elevation: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TextInput
                placeholder={'Search emergency contact'}
                returnKeyType={'search'}
                keyboardType={'web-search'}
                placeholderTextColor={'#666666'}
                value={searchEmergency}
                onChangeText={text => setSearchEmergency(text)}
                // onBlur={()=> setOpenSearch(false)}
                // blurOnSubmit={()=> setOpenSearch(false)}
                // onSubmitEditing={()=> setOpenSearch(false)}
                autoFocus={true}
                style={{
                  width: '90%',
                  fontSize: 12,
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setOpenSearch(false)
                }}
              >
                <Icon
                  type="Feather"
                  name="x-circle"
                  size={25}
                  color="#184461"
                />
              </TouchableOpacity>
            </View>
          </DropShadow>
        ) : (
          <DropShadow
            style={{
              shadowColor: '#282828',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                backgroundColor: '#fff',
                height: 40,
                marginHorizontal: 27,
                borderRadius: 7,
                borderWidth: 1,
                borderColor: '#184461',
                elevation: 10,
                shadowColor: '#000',
                shadowRadius: 10,
                shadowOpacity: 0.6,
                elevation: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TextInput
                placeholder={'Search community contact'}
                returnKeyType={'search'}
                keyboardType={'web-search'}
                placeholderTextColor={'#666666'}
                value={searchCommunity}
                onChangeText={text => setSearchCommunity(text)}
                // onBlur={()=> setOpenSearch(false)}
                // blurOnSubmit={()=> setOpenSearch(false)}
                // onSubmitEditing={()=> setOpenSearch(false)}
                autoFocus={true}
                style={{
                  width: '90%',
                  fontSize: 12,
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setOpenSearch(false)
                }}
              >
                <Icon
                  type="Feather"
                  name="x-circle"
                  size={25}
                  color="#184461"
                />
              </TouchableOpacity>
            </View>
          </DropShadow>
        )}

        {/**search bar area ends here */}
      </View>

      <View style={{ marginTop: 10 }}>
        <DropShadow
          style={{
            shadowColor: '#282828',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 1,
            shadowRadius: 2,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 7,
              margin: 7,
              justifyContent: 'center',
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
                borderRadius: 7,
                elevation: 10,
              }}
              selectedButtonStyle={{
                backgroundColor: '#184461',
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
                borderBottomLeftRadius: 7,
                borderTopLeftRadius: 7,
                elevation: 10,
              }}
              textStyle={{
                textAlign: 'center',
                color: '#000',
                fontWeight: 'bold',
              }}
              buttonContainerStyle={{ backgroundColor: '#fff' }}
              innerBorderStyle={{ color: 'transparent' }}
              activeOpacity={1.0}
            />
          </TouchableOpacity>
        </DropShadow>
      </View>

      {displaycontact ? (
        <ScrollView style={{ marginTop: 10 }}>
          {userEmergencyFilter.map((serv, key) => (
            <Pressable
              key={key}
              onPress={() => {
                Linking.openURL(`tel:${serv.PhoneNo}`)
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '93%',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    elevation: 10,
                    marginBottom: 10,
                    marginTop: 5,
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
                    <View style={{ justifyContent: 'center' }}>
                      <Icon
                        type="MaterialIcons"
                        name="account-circle"
                        color="#184461"
                        size={40}
                        style={{ marginHorizontal: 17, marginVertical: 14 }}
                      />
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        marginStart: 8,
                        width: 125,
                      }}
                    >
                      <Text
                        style={{
                          color: '#184461',
                          fontWeight: '700',
                          marginBottom: 5,
                          flexWrap: 'wrap',
                          fontSize: 16,
                        }}
                        numberOfLines={1}
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
                        <Text
                          style={{
                            color: '#184461',
                            fontWeight: '500',
                            fontSize: 12,
                          }}
                        >
                          {serv.PhoneNo}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginStart: 2,
                        marginEnd: 20,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          flex: 1,
                        }}
                      >
                        <Icon
                          type="Feathers"
                          name="share"
                          color="#184461"
                          size={25}
                        />
                        <Icon
                          type="FontAwesome"
                          name="phone"
                          color="#184461"
                          size={25}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={{ marginTop: 10 }}>
          {userCommunityFilter.map((com, key) => (
            <Pressable
              key={key}
              onPress={() => {
                Linking.openURL(`tel:${com.PhoneNo}`)
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '93%',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    elevation: 10,
                    marginBottom: 10,
                    marginTop: 5,
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
                    <View style={{ justifyContent: 'center' }}>
                      <Icon
                        type="MaterialIcons"
                        name="account-circle"
                        color="#184461"
                        size={40}
                        style={{ marginHorizontal: 17, marginVertical: 14 }}
                      />
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        marginStart: 8,
                        width: 125,
                      }}
                    >
                      <Text
                        style={{
                          color: '#184461',
                          fontWeight: '700',
                          marginBottom: 5,
                          flexWrap: 'wrap',
                          fontSize: 16,
                        }}
                        numberOfLines={1}
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
                        <Text
                          style={{
                            color: '#184461',
                            fontWeight: '500',
                            fontSize: 12,
                          }}
                        >
                          {com.PhoneNo}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginStart: 2,
                        marginEnd: 20,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          flex: 1,
                        }}
                      >
                        <Icon
                          type="Feathers"
                          name="share"
                          color="#184461"
                          size={25}
                        />
                        <Icon
                          type="FontAwesome"
                          name="phone"
                          color="#184461"
                          size={25}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default IndexCommunityContainer
