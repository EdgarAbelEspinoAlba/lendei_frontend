import { Outlet } from "react-router-dom"
import { Toaster } from 'sonner'

export default function AuthLayout(){
    return (
        <>
            <div className=' bg-black min-h-screen'>
                <div className=' max-w-lg mx-auto pt-10 px-5'>
                    <img src='/logoLendei.png' alt='Logotipo Lendei'/>
                    <div className=" py-10">
                        <Outlet/>
                    </div>
                </div>
            </div>

            <Toaster position='bottom-right'/>
        </>
    )
}