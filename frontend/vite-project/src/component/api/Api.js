import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5050/',
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    timeout: 1000,
  });

  let accessToken = null

  export const addAccessToken = (token) => {
    console.log(token)
    localStorage.setItem('token', token)
    accessToken = token;
  }

  accessToken = localStorage.getItem('token')

  console.log(accessToken)
  instance.defaults.headers.common['Authorization'] = accessToken;

const Api = {
    get : async(url,params)=>{
        try {
            const response = await instance.get(url, { params });
            return response.data;
        }catch (error) {
            return error
        }
    },
    post : async(url,data,params)=>{
        try {
            const response = await instance.post(url,data, { params });
            return response.data;
        }catch (error) {
            return error
        }
    },
    put : async(url,data,params)=>{
        try {
            const response = await instance.put(url,data, { params });
            return response.data;
        }catch (error) {
            return error
        }
    },
    delete : async(url,data,params)=>{
        try {
            const response = await instance.delete(url,{ params });
            return response.data;
        }catch (error) {
            return error
        }
    }
}

export default Api






