import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios";


export const useTambahStokProduk = ({ onError, onSuccess }) => {
    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();

            formData.append('produk_id', data.produkId)
            formData.append('stok', data.stok)

            const createUserResponse = await axiosInstance.post('manajemen-produk/tambah-stok', formData)

            return createUserResponse
        },
        onError,
        onSuccess
    })
}