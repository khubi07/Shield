import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Alerts from "./pages/Alerts"
import Dashboard from "./pages/Dashboard"
import RegisterAsset from "./pages/RegisterAsset"
import CheckOriginality from "./pages/CheckOriginality"
import UploadSuspiciousPost from "./pages/UploadSuspiciousPost"

function App() {

  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/register-asset"
            element={<RegisterAsset />}
          />

          <Route
            path="/check-originality"
            element={<CheckOriginality />}
          />

          <Route
            path="/alerts"
            element={<Alerts />}
          />

          <Route
            path="/upload-suspicious-post"
            element={<UploadSuspiciousPost />}
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  )
}

export default App