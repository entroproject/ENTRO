import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import { useTheme } from '@/Hooks'
import DatePicker from 'react-native-date-picker'
import * as Constants from '@/Assets/Constants'
import DropShadow from 'react-native-drop-shadow'
import { useOrientation } from '../useOrientation'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage, hideMessage } from 'react-native-flash-message'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { inviteVisitors } from '@/api-utils'

const IndexAddVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [fullName, setFullName] = useState('')
  const [ICNumber, setICNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [enddate, setenddate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)
  const [vistor, setVisitor] = useState('Select Visitor Type')
  const [chooseVisitStartDate, setChooseVisitStartDate] =
    useState('Visit Start Date')
  const [choosenVisitEndDate, setChoosenVisitEndDate] =
    useState('Visit End Date')
  const [isVisitorDialogVisible, setIsVisitorDialogVisible] = useState(false)
  const user = useSelector(user => user.user.profile)

  const [placeholder, setPlaceholder] = useState({
    fullName: "Enter Full Name",
  })

  const onchange = (selectedDate, type) => {
    if (type === 'startDate') {
      const currentDate = selectedDate || date
      setDate(currentDate)
      const formattedDate = `${moment(currentDate).format(
        'YYYY-MM-DD',
      )} ${moment(currentDate).format('HH:mm:ss A')}`
      setChooseVisitStartDate(formattedDate)
    } else if (type === 'endDate') {
      const currenEndDate = selectedDate || enddate
      setenddate(currenEndDate)
      const formattedDate1 = `${moment(currenEndDate).format(
        'YYYY-MM-DD',
      )} ${moment(currenEndDate).format('HH:mm:ss A')}`
      setChoosenVisitEndDate(formattedDate1)
    }

    // let tempDate = new Date(currentDate);
    // let fDate =
    //   tempDate.getFullYear() +
    //   '-' +
    //   (tempDate.getMonth() + 1) +
    //   '-' +
    //   tempDate.getDate()

    //   let fTime =
    //   tempDate.getHours() + ':' + tempDate.getMinutes() + ':'+ tempDate.getSeconds();

    //   let am_pm = 'AM';
    //  {tempDate.getHours() >= 12 ? am_pm = 'PM' : 'AM'}
  }

  const optionVisitor = Constants.visitorType.map((item, index) => {
    return (
      <TouchableOpacity
        style={[Layout.alignItemsStart]}
        key={index}
        onPress={() => selectVisitingPerson(item)}
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

  const selectVisitingPerson = item => {
    setVisitor(item)
    setIsVisitorDialogVisible(false)
  }

  const SubmitForm = async () => {
    setLoading(true)
    if (!fullName || !ICNumber || !mobileNumber || !carPlateNum) {
      setLoading(false)
      showMessage({
        message: 'All fields are required',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    if (ICNumber.length < 12 || ICNumber.length > 15) {
      showMessage({
        message: 'Please Indicate a valid IC-Number',
        backgroundColor: 'red',
        duration: 3000,
      })
      setLoading(false)
      return false
    }

    if (
      fullName !== '' ||
      ICNumber !== '' ||
      mobileNumber !== '' ||
      carPlateNum !== ''
    ) {
      const req_invite = await inviteVisitors('', {
        accessId: 'ea204301348a34b8695319778667d311',
        BuildingName: 'Plaza33',
        Visitortype: vistor,
        VisitorName: fullName,
        DocumentNumber: ICNumber,
        MobileNumber: mobileNumber,
        VehicleNumber: carPlateNum,
        StartDateTime: chooseVisitStartDate,
        EndDateTime: choosenVisitEndDate,
      })
      const resp = await req_invite.json()

      if (resp.StatusCode == '200') {
        setLoading(false)
        showMessage({
          message: 'Details successfully saved!',
          backgroundColor: 'green',
          duration: 3000,
        })
        navigation.navigate('VistorsRecord')
        setFullName("")
      } else {
        setLoading(false)
        showMessage({
          message: resp.message,
          backgroundColor: 'red',
          duration: 3000,
        })
      }
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      <View style={{ height: 90, backgroundColor: '#184461' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontWeight: '700',
              marginLeft: 18,
            }}
          >
            Add Contact Visitor
          </Text>

          <Image
            source={{ uri: `data:image/png;base64,${user.ProfileLogo}` }}
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
      </View>
      <View style={{ alignItems: 'center' }}>
        {/* for Vsitor type  Modal here*/}
        <View style={Layout.center}>
          <Modal
            visible={isVisitorDialogVisible}
            transparent={true}
            onDismiss={() => setIsVisitorDialogVisible(!isVisitorDialogVisible)}
            onRequestClose={() => setIsVisitorDialogVisible(false)}
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
                        Please Select Visitor
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
        {/* for   pVsitor type modal ends  here*/}
      </View>

      <View>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 3,
              height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            marginTop: -5,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                width: '90%',
                marginTop: 30,
                borderRadius: 20,
                backgroundColor: '#F1F1F1',
                elevation: 10,
                shadowColor: '0px 13px 15px rgba(0, 0, 0, 0.25)',
                shadowRadius: 10,
                shadowOpacity: 0.6,
                marginVertical: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}
            >
              <View style={{ marginHorizontal: 20, marginVertical: 12 }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 5,
                  }}
                >
                  Select Visitor
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  {/**Visitor type starts here */}

                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        borderWidth: 1,
                        paddingLeft: 15,
                        color: '#000',
                        marginVertical: 2,
                        borderRadius: 16,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        setIsVisitorDialogVisible(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          color:
                            vistor === 'Select Visitor Type'
                              ? '#A6A2A2'
                              : '#000',
                          paddingTop: 12,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {vistor}
                    </Text>
                  </View>

                  {/**visitor type ends here */}
                </DropShadow>

                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 7,
                  }}
                >
                  Enter Full Name
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    value={fullName}
                    placeholder="Enter Full Name"
                    keyboardType="default"
                    onChangeText={text => setFullName(text)}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color:  fullName === 'Enter Full Name' ? '#666666' : '#000',
                      marginVertical: 2,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                      fontWeight:'700'
                    }}
                  />
                </DropShadow>

                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 7,
                  }}
                >
                  Enter IC Number
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Enter IC Number"
                    keyboardType="number-pad"
                    onChangeText={text => setICNumber(text)}
                    value={ICNumber}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      marginVertical: 2,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                      fontWeight: '700',
                      color:
                      ICNumber === 'Enter Full Name' ? '#666666' : '#000',
                    }}
                  />
                </DropShadow>

                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 7,
                  }}
                >
                  Enter Mobile Number
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Enter Mobile Number"
                    keyboardType="number-pad"
                    onChangeText={text => setMobileNumber(text)}
                    value={mobileNumber}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      marginVertical: 2,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                      fontWeight: '700',
                      color:
                        mobileNumber === 'Enter Mobile Number'
                          ? '#666666'
                          : '#000',
                    }}
                  />
                </DropShadow>

                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 7,
                  }}
                >
                  Enter Vehicle Number
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TextInput
                    placeholder="Enter Vehicle Number"
                    keyboardType="default"
                    onChangeText={text => setCarPlateNum(text)}
                    value={carPlateNum}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      marginVertical: 2,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                      fontWeight: '700',
                      color:
                        carPlateNum === 'Enter Vehicle Number'
                          ? '#666666'
                          : '#000',
                    }}
                  />
                </DropShadow>

                {/**Visit Date starts here */}
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 7,
                  }}
                >
                  Enter Start Date
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        borderRadius: 16,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        setOpen(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                          color:
                            chooseVisitStartDate === 'Visit Start Date'
                              ? '#A6A2A2'
                              : '#000',
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {chooseVisitStartDate}
                    </Text>
                  </View>
                </DropShadow>
                {/**Visit visitor type ends here */}

                {/**Visit end Date starts here */}
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#184461',
                    marginStart: 5,
                    marginTop: 7,
                  }}
                >
                  Enter End Date
                </Text>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        borderRadius: 16,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        setOpenEndDate(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                          color:
                            choosenVisitEndDate === 'Visit End Date'
                              ? '#A6A2A2'
                              : '#000',
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {choosenVisitEndDate}
                    </Text>
                  </View>
                </DropShadow>
                {/**Visit visitor end date ends here */}

                <DatePicker
                  modal
                  open={openEndDate}
                  date={enddate}
                  androidVariant={'iosClone'}
                  mode={'datetime'}
                  onConfirm={enddate => {
                    setOpenEndDate(false)
                    setenddate(enddate)
                    onchange(enddate, 'endDate')
                  }}
                  onCancel={() => {
                    setOpenEndDate(false)
                  }}
                />

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  androidVariant={'iosClone'}
                  mode={'datetime'}
                  onConfirm={date => {
                    setOpen(false)
                    setDate(date)
                    onchange(date, 'startDate')
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />

                <PrimaryButttonComponent
                  loading={loading}
                  label="Submit"
                  style={{
                    height: 40,
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                  onPress={() => SubmitForm()}
                />
              </View>
            </View>
          </View>
        </DropShadow>
      </View>
    </ScrollView>
  )
}

export default IndexAddVisitorContainer
