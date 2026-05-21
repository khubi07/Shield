import { useState } from "react"
import ConfidenceBar from "../components/originality/ConfidenceBar"
import PageHeader from "../components/PageHeader"

function CheckOriginality() {

  const [image, setImage] = useState(null)

  const [checked, setChecked] = useState(false)

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
              Likely Match
            </h2>

            <p className="text-zinc-400 mt-3">
              Watermark Status: Verified
            </p>

            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-4">
                Match Confidence
              </h3>

              <div className="space-y-5">

                <ConfidenceBar
                  label="pHash Similarity"
                  value={91}
                  color="bg-blue-500"
                />

                <ConfidenceBar
                  label="ORB Similarity"
                  value={84}
                  color="bg-green-500"
                />

                <ConfidenceBar
                  label="Histogram Similarity"
                  value={96}
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