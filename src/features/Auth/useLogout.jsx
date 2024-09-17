import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"



export const useLogout = ({ onSuccess, onError}) =>{
    return useMutation({
        mutationFn: () => {
            return axiosInstance.post('/auth/logout')
        },
        onError,
        onSuccess
    })
}