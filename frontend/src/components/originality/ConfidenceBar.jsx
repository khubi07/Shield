
function ConfidenceBar(props) {

  return (
    <div>

      <div className="flex justify-between mb-2">

        <span>
          {props.label}
        </span>

        <span>
          {props.value}%
        </span>

      </div>

      <div className="w-full bg-zinc-800 rounded-full h-3">

        <div
          className={`${props.color} h-3 rounded-full`}
          style={{
            width: `${props.value}%`
          }}
        ></div>

      </div>

    </div>
  )
}

export default ConfidenceBar