import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './components/LandingPage'
import { DemoPage } from './components/DemoPage'
import { AdminPage } from './components/admin/AdminPage'
import { DashboardPage } from './components/admin/DashboardPage'
import { NewPagePage } from './components/admin/NewPagePage'
import { EditorPage } from './components/admin/EditorPage'
import { PublicPage } from './components/PublicPage'
import { GalleryPage } from './components/templates/GalleryPage'
import { TemplatePreviewPage } from './components/templates/TemplatePreviewPage'
import { useAuth } from './hooks/useAuth'
import type { ReactNode } from 'react'
import { supabase } from './lib/supabase'

function RequireAuth({ children }: { children: ReactNode }) {
  const { session, checking } = useAuth()
  if (supabase && checking) {
    return (
      <div className="flex min-h-full items-center justify-center bg-paper">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-line-strong border-t-brand" />
      </div>
    )
  }
  if (!session) return <Navigate to="/admin" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <HashRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/nueva"
            element={
              <RequireAuth>
                <NewPagePage />
              </RequireAuth>
            }
          />
          <Route
            path="/editar/:id"
            element={
              <RequireAuth>
                <EditorPage />
              </RequireAuth>
            }
          />
          <Route
            path="/panel"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/preview/:templateId" element={<TemplatePreviewPage />} />
          <Route path="/p/:slug" element={<PublicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
