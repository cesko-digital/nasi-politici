
import axios from 'axios';
import { BASE_URL } from './constants';

const sendRequest = <T>(urlPath: string) => (
    axios.get<T>(`${BASE_URL}${urlPath}`)
)

export default sendRequest;
