import { useEffect, useState } from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import isLogged from "../../../../lib/isLogged";



export default function Detail() {

    const [detailUser, setDetailUser] = useState()
    const params = useParams()
    const logged = isLogged();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null)

    const getDetailUser = () => {

        if (logged.token) {
            axios.get(`http://localhost:8000/api/v1/manajemen-user/detail/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${logged.token}`
                }
            })
                .then((res) => {
                    setDetailUser(res.data.user)
                })
                .catch((err) => {
                    console.error(err.response)
                })
        }


    }

    const handleDelete = (id) => {

        if (logged.token) {
            axios.delete(`http://localhost:8000/api/v1/manajemen-user/hapus/${id}`, {
                headers: {
                    Authorization: `Bearer ${logged.token}`,
                }
            }).then((res) => {
                setMessage(res.data.message)
                setTimeout(() => {
                    setMessage(null)
                    navigate('/admin/dashboard/manajemen-user')
                }, 2000)
            })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    useEffect(() => {

        if (!logged) {
            navigate('/');
        }

        getDetailUser()

    }, [])

    return (
        <DashboardLayout>


            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            <section className="flex items-center justify-between">
                <Link to="/admin/dashboard/manajemen-user/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" fill="black" />
                    </svg>

                    Kembali
                </Link>

            </section>

            <section className="w-full flex flex-col shadow-md sm:rounded-lg gap-8">
                <div className="w-full flex gap-10 px-5 py-4">
                    <div className="w-36 h-36">
                        <img className="w-full h-full rounded-full object-cover object-center" src={detailUser?.foto ? detailUser?.foto : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                    </div>
                    <div className="flex flex-col gap-10">
                        <span className="text-3xl font-medium mt-4">{detailUser?.nama}</span>

                        <div className="flex flex-wrap gap-32">
                            <div className="flex-1 flex flex-col">
                                <span className="text-lg font-medium">Email</span>
                                <span className="text-sm">{detailUser?.email}</span>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-lg font-medium">Kota Asal</span>
                                <span className="text-sm">{detailUser?.kota_asal}</span>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-lg font-medium w-max">Tanggal Lahir</span>
                                <span className="text-sm">{detailUser?.tanggal_lahir}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end gap-4 py-4 px-5">
                    <Link to={`/admin/dashboard/manajemen-user/user-edit/${detailUser?.id}`} className="bg-primary text-white px-5 py-1 rounded-lg" >Edit</Link>
                    <button onClick={() => handleDelete(detailUser?.id)} className="bg-red-500 text-white px-5 py-1 rounded-lg" >Hapus</button>

                </div>
            </section>

        </DashboardLayout>
    )
}