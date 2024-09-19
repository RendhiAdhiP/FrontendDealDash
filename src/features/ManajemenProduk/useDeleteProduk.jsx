import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useDeleteProduk = ({ onError, onSuccess}) => {return useMutation({
    mutationFn: async (id) => {
        const response = await axiosInstance.delete(`manajemen-produk/hapus/${id}`)
        return response
    },
    onError,
    onSuccess
})}