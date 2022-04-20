import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Text, Image, ScrollView } from 'react-native'
import { useTheme } from '@/Hooks'
import DropShadow from 'react-native-drop-shadow'
import { getQRAccess } from '@/api-utils'
import { useSelector } from 'react-redux'

const IndexVirtualAccessContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Colors, Images, MetricsSizes } = useTheme()

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const user = useSelector(user => user.user.profile);


  const getImage = async () => {
    const req_img = await getQRAccess("");
    const res_img = await req_img.json();
    setImage(res_img);
    setTimeout(getImage, 2 * (60 * 1000));
  }

  useEffect(()=> {
    getImage();
  });

  return (
    <ScrollView>
      {
      !image ?
      <ActivityIndicator
      size={50}
      color="blue"
      style={{
        alignSelf: "center"
      }}
      />
      :<View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            marginTop: 40,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#184461', fontSize: 20, fontWeight: 'bold' }}>
            SURIA KLCC
          </Text>
        </View>

        <View
          style={{
            marginTop: 40,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{uri: `data:image/png;base64,${image.Image}`}}
            style={{ width: 200, height: 120, resizeMode: 'contain' }}
          />
        </View>

        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
            width: 350,
          }}
        >
          <View style={[Layout.center, { marginBottom: 30 }]}>
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
                <Image source={Images.companyQrcode} width={200} height={200} />
              </View>
            </DropShadow>
          </View>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              fontWeight: '700',
              color: '#184461',
              marginBottom: 20,
            }}
          >
            QR codes refreshes every 2 minutes
          </Text>
        </View>
      </View>
      }
    </ScrollView>
  )
}

export default IndexVirtualAccessContainer
