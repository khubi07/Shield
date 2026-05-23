function AlertCard(props) {

  // Severity-based styling system
  const severityStyles = {

    HIGH: {
      badge: "border-red-500 bg-red-950 text-red-400",
      card: "border-red-900"
    },

    MEDIUM: {
      badge: "border-yellow-500 bg-yellow-950 text-yellow-400",
      card: "border-yellow-900"
    },

    LOW: {
      badge: "border-green-500 bg-green-950 text-green-400",
      card: "border-green-900"
    }

  }

  // Fallback if severity missing
  const currentStyle =
    severityStyles[props.severity]
    || severityStyles.LOW

  return (

    <article
      className={`
        bg-zinc-900
        border
        p-6
        rounded-2xl

        ${currentStyle.card}
      `}
    >

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <h2 className="text-xl font-semibold text-white">

              {props.severity} ALERT

            </h2>

            {
              props.active && (

                <span className="
                  bg-black/30
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  text-zinc-300
                ">

                  Active Threat

                </span>
              )
            }

          </div>

          <p className="text-zinc-400 mt-4">
            {props.description}
          </p>

          {
            props.source && (

              <p className="text-zinc-500 mt-4 text-sm">

                Source:

                <span className="ml-2 text-zinc-300">
                  {props.source}
                </span>

              </p>
            )
          }

        </div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            border

            ${currentStyle.badge}
          `}
        >

          {props.severity || "INFO"}

        </span>

      </div>

    </article>
  )
}

export default AlertCard