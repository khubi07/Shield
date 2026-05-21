import { useState } from "react"

import Sidebar from "../components/Sidebar"
import StatCard from "../components/StatsCard"
import AlertCard from "../components/AlertCard"
import alerts from "../data/alerts"
import PageHeader from "../components/PageHeader"

function Dashboard() {

  const [threatCount, setThreatCount] = useState(14)

  const [showThreat, setShowThreat] = useState(false)


  return (

      <div className="flex-1 p-10 text-white">

        <PageHeader
          title="Shield Dashboard"
          description="Monitor and protect digital sports assets."
        />

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
                key={alert.id}
                title={alert.title}
                severity={alert.severity}
                description={alert.description}
              />
            ))
          }

        </div>

      </div>
  )
}

export default Dashboard
           