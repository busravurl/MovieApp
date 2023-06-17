import { View, Text, Modal, Image, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState }  from 'react'
import { useIsFocused } from '@react-navigation/native';
import { wp } from '../../utils/screenResize';
import axios from 'axios';
import MovieListCard from '../MovieListCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  item: any;
  visible: boolean;
  onClose: () => void;
  onConfirm: (c: any) => void;
}

const ActorsMovies = (props) => {
    
    const isFocused = useIsFocused()
    const lan = useSelector((state: RootState) => state.languageReducer.languageObj)
  

    const [movieActor, setMovieActor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initialScreen()
        setIsLoading(false)
      }, [isFocused])
    
    
      const initialScreen = async () => {
        getActorsMovies(props.item.id);
        setIsLoading(false)
      }

    const getActorsMovies = async (id) => {
        const apiUrl = 'https://almaestro.org/api/actor/'; 
        let query = `${id}/movie`
        try {
          const response = await axios.get(apiUrl+ query);
          setMovieActor(response.data.data);
          console.log('moviesActor',movieActor)
        } catch (error) {
          console.log(error);
        }
      };

    const imageSource = props.item.profile  === 'https://image.tmdb.org/t/p/w500'

  return (
    <Modal
        animationType="fade"
        // transparent
        visible={props.visible}
        onRequestClose={props.onClose}>
       <ScrollView style={{flex:1, backgroundColor: '#0F0F0F'}}>
        <View key={props.item.id} style={{flex:1}}>
        <View style={{ margin:wp(7),marginBottom: wp(10),justifyContent: 'space-between', flexDirection:'row'}} >
               <Text style={{color:'#f7f7f7', fontSize:wp(5), padding: imageSource ? wp(5):wp(3), alignSelf:'center'}} >{props.item.name}</Text>
               <Image 
               source={imageSource ? require('../../assets/images/user3.png') : { uri: props.item.profile }} 
               resizeMode= 'contain' 
               style={{ borderRadius: wp(50),borderWidth:wp(0.1),borderColor:'white',width: imageSource ? wp(25) : wp(40), height:  imageSource ? wp(25) : wp(40), margin: wp(2) ,marginTop:   imageSource ? wp(5) : wp(1), marginBottom:   imageSource ? wp(5) : wp(1)}}/>
                
        </View>
            
        <View style={{flex:1,marginTop: wp(5), marginLeft: wp(2), alignItems: 'center',paddingBottom: wp(5)}}>
            <Text style={{color:'#f7f7f7', fontSize:wp(5) }} > {props.item.name} {lan.movies}</Text>
            <FlatList
            data={movieActor.data}
            numColumns={2}
            renderItem={({ item }) => <MovieListCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>

                
        </View>
       </ScrollView>
    </Modal>
);
}

export default ActorsMovies