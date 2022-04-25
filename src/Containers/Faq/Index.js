import React, { useState } from 'react'

import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useOrientation } from '../useOrientation'

function IndexUsersFaqContainer() {
  const { Gutters, Colors, Images, Fonts, Layout } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(false)
  const user = useSelector(user => user.user.profile)

  const usersGuideMenu = [
    {
      id: 1,
      name: 'Entro App first user guide',
      guide_Image: Images.userProfileImg,
      faq: [
        {
          id: 1,
          desc: '- How to download and install entro app?',
          subCatergory: [
            {
              id: 1,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },
        {
          id: 2,
          desc: '- How to register entro app?',
          subCatergory: [
            {
              id: 2,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },

        {
          id: 3,
          desc: '- How do I reset my Password?',
          subCatergory: [
            {
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },

        {
          id: 4,
          desc: '- why i need set up my profile during registration?',
          subCatergory: [
            {
              id: 4,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },
      ],
    },

    {
      id: 2,
      name: 'Access Card & Business Card',
      guide_Image: Images.businessCardImg,
      faq: [
        {
          id: 5,
          desc: '- How to use the Access Card?',
          subCatergory: [
            {
              id: 5,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },

        {
          id: 6,
          desc: '- How do I use the business card?',
          subCatergory: [
            {
              id: 6,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },
      ],
    },

    {
      name: 'Visitors',
      guide_Image: Images.visitorImg,
      faq: [
        {
          id: 7,
          desc: '- How to invite visitors?',
          subCatergory: [
            {
              id: 7,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },

        {
          id: 8,
          desc: '- How to share visitors link after registration?',
          subCatergory: [
            {
              id: 8,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },
      ],
    },

    {
      name: 'Emegency and community',
      guide_Image: Images.alarmWhiteImg,
      faq: [
        {
          id: 9,
          desc: '- What are contacts in emergency used for?',
          subCatergory: [
            {
              id: 9,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },

        {
          id: 10,
          desc: '- Who do i contact in community section?',
          subCatergory: [
            {
              id: 10,
              subtext:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu erat auctor',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                'Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.Nunc Nam eget purus ut augue sit lobortis ut at nulla.',
            },
          ],
        },
      ],
    },
  ]

  return (
    <ScrollView
      bounces={false}
      style={{
        backgroundColor: '#F1F1F1',
      }}
    >
      <View
        style={{
          height: 90,
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
          }}
        >
          FAQ
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
      <View
        style={[
          Gutters.mediumTPadding,
          Gutters.smallBPadding,
          Gutters.regularHPadding,
          { flex: 1 },
        ]}
      >
        {usersGuideMenu.map((userguideHeader, index) => {
          return (
            <View key={index}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#184461',
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      justifyContent: 'center',
                    }}
                    activeOpacity={1.0}
                  >
                    <Image
                      source={userguideHeader.guide_Image}
                      style={[
                        Layout.selfCenter,
                        { width: 25, height: 25, resizeMode: 'cover' },
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                  <Text
                    style={[
                      {
                        color: '#184461',
                        fontSize: 18,
                        fontWeight: '700',
                        flexWrap: 'wrap',
                      },
                    ]}
                  >
                    {userguideHeader.name}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 40 }}>
                {userguideHeader.faq.map(faqquestions => {
                  return (
                    <View key={faqquestions.id}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setCurrentIndex(
                            faqquestions.id === currentIndex
                              ? null
                              : faqquestions.id,
                          )
                        }}
                      >
                        <View style={{ flexGrow: 1 }}>
                          <Text style={{ color: '#184461' }}>
                            {faqquestions.desc}
                          </Text>

                          {faqquestions.id === currentIndex ? (
                            <View style={{ marginBottom: 5, flexGrow: 1 }}>
                              {(faqquestions.subCatergory || []).map(
                                listofObject => {
                                  return (
                                    <View
                                      key={listofObject.id}
                                      style={{
                                        marginBottom: 20,
                                        marginTop: 10,
                                      }}
                                    >
                                      <Text style={{ color: '#184461' }}>
                                        {listofObject.subtext}
                                      </Text>
                                      <View
                                        style={{
                                          marginTop: 5,
                                          marginBottom: 5,
                                        }}
                                      >
                                        <Image
                                          source={listofObject.subImage}
                                          style={[
                                            Layout.selfCenter,
                                            {
                                              width: 150,
                                              height: 150,
                                              resizeMode: 'contain',
                                            },
                                          ]}
                                        />
                                      </View>
                                      <Text style={{ color: '#184461' }}>
                                        {listofObject.subtext_01}
                                      </Text>
                                    </View>
                                  )
                                },
                              )}
                            </View>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default IndexUsersFaqContainer
