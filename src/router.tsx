import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
/*import LinkTreeView from './views/LinkTreeView'*/
import ProfileView from './views/ProfileView'
import ClientsView from './views/ClientsView'
import SearchClientView from './views/SearchClientView'
import EditClientsView from './views/EditClientsView'

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element = {<LoginView />} />
                    <Route path='/auth/register' element = {<RegisterView />} />
                </Route>

                <Route path='/admin' element={<AppLayout/>}>
                    <Route index={true} element = {<SearchClientView />} />
                    <Route path='addClient' element = {<ClientsView />} />
                    <Route path='profile' element = {<ProfileView />} />
                    <Route path='editClients' element = {<EditClientsView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}