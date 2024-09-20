import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import isLogged from "../../../../lib/isLogged";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import LoadingButton from "../../../../components/LoadingButton";
import Button from "../../../../components/Button";
import { useCreateUser } from "../../../../features/ManajemenUser/useCreateUser";
import { useKotas } from "../../../../features/ManajemenKota/useKotas";


export default function TambahUser() {

    const [previewFoto, setPreviewFoto] = useState(null);

    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const logged = isLogged();
    const navigate = useNavigate();


    const { mutate: createUser } = useCreateUser({

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
                navigate('/admin/dashboard/manajemen-user')
            }, 2000)
        }
    })

    
    const { data: roles, isLoading: isLoadingRoles, refetch: refetchUsers } = useQuery({
        queryFn: () => {
            const res = axiosInstance.get('role/')
            return res
        },
        onError: (err) => {
            console.error(err)
        }
    })


    const { data: kotas, isLoadingKotas, refetch: refetchKotas } = useKotas({
        onError: (err) => {
            console.error(err)
            setMessage(err?.response?.data?.message)
        },
    })


    const formik = useFormik({
        initialValues: {
            nama: '',
            email: '',
            password: '',
            tanggalLahir: '',
            kotaAsal: '',
            fileFoto: null,
            role: ''
        },
        onSubmit: () => {
            setIsLoading(true)
            const { nama, email, password, tanggalLahir, kotaAsal, fileFoto, role } = formik.values
            createUser({
                nama,
                email,
                password,
                tanggalLahir,
                kotaAsal,
                fileFoto,
                role
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
                <h3 className="text-2xl text-balck font-medium">Tambah User</h3>
                <Link to="/admin/dashboard/manajemen-user/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium">
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
                            <label htmlFor="nama" className="font-medium text-base">Nama</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="text"
                                name="nama"
                                placeholder="Masukkan Nama"
                                value={formik.values.nama}
                                onChange={formik.handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.name}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="h-24 w-24  ">
                                <img className="h-full w-full rounded-full object-cover object-center" src={previewFoto ? previewFoto : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                            </div>
                            <label htmlFor="foto" className="font-medium text-base">Foto</label>
                            <input
                                className="text-xs"
                                type="file"
                                name="foto"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    const imageUrl = URL.createObjectURL(file)
                                    formik.setFieldValue('fileFoto', file)
                                    setPreviewFoto(imageUrl)
                                }}
                            />

                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium text-base">Email</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="email"
                                name="email"
                                placeholder="Masukkan Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.email}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-medium text-base">Password</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="password"
                                name="password"
                                placeholder="Masukkan Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.password}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="tanggalLahir" className="font-medium text-base">Tanggal Lahir</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="date"
                                name="tanggalLahir"
                                value={formik.values.tanggalLahir}
                                onChange={formik.handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.tanggal_lahir}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="kotaAsal" className="font-medium text-base">Kota Asal</label>
                            <select
                                name="kotaAsal"
                                value={formik.values.kotaAsal}
                                onChange={formik.handleChange}
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                            >
                                <option className="text-xs" value="">Pilih Kota</option>
                                {kotas && kotas?.data?.data.map((kota) => {
                                    return (
                                        <option className="text-xs" key={kota.id} value={kota.id}>{kota.kota}</option>
                                    )
                                })}
                            </select>
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.kota_asal}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                                    <label htmlFor="role" className="font-medium text-base">Role</label>
                                    <select
                                        name="role"
                                        value={formik.values.role.id}
                                        onChange={formik.handleChange}
                                        className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                    >
                                        <option className="text-xs" value="">Pilih Role</option>
                                        {roles?.data.data && roles?.data.data?.filter((role) => role.id !== 1).map((role) => {
                                            return (
                                                <option className="text-xs" key={role.id} value={role.id}>{role.name}</option>
                                            )
                                        })}
                                    </select>
                                    {errors && (
                                        <p className='text-xs text-red-400'>{errors.role_id}</p>
                                    )}
                                </div>
                    </div>
                    {isLoading ? <LoadingButton className='bg-primary text-white' classCustomLoader={'border-white'} >Kirim</LoadingButton> : <Button className='bg-primary text-white' >Kirim</Button> }


                </form>
            </section>
        </>
    )
}