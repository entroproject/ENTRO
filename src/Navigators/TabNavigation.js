import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {IndexHomeContainer} from '@/Containers';
import Icon from 'react-native-dynamic-vector-icons'
import Svg, {Path} from 'react-native-svg';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: "#fff"}}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"#fff"}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: "#fff"}}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#fff",
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: "#fff",
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: "#fff",
          }}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: "dodgerblue",
          }}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  }
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false
        }}
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>

      <Tab.Screen
        name="Home"
        component={IndexHomeContainer}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon type='Ionicons' name="home" size={25} color={focused ? "dodgerblue" : "grey"} />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Visitors"
        component={IndexHomeContainer}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon type='FontAwesome' name="users" size={25} color={focused ? "dodgerblue" : "grey"} />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Business Card"
        component={IndexHomeContainer}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon type='FontAwesome' name="vcard-o" size={25} color={focused ? "dodgerblue" : "grey"} />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={IndexHomeContainer}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon type='FontAwesome' name="cog" size={25} color={focused ? "dodgerblue" : "grey"} />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />


    </Tab.Navigator> )
}  

export default TabNavigation