import { useState } from "react"
import api from "../services/api"
import PageHeader from "../components/PageHeader"

function RegisterAsset() {

  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(false)

  const [registered, setRegistered] = useState(false)

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Register Asset
      </h1>

      <p className="text-zinc-400 mt-3">
        Upload and protect sports media assets.
      </p>

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
                    setRegistered(false)
                    setLoading(true)
                    const formData = new FormData()
                    formData.append("file", image)
                    await api.post(
                      "/register-asset",
                      formData
                    )
                    setRegistered(true)
                  }
                  catch (error) {
                    console.error(error)
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
        registered && (
            <div className="
            mt-8
            bg-green-950
            border
            border-green-500
            p-6
            rounded-2xl
            max-w-2xl
            ">

            <PageHeader
              title="Register Asset"
              description="Upload and protect sports media assets."
            />

            </div>
        )
        }
    </div>
  )
}

export default RegisterAsset
