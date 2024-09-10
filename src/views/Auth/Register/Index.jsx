
import { Link } from 'react-router-dom'
import Icon from '../../../assets/icons/iconLogin.png'

export default function Index() {


    return (
        <main className=" w-screen h-screen flex justify-center items-center">
            <div className="w-max h-max flex drop-shadowl border rounded-2xl ">
                <div className="flex-1 p-6">
                    <div className="flex relative top-4 left-8">
                        <h2 className='text-xl font-medium text-quaternary'>Deal Dash</h2>
                    </div>
                    <div className="w-[400px]">
                        <img src={Icon} alt="" />
                    </div>
                </div>
                <div className="w-96 flex flex-col items-center bg-primary rounded-tl-[4rem] rounded-bl-2xl rounded-tr-2xl rounded-br-2xl p-4">
                    <form className="flex flex-col w-4/5 justify-center gap-20">
                        <div className="flex flex-col gap-1 w-full mt-8">
                            <h3 className='text-white text-2xl font-medium'>Register Your Account</h3>
                            <p className='text-xs text-white font-normal'>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white text-sm font-regular">Email</label>
                                <input className="text-quaternary text-sm rounded-lg border w-full bg-tertiary p-2" type="email" placeholder='exampel@example.com' />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white text-sm font-regular">Password</label>
                                <input className="text-quaternary text-sm rounded-lg border w-full bg-tertiary p-2" type="password" placeholder='•••••••••••••' />
                            </div>
                            <button className='bg-tertiary rounded-lg p-2 mt-2 text-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}