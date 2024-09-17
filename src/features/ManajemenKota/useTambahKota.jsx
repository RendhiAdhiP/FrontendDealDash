import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useTambahKota = ({ onError, onSuccess}) => {
    return useMutation({
        mutationKey: ['tambahKota'],
        mutationFn: async (data) => {
            console.log(data)
            const response = await axiosInstance.post('manajemen-kota/tambah', {kota:data})
            return response
        },
        onError,
        onSuccess
    })
}