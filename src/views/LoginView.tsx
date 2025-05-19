{/*import { Link, useNavigate } from 'react-router-dom'*/ }
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { LoginForm } from '../types'
import api from '../config/axios'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useState } from 'react'

export default function LoginView() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const initialValues: LoginForm = {
        email: '',
        password: ''
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const handleLogin = async (formData: LoginForm) => {
        setLoading(true)
        setTimeout(async () => {
            try {
                const { data } = await api.post('/auth/login', formData, {
                    withCredentials: true
                })

                localStorage.setItem('AUTH_TOKEN', data)
                navigate('/admin')
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    toast.error(error.response?.data.error, {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: 'bold'
                        }
                    })
                }
            } finally {
                setLoading(false)
            }
        }, 1000)
    }

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white px-10 py-6 rounded-xl shadow-lg text-center text-2xl font-semibold space-y-4">
                        <img
                            src="/logoLendei.png"
                            alt="Cargando"
                            className="mx-auto w-20 h-20"
                        />
                        <p>Un momento por favor... ⏳</p>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">Usuario:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-yellow-500 p-3 text-lg w-full uppercase text-black rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                    disabled={loading}
                />
            </form>
            {
                /*
                <nav className='mt-10'>
                    <Link
                        className='text-center text-white text-lg block'
                        to="/auth/register">
                        ¿No tienes una cuenta? Crear cuenta
                    </Link>
                </nav>
                */
            }
        </>
    )
}