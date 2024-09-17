import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import isLogged from "../../../../lib/isLogged";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useFormik } from "formik";
import LoadingButton from "../../../../components/LoadingButton";
import Button from "../../../../components/Button";
import { Loader } from "../../../../components/loader";
import { useUpdateKota } from "../../../../features/ManajemenKota/useUpdateKota";




export default function EditKota() {


    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const logged = isLogged();
    const navigate = useNavigate();
    const params = useParams()

    // const prevKotaRef = useRef("")
    // const [isLoadingCurrentKota, setIsLoadingCurrentKota] = useState(false)


    // const handleSubmit = (e) => {
    //     e.preventDefault()



    //     // if (logged.token) {
    //     //     axios.post(`http://localhost:8000/api/v1/manajemen-kota/update/${params.id}`, { kota: kota }, {
    //     //         headers: {
    //     //             Authorization: `Bearer ${logged.token}`,
    //     //         }
    //     //     })
    //     //         .then((res) => {
    //     //             setMessage(res.data.message)
    //     //             setTimeout(() => {
    //     //                 setMessage(null)
    //     //                 navigate('/admin/dashboard/manajemen-kota')
    //     //             }, 2000)
    //     //         })
    //     //         .catch((err) => {
    //     //             setErrors(err.response.data.errors)

    //     //         })
    //     // }

    // }

    const { data: kota, isLoading: isLoadingKota } = useQuery({

        queryKey: ['get.kota'],
        queryFn: () => {
            const response = axiosInstance.get(`manajemen-kota/edit/${params.id}`)
            return response
        },
        onError: (err) => {
            console.error(err)
            setMessage(err?.response?.data?.message)
            setErrors(err?.response?.data?.errors)
        },
    })

    console.log(kota?.data?.data?.kota)

    const { mutate: updateKota } = useUpdateKota({
        id: params.id,
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
                navigate('/admin/dashboard/manajemen-kota')
            }, 2000)
        }
    })



    const formik = useFormik({
        initialValues: {
            kota: ""
        },
        onSubmit: () => {
            setIsLoading(true)
            updateKota({
                kota: formik.values.kota
            })

        }
    })




    useEffect(() => {

        if (!logged) {
            navigate('/');
        }

        if (kota?.data?.data?.kota) {
            formik.setValues({
                kota: kota?.data?.data?.kota
            })
        }

        // const prevKota = prevKotaRef.current;
        // const currentKota = formik.values.kota;

        // if (prevKota == currentKota) {
        //     setIsLoadingCurrentKota(true);
        // } else {
        //     setIsLoadingCurrentKota(false);
        // }



    }, [kota])


    return (
        <>

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            {isLoadingKota ? (<Loader />) : (
                <>
                    <section className="flex items-center justify-between">
                        <h3 className="text-2xl text-balck font-medium">Edit Kota</h3>
                        <Link to="/admin/dashboard/manajemen-kota/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" fill="black" />
                            </svg>

                            Kembali
                        </Link>
                    </section>

                    <section className="w-[400px] shadow-md sm:rounded-lg px-5 py-4">
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nama" className="font-medium text-base">Nama Kota</label>
                                    <input
                                        className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                        type="text"
                                        name="nama_kota"
                                        placeholder="Masukkan Nama Kota"
                                        value={formik.values.kota}
                                        onChange={(e) => formik.setFieldValue('kota', e.target.value)}
                                    />
                                    {errors && (
                                        <p className='text-xs text-red-400'>{errors.kota}</p>
                                    )}
                                </div>

                            </div>

                            {isLoading ? <LoadingButton className='bg-primary text-white' classCustomLoader={'border-white'} >Simpan</LoadingButton> : <Button className='bg-primary text-white' >Simpan</Button>}
                        </form>
                    </section>
                </>
            )}

        </>
    )
}