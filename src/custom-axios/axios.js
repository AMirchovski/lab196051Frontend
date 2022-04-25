import axios from "./axios";

const instance = axios.create({
    baseURL: 'http://localhost:9091/',
    headers: {
        'Access-Control-Allow-Origin' : '*',
    }
})

export default instance;
