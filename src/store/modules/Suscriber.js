import axios from 'axios';
import store from '../index'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'login/SET_TOKEN':
            if(mutation.payload) { 
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                axios.defaults.headers.common['Content-Type'] = 'application/json'
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHtpRequest'
                localStorage.setItem('spa_token', mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('spa_token')
            }
            break;
    }
    
})