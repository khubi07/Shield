function StatCard(props) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl w-64">
      <h2 className="text-zinc-400 text-sm">
        {props.title}
      </h2>

      <p className="text-3xl font-bold mt-3 text-white">
        {props.value}
      </p>
    </div>
  )
}

export default StatCard