
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'https://analytics.crohnscolitisfoundation.org/ibd'
});

export default AxiosInstance;

//'http://localhost:8080/tsdata'
//'https://analytics.crohnscolitisfoundation.org/ibd'
//  'http://52.207.0.145:8081/ibd'
// add this to all calls ?userName=${userEmail}`