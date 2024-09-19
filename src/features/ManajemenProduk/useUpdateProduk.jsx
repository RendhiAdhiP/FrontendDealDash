import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useUpdateProduk = ({id, onError, onSuccess}) => {return useMutation({
    mutationFn: async (data) => {
        const formData = new FormData();

        formData.append('nama_produk', data.namaProduk)
        formData.append('produk_id', data.produkId)
        if (data.fileFoto) {
            formData.append('foto', data.fileFoto)

        }

        const response = await axiosInstance.post(`manajemen-produk/update/${id}`, formData)

        return response
    },

    onError,
    onSuccess
})}