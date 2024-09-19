import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import isLogged from "../../../../lib/isLogged";
import { useFormik } from "formik";
import LoadingButton from "../../../../components/LoadingButton";
import Button from "../../../../components/Button";
import { Loader } from "../../../../components/loader";
import { useDetailProduk } from "../../../../features/ManajemenProduk/useDetailProduk";
import { useUpdateProduk } from "../../../../features/ManajemenProduk/useUpdateProduk";
import { useDeleteProduk } from "../../../../features/ManajemenProduk/useDeleteProduk";
import { ConfirmModal } from "../../../../components/ConfirmModel";


export default function EditProduk() {

    const [previewFoto, setPreviewFoto] = useState(null);
    const params = useParams()
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoadingUpdateProduk, setIsLoadingUpdateProduk] = useState(false)
    const [isLoadingDeleteProduk, setIsLoadingDeleteProduk] = useState(false)
    const logged = isLogged();
    const navigate = useNavigate();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [resolveDelete, setResolveDelete] = useState(null);


    const { mutate: updateProduk } = useUpdateProduk({
        id: params.id,
        onError: (err) => {
            setIsLoadingUpdateProduk(false)
            setErrors(err?.response?.data?.errors)
            console.log(err.response)
        },
        onSuccess: (res) => {
            setIsLoadingUpdateProduk(false)
            setErrors(null)
            setMessage(res.data.message)
            setTimeout(() => {
                setMessage(null)
                navigate('/admin/dashboard/manajemen-produk')
            }, 2000)
        }
    })

    const { mutate: deleteProduk } = useDeleteProduk({
        onError: (err) => {
            setIsLoadingDeleteProduk(false)
            setErrors(err?.response?.data?.errors)
            console.log(err.response)
        },
        onSuccess: (res) => {
            setIsLoadingDeleteProduk(false)
            setErrors(null)
            setMessage(res.data.message)
            setTimeout(() => {
                setMessage(null)
                navigate('/admin/dashboard/manajemen-produk')
            }, 2000)
        }
    })


    const { data: produk, isLoading: isLoadingProduk } = useDetailProduk({
        id: params.id,
        onError: (err) => {
            console.error(err)
            setMessage(err?.response?.data?.message)
        },
    })


    const confirmDelete = () => {
        return new Promise((resolve) => {
            setIsConfirmOpen(true)
            setResolveDelete(() => resolve)
        });
    };

    const handleDelete = async () => {

        try {
            const confirmed = await confirmDelete()

            if (confirmed) {
                console.log('ya')
                console.log(params.id)
                setIsLoadingDeleteProduk(true)
                deleteProduk(formik.values.produkId)
            } else {
                return ''
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirm = (status) => {
        setIsConfirmOpen(false);
        if (resolveDelete) {
            resolveDelete(status);
        }
    };


    const formik = useFormik({
        initialValues: {
            produkId: '',
            namaProduk: '',
            fileFoto: null
        },
        onSubmit: () => {
            setIsLoadingUpdateProduk(true)
            const { namaProduk, produkId, fileFoto } = formik.values
            updateProduk({
                produkId,
                namaProduk,
                fileFoto
            })
        }
    })

    useEffect(() => {

        if (!logged) {
            navigate('/');
        }

        if (produk) {
            setPreviewFoto(produk?.foto)

            formik.setValues({
                produkId: produk?.produk_id,
                namaProduk: produk?.nama
            });
        }


    }, [produk])

    return (
        <>

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-green-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            {isLoadingProduk ? <Loader /> : (
                <>
                    <section className="flex items-center justify-between">
                        <h3 className="text-2xl text-balck font-medium">Edit Produk</h3>
                        <Link to="/admin/dashboard/manajemen-produk/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" fill="black" />
                            </svg>

                            Kembali
                        </Link>
                    </section>

                    <section className="w-[400px] shadow-md sm:rounded-lg px-5 py-4">
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="produkId" className="font-medium text-base">Produk ID</label>
                                    <input
                                        className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                        type="text"
                                        name="produkId"
                                        placeholder="Masukkan Nama Produk"
                                        value={formik.values.produkId}
                                        onChange={formik.handleChange}
                                    />
                                    {errors && (
                                        <p className='text-xs text-red-400'>{errors?.produk_id}</p>
                                    )}
                                </div>

                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="namaProduk" className="font-medium text-base">Nama Produk</label>
                                    <input
                                        className="text-xs bg-slate-100 border px-3 py-2 text-black rounded-md"
                                        type="text"
                                        name="namaProduk"
                                        placeholder="Masukkan Nama Produk"
                                        value={formik.values.namaProduk}
                                        onChange={formik.handleChange}
                                    />
                                    {errors && (
                                        <p className='text-xs text-red-400'>{errors?.nama_produk}</p>
                                    )}
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="h-32 w-44 rounded-md border">
                                    <img className="h-full w-full rounded-md object-cover object " src={previewFoto ? previewFoto : 'https://cdn-icons-png.flaticon.com/512/3081/3021994.png'} alt="" />
                                </div>
                                <label htmlFor="foto" className="font-medium text-base">Foto Produk</label>
                                <input
                                    className="text-xs"
                                    type="file"
                                    name="foto"
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        const imageUrl = URL.createObjectURL(file)
                                        formik.setFieldValue('fileFoto', file)
                                        setPreviewFoto(imageUrl)
                                    }}
                                />

                            </div>

                            <div className="w-full flex gap-2">
                                {isLoadingUpdateProduk ? <LoadingButton className='bg-primary text-white flex-1 ' classCustomLoader={'border-white'} >Simpan</LoadingButton> : <Button className='bg-primary text-white flex-1'>Simpan</Button>}
                                {isLoadingDeleteProduk ? <LoadingButton className='bg-red-600 text-white flex-1 ' classCustomLoader={'border-white'} >Hapus</LoadingButton> : <Button onClick={() => {
                                    handleDelete()
                                }} type="button" className='bg-red-600 text-white flex-1 ' >Hapus</Button>}
                            </div>

                        </form>
                    </section>
                </>
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onConfirm={handleConfirm}
            />
        </>
    )
}