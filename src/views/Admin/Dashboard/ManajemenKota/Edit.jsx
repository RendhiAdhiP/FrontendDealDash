import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import isLogged from "../../../../lib/isLogged";



export default function EditKota() {


    const [kota, setKota] = useState(null)
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)

    const logged = isLogged();
    const navigate = useNavigate();
    const params = useParams()



    const handleSubmit = (e) => {
        e.preventDefault()



        if (logged.token) {
            axios.post(`http://localhost:8000/api/v1/manajemen-kota/update/${params.id}`, { kota: kota }, {
                headers: {
                    Authorization: `Bearer ${logged.token}`,
                }
            })
                .then((res) => {
                    setMessage(res.data.message)
                    setTimeout(() => {
                        setMessage(null)
                        navigate('/admin/dashboard/manajemen-kota')
                    }, 2000)
                })
                .catch((err) => {
                    console.error(err)
                    setErrors(err.response.data.errors)

                })
        }

    }



    useEffect(() => {

        if (!logged) {
            navigate('/');
        }

        if (logged.token) {
            axios.get(`http://localhost:8000/api/v1/manajemen-kota/edit/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${logged.token}`
                }
            })
                .then((res) => {

                    setKota(res.data.kota.kota);
                    // setKota();

                })
                .catch((err) => {
                    console.error(err.response);
                });
        }


    }, [])

    return (
        <DashboardLayout>

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

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
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nama" className="font-medium text-base">Nama Kota</label>
                            <input
                                className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                type="text"
                                name="nama_kota"
                                placeholder="Masukkan Nama Kota"
                                value={kota}
                                onChange={(e) => setKota(e.target.value)}
                            />
                            {errors && (
                                <p className='text-xs text-red-400'>{errors.name}</p>
                            )}
                        </div>

                    </div>

                    <button type="submit" className="bg-primary text-white px-5 py-2 rounded-lg">Save</button>
                </form>
            </section>
        </DashboardLayout>
    )
}