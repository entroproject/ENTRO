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
import { showMessage, hideMessage } from 'react-native-flash-message'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { inviteVisitors } from '@/api-utils'
import FloatingLabel from 'react-native-floating-labels'
import { set } from 'react-native-reanimated'

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
    fullName: 'Enter Full Name',
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
        setFullName('')
        setICNumber('')
        setCarPlateNum('')
        setChooseVisitStartDate('')
        setChoosenVisitEndDate('')
        setMobileNumber('')
        setTimeout(() => {
          navigation.goBack()
        }, 200)
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
                {/**first Name label starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={[
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 4,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 5,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        height: 55,
                        padding: 5,
                      },
                    ]}
                  >
                    <FloatingLabel
                      labelStyle={{
                        color: '#A6A2A2',
                        fontSize: 14,
                        fontWeight: '500',
                        padding: fullName !== '' ? 5 : 3,
                      }}
                      inputStyle={{
                        borderWidth: 0,
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#000',
                      }}
                      Value={fullName}
                      onChangeText={text => setFullName(text)}
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: fullName !== '' ? 3 : 7,
                      }}
                    >
                      Enter visitor name
                    </FloatingLabel>
                  </View>
                </DropShadow>
                {/**first Name label ends here */}

                {/**IC Number label starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={[
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 4,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 5,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        height: 55,
                        padding: 5,
                      },
                    ]}
                  >
                    <FloatingLabel
                      labelStyle={{
                        color: '#A6A2A2',
                        fontSize: 14,
                        fontWeight: '500',
                        padding: ICNumber !== '' ? 5 : 3,
                      }}
                      inputStyle={{
                        borderWidth: 0,
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#000',
                      }}
                      Value={ICNumber}
                      onChangeText={text => setICNumber(text)}
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: ICNumber !== '' ? 3 : 7,
                      }}
                    >
                      Enter visitor IC
                    </FloatingLabel>
                  </View>
                </DropShadow>
                {/**IC Number label ends here */}

                {/**MObile number label starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={[
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 4,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 5,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        height: 55,
                        padding: 5,
                      },
                    ]}
                  >
                    <FloatingLabel
                      labelStyle={{
                        color: '#A6A2A2',
                        fontSize: 14,
                        fontWeight: '500',
                        padding: mobileNumber !== '' ? 5 : 3,
                      }}
                      inputStyle={{
                        borderWidth: 0,
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#000',
                      }}
                      Value={mobileNumber}
                      onChangeText={text => setMobileNumber(text)}
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: mobileNumber !== '' ? 3 : 7,
                      }}
                      keyboardType="number-pad"
                    >
                      Enter visitor phone No
                    </FloatingLabel>
                  </View>
                </DropShadow>
                {/**IC Number label ends here */}

                {/**vehicle label starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={[
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 4,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 5,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        height: 55,
                        padding: 5,
                      },
                    ]}
                  >
                    <FloatingLabel
                      labelStyle={{
                        color: '#A6A2A2',
                        fontSize: 14,
                        fontWeight: '500',
                        padding: carPlateNum !== '' ? 5 : 3,
                      }}
                      inputStyle={{
                        borderWidth: 0,
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#000',
                      }}
                      Value={carPlateNum}
                      onChangeText={text => setCarPlateNum(text)}
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        padding: carPlateNum !== '' ? 3 : 7,
                      }}
                    >
                      Enter visitor vehicle No
                    </FloatingLabel>
                  </View>
                </DropShadow>
                {/**vehicle label ends here */}

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
