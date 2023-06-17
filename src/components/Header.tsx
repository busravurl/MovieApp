import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp } from '../utils/screenResize';

const Header = () => {
    const {navigate} = useNavigation();
    
    const onPressProfile = () => {
        // if (user.uid) navigate('ProfileTab')
        // else dispatch({type: GO_TO_LOGIN_MODAL, payload: true})
    }
    return (<>
        <View style={{backgroundColor: 'black',borderBottomWidth:1,borderBottomColor:'black', flexDirection: "row", justifyContent:'center',height: wp(18)}}>
            
            <View  style={{ justifyContent: 'center' ,flexDirection: "row"}}>
                <Text style={{color: '#efefef',fontStyle:'italic',padding: wp(5),fontSize: wp(5)}}>Movie App</Text>
            </View>
            {/* <View style={{justifyContent: 'center', paddingRight: wp(5)}}>
            <Icon name={"menu-outline"} size={wp(5)} color={'#efefef'} onPress={() => {navigate('Profile')}} />
            </View> */}
        </View>
    </>);
};

export default Header;