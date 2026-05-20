function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 text-white p-5">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        SHIELD
      </h1>

      <ul className="space-y-4">
        <li className="bg-blue-500 p-3 rounded-lg">
          Dashboard
        </li>

        <li className="hover:bg-zinc-800 p-3 rounded-lg cursor-pointer">
          Register Asset
        </li>

        <li className="hover:bg-zinc-800 p-3 rounded-lg cursor-pointer">
          Check Originality
        </li>

        <li className="hover:bg-zinc-800 p-3 rounded-lg cursor-pointer">
          Alerts
        </li>
      </ul>
    </div>
  )
}

export default Sidebar