import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Dashboard from "./pages/Dashboard"
import RegisterAsset from "./pages/RegisterAsset"
import CheckOriginality from "./pages/CheckOriginality"

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

        </Routes>

      </MainLayout>

    </BrowserRouter>
  )
}

export default App