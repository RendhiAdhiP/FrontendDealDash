import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useEditUser = ({ id, onError, onSuccess }) => {
    return useQuery(
        {
            queryKey: ['editUser'],
            queryFn: async () => {
                const response = await axiosInstance.get(`manajemen-user/edit/${id}`)
                return response
            },
            onError,
            onSuccess,
            enabled: !!id
        }
    )
} 