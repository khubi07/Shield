function StatCard(props) {

  return (
    <div className="
      bg-zinc-900
      border
      border-zinc-800
      p-6
      rounded-2xl
      w-72
      hover:border-blue-500
      transition-all
      duration-300
    ">

      <p className="text-zinc-400 text-sm">
        {props.title}
      </p>

      <h2 className="text-4xl font-bold mt-4 text-white">
        {props.value}
      </h2>

      <div className="
        mt-6
        h-1
        rounded-full
        bg-blue-500
      "></div>

    </div>
  )
}

export default StatCard