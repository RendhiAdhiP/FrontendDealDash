import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useDetailUser = ({ id, onError, onSuccess }) => {
    return useQuery(
        {
            queryKey: ['detailUser'],
            queryFn: async () => {
                const response = await axiosInstance.get(`manajemen-user/detail/${id}`)
                return response
            },
            onError,
            onSuccess,
            enabled: !!id
        }
    )
} 