import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminReports from './pages/admin/AdminReports'
import AdminReportDetails from './pages/admin/AdminReportDetails'
import AdminActiveUsers from './pages/admin/AdminActiveUsers'
import AdminUserDetails from './pages/admin/AdminUserDetails'
import AdminSettings from './pages/admin/AdminSettings'

import UserDashboard from './pages/user/UserDashboard'
import UserSettings from './pages/user/UserSettings'

import Events from './pages/events/Events'
import CreateEventsPage from './pages/events/CreateEventsPage'
import EventDetails from './pages/events/EventDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* Admin Pages */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/reports' element={<AdminReports />} />
        <Route path='/admin/reportdetails' element={<AdminReportDetails />} />
        <Route path='/admin/user' element={<AdminActiveUsers />} />
        <Route path='/admin/userdetails' element={<AdminUserDetails />} />
        <Route path='/admin/settings' element={<AdminSettings />} />
        {/* User Pages */}
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path='/user/settings' element={<UserSettings />} />
        {/* Event Pages */}
        <Route path='/events' element={<Events />} />
        <Route path='/events/create' element={<CreateEventsPage />} />
        <Route path='/events/eventdetails' element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
