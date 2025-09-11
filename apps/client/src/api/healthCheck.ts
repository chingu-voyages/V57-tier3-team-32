import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const healthCheck = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/health`)
        return response
    }catch(e){
        console.error("health check failed", e)
        throw e
    }
}