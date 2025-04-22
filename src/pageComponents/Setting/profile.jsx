import { useEffect, useState } from "react";
import ResetPassword from "./reset_password";
import { AiFillEdit } from "react-icons/ai";
import { useEditProfileMutation, useGetprofileQuery } from "../../services/Setting";
import { useDispatch } from "react-redux";
import { setLoading, setProfile } from "../../features/authentication";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    })
    const [error, setError] = useState();
    const [edit, setEdit] = useState(true);
    const {data: profileData, isLoading, isError, error:profileError} = useGetprofileQuery();

    useEffect(() => {
        if(isLoading) dispatch(setLoading(true))
    }, [isLoading, dispatch])


    useEffect(() => {
        if(isError && profileError){
            console.log(profileError)
            if([404, 401, 403].includes(profileError.status)){
                navigate('/redirect');
            }
        }
        if (profileData?.message) {
            setFormData({
                first_name: profileData?.message['full_name'].split(' ')[0],
                last_name: profileData?.message['full_name'].split(' ')[1],
                email: profileData?.message['email'],
                contact_number: profileData?.message['contact_number'],
            });
        }
        if (isLoading) dispatch(setLoading(false));
    }, [profileData, isLoading, dispatch]);

    useEffect(() => {
        if(isLoading) dispatch(setLoading(false))
    }, [isLoading, dispatch])

    const [EditAPI, {isLoading: editLoading, isError:EditProfileBool, error: EditProfileError}] = useEditProfileMutation();
    useEffect(() => {
        if(editLoading) dispatch(setLoading(true))
    }, [editLoading, dispatch])

    const handleSumbit = async(e) => {
        e.preventDefault();
        const name = formData.first_name + ' ' + formData.last_name;
        try {
            const result = await EditAPI({ name, email: formData.email, contact_number: formData.contact_number }).unwrap();
            if(result.message){
                setEdit(true)
            }
        } catch (error) {
            setError(error)
            if(EditProfileBool){
                setError(EditProfileError.data?.error_message)
            }
        }
    }

    useEffect(() => {
        if(editLoading) dispatch(setLoading(false))
    }, [editLoading, dispatch])
 
    return (
        <>
        <div className="flex flex-col md:flex-row gap-10 px-4">
            <div className="flex flex-col w-full xl:px-6">
                <div className="flex flex-row justify-between items-center mb-7">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <AiFillEdit className="size-5" onClick={() => setEdit(!edit)} />
                </div>
            <form onSubmit={handleSumbit} className="p-4 ring-2 ring-offset-8 ring-black/50 bg-white/70 rounded-md">
            {error && <p className="text-sm text-red-700">{error}</p>}
                <div className="flex flex-row gap-5 mb-4">
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name" > First name </label>
                        <input
                        className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit && 'bg-slate-200'}
                                rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="first_name"
                        type="text"
                        disabled={edit}
                        value={formData.first_name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }) )}
                        placeholder="Firstname"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name" > Last Name </label>
                        <input
                        className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit && 'bg-slate-200'}
                                rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="last_name"
                        type="text"
                        disabled={edit}
                        value={formData.last_name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }) )}
                        placeholder="Lastname"
                        />
                    </div>
                </div>
                <div className="w-full mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" >Email</label>
                        <input
                        className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit && 'bg-slate-200'}
                            rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        type="email"
                        disabled={edit}
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }) )}
                        placeholder="Email"
                        />
                </div>
                <div className="w-full mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number" >Contact number</label>
                        <input
                        className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit && 'bg-slate-200'}
                            rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="contact_number"
                        type="Number"
                        disabled={edit}
                        value={formData.contact_number}
                        placeholder="Contact Number"
                        onChange={(e) => setFormData((prev) => ({ ...prev, contact_number: e.target.value }) )}
                        />
                </div>
                <div className="flex justify-end mt-6">
                <button disabled={edit} type="submit" className={`ring-2 ring-offset-2 p-2 rounded-md ring-indigo-800/50 hover:bg-blue-500/60`} >
                    Save
                </button>
                </div>
            </form>
            </div>
            <ResetPassword />
        </div>
        </>
    );
};

export default Profile;
