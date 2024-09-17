
import { axiosInstance } from "../../lib/axios"
import { useMutation } from "@tanstack/react-query"

export const useLogin = ({onSuccess, onError}) => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (body) => {
            const loginResponse = await axiosInstance.post('/auth/login', body)
            return loginResponse
        },
        onError,
        onSuccess,
    })
}

