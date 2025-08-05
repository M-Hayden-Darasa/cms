import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

const handleRequest = async (axiosCall) => {
  try {
    const response = await axiosCall
    return { value: response.data, error: null }
  } catch (error) {
    return {
      value: null,
      error: error.response?.data || error.message || 'Unknown error',
    }
  }
}

export const getRequest = (url, params = {}) => handleRequest(axiosInstance.get(url, { params }))

export const postRequest = (url, data = {}) => handleRequest(axiosInstance.post(url, data))

export const putRequest = (url, data = {}) => handleRequest(axiosInstance.put(url, data))

export const deleteRequest = (url, params = {}) =>
  handleRequest(axiosInstance.delete(url, { params }))
