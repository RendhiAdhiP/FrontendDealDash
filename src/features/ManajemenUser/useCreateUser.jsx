import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";


export const useCreateUser = ({ onError, onSuccess }) => {return useMutation({
    mutationFn: async (data) => {
        const formData = new FormData();

        formData.append('name', data.nama)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('tanggal_lahir', data.tanggalLahir)
        formData.append('kota_asal', data.kotaAsal)
        if (data.fileFoto) {
            formData.append('foto', data.fileFoto)

        }

        const createUserResponse = await axiosInstance.post('manajemen-user/tambah', formData)

        return createUserResponse
    },
    onError,
    onSuccess
})}