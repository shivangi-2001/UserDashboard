import { useEffect, useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../services/Auth";
import LoadingPage from "../../components/LoadingPage";
import { useDispatch } from "react-redux";
import { setOtpVerify } from "../../features/authentication";

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [ForgetAPI, { isLoading }] = useForgetPasswordMutation();
    
    useEffect(() => {
        dispatch(setOtpVerify(false));
    }, [dispatch, setOtpVerify])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const result = await ForgetAPI({ email }).unwrap();
        if (result.message) {
            navigate(`/auth/otp?email=${encodeURIComponent(email)}`);
            // navigate(`/auth/new_password?email=${encodeURIComponent(email)}`);
        }
        } catch (error) {
        setError(error.data.error_message);
        console.log(error);
        }
    };

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ">
            <div className="md:w-1/2 px-8 md:px-16">
            {isLoading ? (
                <LoadingPage />
            ) : (
                <>
                <h2 className="font-bold text-2xl text-[#002D74]">Sent Email</h2>
                <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                    <p className="text-xs mt-4 text-[#002D74]">
                    If you are already a member, easily log in{" "}
                    <Link to="/login" className="text-gray-800 underline hover:scale-110 hover:font-semibold" > Sign in </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm" >
                    <input className="p-2 mt-4 rounded-xl border" type="email" name="email" placeholder="Email" onChange={(e) => { setError(""); setEmail(e.target.value); }} />
                    {error && <p className="text-xs  text-[#db3434]">{error}</p>}
                    <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" > send otp </button>
                </form>

                <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300" > Register </Link>
                </div>
                </>
            )}
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

export default ForgetPassword;
