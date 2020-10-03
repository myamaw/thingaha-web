import axios from 'axios'
import config from '../config'
import TokenStorage from './tokenStorage'

const draftServerUrl = 'http://localhost:9000'
const thingahaServerUrl = 'http://localhost:5000/api/v1'
const apiBaseUrl = config.useDraftServer ? draftServerUrl : thingahaServerUrl

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

const createThingahaJsonResponse = (axiosResponse, httpErrorMessage = null) => {
  return {
    status: axiosResponse.status,
    data: axiosResponse.data.data,
    errors: axiosResponse.data.errors,
    httpErrorMessage: httpErrorMessage,
  }
}

// Request interceptor for API calls
// This interceptor will be called before every API request and
// add the necessary auth headers, CORS headers etc.
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = TokenStorage.getToken()

    config.headers = {
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
);

// Response interceptor for API calls
// This interceptor will be called after every api request and
// format the respsone into our thingaha custom response format.
// Impelemented this to configure a central point of interface for error and response handling.
// And this also eliminates the annoying `response.data.data` pattern in api code. :D
axiosInstance.interceptors.response.use((response) =>  {
  return Promise.resolve(createThingahaJsonResponse(response))
}, (error) => {
  return Promise.reject(createThingahaJsonResponse(error.response, error.toString()))
});

export default axiosInstance