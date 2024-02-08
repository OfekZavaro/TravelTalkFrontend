import axios from 'axios';

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const apiClient = axios.create({
  baseURL: 'https://10.10.248.206', 
  timeout: 5000, 
});

const cancelRequest = () => {
    source.cancel('Request canceled by user'); // Provide a reason for cancellation
};

export { apiClient, cancelRequest };
