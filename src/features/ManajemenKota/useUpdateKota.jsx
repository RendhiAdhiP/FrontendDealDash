import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useUpdateKota = ({ id, onError, onSuccess }) => {
    return useMutation({
        mutationKey: ['update.kota'],
        mutationFn: async (data) => {
            const response = await axiosInstance.post(`manajemen-kota/update/${id}`, { kota: data.kota })
            return response
        },
        onError,
        onSuccess
    })
}