import { AdjustmentsHorizontalIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Clientes', href: '/admin', icon: UserIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: AdjustmentsHorizontalIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value)
    }

    return (
        <div className='mb-5'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
                    onChange={ handleChange }
                >
                    {tabs.map((tab) => (
                        <option 
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-yellow-300">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-yellow-700 text-yellow-700'
                                        : 'border-transparent text-yellow-200 hover:border-yellow-700 hover:text-yellow-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-xl'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-yellow-700' : 'text-yellow-100 group-hover:text-yellow-700',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}