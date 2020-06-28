import axios from 'axios'

export default {
    methods: {
        callGet(url, params) {
            let instance = createInstance();
            return instance.get(url, {params: params})
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        },
        callPost(url, requestBody) {
            let instance = createInstance();
            return instance.post(url, requestBody)
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        },
        callPut(url, requestBody) {
            let instance = createInstance();
            return instance.put(url, requestBody)
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        },
        callDelete(url) {
            let instance = createInstance();
            return instance.delete(url)
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        }
    }
}

function createInstance() {
    return axios.create({
        baseURL: 'http://localhost:8080',
        responseType: "json",
        headers: {'userToken': getUserToken()}
    });
}

function getUserToken() {
    return sessionStorage.getItem('userToken');
}