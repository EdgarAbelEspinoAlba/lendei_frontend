import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Client, ClientSearchInput } from "../types"
import { getClient } from "../api/DevTreeAPI"
import ClientInput from "../components/ClientInput"
import { toast } from 'sonner'

export default function SearchClientView() {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")

    const mutation = useMutation<Client, Error, ClientSearchInput>({
        mutationFn: getClient,
        onSuccess: (data) => {
            toast.success(`Cliente ${data.nombre} encontrado`, {
                style: {
                    backgroundColor: "green",
                    color: "white"
                }
            })
        },
        onError: (error: any) => {
            console.log(error.response?.code)
            if(error.response?.state=== 404){
                toast.error("Sesión expirada. Inicia sesión nuevamente.", {
                    style: {
                        backgroundColor: "red",
                        color: "white"
                    }
                })
                navigate("/auth/login")
                return
            } else {
                toast.error(error.message, {
                    style: {
                        backgroundColor: "red",
                        color: "white"
                    }
                })
            }
        }
    })

    const handleSearch = () => {
        const value = searchValue.trim()
        if (!value) return

        const isCurp = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/.test(value.toUpperCase())
        console.log('Es isCurp :', isCurp)
        const searchInput: ClientSearchInput = isCurp ? { curp: value } : { nss: value }
        console.log('Es searchInput :', searchInput)
        mutation.mutate(searchInput)
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Consultar Clientes</h1>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Buscar por NSS ó CURP"
                    value={searchValue}
                    className="flex-1 p-3 rounded-lg bg-slate-100 border-none shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '')
                        e.currentTarget.value = value.toUpperCase()
                        e.currentTarget.value = value.slice(0, 18)
                    }}
                />

                <button
                    className="bg-yellow-500 text-slate-800 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
                    onClick={handleSearch}
                >Buscar 🔍
                </button>

                <button
                    className="bg-yellow-500 text-slate-800 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
                    onClick={() => navigate("/admin/addClient")}
                >
                    + Cliente
                </button>
            </div>

            <div className="mt-8">
                {mutation.data ? (
                    <ClientInput 
                    client={mutation.data}
                    onClick={() => navigate("/admin/editClients", { state: mutation.data })} />
                ) : (
                    <p className="text-slate-600 italic">Aquí aparecerán los resultados de la búsqueda.</p>
                )}
            </div>
        </div>
    )
}
