import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useKotas = () => {return useQuery({
    queryKey: ['kotas'],
    queryFn: () => {
        const response = axiosInstance.get('manajemen-kota/')
        return response
    },
})}