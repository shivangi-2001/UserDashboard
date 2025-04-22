import { useEffect, useState } from "react";
import { useResetpasswordMutation } from "../../services/Setting";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/authentication";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    });
    const [error, setError] = useState();
    const [ResetpasswordAPI, { isLoading }] = useResetpasswordMutation();

    useEffect(() => {
        if(isLoading) dispatch(setLoading(true));
    }, [dispatch, isLoading])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formData.old_password === '' || formData.new_password === '' || formData.confirm_new_password === ''){
            setError('Both fields are required.')
            return
        }
        if(formData.new_password !== formData.confirm_new_password){
            setError('password do not match.')
            return
        }
        try {
            // console.log(formData)
            const result = await ResetpasswordAPI({ ...formData }).unwrap();
            if(result.message){
                setError('')
            }
        } catch (error) {
            setError(error.data.error_message)
        }
    }

    useEffect(() => {
        if(isLoading) dispatch(setLoading(false));
    }, [dispatch, isLoading])

    const clearForm = () => {
        setFormData({ old_password: '', new_password: '', confirm_new_password: '' });
        setError('');  // Optional: reset the error message as well
    };

    return ( 
        <div className="flex flex-col w-full xl:px-7">
            <div className="flex flex-row justify-between items-center mb-7">
                <h2 className="text-xl font-semibold">Reset Password</h2>
                <p className="underline text-gray-400 text-xs cursor-pointer" 
                    onClick={clearForm}>
                clear
                </p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 ring-2 ring-offset-8 ring-black/50 bg-white/70 rounded-md">
                <div className=" mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="old_password">Old Password</label>
                    <input
                        className="shadow appearance-none border ring-2 ring-offset-2 ring-black/50 
                                rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="old_password"
                        type="password"
                        placeholder="Old Passowrd"
                        value={formData.old_password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, old_password: e.target.value }) )}
                    />
                </div>
                <div className=" mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" >Password</label>
                    <input
                        className="shadow appearance-none border ring-2 ring-offset-2 ring-black/50 
                                rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Passowrd"
                        value={formData.new_password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, new_password: e.target.value }) )}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Confirm Password</label>
                    <input
                        className="shadow appearance-none border ring-2 ring-offset-2 ring-black/50 
                                rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm_password"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirm_new_password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirm_new_password: e.target.value }) )}
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-end mt-6">
                <button type="submit" className="ring-2 ring-offset-2 p-2 rounded-md ring-indigo-800/40 hover:bg-blue-500/60" >
                    Reset Password
                </button>
                </div>
            </form>
        </div>
    );
}
 
export default ResetPassword;