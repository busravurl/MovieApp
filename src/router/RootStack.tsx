import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import MainStack from '../router/MainStack';
import Profile from '../pages/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
import { change_language_action } from '../redux/temp/actions';
import { useDispatch } from 'react-redux';


const Stack = createNativeStackNavigator();

const RootStack = () =>{
    const dispatch = useDispatch();

    useEffect(() => {
        checkLanguage()
      }, [])

    const checkLanguage = async () => {
        let lanCache = await AsyncStorage.getItem('lang')
        if (!lanCache) {
          let lan = ''
          if (Platform.OS === 'ios') {
              lan = NativeModules.SettingsManager.settings.AppleLanguages[0].substr(0,2)
          } else {
              lan = NativeModules.I18nManager.localeIdentifier.substr(0,2)
          }
          if (lan !== 'tr' && lan !== 'en') {
              lan = 'en'
          }
          // console.log('language:::', lan)
          await dispatch(change_language_action(lan))
        } else {
          await dispatch(change_language_action('en'))
        }
      }

    return(
       <NavigationContainer>
            <Stack.Navigator
             initialRouteName="LoginPage"
             screenOptions={{headerShown:false}} > 
            <Stack.Screen name="MainStack" component={MainStack}/>
            <Stack.Screen name="LoginPage" component={Login} />
            <Stack.Screen name="RegisterPage" component={Register} />
            <Stack.Screen name="Profile" component={Profile} />
            
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;