import React, { useState } from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import { wp } from '../utils/screenResize';
import MovieDetail from './modals/MovieDetail'


const MovieListCard = ({item}) => {
    const [open, setOpen] = useState(false)
   

    return (
        <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', marginTop: wp(3)}}>
            <TouchableOpacity style={{ alignItems: 'center'}}  onPress={() => setOpen(true)}>
               <Image source={{uri : item.poster}} style={{ borderRadius: wp(1),width: wp(35), height:  wp(50),marginRight: wp(2)}}/>
            </TouchableOpacity>
            {open && <MovieDetail visible={open} onClose={() => setOpen(false)} item={item} />}
        </View>
        
    );
} 

export default MovieListCard;