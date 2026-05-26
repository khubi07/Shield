import { useEffect, useState } from "react"
import api from "../services/api"
import StatCard from "../components/StatsCard"
import AlertCard from "../components/AlertCard"
import PageHeader from "../components/PageHeader"

function Dashboard() {

   // Stores monitoring alerts
  const [alerts, setAlerts] = useState([])

  // Loading dashboard analytics
  const [loading, setLoading] = useState(false)

  // API failure state
  const [error, setError] = useState("")

  useEffect(() => {

      const loadDashboard = async () => {

        try {

          // Reset old errors
          setError("")

          // Start loading UI
          setLoading(true)

          // Fetch monitoring alerts
          const response = await api.get(
            "/run-scan"
          )

          // Store backend alerts
          setAlerts(response.data)

        }

        catch (error) {

          console.error(error)

          setError(
            "Dashboard failed to load."
          )

        }

        finally {

          // Stop loading state
          setLoading(false)

        }

      }

      loadDashboard()

    }, [])



     // Total alerts detected
    const totalAlerts = alerts.filter(
      alert => alert.alert
    ).length

    // High severity threats
    const highThreats = alerts.filter(
      alert => alert.severity === "HIGH"
    ).length

    // Authorized partner usages
    const authorizedUsage = alerts.filter(
      alert => alert.message === "Authorized usage"
    ).length

  return (

      <div className="flex-1 p-10 text-white">

        <PageHeader
          title="Shield Dashboard"
          description="Monitor and protect digital sports assets."
        />

        <div className="flex gap-6 mt-10 flex-wrap">

          <StatCard
            title="Detected Threats"
            value={totalAlerts}
          />

          <StatCard
            title="High Severity"
            value={highThreats}
          />

          <StatCard
            title="Authorized Usage"
            value={authorizedUsage}
          />

        </div>

        {
          loading && (

            <section className="
              mt-8
              bg-zinc-900
              border
              border-zinc-800
              p-6
              rounded-2xl
            ">

              <h2 className="text-xl font-semibold">
                Loading Dashboard...
              </h2>

            </section>
          )
        }

        {
          error && (

            <section className="
              mt-8
              bg-red-950
              border
              border-red-500
              p-6
              rounded-2xl
            ">

              <h2 className="text-xl font-semibold text-red-400">
                Dashboard Error
              </h2>

              <p className="text-zinc-300 mt-2">
                {error}
              </p>

            </section>
          )
        }

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Recent Alerts
          </h2>

          {
            alerts.map((alert, index) => (

              <AlertCard
                key={`${alert.source}-${index}`}

                severity={alert.severity}

                description={
                  alert.reason || alert.message
                }

                source={alert.source}

                active={alert.alert}
              />

            ))
          }

        </div>

      </div>
  )
}

export default Dashboard
           