import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export const Table = ({ title, datas, row, links, emitDelete, foto, redirectTo }) => {

    const navigate = useNavigate();
    const handleEdit = (id) => {
        if (redirectTo) {
            navigate(`${redirectTo}${id}`)
        }else{
            return;
        }
    }

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
                        <tr className={cn('odd:bg-white even:bg-gray-50',{'cursor-pointer': redirectTo})} key={index} onClick={() => handleEdit(data?.produk_id)}>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {index + 1}
                            </th>
                            {row && row?.map((row, index) => (

                                <td className="px-6 py-4" key={index}>
                                    {data[row]}
                                </td>
                            ))

                            }

                            {foto && (<td className="px-6 py-4">
                                <div className="w-32 h-24">
                                    <img src={data.foto} className="w-full h-full object-cover rounded-md" alt={`Product Image ${index}`} />
                                </div>
                            </td>)}

                            <td className="flex px-6 py-4 gap-2">
                                {links?.detail && (
                                    <Link to={`${links?.detail}${data?.id}`} className="font-medium text-black-600 hover:underline">Detail</Link>

                                )}

                                {links?.edit && (

                                    <Link to={`${links?.edit}${data?.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                )

                                }
                                {emitDelete && <button onClick={() => emitDelete(data?.produk_id)} className="font-medium text-red-600 hover:underline">Hapus</button>}
                            </td>
                        </tr>
                    )

                })

                }
            </tbody>
        </table>
    )

} 