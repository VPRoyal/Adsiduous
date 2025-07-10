import { Outlet } from "react-router";
import { useEffect } from "react";
import { storage } from "./utils/localStorage";
import { useAppDispatch, useAppSelector } from "./hooks/storeHook";
import {AuthThunk} from "@/store/thunks"

// Components
import Layout from "./components/Layout/Layout";

const App = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const token = storage.getToken()
    if (token && !user) {
      dispatch(AuthThunk.getCurrentUser()).unwrap()
    }
  }, [dispatch, user])
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
