import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { Client } from '../types'
import { toast } from 'sonner'
import api from "../config/axios"
import { isAxiosError } from "axios"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export default function ClientsView() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Client>();
    const location = useLocation()
    const client = location.state as Client | undefined
    
    const handleClientRegister = async (formData: Client) => {
        try {
            const { data } = await api.post(`/client`, formData)
            toast.success(data, {
                style: {
                    backgroundColor: "green",
                    color: "white"
                }
            })
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

    useEffect(() => {
        if (client) {
          Object.entries(client).forEach(([key, value]) => {
            setValue(key as keyof Client, value);
          });
        }
      }, [client, setValue]);

    return (
        <form
            onSubmit={handleSubmit(handleClientRegister)}
            className="bg-white p-10 rounded-lg space-y-5">
            <legend className="text-xl text-slate-800 text-center">Información del Cliente</legend>
            <div className="flex items-center gap-4">
                <label htmlFor="nss">Número Seguro Social:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Sólo se aceptan números"
                    onInput={(e) => {
                        const value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        e.currentTarget.value = value.slice(0, 11);
                    }}
                    {...register('nss', {
                        required: "Campo obligatorio",
                        minLength: {
                            value: 11,
                            message: "El NSS debe tener minimo 11 caracteres"
                        }
                    })}
                />
                {errors.nss && <ErrorMessage>{errors.nss.message}</ErrorMessage>}

                <label htmlFor="credito">Crédito Infonavit:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Sólo se aceptan números"
                    onInput={(e) => {
                        const value = e.currentTarget.value.replace(/[^0-9]/g, '')
                        e.currentTarget.value = value.slice(0, 10)
                    }}
                    {...register('credito')}
                />
                {errors.credito && <ErrorMessage>{errors.credito.message}</ErrorMessage>}
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="rfc">RFC:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="RFC con homoclave"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '')
                        e.currentTarget.value = value.toUpperCase();
                        e.currentTarget.value = value.slice(0, 13);
                    }}
                    {...register('rfc', {
                        required: "Campo obligatorio",
                        minLength: {
                            value: 13,
                            message: "El RFC debe tener minimo 13 caracteres"
                        }
                    })}
                />
                {errors.rfc && <ErrorMessage>{errors.rfc.message}</ErrorMessage>}

                <label htmlFor="curp">CURP:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="CURP"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '')
                        e.currentTarget.value = value.toUpperCase()
                        e.currentTarget.value = value.slice(0, 18)
                    }}
                    {...register('curp', {
                        required: "Campo obligatorio",
                        minLength: {
                            value: 18,
                            message: "La CURP debe tener minimo 18 caracteres"
                        }
                    })}
                />
                {errors.curp && <ErrorMessage>{errors.curp.message}</ErrorMessage>}
            </div>

            <legend className="text-xl text-slate-800 text-center">Datos personales</legend>
            <div className="flex items-center gap-4">
                <label htmlFor="nombres">Nombre(s):</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Nombre(s) del cliente"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('nombre', {
                        required: "Campo obligatorio"
                    })}
                />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}

                <label htmlFor="paterno">Paterno:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Apellido paterno del cliente"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('paterno', {
                        required: "Campo obligatorio"
                    })}
                />
                {errors.paterno && <ErrorMessage>{errors.paterno.message}</ErrorMessage>}
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="materno">Materno:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Apellido materno del cliente"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('materno')
                    }
                />
                <label htmlFor="nacimiento">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Fecha de nacimiento del cliente"
                    {...register('nacimiento')
                    }
                />
            </div>
            <div className="flex items-center gap-4 w-full">
                <label htmlFor="calle">Calle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Calle, Avenida, etc."
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('calle')
                    }
                />
                <label htmlFor="exterior">Número:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Ext."
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    }}
                    {...register('exterior')
                    }
                />
                <label htmlFor="interior">Número:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Int."
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    }}
                    {...register('interior')
                    }
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="colonia">Colonia:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Colonia, fraccionamiento, etc"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('colonia')
                    }
                />
                <label htmlFor="ciudad">Ciudad:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Ciudad/Delegación"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('ciudad')
                    }
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="estado">Estado:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Estado de la república"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('estado')
                    }
                />
                <label htmlFor="cp">C.P.:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Código postal"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    }}
                    {...register('cp')
                    }
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Teléfono casa"
                    onInput={(e) => {
                        const value = e.currentTarget.value.replace(/[^0-9]/g, '')
                        e.currentTarget.value = value.slice(0, 10)
                    }}
                    {...register('telefono')}
                />
                <label htmlFor="celular">Celular:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Teléfono celular"
                    onInput={(e) => {
                        const value = e.currentTarget.value.replace(/[^0-9]/g, '')
                        e.currentTarget.value = value.slice(0, 10)
                    }}
                    {...register('celular')}
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="email">E-mail:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Correo eléctronico"
                    {...register('email', {
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "E-mail no válido",
                        },
                    })}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                <label htmlFor="password">Contreseña:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Contraseña portal Infonavit"
                    {...register('password')
                    }
                />
            </div>

            <legend className="text-xl text-slate-800 text-center">Adeudos & Gastos</legend>
            <div className="flex items-center gap-4">
                <label htmlFor="adeudo">Adeudo Infonavit:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="$0.00"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^0-9.]/g, '');
                        const parts = value.split('.');
                        if (parts.length > 2) {
                            value = parts[0] + '.' + parts[1];
                        }
                        const [intPart, decimalPart] = value.split('.');
                        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        e.currentTarget.value = decimalPart !== undefined
                            ? `$${formattedInt}.${decimalPart}`
                            : `$${formattedInt}`;
                    }}
                    {...register('adeudo')
                    }
                />
                <label htmlFor="agua">Agua:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="$0.00"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^0-9.]/g, '');
                        const parts = value.split('.');
                        if (parts.length > 2) {
                            value = parts[0] + '.' + parts[1];
                        }
                        const [intPart, decimalPart] = value.split('.');
                        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        e.currentTarget.value = decimalPart !== undefined
                            ? `$${formattedInt}.${decimalPart}`
                            : `$${formattedInt}`;
                    }}
                    {...register('agua')
                    }
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="luz">Luz:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="$0.00"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^0-9.]/g, '');
                        const parts = value.split('.');
                        if (parts.length > 2) {
                            value = parts[0] + '.' + parts[1];
                        }
                        const [intPart, decimalPart] = value.split('.');
                        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        e.currentTarget.value = decimalPart !== undefined
                            ? `$${formattedInt}.${decimalPart}`
                            : `$${formattedInt}`;
                    }}
                    {...register('luz')
                    }
                />
                <label htmlFor="predial">Predial:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="$0.00"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^0-9.]/g, '');
                        const parts = value.split('.');
                        if (parts.length > 2) {
                            value = parts[0] + '.' + parts[1];
                        }
                        const [intPart, decimalPart] = value.split('.');
                        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        e.currentTarget.value = decimalPart !== undefined
                            ? `$${formattedInt}.${decimalPart}`
                            : `$${formattedInt}`;
                    }}
                    {...register('predial')
                    }
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="infonavit">Crédito Infonavit:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="$0.00"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^0-9.]/g, '');
                        const parts = value.split('.');
                        if (parts.length > 2) {
                            value = parts[0] + '.' + parts[1];
                        }
                        const [intPart, decimalPart] = value.split('.');
                        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        e.currentTarget.value = decimalPart !== undefined
                            ? `$${formattedInt}.${decimalPart}`
                            : `$${formattedInt}`;
                    }}
                    {...register('infonavit')
                    }
                />
                <label htmlFor="gastos">Otros gastos:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="$0.00"
                    onInput={(e) => {
                        let value = e.currentTarget.value.replace(/[^0-9.]/g, '');
                        const parts = value.split('.');
                        if (parts.length > 2) {
                            value = parts[0] + '.' + parts[1];
                        }
                        const [intPart, decimalPart] = value.split('.');
                        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        e.currentTarget.value = decimalPart !== undefined
                            ? `$${formattedInt}.${decimalPart}`
                            : `$${formattedInt}`;
                    }}
                    {...register('gastos')
                    }
                />
            </div>
            <input
                type="submit"
                className="bg-yellow-500 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cliente'
            />
        </form>
    )
}