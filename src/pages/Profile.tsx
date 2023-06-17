import { View, TextInput, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { wp } from '../utils/screenResize'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { userData } from '../redux/userInformation/actions';
import { SWITCH_LANGUAGE } from '../redux/actionTypes';


const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.userInformationReducer.token)
  const user = useSelector((state: RootState) => state.userInformationReducer.userInformation)
  const lan = useSelector((state: RootState) => state.languageReducer.languageObj)
  

  useEffect(() => {
    dispatch(userData(token));
    console.log('useronprofile',user);
  }, []);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#0F0F0F'}}>
      <View  style={{marginTop:wp(25), padding:wp(10), justifyContent: 'center' ,flexDirection: "row"}}>
        <Image 
          source={require('../assets/images/user3.png')} 
          style={{ borderRadius: wp(1),width: wp(16), height: wp(16), margin: wp(2) ,marginTop: wp(1), marginBottom: wp(1)}}/>
        </View>
      <View style={{justifyContent: 'center', padding: wp(10)}}>
        
        <View style={styles.card}>
            <View >
            <Text style={{color:'#d5d5d5', paddingLeft: wp(2)}}>{lan.username}</Text>
            <TextInput style={{color:'#d5d5d5', paddingLeft: wp(2)}}>{user.name}</TextInput>
            </View>
            
        </View>
        <View style={styles.card}>
          <View >
            <Text style={{color:'#d5d5d5', paddingLeft: wp(2)}}>{lan.email}</Text>
            <TextInput style={{color:'#d5d5d5', paddingLeft: wp(2)}}>{user.email}</TextInput>
          </View>
            
        </View>
        <View style={styles.card}>
            <Text style={{color:'#d5d5d5', paddingLeft: wp(2)}}>{lan.changeLang}</Text>
            <TouchableOpacity onPress={ () => {
               dispatch({type: SWITCH_LANGUAGE, payload: 'tr'});
            }}
            style={{borderColor:'#d5d5d5', borderWidth: wp(0.3),padding: wp(2), borderRadius: wp(3)}}><Text style={{color:'#d5d5d5'}}>{lan.turkish}</Text></TouchableOpacity>
            <TouchableOpacity onPress={ () => {
               dispatch({type: SWITCH_LANGUAGE, payload: 'en'});
            }}
            style={{borderColor:'#d5d5d5', borderWidth: wp(0.3),padding: wp(2), borderRadius: wp(3)}}><Text style={{color:'#d5d5d5'}}>{lan.english}</Text></TouchableOpacity>
            
        </View>
        <TouchableOpacity style={styles.card}>
            <Text style={{color:'#d5d5d5', paddingLeft: wp(2)}}>{lan.logout}</Text>
            
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: wp(3),
    height: wp(15),
    borderColor:'#c0c0c0',
    borderBottomWidth: 0.5,
  },
});
