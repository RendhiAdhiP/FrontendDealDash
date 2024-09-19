import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"



export const useProduks = ({ onError }) => {
    return useQuery({
        queryFn: () => {
            return axiosInstance.get('manajemen-produk/')
        },
        onError
    })
}