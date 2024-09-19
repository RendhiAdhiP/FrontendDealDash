import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useDetailProduk = ({id, onError, onSuccess}) => {return useQuery({
    queryKey: ['manajemen-produk', id],
    queryFn: async () => {
        const response = await axiosInstance.get(`manajemen-produk/edit/${id}`)
        return response.data.data
    },
    onError,
    onSuccess
})}