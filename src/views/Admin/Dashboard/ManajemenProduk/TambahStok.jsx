import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isLogged from "../../../../lib/isLogged";
import { useFormik } from "formik";
import LoadingButton from "../../../../components/LoadingButton";
import Button from "../../../../components/Button";
import { useProduks } from "../../../../features/ManajemenProduk/useProduks";
import { useTambahStokProduk } from "../../../../features/ManajemenProduk/useTambahStokProduk";


export default function TambahStok() {


    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const logged = isLogged();
    const navigate = useNavigate();


    const { mutate: tambahStokProduk } = useTambahStokProduk({
        onError: (err) => {
            setIsLoading(false)
            setErrors(err?.response?.data?.errors)
            console.log(err.response)
        },
        onSuccess: (res) => {
            setIsLoading(false)
            setErrors(null)
            setMessage(res.data.message)
            setTimeout(() => {
                setMessage(null)
                navigate('/admin/dashboard/manajemen-produk/history')
            }, 2000)
        }
    })


    const { data: produks, isLoading: isLoadingProduks, refetch: refetchProduks } = useProduks({
        onError: (err) => {
            console.error(err)
            setMessage(err?.response?.data?.message)
        },
    })

    const formik = useFormik({
        initialValues: {
            produkId: '',
            stok: '',
        },
        onSubmit: () => {
            setIsLoading(true)
            const { produkId, stok } = formik.values
            tambahStokProduk({
                produkId,
                stok,
            })
        }
    })

    useEffect(() => {

        if (!logged) {
            navigate('/');
        }

    }, [])

    return (
        <>

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            <section className="flex items-center justify-between">
                <h3 className="text-2xl text-balck font-medium">Tambah Produk</h3>
                <Link to="/admin/dashboard/manajemen-produk/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" fill="black" />
                    </svg>

                    Kembali
                </Link>
            </section>

            <section className="w-[400px] shadow-md sm:rounded-lg px-5 py-4">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="produkId" className="font-medium text-base">Nama Produk</label>
                        <select
                            name="produkId"
                            value={formik.values.produkId}
                            onChange={formik.handleChange}
                            className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                        >
                            <option className="text-xs" value="">Pilih Produk</option>
                            {produks?.data.data && produks?.data.data?.map((produk, index) => {
                                return (
                                    <option className="text-xs" key={index} value={produk.produk_id}>{produk.nama}</option>
                                )
                            })}
                        </select>
                        {errors && (
                            <p className='text-xs text-red-400'>{errors?.produk_id}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="stok" className="font-medium text-base">Stok</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="number"
                                name="stok"
                                placeholder="Masukkan Nama Produk"
                                value={formik.values.stok}
                                onChange={formik.handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.stok}</p>
                            )}
                        </div>

                    </div>

                    {isLoading ? <LoadingButton className='bg-primary text-white' classCustomLoader={'border-white'} >Kirim</LoadingButton> : <Button className='bg-primary text-white' >Kirim</Button>}


                </form>
            </section>
        </>
    )
}