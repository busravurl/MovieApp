import React from 'react';
import {View, Text, Image} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {wp} from '../utils/screenResize'
import Home from '../pages/Home';
import Profile from '../pages/Profile';




const Tab = createBottomTabNavigator();


const MainStack: React.FC = () => {
  return (<>
    
      <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions= {({route}) => ({
        headerShown:false,
        tabBarStyle: {
          height: wp(18),
          padding: wp(2),
          backgroundColor: '#000000',
          position: 'absolute',
          borderTopWidth: 0,
          paddingBottom: 15
          
      },
        tabBarIcon: ({ focused, color, size}) =>  {
          let iconName;
          let rn = route.name;

          if ( rn === "HomeTab") {
            iconName = focused ? 'home' : 'home-outline';
          
          }else if (rn === "ProfileTab") {
              iconName = focused ? 'person' : 'person-outline';
            }

          return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: "#e5e5e5",
      })}
      >
        
        <Tab.Screen name="HomeTab" component={Home} />
        <Tab.Screen name="ProfileTab" component={Profile} />

        
      </Tab.Navigator>
  
  </>);
};

export default MainStack;