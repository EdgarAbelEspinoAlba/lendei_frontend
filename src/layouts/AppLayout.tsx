import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/DevTreeAPI"
import { Navigate } from "react-router-dom"
import DevTree from "../components/DevTree"

export default function AppLayout() {
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false
    })

    if (isLoading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-black rounded-xl p-6 shadow-xl text-center">
                <img
                    src="/logoLendei.png"
                    alt="Cargando"
                    className="w-64 h-64 object-contain"
                />
                <div className="text-yellow-400 text-lg font-bold">Cargando...</div>
            </div>
        </div>
    )
    if (isError) return <Navigate to={'/auth/login'} />
    if (data) return <DevTree data={data} />
}