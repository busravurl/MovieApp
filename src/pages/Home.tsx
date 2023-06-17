import {SafeAreaView, View, Text ,Image, FlatList, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header'
import { get_movie, get_movie_genre } from '../redux/temp/actions'
import axios from 'axios';
import { wp, hp } from '../utils/screenResize';
import MovieListCard from '../components/MovieListCard';
import { useIsFocused } from '@react-navigation/native';


const Home = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  const movie = useSelector((state: RootState) => state.tempReducer.movie)
  const genre = useSelector((state: RootState) => state.tempReducer.movieGenre)
  const randomIndex = Math.floor(Math.random() * movie.length);
  const [random, setRandom] = useState(randomIndex);
  


  

 useEffect(() => {
    setRefreshing(true)
    initialScreen()
    setRandom(movie[randomIndex]);
    setIsLoading(false)
    setRefreshing(false)
  }, [isFocused])


  const initialScreen = async () => {
    setRefreshing(true)
    dispatch(get_movie(page));
    dispatch(get_movie_genre());
    
    console.log('moviemoviemovie', movie)
    console.log('genregenregenre', genre)
    console.log('randomIndex', randomIndex)
    if(selected !== "" ){
      getSelectedMovies(selected);
    }
    setRefreshing(false)
    setIsLoading(false)
  }
  


  const getSelectedMovies = async (selected) => {
    const apiUrl = 'https://almaestro.org/api/genre/';
    let query = `${selected}/movie?page=${page}`
    try {
      const response = await axios.get(apiUrl+ query);
      setSelectedMovies(response.data.data.data);
      //console.log('response', response)
      console.log('selected', selectedMovies)
    } catch (error) {
      console.log(error)
    }
  };

  const nextPage = async () => {
    setRefreshing(true)
    setPage(page +1)
    initialScreen();
    setRefreshing(false)
    setIsLoading(false)
  }

  const prevPage = async () => {
    setRefreshing(true)
    setPage(page -1)
    initialScreen();
    setRefreshing(false)
    setIsLoading(false)
  }


  return (

    <SafeAreaView style={{flex: 1, backgroundColor: '#0F0F0F'}}>
      <ScrollView>
         <Header />

          <View   style={{flex: 1,height: wp(100)}}>
          <Image source={{ uri: random.poster }} 
          style={{ resizeMode: 'contain',borderRadius: wp(1),width: '100%', height:  '100%', margin: wp(2) ,marginTop: wp(1), marginBottom: wp(1)}}/>
          </View>

          <View style={{flex:1, flexDirection: 'column'}}>
          
            
                <View style={{alignItems: 'center',justifyContent: 'center',marginTop:wp(3)}}>
                  <FlatList
                    data={genre}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                      <View style={{ flexDirection:'row',marginTop: wp(5)}}>
                      <TouchableOpacity onPress={() => {
                        setSelected(item.key)
                        getSelectedMovies(selected)}} style={{width:wp(20), height: wp(7),backgroundColor:'#383838', borderRadius: wp(30),alignItems:'center',justifyContent: 'center',marginLeft: wp(2)}}>
                        <Text  style={{color:'white', fontSize:wp(3), padding: 5 , fontFamily: 'Georgia'}} > {item.value}</Text></TouchableOpacity>
                      </View>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View >

                <View style={{alignItems: 'center',justifyContent: 'center', marginBottom: wp(20)}}>
                {selected === "" ? 
                    <View >
                  
                      <FlatList
                        data={movie}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <MovieListCard item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        />

                      <View style={{paddingBottom: wp(10),flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={(prevPage)} style={{justifyContent: 'center', alignItems: 'center',width: wp(6.5), height: wp(6.5), backgroundColor: '#323232', borderRadius: wp(2)}}> 
                            <Icon name={"chevron-back-outline"} size={wp(4)} color={'#e5e5e5'} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={(nextPage)} style={{justifyContent: 'center', alignItems: 'center',width: wp(6.5), height: wp(6.5), backgroundColor: '#323232', borderRadius: wp(2), marginLeft: wp(2)}}>
                            <Icon name={"chevron-forward-outline"} size={wp(4)} color={'#e5e5e5'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  : 

                  <View >
                    <FlatList
                      data={selectedMovies}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => <MovieListCard item={item} />}
                      keyExtractor={(item, index) => index.toString()}
                    />

                    <View style={{paddingBottom: wp(15),flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <TouchableOpacity onPress={(prevPage)} style={{justifyContent: 'center', alignItems: 'center',width: wp(6.5), height: wp(6.5), backgroundColor: '#323232', borderRadius: wp(2)}}> 
                          <Icon name={"chevron-back-outline"} size={wp(4)} color={'#e5e5e5'} />
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress={(nextPage)} style={{justifyContent: 'center', alignItems: 'center',width: wp(6.5), height: wp(6.5), backgroundColor: '#323232', borderRadius: wp(2), marginLeft: wp(2)}}>
                          <Icon name={"chevron-forward-outline"} size={wp(4)} color={'#e5e5e5'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  }
                </View>
            
          </View>
      </ScrollView>
    
    </SafeAreaView>
    
    
  );


}

export default Home