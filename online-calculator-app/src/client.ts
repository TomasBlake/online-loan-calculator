import Axios from 'axios';

const client = Axios.create({
    baseURL: process.env.REACT_APP_LOAN_CALCULATION_BACKEND_API,
    headers: {
        'Content-type': 'application/json',
        /*'Authorization': `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
        'Correlation-ID': `${process.env.CORRELATION_ID}`*/
    }
});

export default client;