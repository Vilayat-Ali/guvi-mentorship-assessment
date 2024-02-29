// lib
import {Route, Routes} from "react-router-dom";

import AuthProtected from "./components/AuthProtected";

// pages
import Account from "./pages/Account"
import Profile from "./pages/Profile"

const App = () => {
  return (
    <Routes>
      <Route index element={
      <AuthProtected>
          <Profile/>
        </AuthProtected>
      } />
      <Route path="/account" element={<Account />} />
    </Routes>
  )
}

export default App