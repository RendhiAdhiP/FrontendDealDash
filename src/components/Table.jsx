import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import isLogged from "../lib/isLogged";

export const Table = ({ title, datas = [], row, links, emitDelete, foto, redirectTo, pagination, handlePagination }) => {

    const navigate = useNavigate();
    const handleEdit = (id) => {
        if (redirectTo) {
            navigate(`${redirectTo}${id}`)
        } else {
            return;
        }
    }


    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-white border-b">
                    <tr>
                        {title && title?.map((head, index) => (
                            <th scope="col" className="px-6 py-3" key={index}>
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {Array.isArray(datas) && datas.length > 0 ? (
                        datas.map((data, index) => {

                            return (
                                <tr className={cn('odd:bg-white even:bg-gray-50', { 'cursor-pointer': redirectTo })} key={index} onClick={() => handleEdit(data?.produk_id)}>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    {row && row?.map((rowKey, index) => (
                                        <td className="px-6 py-4" key={index}>
                                            {(rowKey === 'harga' || rowKey == 'nominal_penjualan') ? (
                                                data[rowKey]?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                                            ) : (
                                                data[rowKey]
                                            )}
                                        </td>
                                    ))}

                                    {foto && (<td className="px-6 py-4">
                                        <div className="w-32 h-32">
                                            <img src={data.foto} className="w-full h-full object-cover rounded-md" alt={`Product Image ${index}`} />
                                        </div>
                                    </td>)}

                                    <td className="flex px-6 py-4 gap-2">
                                        {(links?.detail && (isLogged().role == 'Superadmin' || isLogged().role == 'Admin Create' || isLogged().role == 'Admin View')) && (
                                            <Link to={`${links?.detail}${data?.id}`} className="font-medium text-black-600 hover:underline">Detail</Link>

                                        )}

                                        {(links?.edit && (isLogged().role === 'Superadmin' || isLogged().role === 'Admin Create')) && (
                                            <Link to={`${links?.edit}${data?.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                        )}

                                        {(isLogged().role === 'Superadmin' || isLogged().role === 'Admin Create') && emitDelete && (
                                            <button onClick={() => emitDelete(data?.produk_id)} className="font-medium text-red-600 hover:underline">Hapus</button>
                                        )}

                                    </td>
                                </tr>
                            )

                        })
                    ) : (
                        <tr>
                            <td colSpan={title.length} className="text-center py-4">No data available</td>
                        </tr>
                    )}

                    {/* {datas && datas?.map((data, index) => {

                    })

                    } */}
                </tbody>
            </table>

            <div className="flex justify-end items-center mt-4 px-3 pb-5">

                <div className="flex space-x-2">
                    {pagination?.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePagination(link.url)}
                            disabled={!link.url}
                            className={`px-4 py-2 text-sm rounded-md ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )

} 