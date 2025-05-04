import { io } from "socket.io-client"
import { BASE_URL } from "./constants"

export const createSocketConnection = () =>  {
    return io(BASE_URL, {
        
        auth: {
            token: document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1],
          }
    })
}