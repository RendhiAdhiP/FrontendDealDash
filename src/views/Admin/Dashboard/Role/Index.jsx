import { Link, useNavigate } from "react-router-dom"
import { Table } from "../../../../components/Table"
import { Loader } from "../../../../components/loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useEffect, useState } from "react";
import isLogged from "../../../../lib/isLogged";


const Index = () => {

    const [message, setMessage] = useState(null)
    const logged = isLogged();
    const navigate = useNavigate();

    const { data: roles, isLoading, refetch: refetchUsers } = useQuery({
        queryFn: () => {
            const res = axiosInstance.get('/role/')
            return res
        },
        onError: (err) => {
            console.error(err)
        }
    })

    console.log(roles)

    useEffect(() => {
        if (!logged) {
            navigate('/');  
        }

    }, [])

    return (

        <>
            {/* {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )} */}

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <section>
                            <h3 className="text-2xl text-balck font-medium">Role</h3>
                        </section>

                        <section className="flex flex-col gap-5">

                            <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg gap-4">
                                <Table title={['No', 'Role']}
                                    row={['name']}
                                    datas={roles?.data?.data}
                                />
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}


export default Index