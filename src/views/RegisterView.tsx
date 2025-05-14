import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import type { RegisterForm } from "../types"
import ErrorMessage from "../components/ErrorMessage"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import api from "../config/axios"

export default function RegisterView() {
    const initialValues = {
        name: '',
        email: '',
        handle: '',
        role: 0,
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues })
    const password = watch('password')
    const handleRegister = async (formData: RegisterForm) => {
        try {
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data, {
                style: {
                    backgroundColor: "green",
                    color: "white"
                }
            })
            reset()
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
        }
    }

    return (
        <>
            <h1 className=' text-4xl text-white font-bold'>Crear Cuenta</h1>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10">
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: "Campo obligatorio"
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: "Campo obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: "Campo obligatorio"
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="role" className="text-2xl text-slate-500">Rol</label>
                    <select
                        id="role"
                        {...register('role', {
                            required: "Campo obligatorio"
                        })}
                        className="bg-slate-100 border-none p-3 rounded-lg text-slate-700"
                    >
                        <option value="0">Seleccione un rol</option>
                        <option value="2">Gerente</option>
                        <option value="3">Empleado</option>
                    </select>
                    {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "Campo obligatorio",
                            minLength: {
                                value: 8,
                                message: "El password debe tener minimo 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "Campo obligatorio",
                            validate: (value) => value == password || 'El password debe ser igual'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-yellow-500 p-3 text-lg w-full uppercase text-black rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>
            <nav className=' mt-10'>
                <Link
                    className=' text-center text-white text-lg block'
                    to="/auth/login">
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
            </nav>
        </>
    )
}