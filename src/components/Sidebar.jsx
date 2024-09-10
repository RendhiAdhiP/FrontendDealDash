import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



export default function Sidebar() {
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const location = useLocation();


    const handleLogout = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;

        if (token) {
            axios.post('http://localhost:8000/api/v1/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    // console.log(res)
                    setMessage(res.data.message)

                    setTimeout(() => {
                        setMessage(null)
                        navigate('/')
                        localStorage.removeItem('user');
                    }, 2000)


                })
                .catch((err) => {
                    console.error(err.response.data.message)
                })
        }

    }

    useEffect(() => {
        console.log(location.pathname)
    }, [location.pathname])

    return (
        <aside className="flex flex-col h-screen w-max fixed z-10">

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )} 


            <header className="h-32 flex justify-center items-center">
                <h1 className="text-primary text-2xl font-medium">Deal Dash</h1>
            </header>
            <nav className="flex flex-col w-full h-full bg-primary rounded-tr-[4rem] px-6">
                <ul className="flex flex-col gap-2 py-6 ">
                    <li className={['relative flex gap-2 p-2 items-center cursor-pointer ', location.pathname === '/admin/dashboard' ? 'before:block before:w-1 before:h-8 before:rounded-tr-xl before:rounded-br-xl before:bg-white before:absolute before:-left-6' : '']}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={[location.pathname === '/admin/dashboard' ? 'fill-white text-sm font-medium' : 'fill-white/60 text-sm font-medium']} d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H17V9H20C20.5523 9 21 9.44772 21 10V19ZM7 11V13H11V11H7ZM7 7V9H11V7H7Z" />
                        </svg>

                        <Link to="/admin/dashboard" className={[location.pathname == '/admin/dashboard' ? 'font-medium text-sm text-white' : 'font-medium text-sm text-white/60 ']}>Dashboard</Link>
                    </li>
                    <li className={['relative flex gap-2 p-2 items-center cursor-pointer ', location.pathname === '/admin/dashboard/manajemen-user' ? 'before:block before:w-1 before:h-8 before:rounded-tr-xl before:rounded-br-xl before:bg-white before:absolute before:-left-6' : '']}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={[location.pathname === '/admin/dashboard/manajemen-user' ? 'fill-white text-sm font-medium' : 'fill-white/60 text-sm font-medium']} d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z" />
                        </svg>
                        <Link to="/admin/dashboard/manajemen-user" className={[location.pathname == '/admin/dashboard/manajemen-user' ? 'font-medium text-sm text-white' : 'font-medium text-sm text-white/60']}>Manajemen User</Link>
                    </li>
                    <li className={['relative flex gap-2 p-2 items-center cursor-pointer ', location.pathname === '/admin/dashboard/manajemen-kota' ? 'before:block before:w-1 before:h-8 before:rounded-tr-xl before:rounded-br-xl before:bg-white before:absolute before:-left-6' : '']}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={[location.pathname === '/admin/dashboard/manajemen-kota' ? 'fill-white text-sm font-medium' : 'fill-white/60 text-sm font-medium']} d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z" />
                        </svg>
                        <Link to="/admin/dashboard/manajemen-kota" className={[location.pathname == '/admin/dashboard/manajemen-kota' ? 'font-medium text-sm text-white' : 'font-medium text-sm text-white/60']}>Manajemen Kota</Link>
                    </li>
                    <li className="flex gap-2 p-2 items-center cursor-pointer ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="rouded-full fill-white/60 " d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z" fill="black" />
                        </svg>
                        <Link onClick={handleLogout} on className="text-white/60 font-medium text-sm">Logout</Link>
                    </li>

                </ul>
            </nav>
        </aside>
    )

} 