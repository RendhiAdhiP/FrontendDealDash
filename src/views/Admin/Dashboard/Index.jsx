import { Outlet, useLocation } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { Loader } from "../../../components/loader";
import { useEffect } from "react";


export default function Index() {


    const location = useLocation();

    // Daftar path yang seharusnya tidak menampilkan layout parent
    const pathsWithoutLayout = [
        '/admin/dashboard/manajemen-user',
        '/admin/dashboard/manajemen-user/user/:id',
        '/admin/dashboard/manajemen-user/tambah-user',
        '/admin/dashboard/manajemen-user/user-edit/:id',

        '/admin/dashboard/manajemen-kota',
        '/admin/dashboard/manajemen-kota/tambah-kota',
        '/admin/dashboard/manajemen-kota/kota-edit/:id',

        '/admin/dashboard/manajemen-produk',
        '/admin/dashboard/manajemen-produk/tambah',
        '/admin/dashboard/manajemen-produk/edit/:id',
        '/admin/dashboard/manajemen-produk/history',
        '/admin/dashboard/manajemen-produk/tambah-stok',

        '/admin/dashboard/role',
        '/admin/dashboard/laporan-penjualan',
    ];

    // Cek apakah path saat ini ada di daftar pathsWithoutLayout
    const shouldRenderLayout = !pathsWithoutLayout.some(path => location.pathname.startsWith(path));


    const { data:dashboard, isLoading, refetch:refetchDashboard } = useQuery({
        queryKey: 'dashboard',
        queryFn: () => {
            return axiosInstance.get('/')
        },
        onError: (err) => {
            console.error(err)
        },
        refetchOnWindowFocus: true,
    })

    useEffect(() => {
        if (location.pathname === '/admin/dashboard') {
            refetchDashboard();
        }
    }, [location.pathname, refetchDashboard]);

    return (
        <DashboardLayout>

            {shouldRenderLayout ? (
                <>
                    <section>
                        <h3 className="text-2xl text-balck font-medium">Dashboard</h3>
                    </section>
                    {isLoading ? (
                       <Loader />
                    ) : dashboard ? (
                        <section className="grid grid-cols-4 gap-4 gap-y-8">

                            <div className="py-4 px-5 flex flex-col gap-4 shadow-md rounded-xl col-span-4">
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="p-3 bg-emerald-400 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-white" d="M2.00488 8.99979H21.0049C21.5572 8.99979 22.0049 9.4475 22.0049 9.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V8.99979ZM3.00488 2.99979H18.0049V6.99979H2.00488V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979ZM15.0049 13.9998V15.9998H18.0049V13.9998H15.0049Z" fill="black" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm text-black font-medium">Total Pendapatan</h3>
                                </div>
                                <span className="text-xl font-bold">
                                    {dashboard?.data?.data?.TotalPendapatan
                                        ? dashboard.data.data.TotalPendapatan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                                        : 'Rp. 0'}
                                </span>
                            </div>

                            <div className=" py-4 px-5 flex flex-col gap-4 shadow-md rounded-xl">
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="p-3 bg-secondary rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-white" d="M20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V3C3.00488 2.44772 3.4526 2 4.00488 2H20.0049C20.5572 2 21.0049 2.44772 21.0049 3V21C21.0049 21.5523 20.5572 22 20.0049 22ZM9.00488 6H7.00488V8C7.00488 10.7614 9.24346 13 12.0049 13C14.7663 13 17.0049 10.7614 17.0049 8V6H15.0049V8C15.0049 9.65685 13.6617 11 12.0049 11C10.348 11 9.00488 9.65685 9.00488 8V6Z" fill="black" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm text-black font-medium">Total Jenis Produk</h3>
                                </div>
                                <span className="text-xl font-bold">{dashboard?.data.data.JenisProduk ? dashboard?.data.data.JenisProduk : 0}</span>
                            </div>
                            <div className=" py-4 px-5 flex flex-col gap-4 shadow-md rounded-xl">
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="p-3 bg-orange-400 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-white" d="M21 9.5V12.5C21 14.9853 16.9706 17 12 17C7.02944 17 3 14.9853 3 12.5V9.5C3 11.9853 7.02944 14 12 14C16.9706 14 21 11.9853 21 9.5ZM3 14.5C3 16.9853 7.02944 19 12 19C16.9706 19 21 16.9853 21 14.5V17.5C21 19.9853 16.9706 22 12 22C7.02944 22 3 19.9853 3 17.5V14.5ZM12 12C7.02944 12 3 9.98528 3 7.5C3 5.01472 7.02944 3 12 3C16.9706 3 21 5.01472 21 7.5C21 9.98528 16.9706 12 12 12Z" fill="black" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm text-black font-medium">Total Stok Produk</h3>
                                </div>
                                <span className="text-xl font-bold">{dashboard?.data.data.StokBarang ? dashboard?.data.data.StokBarang : 0}</span>
                            </div>
                            <div className=" py-4 px-5 flex flex-col gap-4 shadow-md rounded-xl">
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="p-3 bg-purple-400 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-white" d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5C8 9.11929 6.88071 8 5.5 8C4.11929 8 3 9.11929 3 10.5C3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8C19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056C18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z" fill="black" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm text-black font-medium">Total Sales</h3>
                                </div>
                                <span className="text-xl font-bold">{dashboard?.data.data.JumlahSales ? dashboard?.data.data.JumlahSales : 0}</span>
                            </div>
                            <div className=" py-4 px-5 flex flex-col gap-4 shadow-md rounded-xl">
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="p-3 bg-blue-400 rounded-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="fill-white" d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z" fill="black" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm text-black font-medium">Total Produk Terjual</h3>
                                </div>
                                <span className="text-xl font-bold">{dashboard?.data.data.JumlahProdukTerjual ? dashboard?.data.data.JumlahProdukTerjual : 0}</span>
                            </div>
                        </section>
                    ) : (
                        <p>Error loading data</p>
                    )

                    }
                </>
            ) : (
                <Outlet />
            )}

        </DashboardLayout>
    )
}