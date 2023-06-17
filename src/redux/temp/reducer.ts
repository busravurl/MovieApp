import { SET_MOVIEGENRE, SET_MOVIE } from './../actionTypes';


const tempState = {
    movie: {},
    movieGenre: {},
   
}
 
const tempReducer = (state=tempState, action) => {
    switch (action.type) {
        case SET_MOVIEGENRE : return {...state, movieGenre:action.payload}; break;
        case SET_MOVIE : return {...state, movie:action.payload}; break;  
        default: return state; break;
    }
}

export default tempReducer