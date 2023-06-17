
import { SET_MOVIEGENRE, SET_MOVIE, SWITCH_LANGUAGE } from './../actionTypes';
import { store } from '../store';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const get_movie_genre = () => {
  return async function (dispatch) {
    const response = await axios.post('https://almaestro.org/api/genre')
    .then((response) => {
      let genre = response.data.data.genres
      let newArray = genre.map((item) => {
        return {key: item.id, value: item.name}
      })
      dispatch({ type: SET_MOVIEGENRE, payload: newArray });
      //console.log('^genre',newArray)
    })
    .catch((e) => {
      console.log(e)
    })
  };
};


const get_movie = (page) => {
  return async (dispatch) => {
   try {
    const apiUrl = 'https://almaestro.org/api/movie';
    let query = `?page=${page}`
    const response = await axios.post(apiUrl+ query);

    const data = response.data;
    dispatch({ type: SET_MOVIE, payload: data.data.movies.data });
  } catch (error) {
    console.log(error)
  }}
};

export const change_language_action = (payload) => {
  return async function (dispatch) {
    await dispatch({type: SWITCH_LANGUAGE, payload});
    await AsyncStorage.setItem('lang', payload)
  };
}


export {get_movie, get_movie_genre}