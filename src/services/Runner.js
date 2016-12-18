import API from './API'

export function runQuery(query){
    return API.post('/query');
}

export default {runQuery}