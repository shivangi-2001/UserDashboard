import { useState } from "react";
import Layout from "../../components/Layout";
import UplaodExcel from "./UploadExcel";
import ContributionForm from "./contributionform";
import { StepperProvider } from "./StepperContext";
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const AddContribution = () => {
    const [activeTab, setActiveTab] = useState('form')
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
            <Link to="/contribution" className="inline-flex gap-1 align-middle">
                <ArrowLeftCircleIcon className="size-5" />
                <p className="hover:underline">Back</p>
            </Link>
            <div className="flex justify-center mb-4 w-full">
                <button
                    className={`flex-1 px-4 py-2 ${activeTab === 'form' ? 'text-white bg-slate-900' : 'bg-white'}`}
                    onClick={() => setActiveTab('form')}
                >
                    Add Form
                </button>
                <button
                    className={`flex-1 px-4 py-2 ${activeTab === 'upload' ?  'text-white bg-slate-900' : 'bg-white'}`}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload File
                </button>
            </div>
            {activeTab === 'form' && (
                <StepperProvider>
                    <ContributionForm />
                </StepperProvider>
            )}
            {activeTab === 'upload' && (
                <UplaodExcel />
            )}
            </div>
        </Layout>
    );
}
 
export default AddContribution;