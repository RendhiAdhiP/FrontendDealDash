import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import isLogged from "../lib/isLogged";


export default function DashboardLayout({ children }) {

    const [messageLoginSuccess, setMessageLoginSuccess] = useState(null);
    const logged = isLogged();
    const navigate = useNavigate();

    useEffect(() => {


        if (!logged) {
            navigate('/');
        }

        const message = localStorage.getItem('messageLoginSuccess');
        if (message) {
            setMessageLoginSuccess(message);
            
            setTimeout(() => {
                setMessageLoginSuccess(null);
            }, 3000);
        }

    }, []);

    



    return (
        <div className="flex w-screen">

            {messageLoginSuccess && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{messageLoginSuccess}</p>
                </div>
            )}

            <Sidebar />
            <main className="relative flex flex-col w-full py-8 px-8 gap-10 ml-56">
                <section className="w-full flex items-center justify-between gap-24">
                    <div className="flex flex-1 gap-2 border rounded-full px-3 py-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="fill-quaternary" d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
                        </svg>
                        <input  className="w-full" type="text" placeholder="Search" />
                    </div>
                    <div className="flex gap-10 items-center ">
                        <div className="flex gap-3">
                            <Link to='#' >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-quaternary" d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z" fill="black" />
                                </svg>
                            </Link>
                            <Link to='#'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-quaternary" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z" fill="black" />
                                </svg>
                            </Link>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="font-medium text-sm text-quaternary">{logged?.name}</span>
                            <div className="w-10 h-10 ">
                                <img className="w-full h-full rounded-full object-cover object-center" src={logged?.foto ? logged?.foto : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                {children}
            </main>
        </div>
    )
}