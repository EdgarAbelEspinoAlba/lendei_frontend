import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from "react-router-dom"
import { Client } from "../types"
import { toast } from "sonner"
import ErrorMessage from '../components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { updateClient } from '../api/DevTreeAPI'

export default function EditClientsView() {
    const location = useLocation()
    const navigate = useNavigate()
    const client = location.state as Client
    const fecha = new Date(client.nacimiento)
    const dd = String(fecha.getUTCDate()).padStart(2, '0')
    const mm = String(fecha.getUTCMonth() + 1).padStart(2, '0')
    const yyyy = fecha.getUTCFullYear()
    const birthDay = `${dd}/${mm}/${yyyy}`

    const { register, handleSubmit, formState: { errors } } = useForm<Client>({
        defaultValues: client
    })

    const mutation = useMutation({
        mutationFn: updateClient,
        onSuccess: (data) => {
            toast.success(`Cliente modificado correctamente ${data?.nombre}`, {
                style: {
                    backgroundColor: "green",
                    color: "white"
                }
            })
            navigate('/admin')
        },
        onError: (error: Error) => {
            toast.error(error.message, {
                style: {
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: 'bold'
                }
            })
        }
    })


    return (
        <form
            onSubmit={handleSubmit((formData) => {
                const cleanedFormData = {
                    ...formData,
                }

                mutation.mutate(cleanedFormData)
            })}
            className="bg-white p-10 rounded-lg space-y-5">
            <legend className="text-xl text-slate-800 text-center">Información del Cliente</legend>
            <div className="flex items-center gap-4">
                <label htmlFor="nss">Número Seguro Social:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Sólo se aceptan números"
                    defaultValue={client?.nss}
                    readOnly
                />

                <label htmlFor="credito">Crédito Infonavit:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Sólo se aceptan números"
                    defaultValue={client?.credito}
                    readOnly
                />
                {errors.credito && <ErrorMessage>{errors.credito.message}</ErrorMessage>}
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="rfc">RFC:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="RFC con homoclave"
                    defaultValue={client?.rfc}
                    readOnly
                />

                <label htmlFor="curp">CURP:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="CURP"
                    defaultValue={client?.curp}
                    readOnly
                />
            </div>

            <legend className="text-xl text-slate-800 text-center">Datos personales</legend>
            <div className="flex items-center gap-4">
                <label htmlFor="nombres">Nombre(s):</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Nombre(s) del cliente"
                    defaultValue={client?.nombre}
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
                    defaultValue={client?.paterno}
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
                    defaultValue={client?.materno}
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    }}
                    {...register('materno')
                    }
                />
                <label htmlFor="nacimiento">Fecha de Nacimiento:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2 flex-1"
                    placeholder="Fecha de nacimiento del cliente"
                    defaultValue={birthDay}
                    {...register('nacimiento')
                    }
                    readOnly
                />
            </div>
            <div className="flex items-center gap-4 w-full">
                <label htmlFor="calle">Calle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Calle, Avenida, etc."
                    defaultValue={client?.calle}
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
                    defaultValue={client?.exterior}
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
                    defaultValue={client?.interior}
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
                    defaultValue={client?.colonia}
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
                    defaultValue={client?.ciudad}
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
                    defaultValue={client?.estado}
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
                    defaultValue={client?.cp}
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
                    defaultValue={client?.email}
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
                    defaultValue={client?.password}
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
                    defaultValue={client?.adeudo}
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
                    defaultValue={client?.agua}
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
                    defaultValue={client?.luz}
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
                    defaultValue={client?.predial}
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
                    defaultValue={client?.infonavit}
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
                    defaultValue={client?.gastos}
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
                value='Modificar Cliente'
            />
        </form>
    )
}
