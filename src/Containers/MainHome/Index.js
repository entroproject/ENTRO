import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'
import { useOrientation } from '../useOrientation'

const IndexHomeContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images } = useTheme()
  const orientation = useOrientation()

  const AnnouncementCard = [
    {
      id: 0,
      cardTitle: 'Join for grocery shopping',
      cardIcon: Images.groceryIcon,
      cardDes:
        'Description: This text will be for a short description on what the card is all about.',
      eventDate: '19 August 2021',
      eventTime: '21:00:00 pm',
      distance: '3.5 miles',
    },

    {
      id: 1,
      cardTitle: 'Lets Meetup!',
      cardIcon: Images.meetingGroup,
      cardDes:
        'Description: This text will be for a short description on what the card is all about.',
      eventDate: '18 August 2021',
      eventTime: '21:00:00 pm',
      distance: '3.5 miles',
    },
  ]

  const handleAnnouncement=(item, index)=>{
    navigation.navigate('Announcement')

  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Home</Text>
          <Image source={Images.userImageDisplay} style={styles.profileImage} />
        </View>
      </View>
      {/* header end */}
      {/* card start */}

      <DropShadow
        style={{
          shadowColor: '#D3D3D3',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 1,
          shadowRadius: 3,
        }}
      >
        <View style={styles.cardWrap}>
          <View style={styles.cardContent}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#184461', fontSize: 20 }}>
                <Text style={{ fontSize: 30 }}>🤩</Text> Welcome
              </Text>
            </View>

            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                marginVertical: 8,
                color: '#184461',
                textAlign: 'center',
              }}
            >
              Vilyn Tan Cho
            </Text>
            {/* divider start */}
            <View
              style={{
                width: '80%',
                height: 1,
                backgroundColor: '#000',
                alignSelf: 'center',
                marginVertical: 8,
              }}
            />
            {/* divider end */}

            <Text style={{ color: '#184461', fontSize: 12, marginBottom: 10 }}>
              {' '}
              Click the button below to register your visitor
            </Text>
            <PrimaryButttonComponent
              label="Register Visitors"
              iconRight={'user-plus'}
              iconType={'FontAwesome'}
              onPress={() => {}}
            />
          </View>
          <View style={styles.cardBottom}></View>
        </View>
      </DropShadow>

      {/* card end */}
      {/* menu start */}
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile')}
          style={{
            width: '33%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#4A4E69',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                backgroundColor: '#184461',
                padding: 5,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <Image source={Images.userProfileImg} width={28} height={28} />
            </View>
          </DropShadow>

          <Text
            style={{
              color: '#000',
              marginTop: 10,
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('VistorsRecord')}
          style={{
            width: '33%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#4A4E69',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                backgroundColor: '#184461',
                padding: 5,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <Image source={Images.visitorImg} width={28} height={28} />
            </View>
          </DropShadow>

          <Text
            style={{
              color: '#000',
              marginTop: 10,
            }}
          >
            Visitors
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CommunityContact')}
          style={{
            width: '33%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#4A4E69',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                backgroundColor: '#184461',
                padding: 5,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <Image source={Images.alarmWhiteImg} width={28} height={28} />
            </View>
          </DropShadow>

          <Text
            style={{
              color: '#000',
              marginTop: 10,
            }}
          >
            Emergency
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('VirtualAccessCard')}
          style={{
            width: '33%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#4A4E69',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                backgroundColor: '#184461',
                padding: 5,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <Image source={Images.accessKeyImg} width={28} height={28} />
            </View>
          </DropShadow>

          <View style={{ width: 60, alignItems: 'center' }}>
            <Text
              style={{
                color: '#000',
                marginTop: 10,
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              Access Card
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('BusinessCard')}
          style={{
            width: '33%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#4A4E69',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                backgroundColor: '#184461',
                padding: 5,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <Image source={Images.businessCardImg} width={28} height={28} />
            </View>
          </DropShadow>

          <View style={{ width: 60, alignItems: 'center' }}>
            <Text
              style={{
                color: '#000',
                marginTop: 10,
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              Business Card
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '33%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#4A4E69',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                backgroundColor: '#184461',
                padding: 5,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <Image source={Images.faqWhiteImg} width={28} height={28} />
            </View>
          </DropShadow>

          <Text
            style={{
              color: '#000',
              marginTop: 10,
            }}
          >
            FAQ
          </Text>
        </TouchableOpacity>
      </View>
      {/* menu end */}

      {/* announcement start */}
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: orientation === 'PORTRAIT' ? 20 : 24,
          color: '#184461',
          marginHorizontal: 10,
        }}
      >
        Announcement
      </Text>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        {AnnouncementCard.map((item, index) => (
          <TouchableOpacity 
          key={index} 
          activeOpacity={1.0}
          onPress={() => navigation.navigate('Announcementdetails',{
            itemTitle : item.cardTitle,
            itemIcon: item.cardIcon,
            itemDesc: item.cardDes,
            itemDate: item.eventDate,
            itemTime: item.eventTime,
            itemDistance: item.distance

          })}>
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
                marginBottom: 10,
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
                <Image
                  source={item.cardIcon}
                  style={{
                    width: '35%',
                    height: orientation === 'PORTRAIT' ? 120 : 140,
                    resizeMode: 'cover',
                  }}
                />

                <View
                  style={{
                    paddingVertical: 5,
                    marginStart: 5,
                    backgroundColor: '#fff',
                    marginEnd: 5,
                  }}
                >
                  <Text
                    style={[
                      {
                        color: '#184461',
                        marginBottom: 5,
                        flexWrap: 'wrap',
                        fontWeight: 'bold',
                        fontSize: orientation === 'PORTRAIT' ? 14 : 18,
                      },
                    ]}
                  >
                    {item.cardTitle}
                  </Text>

                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                      {
                        color: '#184461',
                        marginBottom: 3,
                        flexWrap: 'wrap',
                        fontSize: orientation === 'PORTRAIT' ? 14 : 18,
                        width: orientation === 'PORTRAIT' ? 150 : 200,
                      },
                    ]}
                  >
                    {item.cardDes}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: '#184461',
                        fontSize: orientation === 'PORTRAIT' ? 12 : 14,
                      }}
                    >
                      {item.eventDate}
                    </Text>
                    <Text
                      style={{
                        color: '#184461',
                        fontSize: orientation === 'PORTRAIT' ? 12 : 14,
                      }}
                    >
                      {item.eventTime}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Icon
                      type="Ionicons"
                      name="location"
                      color="#184461"
                      size={20}
                    />
                    <Text>{item.distance}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* announcement end */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#184461',
    height: 120,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFEFE',
  },
  cardWrap: {
    width: '100%',
    overflow: 'hidden',
    marginTop: -30,
    width: 280,
    alignSelf: 'center',
    elevation: 8,
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#D0F2EC',
    width: 280,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  cardBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 120,
    borderRightWidth: 120,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D0F2EC',
    alignSelf: 'center',
    transform: [{ rotate: '180deg' }],
  },
})

export default IndexHomeContainer
