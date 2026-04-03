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
import UserEvents from './pages/user/UserEvents'

import Events from './pages/events/Events'
import CreateEventsPage from './pages/events/CreateEventsPage'
import EventDetails from './pages/events/EventDetails'
import { AuthContextProvider } from './context/AuthContext';
import {AdminRoute, PrivateRoute} from './components/ProtectedRoute';

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:id' element={<EventDetails />} />
          <Route path='/events/eventdetails' element={<EventDetails />} />

          {/* Admin Pages */}
          <Route path='/admin/' element = {<AdminRoute />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='reports' element={<AdminReports />} />
            <Route path='report/:id' element={<AdminReportDetails />} />
            <Route path='user' element={<AdminActiveUsers />} />
            <Route path='user/:id' element={<AdminUserDetails />} />
            <Route path='settings' element={<AdminSettings />} />
          </Route>

          {/* User Pages */}
          <Route path='/user/' element={<PrivateRoute />}>
            <Route path='events/create' element={<CreateEventsPage />} />
            <Route path='events/:id/edit' element={<CreateEventsPage />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="my-events" element={<UserEvents />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
