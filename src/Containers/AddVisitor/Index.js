import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import { useTheme } from '@/Hooks'
import DatePicker from 'react-native-date-picker'
import * as Constants from '@/Assets/Constants'
import DropShadow from 'react-native-drop-shadow'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage, hideMessage } from 'react-native-flash-message'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { inviteVisitors } from '@/api-utils'
import Icon from 'react-native-dynamic-vector-icons'
import { Dropdown } from 'react-native-element-dropdown'

const IndexAddVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [fullName, setFullName] = useState('')
  const [ICNumber, setICNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  //for start visit
  const [visitStartDate, setVisitStartDate] = useState('00-00-0000')
  const [startVisitDate_Picked, setStartVisitDate__Picked] = useState(new Date())
  const [openStartVisit, setOpenStartVisit] = useState(false)

  //for departure visit
  const [visitEndDate, setVisitEndDate] = useState('00-00-0000')
  const [endVisitDate_Picked, setEndVisitDate__Picked] = useState(new Date())
  const [openEndVisit, setOpenEndVisit] = useState(false)

  const [placeholder, setPlaceholder] = useState({
    fullName: 'Full Name',
    ICNumber: '0000000000',
    carPlateNum: 'ABC 12345',
    mobileNumber: '000 00000000',
  })

  const data = [
    { label: 'Contractor', value: '1' },
    { label: 'Visitor', value: '2' },
    { label: 'Delivery', value: '3' },
    { label: 'Meeting', value: '4' },
  ]

  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)

  const onchange = (selectedDate, type) => {
    if (type === 'startDate') {
      const currentDate = selectedDate || startVisitDate
      setStartVisitDate__Picked(currentDate)
      const formattedDate = `${moment(currentDate).format(
        'YYYY-MM-DD',
      )} ${moment(currentDate).format('HH:mm:ss A')}`
      setVisitStartDate(formattedDate)
    } else if (type === 'endDate') {
      const currentDate = selectedDate || setVisitEndDate
      setEndVisitDate__Picked(currentDate)
      const formattedDate = `${moment(currentDate).format(
        'YYYY-MM-DD',
      )} ${moment(currentDate).format('HH:mm:ss A')}`
      setVisitEndDate(formattedDate)
    }
  }

  const goPhotoGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image)
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
        Visitortype: value,
        VisitorName: fullName,
        DocumentNumber: ICNumber,
        MobileNumber: mobileNumber,
        VehicleNumber: carPlateNum,
        StartDateTime: visitStartDate,
        EndDateTime: visitEndDate,
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
        setVisitStartDate('')
        setVisitEndDate('')
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
      <View style={{ height: 51, backgroundColor: '#184461' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Icon
            name="arrow-left"
            type="Feather"
            size={30}
            color="#fff"
            onPress={() => {
              navigation.goBack()
            }}
            style={{}}
          />
          <Text
            style={{
              color: Colors.white,
              fontWeight: '600',
              marginLeft: 15,
            }}
          >
            Visitor Registration
          </Text>
          <Icon
            name="x"
            type="Feather"
            size={30}
            color="#fff"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={{ marginTop: 50, marginHorizontal: 42, marginBottom: 40 }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Name
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#45969A',
              fontSize: 20,
              color: fullName === 'Full Name' ? '#C4C3C9' : '#457C9A',
              fontWeight: '900',
              paddingBottom: 0,
            }}
            value={fullName}
            placeholder={placeholder.fullName}
            onChangeText={text => setFullName(text)}
            onFocus={() => {
              setPlaceholder({ ...placeholder, fullName: '' })
            }}
            onBlur={() => {
              setPlaceholder({
                ...placeholder,
                fullName: 'Full Name',
              })
            }}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Identification Number
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#45969A',
              fontSize: 20,
              color: ICNumber === '0000000000' ? '#C4C3C9' : '#457C9A',
              fontWeight: '900',
              paddingBottom: 0,
            }}
            value={ICNumber}
            placeholder={placeholder.ICNumber}
            keyboardType={'number-pad'}
            onChangeText={text => setICNumber(text)}
            onFocus={() => {
              setPlaceholder({ ...placeholder, ICNumber: '' })
            }}
            onBlur={() => {
              setPlaceholder({
                ...placeholder,
                ICNumber: '0000000000',
              })
            }}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Vehicle Number
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#45969A',
              fontSize: 20,
              color: carPlateNum === 'ABC 12345' ? '#C4C3C9' : '#457C9A',
              fontWeight: '900',
              paddingBottom: 0,
            }}
            value={carPlateNum}
            placeholder={placeholder.carPlateNum}
            onChangeText={text => setCarPlateNum(text)}
            onFocus={() => {
              setPlaceholder({ ...placeholder, carPlateNum: '' })
            }}
            onBlur={() => {
              setPlaceholder({
                ...placeholder,
                carPlateNum: 'ABC 12345',
              })
            }}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Phone Number
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: '#45969A',
              fontSize: 20,
              color: mobileNumber === '000 00000000' ? '#C4C3C9' : '#457C9A',
              fontWeight: '900',
              paddingBottom: 0,
            }}
            value={mobileNumber}
            placeholder={placeholder.mobileNumber}
            keyboardType={'number-pad'}
            onChangeText={text => setMobileNumber(text)}
            onFocus={() => {
              setPlaceholder({ ...placeholder, mobileNumber: '' })
            }}
            onBlur={() => {
              setPlaceholder({
                ...placeholder,
                mobileNumber: '000 00000000',
              })
            }}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Visitor Type
          </Text>
          <View
            style={{ padding: 5, borderBottomWidth: 1, borderColor: '#45969A' }}
          >
            <Dropdown
              placeholderStyle={{
                fontSize: 20,
                fontWeight: '900',
                color: '#989898',
              }}
              selectedTextStyle={{
                fontSize: 20,
                fontWeight: '900',
                color: '#457C9A',
              }}
              inputSearchStyle={{ height: 40, fontSize: 16 }}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Visitor Type' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value)
                setIsFocus(false)
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Select visit date and time
          </Text>
          <View
            style={{ padding: 5, borderBottomWidth: 1, borderColor: '#45969A' }}
          >
            <Text
              onPress={() => {
                setOpenStartVisit(true)
              }}
              style={[
                {
                  flexWrap: 'wrap',
                  flexShrink: 1,
                  fontSize: 20,
                  padding: 5,
                  color:
                    visitStartDate === '00-00-0000' ? '#A6A2A2' : '#457C9A',
                  fontWeight: '900',
                },
              ]}
            >
              {visitStartDate}
            </Text>
          </View>
        </View>

        <DatePicker
          modal
          open={openStartVisit}
          date={startVisitDate_Picked}
          mode={'datetime'}
          onConfirm={date => {
            setOpenStartVisit(false)
            setStartVisitDate__Picked(date)
            onchange(date, 'startDate')
          }}
          onCancel={() => {
            setOpenStartVisit(false)
          }}
        />

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Select departure date and time
          </Text>
          <View
            style={{ padding: 5, borderBottomWidth: 1, borderColor: '#45969A' }}
          >
            <Text
              onPress={() => {
                setOpenEndVisit(true)
              }}
              style={[
                {
                  flexWrap: 'wrap',
                  flexShrink: 1,
                  fontSize: 20,
                  padding: 5,
                  color: visitEndDate === '00-00-0000' ? '#A6A2A2' : '#457C9A',
                  fontWeight: '900',
                },
              ]}
            >
              {visitEndDate}
            </Text>
          </View>
        </View>

        <DatePicker
          modal
          open={openEndVisit}
          date={endVisitDate_Picked}
          mode={'datetime'}
          onConfirm={date => {
            setOpenEndVisit(false)
            setEndVisitDate__Picked(date)
            onchange(date, 'endDate')
          }}
          onCancel={() => {
            setOpenEndVisit(false)
          }}
        />

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#184461',
              fontWeight: '500',
              marginStart: 4,
              marginBottom: 10,
            }}
          >
            Attach Image
          </Text>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
            <DropShadow
            style={{
              shadowColor: '#282828',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <TouchableOpacity
              onPress={goPhotoGallery}
              style={{
                borderWidth: 1,
                borderColor: '#184461',
                padding: 10,
                borderRadius: 15,
                width: 125,
                backgroundColor: '#F0F0F0',
              }}
            >
              <Text style={{ color: '#000000', textAlign: 'center' }}>
                Visitor Image
              </Text>
            </TouchableOpacity>
          </DropShadow>

           
            </View>

            {photo === null ? (
              <View style={{}}>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 2,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <Icon
                    type="Feather"
                    name="camera"
                    size={45}
                    color="green"
                  />
                </DropShadow>
              </View>
            ) : (
              <View>
                <Image
                  source={photo ? { uri: photo.path } : Images.profilepic}
                  style={{
                    width: 80,
                    height: 80,
                    zIndex: 1,
                    borderRadius: 40,
                  }}
                />
              </View>
            )}
          </View>
        </View>

        <View
          style={[Layout.center, { marginHorizontal: 20, marginVertical: 25 }]}
        >
          <PrimaryButttonComponent
            loading={loading}
            label="Save"
            style={{
              height: 40,
              marginTop: 20,
              marginBottom: 10,
              width: 280,
            }}
            onPress={() => SubmitForm()}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default IndexAddVisitorContainer
