import { useState } from "react"

function CheckOriginality() {

  const [image, setImage] = useState(null)

  const [checked, setChecked] = useState(false)

  return (
    <>

      <h1 className="text-4xl font-bold">
        Check Originality
      </h1>

      <p className="text-zinc-400 mt-3">
        Detect suspicious reposts and verify ownership.
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
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
          className="
            block
            w-full
            text-sm
            text-zinc-400
          "
        />

      </div>

      {
        image && (
          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
              Suspicious Upload Preview
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
            onClick={() => setChecked(true)}
            className="
              mt-8
              bg-blue-500
              px-6
              py-3
              rounded-xl
              hover:bg-blue-600
            "
          >
            Check Originality
          </button>
        )
      }

    </>
  )
}

export default CheckOriginality