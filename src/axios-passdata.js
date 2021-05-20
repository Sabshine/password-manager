import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neverforget-app.firebaseio.com/'
});

export default instance;
