function AlertCard(props) {
  return (
    <div className="bg-zinc-900 p-5 rounded-2xl mb-4">

      <div className="flex items-center justify-between">

        <h2 className="text-white font-semibold">
          {props.title}
        </h2>

        <span className="
          bg-red-500 
          text-white 
          text-xs 
          px-3 
          py-1 
          rounded-full
        ">
          {props.severity}
        </span>

      </div>

    </div>
  )
}

export default AlertCard