import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSetPasswordMutation } from "../../services/Auth";
import React, { useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { setStatus } from "../../features/authentication";

const NewPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState('');
    // const email = localStorage.getItem('email')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const [NewPasswordAPI, { isLoading }] = useSetPasswordMutation();

    const setPasswordHandler = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.password || !formData.confirm_password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const result = await NewPasswordAPI({ email, ...formData }).unwrap();
            if (result.message) {
                dispatch(setStatus(result.message));
                localStorage.removeItem('email')
                navigate('/login');
            }
        } catch (error) {
            setError(error.data.error_message);
            // console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Navbar />
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        {isLoading && <LoadingPage />}
                        <h2 className="font-bold text-2xl text-[#002D74]">Set Password</h2>
                        <form method="POST" onSubmit={setPasswordHandler} className="flex flex-col gap-4 mt-4 text-sm">
                            <input
                                className="p-2 rounded-xl border w-full"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            />
                            <input
                                className="p-2 rounded-xl border w-full"
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm password"
                                onChange={(e) => setFormData((prev) => ({ ...prev, confirm_password: e.target.value }))}
                            />
                            {error && <p className="text-xs text-[#db3434]">{error}</p>}
                            <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                                Set Password
                            </button>
                        </form>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Don't have an account?</p>
                            <Link to="/register" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                                Register
                            </Link>
                        </div>
                    </div>

                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl border ring-offset-2 ring-2 ring-slate-200" src="/login_page.png" alt="Login Page Illustration" />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default NewPassword;
