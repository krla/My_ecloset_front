import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async signup (newUser) {
    const response = await API.post('/auth/signup', {
      ...newUser
    })
    return response.data
  },
  async login (user) {
    const response = await API.post('/auth/login', {
      ...user
    })
    return response.data
  },
  async getAllClothes (types, season) {
    let url = '/me/clothes?'
    if (types) {
      types.forEach(elem => {
        url += `cloth_type=${elem}&`
      })
    }
    if (season) {
      url += `season=${season}&`
    }
    const response = await API.get(url, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async addCloth (cloth) {
    const response = await API.post('/me/clothes', cloth, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async deleteCloth (clothes) {
    clothes.map(async clothId => {
      const response = await API.delete(`/me/clothes/${clothId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      return response.data
    })
  },
  async getAllLooks () {
    const response = await API.get('/me/looks', {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async createLook (look) {
    const response = await API.post('/me/looks', look, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async deleteLook (lookId) {
    const response = await API.delete(`/me/looks/${lookId}`, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async getOneLook (lookId) {
    const response = await API.get(`/me/looks/${lookId}`, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async saveLook (lookId, look) {
    const response = await API.put(`/me/looks/${lookId}`, look, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async getOneUser () {
    const response = await API.get('/users/me', {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async saveUser (user) {
    const response = await API.put('/users/me', user, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async updatePassword (objectPassword) {
    const response = await API.put('/users/me/password', objectPassword, {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  },
  async deleteUser () {
    const response = await API.delete('/users/me', {
      headers: {
        token: localStorage.getItem('token') //eslint-disable-line
      }
    })
    return response.data
  }
}
// Abel:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImIiLCJlbWFpbCI6ImJAYi5jb20iLCJpYXQiOjE1ODgxMDM3OTYsImV4cCI6MTU4ODcwODU5Nn0.JLjISK0VNDfeEEaskhDolC8-yaIYulJx3-dyJfHm5zk//
// Carla:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhIiwiZW1haWwiOiJhYUBhYS5jb20iLCJpYXQiOjE1ODgyODE1OTksImV4cCI6MTU5MDg3MzU5OX0.cL8wub8pRu0Vjy70T8IgyPA1nO9HtPmTDHEH6AfGRSE//
