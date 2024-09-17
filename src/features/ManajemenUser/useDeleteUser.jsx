import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useDeleteUser = ({ onError, onSuccess }) => {
    return useMutation({
        mutationFn: (id) => {
            const logoutResponse = axiosInstance.delete(`manajemen-user/hapus/${id}`)
            return logoutResponse
        },
        onError,
        onSuccess
    })
}