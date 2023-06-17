import { View, TextInput, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { wp } from '../../utils/screenResize'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://almaestro.org/api/register', {
        name,
        email,
        password,
      });
      
      const data = response.data;

      if (data.error === 0) {
        navigation.navigate('LoginPage')
        Alert.alert('Success', 'Registration successful');
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
            style={{color:'#c7c7c7', paddingLeft: wp(2)}}
            onChangeText={setName}
            placeholder="name"
            placeholderTextColor={'#cecece'}
            value={name}
            ></TextInput>
        </View>
        <View style={styles.card}>
            <TextInput 
            style={{color:'#c7c7c7', paddingLeft: wp(2)}}
            onChangeText={setEmail}
            placeholder="e-mail adress"
            placeholderTextColor={'#cecece'}
            value={email}
            ></TextInput>
        </View>
        <View style={styles.card}>
            <TextInput 
            style={{color:'#c7c7c7', paddingLeft: wp(2)}}
            onChangeText={setPassword}
            placeholder="password"
            placeholderTextColor={'#cecece'}
            value={password}
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
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            //locations={[0,0.5,0.8]}
            colors={['#841e1e', '#6f1919', '#5a1414']}
            style={{ opacity: 1,width: '100%', height: '100%',borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={{color:"#cecece", fontWeight:'600', fontSize: wp(5)}}>Register</Text>
              </TouchableOpacity>
            
          </LinearGradient>
        </View></View>
      </View>
    </SafeAreaView>
  )
}

export default Register

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