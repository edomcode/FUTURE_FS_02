import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Dashboard from '../Components/pages/Dashboard'
import Clients from '../Components/pages/Clients'
import Trainers from '../Components/pages/Trainers'
import Schedule from '../Components/pages/Schedule'
import Bookings from '../Components/pages/Bookings'
import Payments from '../Components/pages/Payments'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
