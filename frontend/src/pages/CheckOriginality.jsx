import { useState } from "react"
import ConfidenceBar from "../components/originality/ConfidenceBar"
import PageHeader from "../components/PageHeader"
import api from "../services/api"

function CheckOriginality() {

  const [image, setImage] = useState(null)

  const [checked, setChecked] = useState(false)

  const [loading, setLoading] = useState(false)

    // Stores backend matcher response
  const [result, setResult] = useState(null)

  // Stores request failure message
  const [error, setError] = useState("")

  return (
    <>

      <PageHeader
        title="Check Originality"
        description="Detect suspicious reposts and verify ownership."
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
              disabled={loading}

              onClick={async () => {

                  try {

                    // Reset previous UI states
                    setError("")
                    setChecked(false)
                    setResult(null)

                    // Start loading UI
                    setLoading(true)

                    // Prepare multipart image upload
                    const formData = new FormData()

                    formData.append("file", image)

                    // Send suspicious image to backend
                    const response = await api.post(
                      "/check-originality",
                      formData
                    )

                    // Debug backend response
                    console.log(response.data)

                    // Store backend response
                    setResult(response.data)

                    // Show result section
                    setChecked(true)

                  }

                  catch (error) {

                    console.error(error)

                    setError(
                      "Originality analysis failed."
                    )

                  }

                  finally {

                    // Stop loading state
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
                ? "Analyzing..."
                : "Check Originality"
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
              Analysis Failed
            </h2>

            <p className="text-zinc-300 mt-3">
              {error}
            </p>

          </section>
        )
      }

      {
        checked && (

          <section className="
            mt-10
            bg-zinc-900
            border
            border-zinc-800
            p-8
            rounded-2xl
            max-w-3xl
          ">

            <h2 className="text-3xl font-bold text-green-400">
              {result.status}
            </h2>

            <p className="text-zinc-400 mt-3">
              Watermark Status: Verified
            </p>

            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-4">
                Match Confidence
              </h3>

              <div className="space-y-5">
                  <div className="
                    mt-6
                    bg-zinc-800
                    p-5
                    rounded-2xl
                  ">

                    <h3 className="text-lg text-zinc-400">
                      Combined Match Score
                    </h3>

                    <p className="text-4xl font-bold mt-3 text-blue-400">
                      {result.combined}%
                    </p>

                  </div>

                <ConfidenceBar
                  label="pHash Similarity"
                  value={result.phash}
                  color="bg-blue-500"
                />

                <ConfidenceBar
                  label="ORB Similarity"
                  value={result.orb}
                  color="bg-green-500"
                />

                <ConfidenceBar
                  label="Histogram Similarity"
                  value={result.histogram}
                  color="bg-purple-500"
                />

              </div>

            </div>

            <article className="
              mt-8
              bg-red-950
              border
              border-red-500
              p-5
              rounded-xl
            ">

              <h3 className="text-red-400 font-bold">
                HIGH SEVERITY ALERT
              </h3>

              <p className="text-zinc-300 mt-2">
                Suspicious repost strongly matches protected asset.
              </p>

            </article>

          </section>
        )
      }

    </>
  )
}

export default CheckOriginality