import AlertCard from "../components/AlertCard"

import alerts from "../data/alerts"

function Alerts() {

  return (
    <div>

      <PageHeader
        title="Threat Alerts"
        description="Monitor suspicious activity and asset misuse."
      />

      <div className="mt-10 space-y-5">

        {
          alerts.map((alert) => (

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

export default Alerts