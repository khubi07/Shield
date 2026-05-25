import { useState } from "react"
import api from "../services/api"
import PageHeader from "../components/PageHeader"

function RegisterAsset() {

  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const [registrationResult, setRegistrationResult] = useState(null)

  // Stores asset owner
  const [ownerName, setOwnerName] = useState("")

  // Stores sports category
  const [sportType, setSportType] = useState("")

  // Stores media type
  const [assetType, setAssetType] = useState("")

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

          {/* Owner name */}
          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => {
              setOwnerName(e.target.value)
            }}
            className="
              w-full
              mb-4
              p-3
              rounded-xl
              bg-zinc-800
              text-white
            "
          />

          {/* Sport type */}
          <input
            type="text"
            placeholder="Sport Type"
            value={sportType}
            onChange={(e) => {
              setSportType(e.target.value)
            }}
            className="
              w-full
              mb-4
              p-3
              rounded-xl
              bg-zinc-800
              text-white
            "
          />

          {/* Asset category */}
          <input
            type="text"
            placeholder="Asset Type"
            value={assetType}
            onChange={(e) => {
              setAssetType(e.target.value)
            }}
            className="
              w-full
              mb-4
              p-3
              rounded-xl
              bg-zinc-800
              text-white
            "
          />

          {/* File upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
              }
            }}
            className="
              w-full
              mb-4
              p-3
              rounded-xl
              bg-zinc-800
              text-white
            "
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
                    // Upload image
                    formData.append("file", image)

                    // Upload owner metadata
                    formData.append("owner_name", ownerName)

                    // Upload sports category
                    formData.append("sport_type", sportType)

                    // Upload media category
                    formData.append("asset_type", assetType)
                    
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
