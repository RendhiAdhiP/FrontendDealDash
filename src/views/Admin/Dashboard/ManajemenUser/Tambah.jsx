import { useEffect, useState } from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import isLogged from "../../../../lib/isLogged";


export default function TambahUser() {

    const [users, setUsers] = useState({
        nama: '',
        foto: '',
        file: null,
        email: '',
        password: '',
        tanggalLahir: '',
        kotaAsal: '',
    });

    const [kotas, setKotas] = useState(null)
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)

    const logged = isLogged();
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'foto' && files) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setUsers({
                ...users,
                foto: imageUrl,
                file: file,
            });
        } else {
            setUsers({
                ...users,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(users)

        const formData = new FormData();
        formData.append('name', users.nama)
        formData.append('email', users.email)
        formData.append('password', users.password)
        formData.append('tanggal_lahir', users.tanggalLahir)
        formData.append('kota_asal', users.kotaAsal)
        if (users.file) {
            formData.append('foto', users.file)
        }


        if (logged.token) {
            axios.post('http://localhost:8000/api/v1/manajemen-user/tambah', formData, {
                headers: {
                    Authorization: `Bearer ${logged.token}`,
                }
            })
                .then((res) => {
                    setMessage(res.data.message)
                    setTimeout(() => {
                        setMessage(null)
                        navigate('/admin/dashboard/manajemen-user')
                    }, 2000)
                })
                .catch((err) => {
                    console.error(err.response.data.errors)
                    setErrors(err.response.data.errors ? err.response.data.errors : null)
                    console.log(err.response)

                })
        }

    }


    useEffect(() => {

        if (!logged) {
            navigate('/');
        }

        if (logged.token) {
            axios.get('http://localhost:8000/api/v1/manajemen-kota', {
                headers: {
                    Authorization: `Bearer ${logged.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((res) => {
                    setKotas(res.data.kota)
                })
                .catch((err) => {
                    console.error(err.response.data.errors)
                })
        }
    }, [])

    return (
        <DashboardLayout>

            {message && (
                <div className="flex-flex-col z-10 absolute top-10 right-10 bg-green-500 p-4 w-64 rounded-lg">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nama" className="font-medium text-base">Nama</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="text"
                                name="nama"
                                placeholder="Masukkan Nama"
                                value={users.nama}
                                onChange={handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.name}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="h-24 w-24  ">
                                <img className="h-full w-full rounded-full object-cover object-center" src={users.foto ? users.foto : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                            </div>
                            <label htmlFor="foto" className="font-medium text-base">Foto</label>
                            <input
                                className="text-xs"
                                type="file"
                                name="foto"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium text-base">Email</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="email"
                                name="email"
                                placeholder="Masukkan Email"
                                value={users.email}
                                onChange={handleChange}
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
                                value={users.password}
                                onChange={handleChange}
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
                                value={users.tanggalLahir}
                                onChange={handleChange}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.tanggal_lahir}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="kotaAsal" className="font-medium text-base">Kota Asal</label>
                            <select
                                name="kotaAsal"
                                value={users.kotaAsal}
                                onChange={handleChange}
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                            >
                                <option className="text-xs" value="">Pilih Kota</option>
                                {kotas && kotas?.map((kota) => {
                                    return (
                                        <option className="text-xs" key={kota.id} value={kota.id}>{kota.kota}</option>
                                    )
                                })}
                            </select>
                            {errors && (
                                <p className='text-xs text-red-400'>{errors?.kota_asal}</p>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="bg-primary text-white px-5 py-2 rounded-lg">Submit</button>
                </form>
            </section>
        </DashboardLayout>
    )
}