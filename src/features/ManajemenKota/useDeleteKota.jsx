import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useDeleteKota = ({ onError, onSuccess}) => {return useMutation({
    mutationFn: async (id) => {
        const response = await axiosInstance.delete(`manajemen-kota/hapus/${id}`)
        return response
    },
    onError,
    onSuccess
})}