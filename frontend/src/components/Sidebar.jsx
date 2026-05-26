import { NavLink } from "react-router-dom"
import navigation from "../data/navigation"
function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 text-white p-5">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        SHIELD
      </h1>

      <nav>

      <ul className="space-y-3">

        {
          navigation.map((item) => (

            <li key={item.path}>

              <NavLink
                to={item.path}

                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  transition-all

                  ${isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-zinc-900 text-zinc-300"
                  }
                `}
              >

                {item.label}

              </NavLink>

            </li>

          ))
        }

      </ul>

      </nav>
    </div>
  )
}

export default Sidebar