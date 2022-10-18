
import Header from "./components/Products/Layout/Header";
import Products from "./components/Products/Products";
import SubHeader from "./components/Products/Layout/SubHeader";
import { Route, Routes, Navigate } from "react-router-dom"
import AuthIndex from "./components/Auth";
import { useEffect } from "react";
import { isLoggedIn } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn(() => { }))
  }, [dispatch])

  const authState = useSelector(state => state.auth)


  return (
    <>

      <Header />
      <SubHeader />
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<Products />} />
        <Route path=":category" element={<Products />} />

        {!authState.idToken ?
          <>
            <Route path="login" element={<AuthIndex />} />
            <Route path="signup" element={<AuthIndex />} />
          </>
          :
          <>
            <Route path="login" element={<Navigate to="/" replace />} />
            <Route path="signup" element={<Navigate to="/" replace />} />
          </>
        }

      </Routes>
    </>
  );
}

export default App;
