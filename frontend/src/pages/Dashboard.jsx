import StatsCard from "../components/StatsCard"

function Dashboard() {

  const statsData = [
    {
      title: "Active Alerts",
      value: "12",
    },
    {
      title: "Threat Level",
      value: "High",
    },
    {
      title: "Blocked Attacks",
      value: "156",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shield Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {statsData.map((item, index) => (
            <StatsCard
                key={index}
                title={item.title}
                value={item.value}
            />
        ))}

      </div>

    </div>
  )
}

export default Dashboard