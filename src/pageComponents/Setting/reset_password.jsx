import { useEffect, useState } from "react";
import { useResetpasswordMutation } from "../../services/Setting";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/authentication";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ for success alert
  const [resetPasswordAPI, { isLoading }] = useResetpasswordMutation();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);

    const { old_password, new_password, confirm_new_password } = formData;

    if (!old_password || !new_password || !confirm_new_password) {
      setError("All fields are required.");
      return;
    }

    if (new_password !== confirm_new_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await resetPasswordAPI({
        old_password,
        new_password,
        confirm_new_password,
      }).unwrap();
      if (result.message) {
        clearForm();
        setError("");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 120000);
      }
    } catch (err) {
      const errorMessage = err?.data?.error_message || "Something went wrong.";
      setError(errorMessage);
    }
  };

  const clearForm = () => {
    setFormData({
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    });
    setError("");
  };

  return (
    <div className="flex flex-col w-full xl:px-7">
      <div className="flex flex-row justify-between items-center mb-7">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <p className="underline text-gray-400 hover:text-gray-800 text-sm cursor-pointer" onClick={clearForm} >
          clear
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 ring-2 ring-offset-8 ring-black/50 bg-white/70 rounded-md"
      >
        {showSuccess && (
          <div className="mb-2 p-3 rounded-md bg-green-100 text-green-800 border border-green-300 transition-all duration-500">
            Password reset successful!
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="old_password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Old Password
          </label>
          <input
            id="old_password"
            type="password"
            placeholder="Old Password"
            value={formData.old_password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, old_password: e.target.value }))
            }
            className="shadow appearance-none border ring-2 ring-offset-2 ring-black/50 
                                   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="New Password"
            value={formData.new_password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, new_password: e.target.value }))
            }
            className="shadow appearance-none border ring-2 ring-offset-2 ring-black/50 
                                   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_new_password}
            onChange={(e) => setFormData((prev) => ({ ...prev, confirm_new_password: e.target.value, })) }
            className="shadow appearance-none border ring-2 ring-offset-2 ring-black/50 
                                   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
