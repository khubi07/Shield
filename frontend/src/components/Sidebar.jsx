import { Link } from "react-router-dom"
function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 text-white p-5">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        SHIELD
      </h1>

      <ul className="space-y-4">
        <Link
        to="/"
        className="
          flex
          items-center
          gap-3
          bg-blue-500
          p-4
          rounded-2xl
          cursor-pointer
        "
      >
          Dashboard
        </Link>

        <Link
          to="/register-asset"
          className="
            flex
            items-center
            gap-3
            bg-blue-500
            p-4
            rounded-2xl
            cursor-pointer
          "
        >
          Register Asset
        </Link>

        <Link
        to="/check-originality"
        className="
          flex
          items-center
          gap-3
          bg-blue-500
          p-4
          rounded-2xl
          cursor-pointer
        "
      >
          Check Originality
        </Link>

        <li className="hover:bg-zinc-800 p-3 rounded-lg cursor-pointer">
          Alerts
        </li>
      </ul>
    </div>
  )
}

export default Sidebar