import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Toaster } from "sonner"
import NavigationTabs from "../components/NavigationTabs"
import { User } from "../types"
import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

type DevTreeProps = {
    data: User
}

export default function DevTree({ data }: DevTreeProps) {
    const location = useLocation()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const hideImageOnPaths = location.pathname.includes('/admin/profile')
    const [showProfileImage, setShowProfileImage] = useState(!hideImageOnPaths)

    useEffect(() => {
        setShowProfileImage(!location.pathname.includes('/admin/profile'))
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey:['user']})
        navigate('/auth/login', { replace: true })
    }
    
    return (
        <>
            <header className="bg-black py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logoLendei.png" className="w-40 block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-yellow-600 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={handleLogout}>Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-black  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />
                    <div className="flex justify-end md:mr-10 lg:mr-20">
                        <Link
                            className="font-bold text-center text-yellow-500 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener">Usuario : {data.name}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        {!showProfileImage && (
                            <div className="w-96 bg-black px-5 py-10 space-y-6 h-80">
                                <img src={data.image || "/logoLendei.png"} alt='Imagen de perfil del usuario'
                                    className='w-auto aspect-square rounded-full object-scale-down mx-auto' />
                            </div>
                        )}

                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}