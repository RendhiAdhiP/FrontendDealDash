import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import isLogged from "../../../../lib/isLogged";
import { Table } from "../../../../components/Table";


export default function ManajemenKota() {

    const [kotas, setKotas] = useState()
    const [message, setMessage] = useState(null)
    const logged = isLogged();
    const navigate = useNavigate();

    const handleDelete = (id) => {

        if (logged.token) {
            axios.delete(`http://localhost:8000/api/v1/manajemen-kota/hapus/${id}`, {
                headers: {
                    Authorization: `Bearer ${logged.token}`
                }
            }).then((res) => {
                setMessage(res.data.message)
                setTimeout(() => {
                    setMessage(null)
                },2000)
            })
                .catch((err) => {
                    console.error(err.response)
                })
        }
    }

    useEffect(() => {

        if (!logged) {
            navigate('/');
        }


        if (logged.token) {
            axios.get('http://localhost:8000/api/v1/manajemen-kota/', {
                headers: {
                    Authorization: `Bearer ${logged.token}`
                }
            })
                .then((res) => {
                    setKotas(res.data.kota)

                })
                .catch((err) => {
                    console.error(err.response)
                })
        }


    }, [kotas])

    return (
        <DashboardLayout>

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            <section>
                <h3 className="text-2xl text-balck font-medium">Manajemen User</h3>
            </section>

            <section className="flex flex-col gap-5">

                <Link to='/admin/dashboard/manajemen-kota/tambah-kota' className="flex gap-2 px-3 py-2 bg-primary w-max rounded-lg text-white text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-white" d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" fill="black" />
                    </svg>
                    Tambah Kota
                </Link>

                <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg gap-4">
                    <Table title={['No', 'Kota', 'Action']} datas={kotas} row={['kota']} links={{edit:'/admin/dashboard/manajemen-kota/kota-edit/'}} emitDelete={handleDelete} />
                </div>
            </section>

        </DashboardLayout>
    )
}