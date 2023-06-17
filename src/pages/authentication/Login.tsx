import { View, TextInput, Text, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { wp } from '../../utils/screenResize'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {SET_USER_TOKEN } from '../../redux/actionTypes';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://almaestro.org/api/login', {
        email,
        password,
      });
      
      const data = response.data;
      //dispatch(userData(data.data.token));
      console.log('data.data.user.id',data.data.token);
      dispatch({ type: SET_USER_TOKEN, payload: data.data.token });
      if (data.error === 0) {
        console.log('token',data.data);
        navigation.navigate('MainStack', {screen: 'HomeTab' });
      } else {
        const errorMessage = data.message;
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred');
    }
    
  };
 
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#0F0F0F'}}>
      <View >
        <View  style={{ justifyContent: 'center' ,flexDirection: "row",alignItems: 'center'}}>
            <ImageBackground 
              source={require('../../assets/images/3658607.jpg')}
              resizeMode= 'cover' 
              style={{flex: 1, flexDirection: 'column-reverse',height: wp(90),width: '100%' }}>
                <LinearGradient
                      style={{ opacity: 1,width: '100%'}}
                      start={{x: 0, y: 0}} end={{x: 0, y: 0.9}}
                      colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                >
                  <View style={{marginTop:wp(20),width: '100%', height: wp(30),backgroundColor: '#0f0f0f', borderTopLeftRadius: wp(30),alignItems: 'center',justifyContent: 'center'}}>
                    <Text style={{color: '#efefef',fontStyle:'italic',padding: wp(5),fontSize: wp(6)}}>Movie App</Text>
                  </View>
                </LinearGradient>
            </ImageBackground>
        </View>
        <View style={{ alignItems: 'center'}}>
          <View style={styles.card}>
              <TextInput 
              style={{color:'#cecece', paddingLeft: wp(2)}}
              placeholder="E mail"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={'#cecece'}
              ></TextInput>
          </View>
          <View style={styles.card}>
              <TextInput 
              style={{color:'#cecece', paddingLeft: wp(2)}}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'#cecece'}
              ></TextInput>
          </View>
          <View style={{
            backgroundColor: '#0f0f0f',
            margin: wp(3),width:'80%', 
            height: wp(12),
            borderRadius: 20 ,
            // borderWidth: 1.5,
            // borderColor: '#2f0017',
            shadowColor: "#c56767",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5}}>
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#841e1e', '#6f1919', '#5a1414']}
            style={{ opacity: 1,width: '100%', height: '100%',position: 'absolute',borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity 

              onPress={handleLogin}
              ><Text style={{color:"#cecece", fontWeight:'600', fontSize: wp(5)}}>Login</Text></TouchableOpacity>
            
          </LinearGradient>
        </View>
        <View style={{flexDirection: 'row',margin: wp(3)}}>
          <Text style={{color:"#cecece"}}>Don't you have an account? </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('RegisterPage')}}><Text style={{color:"#4d69a6"}} > Go Register</Text></TouchableOpacity>
        </View></View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(3),
    paddingLeft:wp(2),
    width:'80%',
    height: wp(12),
    backgroundColor: '#0F0F0F',
    borderColor:'#cecece',
    borderWidth: 1.5,
    borderRadius: 20
  },
});