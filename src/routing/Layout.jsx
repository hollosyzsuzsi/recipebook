import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { DeleteModal } from '../components/DeleteModal/DeleteModal'
import { DeleteModalProvider } from '../context/DeleteModaLProvider'

export const Layout = () => {
  return (
    <DeleteModalProvider>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
        <DeleteModal />
      </div>
    </DeleteModalProvider>
  )
}
