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
  const [photo, setPhoto] = useState(null)
  const [fullName, setFullName] = useState('')
  const [ICNumber, setICNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [enddate, setenddate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)
  const [vistor, setVisitor] = useState('Select Visitor Type')
  const [chooseVisitStartDate, setChooseVisitStartDate] = useState('Visit Arrival Time')
  const [choosenVisitEndDate, setChoosenVisitEndDate] = useState('Visit departure Time')
  const [isVisitorDialogVisible, setIsVisitorDialogVisible] = useState(false)
  const user = useSelector(user => user.user.profile)

  const onchange = (selectedDate, type) => {
    if (type === 'startDate') {
      const currentDate = selectedDate || date
      setDate(currentDate)
      const formattedDate = `${moment(date).format('YYYY-MM-DD')} ${moment(
        currentDate,
      ).format('HH:mm:ss A')}`
      setChooseVisitStartDate(formattedDate)
    } else if (type === 'endDate') {
      const currenEndDate = selectedDate || enddate
      setenddate(currenEndDate)
      const formattedDate1 = `${moment(enddate).format('YYYY-MM-DD')} ${moment(
        currenEndDate,
      ).format('HH:mm:ss A')}`
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

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image)
      console.log(image)
    })
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

    if (ICNumber.length < 12 || ICNumber.length > 14) {
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
      } else {
        setLoading(false)
        showMessage({
          message: resp.message,
          backgroundColor: 'green',
          duration: 3000,
        })
      }
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
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

                marginTop: 110,
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
              <View style={[Layout.center, { marginBottom: 30 }]}>
                <View
                  style={[
                    Layout.center,
                    {
                      width: 130,
                      height: 130,
                      position: 'absolute',
                      borderRadius: 65,
                      borderColor: '#184461',
                      borderWidth: MetricsSizes.zero + 1,
                      backgroundColor: '#C4c4c4',
                      shadowColor: ' rgba(0, 0, 0, 0.25)',
                    },
                  ]}
                >
                  <Image
                    source={photo ? { uri: photo.path } : Images.profilepic}
                    style={{
                      width: 150,
                      height: 150,
                      zIndex: 1,
                      borderRadius: 75.5,
                    }}
                  />
                </View>
              </View>
              <View style={[Layout.center, { marginLeft: 90 }]}>
                <TouchableOpacity
                  onPress={() => uploadPhoto()}
                  activeOpacity={0.9}
                  style={[
                    Layout.center,
                    {
                      backgroundColor: '#184461',
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    },
                  ]}
                >
                  <Icon name="camera" type="Feather" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <View style={{ marginHorizontal: 20, marginVertical: 12 }}>
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
                        marginVertical: 8,
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
                          fontWeight: '700',
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                        },
                      ]}
                    >
                      {vistor}
                    </Text>
                  </View>

                  {/**visitor type ends here */}
                  <TextInput
                    placeholder="Enter Full Name"
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

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
                    placeholderTextColor={'#666666'}
                    keyboardType="number-pad"
                    onChangeText={text => setICNumber(text)}
                    value={ICNumber}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

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
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setMobileNumber(text)}
                    value={mobileNumber}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

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
                    placeholderTextColor={'#666666'}
                    keyboardType="default"
                    onChangeText={text => setCarPlateNum(text)}
                    value={carPlateNum}
                    style={{
                      borderWidth: 1,
                      paddingLeft: 15,
                      color: '#000',
                      marginVertical: 8,
                      borderRadius: 16,
                      borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      backgroundColor: Colors.white,
                      elevation: 5,
                    }}
                  />
                </DropShadow>

                {/**Visit Date starts here */}
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
                        borderWidth: 1,
                        paddingLeft: 15,
                        color: '#000',
                        marginVertical: 8,
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
                        setOpen(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          fontWeight: '700',
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                        },
                      ]}
                    >
                      {chooseVisitStartDate}
                    </Text>
                  </View>
                </DropShadow>
                {/**Visit visitor type ends here */}

                {/**Visit end Date starts here */}
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
                        marginVertical: MetricsSizes.small - 2,
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
                          fontWeight: '700',
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
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
                  onConfirm={(enddate) => {
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
                  onConfirm={(date) => {
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
