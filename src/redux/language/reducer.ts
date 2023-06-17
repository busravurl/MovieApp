import { SWITCH_LANGUAGE } from "../actionTypes"

const lanState = {
    language : 'tr',
    languageObj : require('../../translations/turkish.json')
}

const lanReducer = (state=lanState, action)=>{
    switch(action.type){
        case SWITCH_LANGUAGE: {
            if(action.payload==='tr')
                    return {...state, language : action.payload ,languageObj : require('../../translations/turkish.json')}
                else if(action.payload==='en')
                    return {...state, language : action.payload ,languageObj : require('../../translations/english.json')}
                else return state
        }; break;
        default: return state; break
    }
}

export default lanReducer