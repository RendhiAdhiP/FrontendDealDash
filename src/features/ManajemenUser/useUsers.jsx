import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
// import isLogged from "../../lib/isLogged";


export const useUsers = ({onError}) => {return useQuery({
    queryKey: ['users'],
    queryFn: () => axiosInstance.get('manajemen-user/'),
    onError
})}