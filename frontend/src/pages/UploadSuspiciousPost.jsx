import { useState } from "react"
import api from "../services/api"
import PageHeader from "../components/PageHeader"

function UploadSuspiciousPost() {

  // Suspicious uploaded image
  const [image, setImage] = useState(null)

  // Social media source name
  const [source, setSource] = useState("")

  // Authorized partner toggle
  const [authorized, setAuthorized] = useState(false)

  // Success response
  const [uploaded, setUploaded] = useState(false)

  // Loading state
  const [loading, setLoading] = useState(false)

  async function uploadPost() {

    try {

      // Start loading UI
      setLoading(true)

      // Create multipart form data
      const formData = new FormData()

      // Upload suspicious image
      formData.append("file", image)

      // Upload source metadata
      formData.append("source", source)

      // Upload authorization state
      formData.append(
        "authorized",
        authorized
      )

      // Send suspicious upload
      await api.post(

        "/upload-suspicious-post",

        formData
      )

      // Success UI
      setUploaded(true)

    }

    catch (error) {

      console.error(error)

    }

    finally {

      // Stop loading
      setLoading(false)

    }
  }

  return (

    <div className="flex-1 p-10 text-white">

      <PageHeader
        title="Upload Suspicious Post"
        description="Simulate social media monitoring."
      />

      <div className="
        mt-10
        bg-zinc-900
        p-8
        rounded-2xl
        max-w-2xl
      ">

        {/* Source name */}
        <input
          type="text"
          placeholder="Source Name"
          value={source}
          onChange={(e) => {
            setSource(e.target.value)
          }}
          className="
            w-full
            mb-4
            p-3
            rounded-xl
            bg-zinc-800
          "
        />

        {/* Suspicious image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(
              e.target.files[0]
            )
          }}
          className="
            block
            w-full
            text-sm
            text-zinc-400
          "
        />

        {/* Authorized partner checkbox */}
        <label className="
          flex
          items-center
          gap-3
          mt-6
        ">

          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => {
              setAuthorized(
                e.target.checked
              )
            }}
          />

          Authorized Usage

        </label>

        {/* Upload suspicious post */}
        <button
          onClick={uploadPost}
          disabled={loading}
          className="
            mt-8
            bg-red-500
            px-6
            py-3
            rounded-xl
            hover:bg-red-600
            disabled:opacity-50
          "
        >

          {
            loading
              ? "Uploading..."
              : "Upload Suspicious Post"
          }

        </button>

      </div>

      {
        uploaded && (

          <section className="
            mt-8
            bg-green-950
            border
            border-green-500
            p-6
            rounded-2xl
            max-w-2xl
          ">

            <h2 className="
              text-2xl
              font-bold
              text-green-400
            ">

              Suspicious Post Uploaded

            </h2>

          </section>
        )
      }

    </div>
  )
}

export default UploadSuspiciousPost