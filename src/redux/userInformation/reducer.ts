import { UPDATE_USER_DATA,CLEAR_DATA, SET_USER_DATA, SET_USER_TOKEN, 
    } from '../actionTypes'


const userState = {
    userInformation:{},
    token:'',
    userInfo: {
        name: '',
        password: '',
        email: ''
    },
    
}

const userInformationReducer = (state = userState, action) => {
    switch(action.type){
        case SET_USER_TOKEN : return {...state, token: action.payload}; break;
        case UPDATE_USER_DATA : return {...state, userInfo: {...state.userInfo, [action.field]:action.payload}}; break;
        case SET_USER_DATA : return {...state, userInformation: action.payload}; break;
        case CLEAR_DATA : return userState; break;      
     
        default : return state
    }
}

export default userInformationReducer