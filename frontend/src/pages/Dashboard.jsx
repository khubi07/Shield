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

  // Stores protected registered assets
  const [assets, setAssets] = useState([])
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

          // Fetch protected registered assets
          const assetsResponse = await api.get("/assets")
          setAssets(assetsResponse.data)

          // Store protected assets
          setAssets(assetsResponse.data)

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

          <div className="mt-14">

            <h2 className="
              text-2xl
              font-bold
              mb-6
            ">
              Protected Assets
            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">

              {
                assets.map((asset) => (

                  <article
                    key={asset.id}
                    className="
                      bg-zinc-900
                      border
                      border-zinc-800
                      p-6
                      rounded-2xl
                    "
                  >

                    {/* Asset filename */}
                    <h3 className="
                      text-xl
                      font-semibold
                    ">
                      {asset.filename}
                    </h3>

                    {/* Asset owner */}
                    <p className="text-zinc-400 mt-3">

                      Owner:

                      <span className="ml-2 text-white">
                        {asset.owner_name}
                      </span>

                    </p>

                    {/* Sports category */}
                    <p className="text-zinc-400 mt-2">

                      Sport:

                      <span className="ml-2 text-white">
                        {asset.sport_type}
                      </span>

                    </p>

                    {/* Media category */}
                    <p className="text-zinc-400 mt-2">

                      Type:

                      <span className="ml-2 text-white">
                        {asset.asset_type}
                      </span>

                    </p>

                  </article>
                ))
              }

            </div>

          </div>

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
           