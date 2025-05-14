import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevTreeAPI'
import { toast } from 'sonner'

export default function ProfileView() {
    const queryClient = useQueryClient()
    const dataClient:User = queryClient.getQueryData(['user'])!
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            'handle': dataClient.handle,
            'description': dataClient.description
        }
    })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {toast.error(error.message, {
            style: {
              backgroundColor: "red",
              color: "white"
            }
          })},
        onSuccess: (result) => {
            toast.success(result, {
                style: {
                  backgroundColor: "green",
                  color: "white"
                }
              })
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })

    const updateImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {toast.error(error.message, {
            style: {
              backgroundColor: "red",
              color: "white"
            }
          })},
        onSuccess: (result) => {
            toast.success('Se ha guardado correctamente la imagen', {
                style: {
                  backgroundColor: "green",
                  color: "white"
                }
              })
            queryClient.setQueryData(
                ['user'],
                (prevData : User) => {
                    return {
                        ...prevData,
                        image : result
                    }
                }
            )
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        try {
            if(e.target.files){
                updateImageMutation.mutate(e.target.files[0])
            }  
        } catch (error) {
            toast.error('Ha ocurrido un error, contacte al administrador.', {
                style: {
                    backgroundColor: "red",
                    color: "white"
                  }
            })
        }        
    }

    const handleUserProfileForm = (formData:ProfileForm) => {
        const user: User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}>
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle">Usuario:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El nombre de usuario es obligatorio"
                    })
                    }
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description')
                    }
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="imagen">Imagen de perfil:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-yellow-500 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}