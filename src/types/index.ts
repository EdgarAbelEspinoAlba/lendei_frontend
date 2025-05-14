export type User = {
    handle : string,
    name : string,
    role : Number,
    email : string,
    password : string,
    description : string,
    image : string
}

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name' | 'role'> & {
    password: string, 
    password_confirmation: string, 
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetworks = {
    id: Number,
    name: string,
    url: string,
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetworks, 'name' | 'url' | 'enabled'>

export type Client = {
    nss:string,
    credito:string,
    rfc:string,
    curp:string,
    nombre:string,
    paterno:string,
    materno: string,
    nacimiento: Date,
    calle: string,
    interior: string,
    exterior: string,
    colonia: string,
    ciudad: string,
    estado: string,
    cp: string,
    email: string,
    password: string,
    adeudo: number,
    agua: number,
    luz: number,
    predial: number,
    infonavit: number,
    gastos: number
}

export type ClientSearch = Pick<Client, 'nombre' | 'paterno' | 'materno' | 'adeudo' | 'infonavit'>

export type ClientSearchInput = {
    nss?: string
    curp?: string
  }