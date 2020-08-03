import axios from 'axios'

export default {
    methods: {
        callGet(url, params) {
            let instance = createInstance();
            return instance.get(url, {params: params})
                .then(response => {
                    return response.data
                })
        },
        callPost(url, requestBody) {
            let instance = createInstance();
            return instance.post(url, requestBody)
                .then(response => {
                    return response.data
                })
        },
        callPut(url, requestBody) {
            let instance = createInstance();
            return instance.put(url, requestBody)
                .then(response => {
                    return response.data
                })
        },
        callDelete(url) {
            let instance = createInstance();
            return instance.delete(url)
                .then(response => {
                    return response.data
                })
        }
    }
}

function createInstance() {
    return axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL,
        responseType: "json",
        headers: {'user_token': getUserToken()}
    });
}

function getUserToken() {
    return sessionStorage.getItem('userToken');
}