import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyotpMutation } from "../../services/Auth";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { setOtpVerify } from "../../features/authentication";

const OTP = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    useEffect(() => {
        if (!email) {
            navigate("/auth/forget_password");
        }
    }, [email]);

    const [VerifyOTPAPI, { isLoading }] = useVerifyotpMutation();

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        try {
            const result = await VerifyOTPAPI({ email, otp }).unwrap();
            if (result.message) {
                dispatch(setOtpVerify(true));
                // localStorage.setItem('email', email);
                // console.log('Navigating to /auth/new_password?email=' + encodeURIComponent(email));

                navigate(`/auth/new_password?email=${encodeURIComponent(email)}`);
            }
        } catch (error) {
            setError(error.data.error_message);
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Navbar />
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        {isLoading && <LoadingPage />}
                        <h2 className="font-bold text-2xl text-[#002D74]">Verify OTP</h2>
                        {email && <p className="text-sm mt-1 text-[#002D74]">OTP sent to: {email}</p>}
                        <form onSubmit={handleOTPSubmit} className="flex flex-col gap-4 text-sm">
                            <input
                                className="p-2 mt-4 rounded-xl border"
                                type="number"
                                min={0}
                                name="otp"
                                placeholder="OTP"
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                            {error && <p className="text-xs text-[#db3434]">{error}</p>}
                            <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                                Verify OTP
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

export default OTP;
