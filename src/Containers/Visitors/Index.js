import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native'
import moment from 'moment'
import { useTheme } from '@/Hooks'
import { useOrientation } from '../useOrientation'
import { ButtonGroup } from 'react-native-elements'
import { getVisitors, getVisitorsHistory } from '@/api-utils'
import * as Constants from '@/Assets/Constants'
import DatePicker from 'react-native-date-picker'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'

const IndexVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)
  const [chooseAll, setChooseAll] = useState('Select All')
  const [filterVisitorType, setFilterVisitorType] = useState('Select')
  const [filterVisitorType2, setFilterVisitorType2] = useState('Select')
  const [selectFilterDate, setselectFilterDate] = useState('Select Date')
  const [searchVehicle, setSearchVehicle] = useState('')
  const [searchVehicle1, setSearchVehicle1] = useState('')

  const [allRegisteredVisitor, setAllRegisteredVisitor] = useState([])
  const [allVisitorsHistory, setAllVisitorsHistory] = useState([])
  const [customized_visitors, setCustomized_visitors] = useState([])
  const [customized_visitors_history, setCustomized_visitors_history] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const orientation = useOrientation()
  const isFocused = useIsFocused()

  const [selectAllDialogView, setSelectAllDialogView] = useState(false)
  const [selectAllDialogViewAll, setSelectAllDialogViewAll] = useState(false)
  const [selectAllDialogViewAll2, setSelectAllDialogViewAll2] = useState(false)

  const onDateChange = selectedDate => {
    const currentDate = selectedDate
    setDate(currentDate)
    const formattedDate = `${moment(selectedDate).format('MMM Do YY')}`
    setselectFilterDate(formattedDate)
  }

  const [openSearch, setOpenSearch] = useState(false)
  const [openSearchCalendar, setOpenSearchCalendar] = useState(false)

  const [searchRegisterVisitor, setSearchRegisterVisitor] = useState('')
  const [searchHistoryVisitor, setSearchHistoryVisitor] = useState('')

  const [displayRegisterVisitor, setDisplayRegisterVisitor] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(false)

  const optionVisitor = Constants.visitorAll.map((item, index) => {
    return (
      <TouchableOpacity
        style={[Layout.alignItemsStart]}
        key={index}
        onPress={() => selectAllVistors(item)}
      >
        <Text
          style={{
            color: Colors.bodyText,
            fontSize: 16,
            margin: 5,
            fontWeight: '500',
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )
  })

  const optionVisitorCheckInOrOut = Constants.visitorStatusType.map(
    (item, index) => {
      return (
        <TouchableOpacity
          style={[Layout.alignItemsStart]}
          key={index}
          onPress={() => {
            selectVisitorCheckInOrOut_reg(item)
          }}
        >
          <Text
            style={{
              color: Colors.bodyText,
              fontSize: 16,
              margin: 5,
              fontWeight: '500',
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )
    },
  )

  const optionVisitorCheckInOrOut2 = Constants.visitorSelectionType.map(
    (item, index) => {
      return (
        <TouchableOpacity
          style={[Layout.alignItemsStart]}
          key={index}
          onPress={() => selectVisitorCheckInOrOut_acc(item)}
        >
          <Text
            style={{
              color: Colors.bodyText,
              fontSize: 16,
              margin: 5,
              fontWeight: '500',
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )
    },
  )

  const filterVisitorReg = () => {
    if (filterVisitorType.toLocaleLowerCase() === 'all') {
      return
    }
    const _filtered_visitors = allVisitors.filter(c => {
      if (
        c.VisitorStatus.toLocaleLowerCase().includes(
          filterVisitorType.toLocaleLowerCase(),
        )
      ) {
        return true
      }
      return false
    })
    setCustomized_visitors(_filtered_visitors)
  }

  const filterVisitorAcc = () => {
    if (filterVisitorType2.toLocaleLowerCase() === 'all') {
      return
    }
    const _filtered_visitors = customized_visitors.filter(c => {
      if (
        c.VisitorStatus.toLocaleLowerCase().includes(
          filterVisitorType2.toLocaleLowerCase(),
        )
      ) {
        return true
      }
      return false
    })
    setCustomized_visitors(_filtered_visitors)
  }

  // checked in filter
  const selectVisitorCheckInOrOut_reg = item => {
    setFilterVisitorType(item)
    setSelectAllDialogViewAll(false)
  }

  // checked in filter
  const selectVisitorCheckInOrOut_acc = item => {
    setFilterVisitorType2(item)
    setSelectAllDialogViewAll2(false)
  }

  // first filter
  const selectAllVistors = item => {
    setChooseAll(item)
    setSelectAllDialogView(false)
  }

  const resetRegVisitor = () => {
    setCustomized_visitors(allRegisteredVisitor)
  }

  const resetVisitorHistory = () => {
    setCustomized_visitors_history(allVisitorsHistory)
  }

  const handleRegVisitor = () => {
    if (searchRegisterVisitor.length > 0) {
      const _filtered_visitors = allRegisteredVisitor.filter(c => {
        if (
          c.VisitorName.toLocaleLowerCase().includes(
            searchRegisterVisitor.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setCustomized_visitors(_filtered_visitors)
    } else {
      setCustomized_visitors(allRegisteredVisitor)
    }
  }

  const handleVisitorHistory = () => {
    if (searchHistoryVisitor.length > 0) {
      const _filtered_visitors_history = allVisitorsHistory.filter(c => {
        if (
          c.VehicleNumber.toLocaleLowerCase().includes(
            searchHistoryVisitor.toLocaleLowerCase(),
          )  ||   c.VisitorStatus.toLocaleLowerCase().includes(
            searchHistoryVisitor.toLocaleLowerCase())
        ) {
          return true
        }
        return false
      })
      setCustomized_visitors_history(_filtered_visitors_history)
    } else {
      setCustomized_visitors_history(allVisitorsHistory)
    }
  }

  useEffect(() => {
    if (searchHistoryVisitor.length < 1) {
      resetVisitorHistory()
    }
    if (searchHistoryVisitor.length > 0) {
      handleVisitorHistory()
    }
  }, [searchHistoryVisitor])

  useEffect(() => {
    if (searchRegisterVisitor.length < 1) {
      resetRegVisitor()
    }
    if (searchRegisterVisitor.length > 0) {
      handleRegVisitor()
    }
  }, [searchRegisterVisitor])

  // switch between tabs
  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayRegisterVisitor(true)
    } else {
      setDisplayRegisterVisitor(false)
    }
  }, [selectedIndex])

  // make api request to get all visitors and access
  useEffect(() => {
    getAllVisitors()
    getAllVisitorsHistory()
  }, [isFocused])

  const getAllVisitors = async () => {
    const req_vis = await getVisitors('')
    const visitors = await req_vis.json()
    setAllRegisteredVisitor(visitors.Visitors)
    setCustomized_visitors(visitors.Visitors)
    setLoading(false)
  }

  const getAllVisitorsHistory = async () => {
    const req_vis = await getVisitorsHistory('')
    const visitors_hist = await req_vis.json()
    setAllVisitorsHistory(visitors_hist.Visitors)
    setCustomized_visitors_history(visitors_hist.Visitors)
    setLoading(false)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      <View>
        <View
          style={{
            height: 144,
            backgroundColor: '#184461',
          }}
        >
          {/**search calendar area starts here */}
          {!openSearchCalendar ? (
            <TouchableOpacity
              activeOpacity={1.2}
              onPress={() => setOpenSearchCalendar(true)}
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
                    marginTop: 27,
                    backgroundColor: '#fff',
                    height: 40,
                    marginHorizontal: 20,
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
                    calendar
                  </Text>
                </View>
              </DropShadow>
            </TouchableOpacity>
          ) : (
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
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    marginTop: 27,
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
                    placeholder={'Search register here'}
                    returnKeyType={'search'}
                    keyboardType={'web-search'}
                    placeholderTextColor={'#666666'}
                    value={searchRegisterVisitor}
                    onChangeText={text => setSearchRegisterVisitor(text)}
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
                      setOpenSearchCalendar(false)
                    }}
                  >
                    <Icon
                      type="Feather"
                      name="x-circle"
                      size={25}
                      color="#184461"
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </DropShadow>
          )}
          {/**search calendar area ends here */}

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
              <View style={{ flex: 3 }}>
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
                          shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
                        marginEnd: 20,
                        marginStart: 12,
                      }}
                    >
                      <DropShadow
                        style={{
                          shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                        }}
                      >
                        <Icon
                          name={'sort-amount-asc'}
                          type={'FontAwesome'}
                          color="#184461"
                          size={20}
                        />
                      </DropShadow>
                    </View>
                  </DropShadow>
                </TouchableOpacity>
              </View>
            </View>
          ) : selectedIndex === 0 ? (
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
                  marginTop: 15,
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
                  placeholder={'Search register visitor'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchRegisterVisitor}
                  onChangeText={text => setSearchRegisterVisitor(text)}
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
                  marginTop: 15,
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
                  placeholder={'Search visitor history'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchHistoryVisitor}
                  onChangeText={text => setSearchHistoryVisitor(text)}
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
      </View>

      <View style={{}}>
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
              buttons={['Register Visitor', 'History Visitor']}
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

      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              height: 500,
            }}
          >
            <ActivityIndicator
              size={50}
              color={'#184461'}
              style={{
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Please wait...
            </Text>
          </View>
        ) : displayRegisterVisitor ? (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {customized_visitors.map(v => (
                <View
                  key={v.VisitorName}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => {
                      setCurrentIndex(
                        v.VisitorName === currentIndex ? null : v.VisitorName,
                      )
                    }}
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
                                uri: `data:image/png;base64,${v.VisitorImageLogo}`,
                              }}
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 21,
                              }}
                              resizeMode={'cover'}
                            />
                          </View>

                          <View style={{ marginStart: 15, width: '70%' }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '700',
                                color: '#184461',
                                flexWrap: 'wrap',
                              }}
                              numberOfLines={2}
                            >
                              {v.VisitorName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '500',
                                color: '#184461',
                                marginTop: 3,
                              }}
                            >
                              {new Date(
                                Number(
                                  v.StartDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                          </View>

                          <View style={{ flex: 1, marginStart: 10 }}>
                            <Icon
                              name={'ellipsis-v'}
                              type={'FontAwesome'}
                              size={30}
                              color={'#000'}
                              style={{}}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    {v.VisitorName === currentIndex ? (
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
                            marginTop: 1,
                          }}
                        >
                          <View
                            style={{
                              width: '90%',
                              height: 130,
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
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                marginStart: 20,
                                marginEnd: 8,
                                marginTop: 14,
                              }}
                            >
                              <View style={{ justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ width: 80 }}>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Location
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Purpose of visit
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Badge No
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Vehicle No
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Status
                                    </Text>
                                  </View>

                                  <View style={{ marginHorizontal: 5 }}>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                  </View>

                                  <View style={{ marginHorizontal: 5 }}>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Suria KLCC
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {v.Visitortype}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      CA2014
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {v.VehicleNumber}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {v.VisitorStatus}
                                    </Text>
                                  </View>
                                </View>
                              </View>

                              <View style={{ flex: 1 }}>
                                <Image
                                  source={Images.KlccLogo}
                                  style={{
                                    width: 80,
                                    height: 48,
                                    alignSelf: 'flex-end',
                                    marginTop: 20,
                                  }}
                                  resizeMode={'contain'}
                                />
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
          </View>
        ) : (
          <View>
            {customized_visitors_history.map((v, key) => (
              <View
                key={key}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    width: '93%',
                    height: 166,
                    backgroundColor: '#fff',
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
                  <View
                    style={{
                      flexDirection: 'row',
                      marginStart: 22,
                      marginEnd: 8,
                      marginTop: 14,
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#184461',
                        }}
                      >
                        {v.VisitorName}
                      </Text>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 80 }}>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Start Date
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            End Date
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Location
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Purpose of visit
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Badge No
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Vehicle No
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Status
                          </Text>
                        </View>

                        <View style={{ marginHorizontal: 10 }}>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: 'bold',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            :
                          </Text>
                        </View>

                        <View style={{ marginHorizontal: 5 }}>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            {new Date(
                              Number(
                                v.StartDateTime.replace(/\/date\(/gi, '')
                                  .replace(/\//gi, '')
                                  .replace(/\)/gi, ''),
                              ),
                            ).toLocaleString()}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            {new Date(
                              Number(
                                v.EndDateTime.replace(/\/date\(/gi, '')
                                  .replace(/\//gi, '')
                                  .replace(/\)/gi, ''),
                              ),
                            ).toLocaleString()}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            Suria KLCC
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            {v.Visitortype}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            CA2014
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            {v.VehicleNumber}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#184461',
                              marginVertical: 1,
                            }}
                          >
                            {v.VisitorStatus}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${v.VisitorImageLogo}`,
                        }}
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 29,
                          borderWidth: 2,
                          borderColor: '#184461',
                          alignSelf: 'flex-end',
                        }}
                        resizeMode={'cover'}
                      />

                      <Image
                        source={Images.Plaza33Logo}
                        style={{
                          width: 80,
                          height: 48,
                          alignSelf: 'flex-end',
                          marginTop: 20,
                        }}
                        resizeMode={'contain'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default IndexVisitorContainer
