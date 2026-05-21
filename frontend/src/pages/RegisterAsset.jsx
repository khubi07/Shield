import { useState } from "react"

function RegisterAsset() {

  const [image, setImage] = useState(null)

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
            onClick={() => setRegistered(true)}
            className="
                mt-8
                bg-blue-500
                px-6
                py-3
                rounded-xl
                hover:bg-blue-600
            "
            >
            Register Asset
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

            <h2 className="text-2xl font-bold text-green-400">
                Asset Registered Successfully
            </h2>

            <p className="text-zinc-300 mt-3">
                Invisible watermark embedded and fingerprint generated.
            </p>

            </div>
        )
        }
    </div>
  )
}

export default RegisterAsset
