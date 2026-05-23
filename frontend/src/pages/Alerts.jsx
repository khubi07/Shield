import AlertCard from "../components/AlertCard"
import { useEffect, useState } from "react"
import api from "../services/api"
import alerts from "../data/alerts"
import PageHeader from "../components/PageHeader"

function Alerts() {
     // Stores backend scan alerts
    const [alerts, setAlerts] = useState([])

    // Loading state for monitoring scan
    const [loading, setLoading] = useState(false)

    // Error UI state
    const [error, setError] = useState("")

    useEffect(() => {

      const runScan = async () => {

        try {

          // Reset previous UI states
          setError("")

          // Start loading UI
          setLoading(true)

          // Run backend monitoring scan
          const response = await api.get(
            "/run-scan"
          )

          // Inspect backend response
          console.log(response.data)

          // Store backend alerts
          setAlerts(response.data)

        }

        catch (error) {

          console.error(error)

          setError(
            "Monitoring scan failed."
          )

        }

        finally {

          // Stop loading state
          setLoading(false)

        }

      }

      runScan()

    }, [])

  return (
    <div>

      <PageHeader
        title="Threat Alerts"
        description="Monitor suspicious activity and asset misuse."
      />

      <div className="mt-10 space-y-5">

       {
          alerts.map((alert, index) => (

            <AlertCard
              key={index}

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

export default Alerts