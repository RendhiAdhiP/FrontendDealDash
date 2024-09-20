import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";


export const useUpdateUser = ({id, onError, onSuccess}) => {return useMutation({
    mutationKey: ['update.user'],
    mutationFn: (data) => {
        const formData = new FormData();

        if (data.fileFoto) {
            formData.append('foto', data.fileFoto)
        }
        formData.append('name', data.nama)
        formData.append('email', data.email)
        if (data.password) {
            formData.append('password', data.password)
        }
        formData.append('tanggal_lahir', data.tanggalLahir)
        if (data.kotaAsal.id) {
            formData.append('kota_asal', data.kotaAsal.id)
        } else {
            formData.append('kota_asal', data.kotaAsal)
        }
        if (data.role.id) {
            formData.append('role_id', data.role.id)
        } else {
            formData.append('role_id', data.role)
        }

        const updateUserResponse = axiosInstance.post(`manajemen-user/update/${id}`, formData)

        return updateUserResponse
    },
    onError,
    onSuccess
})}