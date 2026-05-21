import Sidebar from "../components/Sidebar"

function MainLayout({ children }) {

  return (
    <div className="flex bg-black min-h-screen">

      <Sidebar />

      <div className="flex-1 text-white p-10">
        {children}
      </div>

    </div>
  )
}

export default MainLayout