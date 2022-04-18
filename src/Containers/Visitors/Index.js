import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'

import { useTheme } from '@/Hooks'
import Icon from 'react-native-dynamic-vector-icons'
import { useOrientation } from '../useOrientation'
import { ButtonGroup } from 'react-native-elements'

const IndexVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)
  const [chooseAll, setChooseAll] = useState('Select All')
  const [chooseItem, setChooseItem] = useState('Select')
  const [searchVehicle, setSearchVehicle] = useState('')
  const orientation = useOrientation()

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayContact(true)
    } else {
      setDisplayContact(false)
    }
  })

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
            onPress={() => navigation.navigate('AddVisitor')}
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

      {displaycontact ? (
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
                  height: 39
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
                    {chooseItem}
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
                    {chooseItem}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>



          {/**Card start from here Vistor registration */}
          <View style={{ marginVertical: 15 }}>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
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
                          Start Date: <Text>2021-09-14 12:30:00pm</Text>
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
                          End Date: <Text>2021-09-14 12:30:00pm</Text>
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
                          Vehicle No: <Text>VBD1314</Text>
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
                          Vistor Name: <Text>Hakimi</Text>
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
                          Status: <Text>Registered</Text>
                        </Text>
                      </View>

                      <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Image
                          source={Images.userImageDisplay}
                          style={{
                            width: orientation === 'PORTRAIT' ? 70 : 90,
                            height: orientation === 'PORTRAIT' ? 70 : 90,
                            marginEnd: 3,
                            borderRadius: orientation === 'PORTRAIT' ? 35 : 45,
                            alignSelf: 'flex-end',
                          }}
                          resizeMode={'cover'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
              height: 39
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
                {chooseItem}
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
                {chooseItem}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


          <View style={{ marginVertical: 15 }}>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
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
                          Date: <Text>2021-09-14 12:30:00pm</Text>
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
                          Vehicle No: <Text>VBD1314</Text>
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
                          Vistor Name: <Text>Hakimi</Text>
                        </Text>
                      </View>

                      <View style={{ justifyContent: 'center', flex: 2 }}>
                        <Image
                          source={Images.userImageDisplay}
                          style={{
                            width: orientation === 'PORTRAIT' ? 70 : 90,
                            height: orientation === 'PORTRAIT' ? 70 : 90,
                            marginEnd: 3,
                            borderRadius: orientation === 'PORTRAIT' ? 35 : 45,
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

            <View style={{ flex: 1, marginHorizontal: 16 }}>
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
                          Date: <Text>2021-09-14 12:30:00pm</Text>
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
                          Vehicle No: <Text>VBD1314</Text>
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
                          Vistor Name: <Text>Hakimi</Text>
                        </Text>
                      </View>

                      <View style={{ justifyContent: 'center', flex: 2 }}>
                        <Image
                          source={Images.userImageDisplay}
                          style={{
                            width: orientation === 'PORTRAIT' ? 70 : 90,
                            height: orientation === 'PORTRAIT' ? 70 : 90,
                            marginEnd: 3,
                            borderRadius: orientation === 'PORTRAIT' ? 35 : 45,
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
          </View>
        </ScrollView>
      )}
    </ScrollView>
  )
}

export default IndexVisitorContainer
