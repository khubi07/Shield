import { useState } from "react"
import api from "../services/api"
import PageHeader from "../components/PageHeader"

function RegisterAsset() {

  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const [registrationResult, setRegistrationResult] = useState(null)

  return (
    <div>

      <PageHeader
            title="Register Asset"
            description="Upload and protect sports media assets."
          />

      <div className="
        mt-10
        bg-zinc-900
        p-8
        rounded-2xl
        max-w-2xl
      ">

        <input
          type="file"
          accept="image/*"
          className="
            block
            w-full
            text-sm
            text-zinc-400
          "
          onChange={(e) => {
            setImage(e.target.files[0])
}}
        />

      </div>

      {
        image && (
            <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
                Preview
            </h2>

            <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="
                w-96
                rounded-2xl
                border
                border-zinc-800
                "
            />

            </div>
        )
        }

        {
        image && (
            <button
                disabled={loading}
                onClick={async () => {
                  try {
                    setRegistrationResult(null)
                    setError("")
                    setLoading(true)
                    const formData = new FormData()
                    formData.append("file", image)
                    const response = await api.post(
                      "/register-asset",
                      formData
                    )

                    console.log(response.data)

                    setRegistrationResult(response.data)
                  }

                  catch (error) {
                    console.error(error)

                  setError(
                    "Failed to register asset. Please try again."
                  )
                  }

                  finally {
                    setLoading(false)
                  }
                }}
                className="
                  mt-8
                  bg-blue-500
                  px-6
                  py-3
                  rounded-xl
                  hover:bg-blue-600
                  disabled:opacity-50
                "
              >
                {
                  loading
                    ? "Registering..."
                    : "Register Asset"
                }
            </button>
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
              max-w-2xl
            ">

              <h2 className="text-2xl font-bold text-red-400">
                Registration Failed
              </h2>

              <p className="text-zinc-300 mt-3">
                {error}
              </p>

            </section>
          )
        }

        <>
          {
            registrationResult && (

              <section className="
                mt-8
                bg-green-950
                border
                border-green-500
                p-6
                rounded-2xl
                max-w-2xl
              ">

                <h2 className="text-2xl font-bold text-green-400">
                  {registrationResult.message}
                </h2>

                <p className="text-zinc-300 mt-3">

                  Protected Asset:

                  <span className="font-semibold ml-2">
                    {registrationResult.asset_name}
                  </span>

                </p>

              </section>
            )
          }

        </>
    </div>
  )
}

export default RegisterAsset
