import { SWITCH_LANGUAGE } from "../actionTypes"

export const switchLanguage = payload => {
    return {
        type: SWITCH_LANGUAGE,
        payload
    }
}