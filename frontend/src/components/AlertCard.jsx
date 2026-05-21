function AlertCard(props) {

  const severityStyles = {
    HIGH: "border-red-500 bg-red-950 text-red-400",
    MEDIUM: "border-yellow-500 bg-yellow-950 text-yellow-400",
    LOW: "border-green-500 bg-green-950 text-green-400"
  }

  return (
    <article
      className="
        bg-zinc-900
        border
        border-zinc-800
        p-6
        rounded-2xl
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold text-white">
            {props.title}
          </h2>

          <p className="text-zinc-400 mt-3">
            {props.description}
          </p>

        </div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            border
            ${severityStyles[props.severity]}
          `}
        >
          {props.severity}
        </span>

      </div>

    </article>
  )
}

export default AlertCard