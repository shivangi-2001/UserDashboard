import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import ForgetPassword from "./pageComponents/Login/forgetPassword";
import OTP from "./pageComponents/Login/otp";
import NewPassword from "./pageComponents/Login/newPassword";
import Register from "./pages/Register";
import Settings from "./pages/settings";
import BatteryID from "./pages/BatteryID";
import Contribution from "./pages/Contribution";
import AddContribution from "./pageComponents/Contribution/Add";
import RedirectLogin from "./components/RedirectLogin";

function App() {
  const { isAuthenticated, otp_verified } = useSelector(state => state.authenticated);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: (
            <>
              <PageTitle title="Battery Explorer" />
              <Index />
            </>
          ),
        },
        {
          path:'batteries/:id',
          element: (
            <>
              <BatteryID />
            </>
          ),
        },
        {
          path:'settings',
          element: (
            <>
              <PageTitle title="Settings" />
              {isAuthenticated ? <Settings />: <Navigate to='/'/>}
            </>
          ),
        },
        {
          path:'contribution',
          element: (
            <>
              <PageTitle title={"Battery contribution dashboard"} />
              {isAuthenticated ? <Contribution />: <Navigate to='/'/>}
            </>
          ),
        },
        {
          path:'contribution/:id',
          element: (
            <>
              {isAuthenticated ? <Contribution />: <Navigate to='/'/>}
            </>
          ),
        },
        {
          path:'add/contribution',
          element: (
            <>
              <PageTitle title={"Add contribution"} />
              {isAuthenticated ? <AddContribution />: <Navigate to='/'/>}
            </>
          ),
        },
        

      ],
    },
    {
      path: "/login",
      element: (
        <>
          <PageTitle title="Login" />
          {!isAuthenticated ? <Login /> : <Navigate to="/" />}
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <PageTitle title="register" />
          <Register />
        </>
      ),
    },
    
    {
      path: "/auth",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" /> // Redirect to login if no sub-path is provided
        },
        {
          path: "forget_password",
          element: (
            <>
              <PageTitle title="Forget Password" />
              <ForgetPassword />
            </>
          ),
        },
        {
          path: "otp",
          element: (
            <>
              <PageTitle title="Verify OTP" />
              <OTP />
              {/* {otp_verified? <Navigate to="/auth/new_password" /> : <OTP />} */}
            </>
          ),
        },
        {
          path: "new_password",
          element: (
            <>
              <PageTitle title="New Password" />
              <NewPassword /> {/* Use a separate component for New Password */}
            </>
          ),
        },
      ],
    },
    {
      path: "/redirect",
      element: (
        <>
          <PageTitle title="Error" />
          {!isAuthenticated ? <Login /> : <RedirectLogin />}
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
