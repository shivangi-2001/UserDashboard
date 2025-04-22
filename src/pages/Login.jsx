import { useEffect, useState } from "react";
import { useGetcsrftokenQuery, useLoginMutation } from "../services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLocalAuthToken, setStatus } from "../features/authentication";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success_status } = useSelector(state => state.authenticated);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [dataError, setDataError] = useState({
    error_message: "",
    email: "",
    password: "",
  });

  const [csrfToken, setCsrfToken] = useState("");

  const { data: csrfData, refetch: refetchCsrf } = useGetcsrftokenQuery();
  const [LoginAPI] = useLoginMutation();

  useEffect(() => {
    if (csrfData?.csrfToken) {
      setCsrfToken(csrfData.csrfToken);
    }
  }, [csrfData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDataError({ error_message: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!csrfToken) {
      setDataError((prev) => ({ ...prev, error_message: "CSRF token is missing. Please try again." }));
      const newCsrfData = await refetchCsrf();
      if (newCsrfData?.data?.csrfToken) {
        setCsrfToken(newCsrfData.data.csrfToken);
      }
      return;
    }

    try {
      const response = await LoginAPI({ ...formData, _csrf: csrfToken }).unwrap();
      dispatch(setLocalAuthToken(response.token));
      navigate("/");
    } catch (error) {
      console.log(error);
      setDataError((prev) => ({
        ...prev,
        error_message: error?.data?.error_message || "An unexpected error occurred.",
      }));

      const newCsrfData = await refetchCsrf();
      if (newCsrfData?.data?.csrfToken) {
        setCsrfToken(newCsrfData.data.csrfToken);
      }
    }
  };

  useEffect(() => {
    if (success_status) {
      const timeout = setTimeout(() => {
        dispatch(setStatus(''));
      }, 20000);
      return () => clearTimeout(timeout); // Cleanup on unmount
    }
  }, [success_status, dispatch]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          {success_status && (
            <div className="bg-green-100 mb-3 border-green-500 rounded-md text-green-900 p-2 shadow-md text-[12px]" role="alert">
              {success_status}
            </div>
          )}

          {dataError.error_message && (
            <div className="bg-red-100 mb-3 border-red-500 rounded-md text-red-400 p-2 shadow-md text-[12px]" role="alert">
              {dataError.error_message}
            </div>
          )}

          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form action="" onSubmit={handleSubmit} className="flex flex-col mt-4 gap-4 text-sm">
            <input
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                className="p-2 pr-10 rounded-xl border w-full outline-none"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] pt-4 pb-2 text-[#002D74] hover:underline">
            <Link to='/auth/forget_password'>Forgot your password?</Link>
          </div>

          <div className="mt-1 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl border ring-offset-2 ring-2 ring-slate-200"
            src="/login_page.png"
            alt="Login Page Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
