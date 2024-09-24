import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../../assets/icons/iconLogin.png'
import background from './../../../assets/images/background1.jpg'
import { useEffect, useState } from 'react'
import isLogged from '../../../lib/isLogged'
import  LoadingButton  from '../../../components/LoadingButton'
import  Button  from '../../../components/Button'
import { useFormik } from 'formik'
import { useLogin } from '../../../features/auth/useLogin'


export default function Index() {


    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const logged = isLogged();
    const navigate = useNavigate();

    const { mutate: loginResponse } = useLogin({
        onError: (err) => {
            setIsLoading(false)
            setErrors(err.response.data.errors)
            setMessage(err.response.data.message)
        },
        onSuccess: (res) => {
            setIsLoading(false)
            setMessage(null)
            setErrors(null)
            localStorage.setItem('user', JSON.stringify(res.data.data))
            localStorage.setItem('messageLoginSuccess', JSON.stringify(res.data.message))
            navigate('/admin/dashboard')
            setTimeout(() => {
                localStorage.removeItem('messageLoginSuccess')
            }, 2000)
        }
    })


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            setIsLoading(true)
            const { email, password } = formik.values
            console.log(values)
            loginResponse({
                email,
                password
            })

        }
    })

    useEffect(() => {

        if (logged) {
            navigate('/admin/dashboard')
        }
    }, [])


    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    useEffect(() => {

        if (logged) {
            navigate('/admin/dashboard')
        }

    }, [])



    return (
        <main className=" w-screen h-screen flex justify-center items-center " style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`, backgroundSize: 'cover', }} >

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-red-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            <div className="w-max h-max flex drop-shadowl border rounded-2xl backdrop-blur-sm bg-white">
                <div className="flex-1 p-6 white">
                    <div className="flex relative top-4 left-8">
                        <h2 className='text-xl font-medium text-quaternary'>Deal Dash</h2>
                    </div>
                    <div className="w-[400px]">
                        <img src={Icon} alt="" />
                    </div>
                </div>
                <div className="w-96 flex flex-col items-center bg-primary rounded-tl-[4rem] rounded-bl-2xl rounded-tr-2xl rounded-br-2xl p-4">
                    <form className="flex flex-col w-4/5 justify-center gap-20 " onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-1 w-full mt-8">
                            <h3 className='text-white text-2xl font-medium'>Login Your Account</h3>
                            <p className='text-xs text-white font-normal'>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white text-sm font-regular">Email</label>
                                <input onChange={handleFormInput} className="text-black text-sm rounded-lg border w-full bg-white p-2 " value={formik.values.email} name='email' type="email" placeholder='exampel@example.com' />
                                {errors && (
                                    <p className='text-xs text-red-200'>{errors?.email}</p>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white text-sm font-regular">Password</label>
                                <input onChange={handleFormInput} className="text-black text-sm rounded-lg border w-full bg-white p-2 " value={formik.values.password} name='password' type="password" placeholder='•••••••••••••' />
                                {errors && (
                                    <p className='text-xs text-red-200'>{errors?.password}</p>
                                )}
                            </div>
                            {isLoading ? <LoadingButton classCustomLoader={'border-[#292424]'}>Login</LoadingButton> : <Button>Login</Button>}
                            {/* <Link to='/register' className='underline text-xs text-white text-right '>Create New Account?</Link> */}
                            <Link to='#' className='underline text-xs text-white text-right '>Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}