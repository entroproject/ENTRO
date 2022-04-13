import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import woman from '../../Assets/Images/woman.jpg'
import grocery from '../../Assets/Images/grocery.jpg'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import Icon from 'react-native-dynamic-vector-icons'


const IndexHomeContainer = ({navigation}) => {
  const { Fonts, Gutters, Layout } = useTheme()

  return (
    <ScrollView style={{flex: 1}}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Home</Text>
          <Image source={woman} style={styles.profileImage} />
        </View>
      </View>
      {/* header end */}
      {/* card start */}
      <View style={styles.cardWrap}>
        <View style={styles.cardContent}>
          <Text style={{color: "#184461", textAlign: "center", fontSize: 17}}>🤩 Welcome</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 10,
            color: "#184461",
            textAlign: "center"
          }}>Vilyn Tan Cho</Text>
          {/* divider start */}
          <View style={{width: "80%", height: 1, backgroundColor: "#000", alignSelf: "center", marginVertical: 20}} />
          {/* divider end */}
          <PrimaryButttonComponent
            label='Register Visitors here'
            iconRight={'user-plus'}
            iconType={'FontAwesome'}
            onPress={()=>{}}
          />
        </View>
        <View style={styles.cardBottom}></View>
      </View>
      {/* card end */}
      {/* menu start */}
      <View style={{
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate("UserProfile")}
        style={{
          width: "33%",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"

        }}>
         <View
           style={{
          backgroundColor: "#184461",
          padding: 5,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        >
           <Icon type='AntDesign' name='user' color='#fff' size={30} />
         </View>
          <Text style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 10
          }}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: "33%",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"
        }}>
         <View
           style={{
          backgroundColor: "#184461",
          padding: 5,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        >
           <Icon type='Feather' name='users' color='#fff' size={30} />
         </View>
          <Text style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 10
          }}>Visitors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: "33%",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"
        }}>
         <View
           style={{
          backgroundColor: "#184461",
          padding: 5,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        >
           <Icon type='MaterialCommunityIcons' name='alarm-light' color='#fff' size={30} />
         </View>
          <Text style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 10
          }}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: "33%",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"

        }}>
         <View
           style={{
          backgroundColor: "#184461",
          padding: 5,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        >
           <Icon type='FontAwesome5' name='credit-card' color='#fff' size={30} />
         </View>
          <Text style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 10
          }}>Access Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=> navigation.navigate("BusinessCard")}
        style={{
          width: "33%",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"
        }}>
         <View
           style={{
          backgroundColor: "#184461",
          padding: 5,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        >
           <Icon type='FontAwesome5' name='id-card' color='#fff' size={30} />
         </View>
          <Text style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 10
          }}>Business Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: "33%",
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"
        }}>
         <View
           style={{
          backgroundColor: "#184461",
          padding: 5,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        >
           <Icon type='Ionicons' name='chatbubbles-outline' color='#fff' size={30} />
         </View>
          <Text style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 10
          }}>FAQ</Text>
        </TouchableOpacity>
      </View>
      {/* menu end */}


      {/* announcement start */}
      <Text style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "#184461",
          marginHorizontal: 10
        }}>
          Announcement
        </Text>
      <View style={{
        marginHorizontal: 20,
        marginTop: 20
      }}>

        <View>
          <TouchableOpacity style={{
            flexDirection: "row",
            backgroundColor: "#184461",
            paddingLeft: 10,
            marginBottom: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
            overflow: "hidden"
          }}>
            <Image source={grocery} style={{
              width: 100,
              height: 80
            }} />
            <View  style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              width: "70%"
            }}>
              <Text style={{
                color: "#184461",
                fontWeight: "bold",
                marginBottom: 5
              }}>Join for grocery shopping</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
              }}>
                <Text style={{
                  color: "#184461"
                }}>19 Aug 2021</Text>
                <Text style={{
                  color: "#184461"
                }}>10 : 00 am</Text>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Icon type='Ionicons' name='location' color='blue' size={20} />
                <Text>3.5 Miles</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flexDirection: "row",
            backgroundColor: "#184461",
            paddingLeft: 10,
            marginBottom: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
            overflow: "hidden"
          }}>
            <Image source={grocery} style={{
              width: 100,
              height: 80
            }} />
            <View  style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              width: "70%"
            }}>
              <Text style={{
                color: "#184461",
                fontWeight: "bold",
                marginBottom: 5
              }}>Join for grocery shopping</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
              }}>
                <Text style={{
                  color: "#184461"
                }}>19 Aug 2021</Text>
                <Text style={{
                  color: "#184461"
                }}>10 : 00 am</Text>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Icon type='Ionicons' name='location' color='blue' size={20} />
                <Text>3.5 Miles</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flexDirection: "row",
            backgroundColor: "#184461",
            paddingLeft: 10,
            marginBottom: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
            overflow: "hidden"
          }}>
            <Image source={grocery} style={{
              width: 100,
              height: 80
            }} />
            <View  style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              width: "70%"
            }}>
              <Text style={{
                color: "#184461",
                fontWeight: "bold",
                marginBottom: 5
              }}>Join for grocery shopping</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
              }}>
                <Text style={{
                  color: "#184461"
                }}>19 Aug 2021</Text>
                <Text style={{
                  color: "#184461"
                }}>10 : 00 am</Text>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Icon type='Ionicons' name='location' color='blue' size={20} />
                <Text>3.5 Miles</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </View>
      {/* announcement end */}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#184461",
    height: 150
  },
  headerContent:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  headerTitle:{
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff"
  },
  profileImage:{
    width: 50,
    height: 50,
    borderRadius: 50/2
  },
  cardWrap:{
    width: "100%",
    overflow: "hidden",
    marginTop: -60,
    width: 300,
    alignSelf: "center"
  },
  cardContent:{
    padding: 15,
    backgroundColor: "#D0F2EC",
    width: 300,
    alignSelf: "center",
    justifyContent: "center"
  },
  cardBottom: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 180,
    borderRightWidth: 180,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#D0F2EC",
    alignSelf: "center",
    transform: [{rotate: "180deg"}]
  }
})

export default IndexHomeContainer