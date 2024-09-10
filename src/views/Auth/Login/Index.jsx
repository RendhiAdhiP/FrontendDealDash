import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../../assets/icons/iconLogin.png'
import background from './../../../assets/images/background1.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import isLogged from '../../../lib/isLogged'

export default function Index() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const logged = isLogged();
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }
        axios.post('http://localhost:8000/api/v1/auth/login', data)
            .then((res) => {
                console.log(res.data)
                
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('messageLoginSuccess', JSON.stringify(res.data.message))
                navigate('/admin/dashboard')

                setTimeout(()=>{
                    localStorage.removeItem('messageLoginSuccess')
                },2000)

            })
            .catch((err) => {

                if (err.response.data.message) {
                    setMessage(err.response.data.message)

                    if(message){
                        setTimeout(()=>{
                            setMessage(null)
                        },3000)
                    }
                }


                if (err.response.data.errors) {
                    setErrors(err.response.data.errors)
                }
                
                // setMessage(err.response.data.)
            })
    }

    useEffect(()=>{

        if(logged){
            navigate('/admin/dashboard')
        }

    })


    return (
        <main className=" w-screen h-screen flex justify-center items-center " style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`, backgroundSize: 'cover',  }} >

            {message && (
                <div className="flex-flex-col z-10 fixed top-10 right-10 bg-red-500 p-4 w-max rounded-lg">
                    <p className='text-white'>{message}</p>
                </div>
            )}

            <div className="w-max h-max flex drop-shadowl border rounded-2xl backdrop-blur-sm bg-white">
                <div className="flex-1 p-6 white">
                    <div className="flex relative top-4 left-8">
                        {/* <svg width="36" height="36" viewBox="0 0 5791 4891" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M5406.13 0L5791 384.869H3886.62L4846.31 2549.14C5016.25 2919.01 4841.31 3193.91 4586.39 3193.91H3636.7L3906.62 3813.71C3666.66 3669.74 3530.79 3626.28 3286.82 3593.78L3111.87 3193.91H792.626L47.8674 1544.47C-87.0884 1249.57 72.8596 904.692 407.751 904.692H2642.03L3491.75 2814.04H4451.44L3441.77 534.82C3361.79 339.887 3361.79 0 3771.66 1.31436e-08L5406.13 0ZM502.719 1354.54H2322.13L2951.92 2804.05H1137.51L502.719 1354.54Z" fill="#413CF0" />
                            <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M2966.92 3813.71C2637.03 4258.55 4426.45 5078.27 4461.43 4588.44C4495.63 4109.72 3201.84 3518.81 2966.92 3813.71ZM3231.83 3973.65C3056.89 4143.59 4106.55 4778.38 4161.53 4478.48C4216.51 4178.58 3406.78 3803.71 3231.83 3973.65Z" fill="#413CF0" />
                            <path fill="white" d="M1242.48 3733.73H2836.96C2759.34 3887.82 2748.51 3972.63 2836.96 4118.6H1632.35C1592.37 4038.63 1407.43 3828.7 1242.48 3733.73Z" fill="#413CF0" />
                            <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M607.686 3603.78C962.571 3343.86 2107.2 4528.46 1777.31 4848.35C1362.44 5133.26 272.795 3908.67 607.686 3603.78ZM832.613 3863.69C997.56 3732.87 1752.31 4353.52 1562.38 4603.44C1282.47 4848.35 667.667 3994.51 832.613 3863.69Z" fill="#413CF0" />
                            <path fill="white" d="M982.564 1639.44L2062.21 1629.45L2432.09 2489.15C2217.06 2173.05 1977.24 1899.35 1892.27 1839.37C1797.3 1794.39 1392.23 1709.89 982.564 1639.44Z" fill="#413CF0" />
                        </svg> */}
                        <h2 className='text-xl font-medium text-quaternary'>Deal Dash</h2>
                    </div>
                    <div className="w-[400px]">
                        <img src={Icon} alt="" />
                    </div>
                </div>
                <div className="w-96 flex flex-col items-center bg-primary rounded-tl-[4rem] rounded-bl-2xl rounded-tr-2xl rounded-br-2xl p-4">
                    <form className="flex flex-col w-4/5 justify-center gap-20 " onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1 w-full mt-8">
                            <h3 className='text-white text-2xl font-medium'>Login Your Account</h3>
                            <p className='text-xs text-white font-normal'>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white text-sm font-regular">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} className="text-black text-sm rounded-lg border w-full bg-tertiary p-2" type="email" placeholder='exampel@example.com' />
                                {errors && (
                                    <p className='text-xs text-red-400'>{errors.email}</p>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white text-sm font-regular">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} className="text-black text-sm rounded-lg border w-full bg-tertiary p-2" type="password" placeholder='•••••••••••••' />
                                {errors && (
                                    <p className='text-xs text-red-400'>{errors.password}</p>
                                )}
                            </div>
                            <button type='submit' className='bg-tertiary rounded-lg p-2 mt-2 text-primary'>Login</button>
                            <Link to='#' className='underline text-xs text-white text-right '>Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}