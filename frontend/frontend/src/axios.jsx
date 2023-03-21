import axios from "axios"

let token = JSON.parse(localStorage.getItem('authorization.user'))

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers:{
    Authorization:localStorage.getItem('access_token')? 'JWT '+localStorage.getItem('access_token'):null,
    'Content-Type':'application/json',
    accept:'application/json'
  }
})

export default instance