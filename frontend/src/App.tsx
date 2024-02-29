// lib
import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import { useAppDispatch } from "./redux";
import { login } from "./redux/slice/user.slice";

import AuthProtected from "./components/AuthProtected";

// pages
import Account from "./pages/Account"
import Profile from "./pages/Profile"

const App = () => {
  const dispatch = useAppDispatch();
  const user: string | null = window.localStorage.getItem('user');

  useEffect(() => {
    if(user) {
        const serializedUser = JSON.parse(user);
        dispatch(login({
          username: serializedUser.username,
          email: serializedUser.email
        }));
      }
  }, [dispatch, user]);

 

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