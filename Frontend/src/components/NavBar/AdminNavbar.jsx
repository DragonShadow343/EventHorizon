import { NavLink } from 'react-router'

const AdminNavbar = ({className}) => {
    return (
    <>
        <nav className={`flex shadow-xl h-20 w-screen mx-auto px-20 items-center justify-between ${className}`}>

            <NavLink to="/">
                <h1 className='text-2xl'>EventHorizon</h1>
            </NavLink>
            <ul className='flex gap-x-15'>
                <li>
                    <NavLink to="/AdminReports" className={({isActive}) => `cursor-pointer ${isActive? "underline": ""}`}>
                    Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/AdminActiveUsers" className={({isActive}) => `cursor-pointer ${isActive? "underline": ""}`}>
                    Active Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/AdminSettings" className={({isActive}) => `cursor-pointer ${isActive? "underline": ""}`}>
                    Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    </>
    )
}

export default AdminNavbar