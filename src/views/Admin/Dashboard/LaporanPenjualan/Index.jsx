import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import isLogged from "../../../../lib/isLogged";
import { Table } from "../../../../components/Table";
import { Loader } from "../../../../components/loader";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function Index() {

    const [message, setMessage] = useState(null)
    const logged = isLogged();
    const navigate = useNavigate();


    const { data: laporanPenjualan, isLoading, } = useQuery({
        queryFn: () => {
            return axiosInstance.get('/laporan-penjualan')
        },
        onError: (err) => {
            console.error(err)
            setMessage(err?.response?.data?.message)
        },
    })

    console.log(laporanPenjualan)



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

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <section>
                        <h3 className="text-2xl text-balck font-medium">Laporan Penjualan Produk</h3>
                    </section>

                    <section className="flex flex-col gap-5">
                        <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg gap-4">
                            <Table 
                                title={['No', 'Nama Produk','Sales','Jumlah Produk Terjual', 'Nominal Penjualan', 'Tanggal Penjualan',]} 
                                datas={laporanPenjualan?.data.data} 
                                row={['produk','sales','jumlah_produk_terjual','nominal_penjualan','tanggal_penjualan']}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    )
}