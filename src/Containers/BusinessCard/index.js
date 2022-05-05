import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import Icon from 'react-native-dynamic-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import { showMessage } from 'react-native-flash-message'
import Share from 'react-native-share'
import DropShadow from 'react-native-drop-shadow'
import { useDispatch, useSelector } from 'react-redux'
import { useOrientation } from '../useOrientation'

const height = Dimensions.get('screen').height

const CardComponent = ({
  businessCards,
  selectedCardID,
  Images,
  handleChangeSelectedCardID,
  handleDeleteCard,
}) => {
  const [showModal, setShowmodal] = useState(false)
  const [modalID, setModalID] = useState('')
  const orientation = useOrientation()
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(false)

  const handleOpenModal = id => {
    setModalID(id)
    setShowmodal(true)
  }

  const onShare = async card => {
    try {
      await Share.open({
        title: 'Business Card',
        message: `
        Name: ${card.fullname}
        Company: ${card.businessname}
        Website: https://${card.businessWebsite}
        Phone: ${card.phone}
        `,
        urls: [
          `data:image/png;base64,${card.cardFrontChunks.join('')}`,
          `data:image/png;base64,${card.cardBackChunks.join('')}`,
        ],
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View style={{ marginTop: 20 }}>
      {Object.keys(businessCards).map(key => (
        <View
          key={businessCards[key].id}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => {
              setCurrentIndex(
                businessCards[key].id === currentIndex
                  ? null
                  : businessCards[key].id,
              )
            }}

            style={{justifyContent: 'center', alignItems: 'center', }}
          >
            <View
              style={{
                width: '93%',
                backgroundColor: '#fff',
                borderRadius: 10,
                elevation: 10,
                marginTop: 5,
                shadowColor: '#000',
                shadowRadius: 10,
                shadowOpacity: 0.6,
                elevation: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 20,
                  marginEnd: 20,
                  marginVertical: 14,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <View style={{}}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${businessCards[
                          key
                        ].logoChunks.join('')}`,
                      }}
                      style={{
                        width: 80,
                        height: 40,
                      }}
                      resizeMode={'cover'}
                    />
                  </View>

                  <View style={{ marginStart: 15, width: '70%' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '900',
                        color: '#184461',
                        flexWrap: 'wrap',
                      }}
                      numberOfLines={2}
                    >
                      {businessCards[key].fullname}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#184461',
                        marginTop: 3,
                      }}
                    >
                      {businessCards[key].businessName}
                    </Text>

                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '500',
                        color: '#184461',
                        marginTop: 3,
                      }}
                    >
                      {businessCards[key].phone}
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
                          fontSize: 11,
                          fontWeight: '500',
                          color: '#184461',
                          marginTop: 3,
                        }}
                      >
                        {businessCards[key].businessWebsite}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ justifyContent: 'space-between' }}>
                    <View style={{ marginStart: 10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          handleOpenModal(
                            businessCards[key].id,
                            console.log(businessCards[key]),
                          )
                        }
                        style={{ padding: 3 }}
                      >
                        <Icon
                          name={'ellipsis-v'}
                          type={'FontAwesome'}
                          size={30}
                          color={'#000'}
                          style={{ alignSelf: 'flex-end' }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{}}>
                      {selectedCardID === businessCards[key].id && (
                        <Image
                          source={Images.defaultCardIcon}
                          style={{ width: 20, height: 20, margin: 3 }}
                          resizeMode={'contain'}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{ marginStart: 10, marginTop: -20, marginBottom: 8 }}
              >
                <Image
                  source={Images.companyQrcode}
                  style={{ width: 30, height: 30, margin: 3 }}
                />
              </View>
            </View>
            {businessCards[key].id === currentIndex ? (
              <DropShadow
                style={{
                  shadowColor: '#F0F0F0',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: '90%',
                      backgroundColor: '#fff',
                      elevation: 10,
                      marginBottom: 10,
                      shadowColor: '#000',
                      shadowOpacity: 0.6,
                      elevation: 8,
                      shadowOffset: {
                        width: 2,
                        height: 4,
                      },
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      marginTop: -9,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 8,
                        marginHorizontal: 30,
                        alignSelf: 'center',
                        width: orientation === 'PORTRAIT' ? '90%' : null,
                      }}
                    >
                      <View style={{ marginEnd: 5 }}>
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${businessCards[
                              key
                            ].cardFrontChunks.join('')}`,
                          }}
                          style={{
                            width: orientation === 'PORTRAIT' ? 120 : 200,
                            height: orientation === 'PORTRAIT' ? 180 : 240,
                          }}
                          resizeMode={'cover'}
                        />
                      </View>
                      <View style={{}}>
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${businessCards[
                              key
                            ].cardBackChunks.join('')}`,
                          }}
                          style={{
                            width: orientation === 'PORTRAIT' ? 120 : 200,
                            height: orientation === 'PORTRAIT' ? 180 : 240,
                          }}
                          resizeMode={'cover'}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginHorizontal: 20,
                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 110,
                          justifyContent: 'space-evenly',
                        }}
                      >
                        {/**share business card */}
                        <TouchableOpacity
                          onPress={() => {
                           
                            onShare(businessCards[key])
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon
                            type="Entypo"
                            name="share"
                            size={23}
                            color="#184461"
                          />
                        </TouchableOpacity>
                        {/**share business card ends here */}

                        {/**edit business card */}
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('EditBusinessCard', {
                              card: businessCards[key],
                            })
                          }
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon
                            type="FontAwesome"
                            name="edit"
                            size={23}
                            color="#184461"
                          />
                        </TouchableOpacity>
                        {/**edit business card ends here */}

                        {/**delete business card */}
                        <TouchableOpacity
                          onPress={() => {
                            handleDeleteCard(key)
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon
                            type="Foundation"
                            name="trash"
                            size={23}
                            color="#184461"
                          />
                        </TouchableOpacity>

                        {/**delete business card ends here */}
                      </View>
                    </View>
                  </View>
                </View>
              </DropShadow>
            ) : null}
          </TouchableOpacity>
        </View>
      ))}

    
    </View>
  )
}

const IndexBusinessCardContainer = ({ navigation }) => {
  const { Images } = useTheme()
  const isFocused = useIsFocused()
  const [selectedCardID, setSelectedCardID] = useState({})
  const [_businessCards, _setBusinessCards] = useState({})
  const [businessCards, setBusinessCards] = useState({})
  const [loading, setLoading] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const user = useSelector(user => user.user.profile)

  const handleChangeSelectedCardID = async id => {
    setSelectedCardID(id)
    await AsyncStorage.setItem('defaultBCard', id)
  }

  const resetCards = () => {
    setBusinessCards(_businessCards)
    setSearchText('')
  }

  const handleDeleteCard = async id => {
    try {
      const ser_cards = await AsyncStorage.getItem('businesscards')
      const des_cards = JSON.parse(ser_cards)
      const businessCards = {
        ...des_cards,
      }
      delete businessCards[id]
      const _ser_cards = JSON.stringify(businessCards)
      await AsyncStorage.setItem('businesscards', _ser_cards)
      showMessage({
        message: 'Card deleted successfully',
        backgroundColor: 'green',
        duration: 3000,
      })
      retrieveCards()
    } catch (err) {
      console.log(err)
      showMessage({
        message: 'Something went wrong',
        backgroundColor: 'red',
        duration: 3000,
      })
    }
  }

  const retrieveCards = async () => {
    const defaultBCardID = await AsyncStorage.getItem('defaultBCard')
    const ser_cards = await AsyncStorage.getItem('businesscards')
    const cards = JSON.parse(ser_cards)
    if (cards) {
      setBusinessCards(cards)
      _setBusinessCards(cards)
    }
    setSelectedCardID(defaultBCardID)
    setLoading(false)
  }

  const handleSearch = () => {
    const _arrCards = []
    Object.keys(_businessCards).map(key => {
      _arrCards.push(_businessCards[key])
    })
    const _filtered_cards = _arrCards.filter(c => {
      if (
        c.fullname
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase().split(' ')[0]) ||
        c.phone
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase().split(' ')[0]) ||
        c.businessWebsite
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase().split(' ')[0])
      ) {
        return true
      }
      return false
    })
    const _objCards = {}
    _filtered_cards.map(c => {
      _objCards[c.id] = c
    })
    setBusinessCards(_objCards)
  }

  useEffect(() => {
    if (searchText.length < 1) {
      resetCards()
    } else {
      handleSearch()
    }
  }, [searchText])

  useEffect(() => {
    setLoading(true)
    retrieveCards()
  }, [isFocused])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      {/* header start */}
      <View>
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
              Dont worry about keeping your business card anymore.
            </Text>
          </View>

          {/**search bar area starts here */}
          {!openSearch ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                flex: 1,
              }}
            >
              <View style={{ flex: 2 }}>
                <TouchableOpacity
                  activeOpacity={1.2}
                  onPress={() => setOpenSearch(true)}
                >
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
                        backgroundColor: '#fff',
                        height: 40,
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
                        marginStart: 20,
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
              </View>

              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  activeOpacity={1.2}
                  onPress={() => navigation.navigate('AddBusinessCard')}
                >
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
                        backgroundColor: '#fff',
                        height: 40,
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
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginEnd: 20,
                        marginStart: 5,
                      }}
                    >
                      <Image
                        source={Images.addBtnBiz}
                        style={{ width: 20, height: 20 }}
                        elevation={8}
                      />

                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: '#184461',
                        }}
                      >
                        Add Card
                      </Text>
                    </View>
                  </DropShadow>
                </TouchableOpacity>
              </View>
            </View>
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
                  marginTop: 15,
                  backgroundColor: '#fff',
                  height: 40,
                  marginHorizontal: 20,
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
                  placeholder={'Search by business name, phone or website'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
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
                    resetCards()
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
      </View>
      {/* header end */}

      {/* Main Content START*/}

      {loading ? (
        <View
          style={{
            minHeight: height * 0.6,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={50} color="#184461" />
        </View>
      ) : Object.keys(businessCards).length > 0 ? (
        <CardComponent
          businessCards={businessCards}
          selectedCardID={selectedCardID}
          Images={Images}
          handleDeleteCard={handleDeleteCard}
          handleChangeSelectedCardID={handleChangeSelectedCardID}
        />
      ) : (
        <View
          style={{
            minHeight: height * 0.6,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              padding: 50,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#184461',
                textAlign: 'center',
                marginBottom: 15,
              }}
            >
              Virtual Business Card
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#184461',
                textAlign: 'center',
              }}
            >
              Store your business card here will help you to find it back and
              save more space
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#184461',
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
