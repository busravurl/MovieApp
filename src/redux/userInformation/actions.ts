import axios from "axios"
import { UPDATE_TOKEN, SET_USER_DATA } from "../actionTypes"

const updateToken = (token)=>{
    return {
        type: UPDATE_TOKEN,
        payload:token
    }
}


const userData = (token) => {
    return async (dispatch) => {
      try {
        const userToken = token;
        const response = await axios.get('https://almaestro.org/api/user', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
        const data = response.data;
        dispatch({ type: SET_USER_DATA, payload: data });
      } catch (error) {
        console.log(error);
      }
    }
    
}

export {userData,updateToken}