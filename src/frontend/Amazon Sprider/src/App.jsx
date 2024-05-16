import {
  Route,
  Outlet,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Login } from "./pages/auth";

import { Layout } from "./components";
import { useSelector } from "react-redux";

import PageTitle from "./components/PageTitle";
import {
  ECommerce,
  Profile,
  Settings,
  AddPackage,
  ListPackage,
  EditPackage,
} from "./pages/user";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            index
            path="/"
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/addpackage"
            element={
              <>
                <PageTitle title="Add Package | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddPackage />
              </>
            }
          />
          <Route
            path="/listpackage"
            element={
              <>
                <PageTitle title="List Package | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ListPackage />
              </>
            }
          />
          <Route
            path="/editpackage"
            element={
              <>
                <PageTitle title="Edit Package | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <EditPackage />
              </>
            }
          />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {/* <Route path="*" element={<Error404 />} /> */}
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Layout /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Router;
