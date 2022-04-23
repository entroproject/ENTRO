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
import Icon from 'react-native-dynamic-vector-icons'
import { useOrientation } from '../useOrientation'
import { ButtonGroup } from 'react-native-elements'
import { getVisitors, getVisitorsHistory } from '@/api-utils'
import * as Constants from '@/Assets/Constants'
import DatePicker from 'react-native-date-picker'

const IndexVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)
  const [chooseAll, setChooseAll] = useState('Select All')
  const [filterVisitorType, setFilterVisitorType] = useState('Select')
  const [chooseAllHistory, setChoosenAllHistory] = useState('Select All')
  const [filterVisitorTypeHistory, setFilterVisitorTypeHistory] = useState('Select')
  const [selectFilterDate, setselectFilterDate] = useState('Select Date')
  const [searchVehicle, setSearchVehicle] = useState('')
  const [allVisitors, setAllVisitors] = useState([])
  const [customized_visitors, setCustomized_visitors] = useState([])
  const [allVisitorsHistory, setAllVisitorsHistory] = useState([])
  const [customized_visitors_history, setCustomized_visitors_history] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const orientation = useOrientation()

  const [selectAllDialogView, setSelectAllDialogView] = useState(false)
  const [selectAllDialogViewAll, setSelectAllDialogViewAll] = useState(false)


  const onchange = (selectedDate) => {
  
      const currentDate = selectedDate || date
      setDate(currentDate)
      const formattedDate = `${moment(date).format("MMM Do YY") }`
      setselectFilterDate(formattedDate)
   
  }

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

  const optionVisitorCheckInOrOut = Constants.visitorSelectionType.map((item, index) => {
    return (
      <TouchableOpacity
        style={[Layout.alignItemsStart]}
        key={index}
        onPress={() => selectVisitorCheckInOrOut_reg(item)}
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

  const selectVisitorCheckInOrOut_reg = item => {
    setFilterVisitorType(item)
    setSelectAllDialogViewAll(false)
  }

  const selectAllVistors = item => {
    setChooseAll(item)
    setSelectAllDialogView(false)
  }

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayContact(true)
    } else {
      setDisplayContact(false)
    }
  }, [selectedIndex])

  useEffect(() => {
    getAllVisitors()
    getAllVisitorsHistory()
  }, [])

  const getAllVisitors = async () => {
    const req_vis = await getVisitors('')
    const visitors = await req_vis.json()
    setAllVisitors(visitors.Visitors)
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
      <View
        style={{
          height: 70,
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
            fontSize: orientation === 'PORTRAIT' ? 12 : 16,
          }}
        >
          Vistors
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginEnd: 10,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('AddVistorInfo')}
          >
            <Icon
              name="plus-circle"
              type="Feather"
              size={20}
              color="#ffffff"
              style={{}}
            />
            <Text
              style={{
                fontSize: orientation === 'PORTRAIT' ? 12 : 16,
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              Add Visitor
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: '#184461', height: 35 }}>
        <ButtonGroup
          buttons={['Visitor Registration', 'Access History']}
          selectedIndex={selectedIndex}
          onPress={value => {
            setSelectedIndex(value)
          }}
          containerStyle={{
            marginBottom: 20,
            height: 40,
            marginTop: -5,
            borderColor: '#184461',
          }}
          buttonContainerStyle={{ backgroundColor: '#184461' }}
          innerBorderStyle={{ color: 'transparent' }}
          textStyle={{
            textAlign: 'center',
            color: '#CED4DA',
            fontWeight: 'bold',
          }}
          selectedButtonStyle={{ backgroundColor: '#184461' }}
          selectedTextStyle={{ color: 'white', fontSize: 16 }}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        {/* for Vsitor type  Modal here visitor registration*/}
        <View style={Layout.center}>
          <Modal
            visible={selectAllDialogView}
            transparent={true}
            onDismiss={() => setSelectAllDialogView(!selectAllDialogView)}
            onRequestClose={() => setSelectAllDialogView(false)}
            animationType="slide"
          >
            <View
              style={[
                Layout.center,
                {
                  flex: 1,
                  backgroundColor: '#00000099',
                },
              ]}
            >
              <View
                style={{
                  width: 250,
                  height: 250,
                  backgroundColor: Colors.white,
                  borderRadius: MetricsSizes.medium,
                }}
              >
                <View
                  style={[
                    Layout.center,

                    {
                      height: 48,
                      backgroundColor: '#184461',
                      borderTopRightRadius: MetricsSizes.medium,
                      borderTopLeftRadius: MetricsSizes.medium,
                    },
                  ]}
                >
                  <View style={[Layout.row, Layout.center]}>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>
                        {' '}
                        Please Select Filter
                      </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Image
                        source={Images.logolight}
                        style={{
                          width: 40,
                          height: 40,
                          zIndex: 1,
                          borderRadius: 60,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <ScrollView
                    style={{
                      backgroundColor: Colors.white,
                      borderBottomLeftRadius: MetricsSizes.medium,
                      borderBottomRightRadius: MetricsSizes.medium,
                      marginHorizontal: MetricsSizes.small,
                      marginBottom: MetricsSizes.small,
                    }}
                  >
                    {optionVisitor}
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* for   pVsitor type modal ends  here visitor registration*/}
      </View>

      <DatePicker
                  modal
                  open={open}
                  date={date}
                  androidVariant={'iosClone'}
                  mode={'datetime'}
                  onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    onchange(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />

      <View style={{ alignItems: 'center' }}>
      {/* for select  filter visitor registration*/}
      <View style={Layout.center}>
        <Modal
          visible={selectAllDialogViewAll}
          transparent={true}
          onDismiss={() => setSelectAllDialogViewAll(!selectAllDialogViewAll)}
          onRequestClose={() => setSelectAllDialogViewAll(false)}
          animationType="slide"
        >
          <View
            style={[
              Layout.center,
              {
                flex: 1,
                backgroundColor: '#00000099',
              },
            ]}
          >
            <View
              style={{
                width: 250,
                height: 250,
                backgroundColor: Colors.white,
                borderRadius: MetricsSizes.medium,
              }}
            >
              <View
                style={[
                  Layout.center,

                  {
                    height: 48,
                    backgroundColor: '#184461',
                    borderTopRightRadius: MetricsSizes.medium,
                    borderTopLeftRadius: MetricsSizes.medium,
                  },
                ]}
              >
                <View style={[Layout.row, Layout.center]}>
                  <View style={{ flex: 3, alignItems: 'flex-end' }}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>
                      {' '}
                      Please Select Filter
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                      source={Images.logolight}
                      style={{
                        width: 40,
                        height: 40,
                        zIndex: 1,
                        borderRadius: 60,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <ScrollView
                  style={{
                    backgroundColor: Colors.white,
                    borderBottomLeftRadius: MetricsSizes.medium,
                    borderBottomRightRadius: MetricsSizes.medium,
                    marginHorizontal: MetricsSizes.small,
                    marginBottom: MetricsSizes.small,
                  }}
                >
                  {optionVisitorCheckInOrOut}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
       {/* for select  filter visitor registration*/}
    </View>

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
      ) : displaycontact ? (
        <ScrollView>
          <View style={{ backgroundColor: '#D0F2EC' }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 10,
              }}
            >
              {/**select all starts here dialog filter */}
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  flex: 1,
                  marginEnd: 2,
                }}
              >
                <TouchableOpacity
                  style={[{ flexDirection: 'row' }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectAllDialogView(true)
                  }}
                >
                  <Icon
                    name={'filter'}
                    type={'FontAwesome'}
                    size={16}
                    color={'#000'}
                    style={{ paddingHorizontal: 4 }}
                  />

                  <Text
                    style={[
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    {chooseAll}
                  </Text>
                </TouchableOpacity>
              </View>
              {/**select all ends here dialog filter */}

              {/**vehcicle search starts here */}
              <View
                style={[
                  Layout.row,
                  Layout.alignItemsCenter,

                  {
                    backgroundColor: Colors.white,
                    marginStart: 2,
                    flex: 1,
                  },
                ]}
              >
                <TextInput
                  style={{
                    fontSize: 12,
                    padding: 5,
                  }}
                  value={searchVehicle}
                  placeholder={'Vehicle Number'}
                  onChangeText={text => setSearchVehicle(text)}
                />
              </View>
              {/**vehcicle search ends here */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 3,
                marginBottom: 5,
              }}
            >
              {/**select check out and check out Visitor  starts here */}
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  flex: 1,
                  marginEnd: 2,
                  height: 39,
                }}
              >
                <TouchableOpacity
                  style={[{ flexDirection: 'row' }]}
                  activeOpacity={0.7}
                  onPress={()=> setSelectAllDialogViewAll(true)}
                >
                  <Icon
                    name={'sort-amount-desc'}
                    type={'FontAwesome'}
                    size={16}
                    color={'#000'}
                    style={{ paddingHorizontal: 4 }}
                  />

                  <Text
                    style={[
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    {filterVisitorType}
                  </Text>
                </TouchableOpacity>
              </View>
              {/**select check out and check in Visitor  starts here */}
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  flex: 1,
                  marginStart: 2,
                }}
              >
                <TouchableOpacity
                  style={[{ flexDirection: 'row' }]}
                  activeOpacity={0.7}
                  onPress={()=> setOpen(true)}
                >
                  <Icon
                    name={'calendar'}
                    type={'FontAwesome'}
                    size={16}
                    color={'#000'}
                    style={{ paddingHorizontal: 4 }}
                  />

                  <Text
                    style={[
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    {selectFilterDate}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/**Card start from here Vistor registration */}

          <View style={{ marginVertical: 15 }}>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
              {allVisitors.map((v, key) => (
                <TouchableOpacity
                  key={key}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                  activeOpacity={1.0}
                >
                  <View style={[{ marginTop: 5, marginBottom: 10 }]}>
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
                              fontWeight: '500',
                              color: '#184461',
                              marginTop: 5,
                              marginLeft: 2,
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                            }}
                          >
                            Start Date:{' '}
                            <Text>
                              {new Date(
                                Number(
                                  v.StartDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontWeight: '500',
                              color: '#184461',
                              marginTop: 2,
                              marginLeft: 2,
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                            }}
                          >
                            End Date:{' '}
                            <Text>
                              {new Date(
                                Number(
                                  v.EndDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 1,
                            }}
                          >
                            Location: <Text>Plaza33</Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 1,
                            }}
                          >
                            Vehicle No: <Text>{v.VehicleNumber}</Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 1,
                            }}
                          >
                            Vistor Name: <Text>{v.VisitorName}</Text>
                          </Text>

                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 1,
                              marginBottom: 3,
                            }}
                          >
                            Status: <Text>{v.VisitorStatus}</Text>
                          </Text>
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1 }}>
                          <Image
                            source={{
                              uri: `data:image/png;base64,${v.VisitorImageLogo}`,
                            }}
                            style={{
                              width: orientation === 'PORTRAIT' ? 70 : 90,
                              height: orientation === 'PORTRAIT' ? 70 : 90,
                              marginEnd: 3,
                              borderRadius:
                                orientation === 'PORTRAIT' ? 35 : 45,
                              alignSelf: 'flex-end',
                            }}
                            resizeMode={'cover'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/**Card start from here Vistor registration */}
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={{ backgroundColor: '#D0F2EC' }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  flex: 1,
                  marginEnd: 2,
                }}
              >
                <TouchableOpacity
                  style={[{ flexDirection: 'row' }]}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={'filter'}
                    type={'FontAwesome'}
                    size={16}
                    color={'#000'}
                    style={{ paddingHorizontal: 4 }}
                  />

                  <Text
                    style={[
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    {chooseAll}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  Layout.row,
                  Layout.alignItemsCenter,

                  {
                    backgroundColor: Colors.white,
                    marginStart: 2,
                    flex: 1,
                  },
                ]}
              >
                <TextInput
                  style={{
                    fontSize: 12,
                    padding: 5,
                  }}
                  value={searchVehicle}
                  placeholder={'Vehicle Number'}
                  onChangeText={text => setSearchVehicle(text)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 5,
                marginTop: 3,
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  flex: 1,
                  marginEnd: 2,
                  height: 39,
                }}
              >
                <TouchableOpacity
                  style={[{ flexDirection: 'row' }]}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={'sort-amount-desc'}
                    type={'FontAwesome'}
                    size={16}
                    color={'#000'}
                    style={{ paddingHorizontal: 4 }}
                  />

                  <Text
                    style={[
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    {chooseAllHistory}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  flex: 1,
                  marginStart: 2,
                }}
              >
                <TouchableOpacity
                  style={[{ flexDirection: 'row' }]}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={'calendar'}
                    type={'FontAwesome'}
                    size={16}
                    color={'#000'}
                    style={{ paddingHorizontal: 4 }}
                  />

                  <Text
                    style={[
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    {filterVisitorTypeHistory}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 15 }}>
            {allVisitorsHistory.map((v, key) => (
              <View key={key} style={{ flex: 1, marginHorizontal: 16 }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                  activeOpacity={1.0}
                >
                  <View style={[{ marginTop: 5, marginBottom: 10 }]}>
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
                              fontWeight: '500',
                              color: '#184461',
                              marginTop: 5,
                              marginLeft: 2,
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                            }}
                          >
                            Date:{' '}
                            <Text>
                              {new Date(
                                Number(
                                  v.StartDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 3,
                            }}
                          >
                            Location: <Text>Plaza33</Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 3,
                            }}
                          >
                            Vehicle No: <Text>{v.VehicleNumber}</Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: orientation === 'PORTRAIT' ? 13 : 16,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 3,
                              marginBottom: 3,
                            }}
                          >
                            Vistor Name: <Text>{v.VisitorName}</Text>
                          </Text>
                        </View>

                        <View style={{ justifyContent: 'center', flex: 2 }}>
                          <Image
                            source={{
                              uri: `data:image/png;base64,${v.VisitorImageLogo}`,
                            }}
                            style={{
                              width: orientation === 'PORTRAIT' ? 70 : 90,
                              height: orientation === 'PORTRAIT' ? 70 : 90,
                              marginEnd: 3,
                              borderRadius:
                                orientation === 'PORTRAIT' ? 35 : 45,
                              alignSelf: 'flex-end',
                              marginEnd: 20,
                            }}
                            resizeMode={'cover'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </ScrollView>
  )
}

export default IndexVisitorContainer
