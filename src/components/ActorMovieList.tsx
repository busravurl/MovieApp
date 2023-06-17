import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { wp } from '../utils/screenResize';
import ActorsMovies from './modals/ActorsMovies';


const MovieListCard = ({item}) => {
    const [open, setOpen] = useState(false)
   
    const imageSource = item.profile  === 'https://image.tmdb.org/t/p/w500'
    
    return (
        <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', marginTop: wp(3)}}>
            <TouchableOpacity style={{width: wp(30), height:  wp(40),marginBottom: wp(10), alignItems: 'flex-start'}}  onPress={() => setOpen(true)}>
               <Image 
               source={imageSource ? require('../assets/images/user3.png') : { uri: item.profile }}  
               style={{ borderRadius: wp(1),width: imageSource ? wp(25) : wp(25), height:  imageSource ? wp(25) : wp(35), margin: wp(2) ,marginTop:   imageSource ? wp(5) : wp(1), marginBottom:   imageSource ? wp(5) : wp(1)}}/>
                <Text style={{color:'#f7f7f7', fontSize:15, padding: imageSource ? wp(5):wp(3)}} >{item.name}</Text>
            </TouchableOpacity>
            {open && <ActorsMovies visible={open} onClose={() => setOpen(false)} item={item} />}
        </View>
        
    );
} 

export default MovieListCard;