import { useEffect, useState } from "react";
import ResetPassword from "./reset_password";
import { AiFillEdit } from "react-icons/ai";
import { useEditProfileMutation, useGetprofileQuery } from "../../services/Setting";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/authentication";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    });
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(true);

    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
        error: profileError
    } = useGetprofileQuery();

    const [editProfile, { isLoading: isEditLoading, isError: isEditError, error: editError }] = useEditProfileMutation();

    // Handle loading state
    useEffect(() => {
        dispatch(setLoading(isProfileLoading || isEditLoading));
    }, [isProfileLoading, isEditLoading, dispatch]);

    // Handle profile fetching
    useEffect(() => {
        if (isProfileError && profileError) {
            console.log(profileError);
            if ([404, 401, 403].includes(profileError.status)) {
                navigate('/redirect');
            }
        }

        if (profileData?.message) {
            const fullName = profileData.message.full_name || "";
            const [firstName, lastName] = fullName.split(" ");
            setFormData({
                first_name: firstName || '',
                last_name: lastName || '',
                email: profileData.message.email || '',
                contact_number: profileData.message.contact_number || ''
            });
        }
    }, [profileData, isProfileError, profileError, navigate]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const name = `${formData.first_name} ${formData.last_name}`;
        try {
            const result = await editProfile({
                name,
                email: formData.email,
                contact_number: formData.contact_number
            }).unwrap();

            if (result.message) {
                setEdit(true);
            }
        } catch (err) {
            const message = isEditError
                ? editError?.data?.error_message
                : err?.data?.error_message || err?.message || "Unknown error";
            setError(message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-10 px-4">
            <div className="flex flex-col w-full xl:px-6">
                <div className="flex flex-row justify-between items-center mb-7">
                    <h2 className="text-xl font-semibold">Profile Settings</h2>
                    <AiFillEdit className="size-5 cursor-pointer" onClick={() => setEdit(!edit)} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 ring-2 ring-offset-8 ring-black/50 bg-white/70 rounded-md">
                    {error && (
                        <p className="text-sm text-red-700">
                            {typeof error === 'string' ? error : JSON.stringify(error)}
                        </p>
                    )}

                    <div className="flex flex-row gap-5 mb-4">
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">First name</label>
                            <input
                                id="first_name"
                                type="text"
                                disabled={edit}
                                value={formData.first_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                                placeholder="Firstname"
                                className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit ? 'bg-slate-200' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
                            <input
                                id="last_name"
                                type="text"
                                disabled={edit}
                                value={formData.last_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                                placeholder="Lastname"
                                className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit ? 'bg-slate-200' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            disabled={edit}
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Email"
                            className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit ? 'bg-slate-200' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">Contact number</label>
                        <input
                            id="contact_number"
                            type="text"
                            disabled={edit}
                            value={formData.contact_number}
                            onChange={(e) => setFormData(prev => ({ ...prev, contact_number: e.target.value }))}
                            placeholder="Contact Number"
                            className={`shadow appearance-none border ring-2 ring-offset-2 ring-black/50 ${edit ? 'bg-slate-200' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        
                        <button 
                         disabled={edit}
                         type="submit"
                         className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <ResetPassword />
        </div>
    );
};

export default Profile;
