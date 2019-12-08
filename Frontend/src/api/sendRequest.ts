
//import axios from 'axios';
import { BASE_URL } from './constants';

const sendRequest = <T>(urlPath: string) => (
    fetch(new Request(`${BASE_URL}${urlPath}`, {
        method: 'GET', 
        mode: 'cors', 
        redirect: 'follow',
        headers: new Headers({
            "Accept": "application/json"
        })
    }))
)

export default sendRequest;
