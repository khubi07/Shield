function PageHeader(props) {

  return (
    <header>

      <h1 className="text-4xl font-bold">
        {props.title}
      </h1>

      <p className="text-zinc-400 mt-3">
        {props.description}
      </p>

    </header>
  )
}

export default PageHeader