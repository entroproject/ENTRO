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
import { deleteVisitor, getVisitors, getVisitorsHistory } from '@/api-utils'
import * as Constants from '@/Assets/Constants'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

const IndexVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [allRegisteredVisitor, setAllRegisteredVisitor] = useState([])
  const [allVisitorsHistory, setAllVisitorsHistory] = useState([])
  const [customized_visitors, setCustomized_visitors] = useState([])
  const [customized_visitors_history, setCustomized_visitors_history] =
    useState([])
  const [loading, setLoading] = useState(true)
  const orientation = useOrientation()
  const isFocused = useIsFocused()
  const [selectedSortType, setSelectedSortType] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)
  const [openSearchCalendar, setOpenSearchCalendar] = useState(false)
  const [searchRegisterVisitor, setSearchRegisterVisitor] = useState('')
  const [searchHistoryVisitor, setSearchHistoryVisitor] = useState('')
  const [displayRegisterVisitor, setDisplayRegisterVisitor] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(false)
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const accessId = useSelector(state => state.user.accessId)
  const defaultCardID = useSelector(state => state.virtualCard.defaultCard)


  const onChange = (event, selectedDate) => {
    setShow(false)
    let data
    if (displayRegisterVisitor) {
      data = allRegisteredVisitor
    } else {
      data = allVisitorsHistory
    }
    const _filtered_visitors = data.filter(a =>
      new Date(
        Number(
          a.StartDateTime.replace(/\/date\(/gi, '')
            .replace(/\//gi, '')
            .replace(/\)/gi, ''),
        ),
      ).toLocaleDateString() == new Date(selectedDate).toLocaleDateString()
        ? true
        : false,
    )
    if (displayRegisterVisitor) {
      setCustomized_visitors(_filtered_visitors)
    } else {
      setCustomized_visitors_history(_filtered_visitors)
    }
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
        if (c.VisitorName.toLocaleLowerCase().includes(searchRegisterVisitor.toLocaleLowerCase())
        || c.VehicleNumber.toLocaleLowerCase().includes(searchRegisterVisitor.toLocaleLowerCase()) 
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
      const _filtered_visitors = allVisitorsHistory.filter(c => {
        if (c.VehicleNumber.toLocaleLowerCase().includes(searchHistoryVisitor.toLocaleLowerCase()) 
        || c.VisitorName.toLocaleLowerCase().includes(searchHistoryVisitor.toLocaleLowerCase())
        || c.VisitorStatus.toLocaleLowerCase().includes(searchHistoryVisitor.toLocaleLowerCase())
        || c.Visitortype.toLocaleLowerCase().includes(searchHistoryVisitor.toLocaleLowerCase())
        ) {
          return true
        }
        return false
      })
      setCustomized_visitors_history(_filtered_visitors)
    } else {
      setCustomized_visitors_history(allVisitorsHistory)
    }
  }

  const handleSort = (order, data) => {
    if (order) {
      const _filtered_visitors = data.sort((a, b) => {
        if (
          new Date(
            Number(
              a.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          ) >
          new Date(
            Number(
              b.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          )
        ) {
          return 1
        }
        return -1
      })
      if (displayRegisterVisitor) {
        setCustomized_visitors(_filtered_visitors)
      } else {
        setCustomized_visitors_history(_filtered_visitors)
      }
    } else {
      const _filtered_visitors = data.sort((a, b) => {
        if (
          new Date(
            Number(
              a.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          ) <
          new Date(
            Number(
              b.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          )
        ) {
          return 1
        }
        return -1
      })
      if (displayRegisterVisitor) {
        setCustomized_visitors(_filtered_visitors)
      } else {
        setCustomized_visitors_history(_filtered_visitors)
      }
    }
  }

  // search hist
  useEffect(() => {
    if (searchHistoryVisitor.length < 1) {
      resetVisitorHistory()
    }
    if (searchHistoryVisitor.length > 0) {
      handleVisitorHistory()
    }
  }, [searchHistoryVisitor])

  // search reg
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
    const req_vis = await getVisitors(accessId);
    const visitors = await req_vis.json();
    setAllRegisteredVisitor(visitors.Visitors);
    setCustomized_visitors(visitors.Visitors);
    setLoading(false);
  }

  const getAllVisitorsHistory = async () => {
    const req_vis = await getVisitorsHistory(accessId);
    const visitors_hist = await req_vis.json();
    setAllVisitorsHistory(visitors_hist.Visitors);
    setCustomized_visitors_history(visitors_hist.Visitors);
    setLoading(false);
  }


  const handleDeleteVisitor = async visitor => {
    try{
      const del_req = await deleteVisitor(accessId, defaultCardID.BuildingName, defaultCardID.VirtualKey);
      const response = await del_req().json();
      console.log(response);
    }catch(err){
      console.log(err);
      showMessage({
        message: "Something went wrong",
        backgroundColor: "red",
        color: "white",
        duration: 2000
      })
    }
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
          <TouchableOpacity activeOpacity={1.2} onPress={() => setShow(true)}>
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
                  Calendar
                </Text>
              </View>
            </DropShadow>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          {/**search calendar area ends here */}

          {/**search bar area starts here */}
          {!openSearch ? (
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                marginVertical: 10,
                flex: 1,
              }}
            >
              <View style={{ flex: 3, width: '100%' }}>
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
                  onPress={() => {
                    setSelectedSortType(!selectedSortType)
                    handleSort(
                      !selectedSortType,
                      displayRegisterVisitor
                        ? allRegisteredVisitor
                        : allVisitorsHistory,
                    )
                  }}
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
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: '#184461',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 8,
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        height: 40,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 10, marginEnd:20
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
                      type="MaterialCommunityIcons"
                      name={
                        !selectedSortType
                          ? 'sort-ascending'
                          : 'sort-descending'
                      }
                      size={25}
                      color="#000"
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
                  marginTop: 10,
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
                  placeholder={'Search registered visitor'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchRegisterVisitor}
                  onChangeText={text => setSearchRegisterVisitor(text)}
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
                  marginTop: 10,
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
                  placeholder={'Search visitor history'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchHistoryVisitor}
                  onChangeText={text => setSearchHistoryVisitor(text)}
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
              {
                customized_visitors.length === 0 
                ? <View>
                    <Text style={{color: "#000", textAlign: "center", fontSize: 15}}>You don't have any visitors currently.</Text>
                  </View>
                : customized_visitors.map((v, key) => (
                <View
                  key={key}
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
                        width: '100%',
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
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}
                        >
                          <View style={{ width: '20%' }}>
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

                          <View style={{ marginStart: 10, width: '70%' }}>
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
                        </View>

                        <View style={{ flex: 1 }}>
                          <Icon
                            name={'ellipsis-v'}
                            type={'FontAwesome'}
                            size={30}
                            color={'#184461'}
                            style={{ alignSelf: 'flex-end' }}
                          />
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
                              width: '95%',
                            
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
                                onPress={() => navigation.navigate("EditVistorInfo", {visitor: v})}
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
                                onPress={() => handleDeleteVisitor(v)}
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
          </View>
        ) : (
          <View>
            {
              customized_visitors_history.length == 0
              ?<View>
                <Text style={{color: "#000", textAlign: "center", fontSize: 15}}>You don't have any visitors currently.</Text>
              </View>
              :customized_visitors_history.map((v, key) => (
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
