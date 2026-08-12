import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Categories from './pages/Categories'
import Technologies from './pages/Technologies'
import Analytics from './pages/Analytics'
import Visitors from './pages/Visitors'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'
import ProjectManagement from './pages/ProjectManagement'
import SiteSettings from './pages/SiteSettings'
import UserAccess from './pages/UserAccess'
import BackupRestore from './pages/BackupRestore'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="categories" element={<Categories />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Placeholder title="My Profile" />} />

          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/projects" element={<ProjectManagement />} />
          <Route path="admin/site-settings" element={<SiteSettings />} />
          <Route path="admin/access" element={<UserAccess />} />
          <Route path="admin/backup" element={<BackupRestore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
