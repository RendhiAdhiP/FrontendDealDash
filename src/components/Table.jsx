import { Link } from "react-router-dom"


export const Table = ({ title, datas, row, links, emitDelete }) => {


    console.log(datas)
    // console.log(link2)
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-white border-b">
                <tr>
                    {title && title?.map((head, index) => (
                        <th scope="col" className="px-6 py-3" key={index}>
                            {head}
                        </th>
                    ))
                    }
                </tr>
            </thead>
            <tbody>
                {datas && datas?.map((data, index) => {

                    return (
                        <tr className="odd:bg-white even:bg-gray-50" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {index + 1}
                            </th>
                            {row && row?.map((row, index) => (

                                <td className="px-6 py-4" key={index}>
                                    {data[row]}
                                </td>
                            ))

                            }

                            <td className="flex px-6 py-4 gap-2">
                                {links?.detail && (
                                    <Link to={`${links?.detail}${data?.id}`} className="font-medium text-black-600 hover:underline">Detail</Link>

                                )}

                                {links?.edit && (
                                    
                                    <Link to={`${links?.edit}${data?.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                )

                                }
                                <button onClick={() => emitDelete(data?.id)} className="font-medium text-red-600 hover:underline">Hapus</button>
                            </td>
                        </tr>
                    )

                })

                }
                {/* {datas && datas?.map((data, index) => {

                    return (
                        <tr className="odd:bg-white even:bg-gray-50" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {index + 1}
                            </th>
                            <td className="px-6 py-4">
                                {data?.nama}
                            </td>
                            <td className="px-6 py-4">
                                {data?.email}
                            </td>
                            <td className="px-6 py-4">
                                {data?.asal_kota}
                            </td>
                            <td className="flex px-6 py-4 gap-2">
                                <Link to={`${link[0]}${data?.id}`} className="font-medium text-black-600 hover:underline">Detail</Link>
                                <Link to={`${link[1]}${data?.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                <button onClick={() => emitDelete(data?.id)} className="font-medium text-red-600 hover:underline">Hapus</button>
                            </td>
                        </tr>
                    )

                })

                } */}
            </tbody>
        </table>
    )

} 