import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import { useTheme } from '@/Hooks'
import DropShadow from 'react-native-drop-shadow'
import { getQRAccess } from '@/api-utils'
import { useSelector } from 'react-redux'

const IndexVirtualAccessContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Colors, Images, MetricsSizes } = useTheme()


  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [minutes, setMinutes] = useState('01');
  const [seconds, setSeconds] = useState('59');
  const user = useSelector(user => user.user.profile)
  const height = Dimensions.get('screen').height

  const getImage = async () => {
    setLoading(true);
    const req_img = await getQRAccess('')
    const res_img = await req_img.json()
    setImage(res_img);
    startCounter();
    setLoading(false);
  }

  const paddNum = num => String(num).length > 1 ? num : `0${num}`

  const startCounter = () => {

    const countDownDate = new Date().getTime() +  (2 * (60 * 1000));
    
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setMinutes(paddNum(minutes));
        setSeconds(paddNum(seconds));        
        if (distance < 0) {
            clearInterval(x);
            getImage();
            setMinutes("01");
            setSeconds("59");
        }
    }, 1000);
    
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#F1F1F1' }}>
      {loading ? (
        <View
          style={{
            minHeight: height * 0.6,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={50} color="#184461" />
          <Text style={{
            textAlign: "center",
            color: "#000",
            fontWeight: "bold",
            fontSize: 20
          }}>Getting QR Access</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: 350,
              marginTop: 160,
              alignSelf: 'center',
            }}
          >
            <View style={[Layout.center, {}]}>
              <DropShadow
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 5,
                }}
              >
                <View
                  style={[
                    Layout.center,
                    {
                      width: 300,
                      height: 300,
                      borderRadius: 150,
                      backgroundColor: '#ffffff',
                      shadowColor: ' rgba(0, 0, 0, 0.25)',
                      elevation: 10,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: `data:image/png;base64,${image.Image}` }}
                    style={{ width: 200, height: 120, resizeMode: 'contain' }}
                    width={200}
                    height={120}
                  />
                </View>
              </DropShadow>
            </View>

            <View style={{
              marginTop: 35
            }}>
              <Text style={{
                fontSize: 50,
                fontWeight: "bold",
                color: "#184461",
                textAlign: "center"
              }}>
                {minutes}:{seconds}
              </Text>
            </View>

            <Text
              style={{
                marginTop: 30,
                fontSize: 14,
                fontWeight: '700',
                color: '#184461',
                marginBottom: 20,
                alignSelf: 'center',
              }}
            >
              QR codes refreshes every 2 minutes
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default IndexVirtualAccessContainer
