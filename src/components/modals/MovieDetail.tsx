import { View, Text, Modal, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState }  from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import { wp,hp } from '../../utils/screenResize';
import axios from 'axios';
import MovieListCard from '../MovieListCard';
import ActorMovieList from '../ActorMovieList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  item: any;
  visible: boolean;
  onClose: () => void;
  onConfirm: (c: any) => void;
}

const MovieDetail = (props) => {
    
    const isFocused = useIsFocused()
    const lan = useSelector((state: RootState) => state.languageReducer.languageObj)
    
    const [movieActor, setMovieActor] = useState([]);
    const [relatedMovie, setRelatedMovie] = useState([]);
    const [movieImages, setMovieImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initialScreen()
        setIsLoading(false)
      }, [isFocused])
    
    
      const initialScreen = async () => {
        getMovieActor(props.item.id);
        getRelatedMovie(props.item.id);
        setIsLoading(false)
      }

    const getMovieActor = async (id) => {
        const apiUrl = 'https://almaestro.org/api/movie/'; 
        let query = `${id}/actors`
        let query3 = `${id}/images`
        try {
          const response = await axios.get(apiUrl+ query);
          setMovieActor(response.data.data);
          console.log('moviesActor',movieActor)


          const response3 = await axios.get(apiUrl+ query3);
          setMovieImages(response3.data.data);
          console.log('movieImages',movieImages)
        } catch (error) {
          console.log(error);
        }
      };
    
      const getRelatedMovie = async (id) => {
        const apiUrl = 'https://almaestro.org/api/movie/'; 
        let query = `${id}/related_movie`
        try {
          const response = await axios.get(apiUrl+ query);
          setRelatedMovie(response.data.data);
          console.log('relatedMovie',relatedMovie)
        } catch (error) {
          console.log(error);
        }
      };
   
  return (
    <Modal
        animationType="fade"
        // transparent
        visible={props.visible}
        onRequestClose={props.onClose}>
       <ScrollView style={{flex:1, backgroundColor: '#0F0F0F'}}>
       <View key={props.item.id} style={{flex:1}}>
                
            
                
                <View >
                   
                  <ImageBackground source={{uri : props.item.poster}} resizeMode= 'cover' style={{flex: 1,height: wp(120),
                        width: '100%'}}>
                        
                          <View style={{flex: 1,flexDirection:'row',justifyContent: 'space-between',padding: wp(2),paddingTop: wp(4)}}>
                          <TouchableOpacity onPress={props.onClose} style={{borderRadius: wp(30), width: wp(10), height: wp(15), alignItems: 'center'}}>
                            <Icon name={"arrow-back-outline"} size={wp(10)} color={'#f7f7f7'} />
                          </TouchableOpacity>
                          {/* <TouchableOpacity onPress={props.onClose} style={{borderRadius: wp(30), width: wp(10), height: wp(15), alignItems: 'center'}}>
                            <Icon name={"bookmarks-outline"} size={wp(10)} color={'#f7f7f7'} />
                          </TouchableOpacity> */}
                          
                          </View>
                        <View style={{flex:1, flexDirection: 'column-reverse'}}>
                        <LinearGradient
                              style={{ opacity: 1,width: '100%'}}
                              start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                        >
                          <Text style={{color:'#f7f7f7', fontSize:wp(8), padding: 5, fontWeight: 'bold',marginLeft: wp(2)}}>{props.item.title}</Text>
                          <View style={{justifyContent: 'center',marginBottom:wp(2),width:wp(25), height: wp(9),backgroundColor:'#da1b1b', borderRadius: wp(30), marginLeft: wp(2),alignItems:'center',flexDirection:'row'}}>
                            <Icon name={"star"} size={wp(5)} color={'#fbe9e8'} />
                            <Text style={{color:'#f7f7f7', fontSize:15, padding: 5, fontFamily: 'Georgia'  }} >{props.item.vote}</Text>
                          </View>
                            
                        </LinearGradient>
                        </View>
                
                       
                  </ImageBackground>
                 
                </View>
                 
                
                
                <View style={{ flexDirection:'row',marginTop: wp(5),marginBottom: wp(5) }}>
                {props.item.genres.map(el =>(<View style={{width:wp(20), height: wp(7),backgroundColor:'#383838', borderRadius: wp(30),alignItems:'center',justifyContent: 'center',marginLeft: wp(2)}}><Text style={{color:'#f7f7f7', fontSize:wp(3), padding: 5 , fontFamily: 'Georgia'}} > {el.name}</Text></View>))}
                </View>
                
                <View style={{flex:1,marginLeft:wp(2)}}>
                <Text style={{color:'#f7f7f7', fontSize:wp(5), marginBottom: wp(1) }} >{lan.synopsis}</Text>
                <Text style={{color:'#f7f7f7', fontSize:15, marginRight: wp(2), marginTop: wp(2)}}> {props.item.description}</Text>
        
                <View style={{flex:1,  marginTop: wp(5)}}>
                    <FlatList
                    data={movieImages}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => { 
                        return(
                            <TouchableOpacity>
                            <Image 
                            source={{ uri: item.name }} 
                            style={{ borderRadius: wp(1),width: wp(35), height: wp(30), margin: wp(2) ,marginTop: wp(1), marginBottom: wp(1)}}/>
                            </TouchableOpacity>
                        )}}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                
    
                <View style={{flex:1,marginTop: wp(5)}}>
                    <Text style={{color:'#f7f7f7', fontSize:wp(5), marginBottom: wp(1) }} >{lan.cast}</Text>
                    <FlatList
                    data={movieActor}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <ActorMovieList item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                            
                <View style={{flex:1,marginTop: wp(5), marginLeft: wp(2),paddingBottom:wp(5)}}>
                    <Text style={{color:'#f7f7f7', fontSize:wp(5),  }} >{lan.relatedMovies}</Text>
                    <FlatList
                    data={relatedMovie}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <MovieListCard item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                </View>
                
    

                
            </View>
       </ScrollView>
    </Modal>
);
}

export default MovieDetail