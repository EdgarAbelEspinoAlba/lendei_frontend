import { isAxiosError } from "axios";
import api from "../config/axios";
import { Client, ClientSearchInput, User } from "../types";

export async function getUser() {
    try {
        const {data} = await api<User>(`/user`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(formData: User) {
    try {
        const {data} = await api.patch<string>(`/user`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadImage(file:File) {
    try {
        let formData = new FormData()
        formData.append('file', file)
        const { data: {image} } : {data: { image: string }} = await api.post('/user/image', formData)
        return image
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getClient(search: ClientSearchInput): Promise<Client> {
    try {
        const { data } = await api.post<Client>('/searchClient', search)
        return data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
      throw new Error('Error desconocido al buscar cliente.')
    }
  }

export async function updateClient(formData: Client) {
    try {
        console.log('Iniciando...')
        const {data} = await api.post<Client>(`/updateClient`, formData)
        console.log('Listo')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response)
            throw new Error(error.response.data.error)
        }
    }
}