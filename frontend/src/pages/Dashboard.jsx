import { useState } from "react"

import Sidebar from "../components/Sidebar"
import StatCard from "../components/StatsCard"
import AlertCard from "../components/AlertCard"

function Dashboard() {

  const [threatCount, setThreatCount] = useState(14)

  const [showThreat, setShowThreat] = useState(false)

  const alerts = [
    {
      title: "Watermarked repost detected",
      severity: "HIGH"
    },

    {
      title: "Modified suspicious content",
      severity: "MEDIUM"
    },

    {
      title: "Authorized partner usage",
      severity: "LOW"
    }
  ]

  return (
    <div className="flex bg-gradient-to-br from-black via-zinc-950 to-black min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10 text-white">

        <h1 className="
          text-5xl
          font-bold
          bg-gradient-to-r
          from-white
          to-zinc-400
          bg-clip-text
          text-transparent
        ">
          Shield Dashboard
        </h1>

        <p className="text-zinc-400 mt-3">
          Monitor and protect digital sports assets.
        </p>

        <div className="flex gap-6 mt-10 flex-wrap">

          <StatCard
            title="Protected Assets"
            value="128"
          />

          <StatCard
            title="Threat Alerts"
            value={threatCount}
          />

          <StatCard
            title="Verification Rate"
            value="96%"
          />

        </div>

        <button
          onClick={() => setThreatCount(threatCount + 1)}
          className="
            mt-8
            bg-blue-500
            px-5
            py-3
            rounded-xl
            hover:bg-blue-600
          "
        >
          Simulate Threat Alert
        </button>

        <button
          onClick={() => setShowThreat(!showThreat)}
          className="
            mt-4
            ml-4
            bg-red-500
            px-5
            py-3
            rounded-xl
            hover:bg-red-600
          "
        >
          Toggle Threat Panel
        </button>

        {
          showThreat && (
            <div className="
              mt-8
              bg-red-950
              border
              border-red-500
              p-6
              rounded-2xl
            ">

              <h2 className="text-2xl font-bold text-red-400">
                HIGH SEVERITY ALERT
              </h2>

              <p className="text-zinc-300 mt-3">
                Unauthorized watermarked repost detected.
              </p>

            </div>
          )
        }

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Recent Alerts
          </h2>

          {
            alerts.map((alert, index) => (
              <AlertCard
                key={index}
                title={alert.title}
                severity={alert.severity}
              />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard