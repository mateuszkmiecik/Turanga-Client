import API from './API'

export function runQuery({id, attId, query, correctQuery}){
    return API.post(`/student/attempts/query/${id}/${attId}`, {query});
}

export default {runQuery}