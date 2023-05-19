
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://52.207.0.145:8081/ibd'
});

export default AxiosInstance;

//'http://localhost:8080/tsdata'
//'https://analytics.crohnscolitisfoundation.org/tsdata'
// 'http://52.207.0.145:8081/ibd'