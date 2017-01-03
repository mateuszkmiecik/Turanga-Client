import API from './API'

export function runQuery(body){
    return API.post('/query', body);
}

export default {runQuery}