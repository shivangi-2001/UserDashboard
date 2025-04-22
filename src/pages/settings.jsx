import { useState } from "react";
import Layout from "../components/Layout";
import { MdSettings } from "react-icons/md";
import Profile from "../pageComponents/Setting/profile";
import LoadingPage from "../components/LoadingPage";
import { useSelector } from "react-redux";

const Settings = () => {
  // Set "Profile" as the default active tab
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Accounts":
        return (
          <>
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <p className="text-gray-600 mt-2">
              Manage your account information and security.
            </p>
          </>
        );
      case "Notifications":
        return (
          <>
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <p className="text-gray-600 mt-2">
              Set up your notification preferences here.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  const { loading } = useSelector(state => state.authenticated);

  return (
    <Layout>
      <div className="text-3xl flex flex-row items-center gap-1">
        <MdSettings className="inline-block" />
        <span>Settings</span>
      </div>
      <div className="my-4">
        <div className="flex border-b border-gray-500 gap-6 bg-white/30">
          {/* Profile Tab */}
          <button
            onClick={() => setActiveTab("Profile")}
            className={`px-4 py-2 -mb-px text-md font-medium text-gray-700 border-b-4 ${
              activeTab === "Profile"
                ? "border-indigo-500 text-gray-900"
                : "border-transparent"
            } hover:text-gray-900 focus:outline-none`}
          >
            Profile
          </button>
          
          {/* Accounts Tab */}
          <button
            onClick={() => setActiveTab("Accounts")}
            className={`px-4 py-2 -mb-px text-md font-medium text-gray-700 border-b-4 ${
              activeTab === "Accounts"
                ? "border-indigo-500 text-gray-900"
                : "border-transparent"
            } hover:text-gray-900 focus:outline-none`}
          >
            Accounts
          </button>

          {/* Notifications Tab */}
          <button
            onClick={() => setActiveTab("Notifications")}
            className={`px-4 py-2 -mb-px text-md font-medium text-gray-700 border-b-4 ${
              activeTab === "Notifications"
                ? "border-indigo-500 text-gray-900"
                : "border-transparent"
            } hover:text-gray-900 focus:outline-none`}
          >
            Notifications
          </button>
        </div>
        {loading && <LoadingPage />}

        {/* Tab Content */}
        <div className="mt-4 xl:mt-10">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default Settings;
