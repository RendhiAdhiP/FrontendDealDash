import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useUsers = ({onError, currentPage}) => {return useQuery({
    queryKey: ['users'],
    queryFn: () => axiosInstance.get(`manajemen-user/?page=${currentPage}`),
    onError
})}