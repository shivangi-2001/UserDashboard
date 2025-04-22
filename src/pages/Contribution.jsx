import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LuReplace } from "react-icons/lu";
import { TbPlus } from "react-icons/tb";

import { useUserContributionsQuery } from '../services/Contribution';
import LoadingPage from '../components/LoadingPage';
import { setContributorRecord, setTotalContributorRecord } from '../features/contribution';
import DeleteContributions from '../pageComponents/Contribution/table/Delete';

const conversionDate = (date_income) => {
    let date = new Date(date_income);
    return date.toDateString();
}

const Contribution = () => {
    const dispatch = useDispatch();
    const { records } = useSelector(state => state.contributor);

    const { data , isLoading, refetch } = useUserContributionsQuery({}, { refetchOnReconnect: true });

    useEffect(() => {
        if(data){
            dispatch(setTotalContributorRecord(data.total));
            dispatch(setContributorRecord(data.message));
        }
    }, [data, dispatch])

    const statusColor = (status) => {
        if(status === 'pending'){
            return 'text-gray-400 bg-gray-50 ';
        } else if(status === "reviewed"){
            return 'bg-yellow-200 text-amber-600';
        }else if(status === 'verified'){
            return 'bg-green-50 text-green-700';
        }else{
            return 'bg-red-50 text-red-400';
        }
    }

    return (
        <Layout>
            {isLoading && <div className="my-2"><LoadingPage /></div>}

            <div className="container mx-auto">
                <div className="flex flex-row justify-between align-middle items-center">
                <p className="text-2xl py-2">Your Contributions</p>
                <Link to='/add/contribution' className='flex items-center italic underline hover:scale-5 hover:cursor-pointer'>
                    <TbPlus />Add
                </Link>
                </div>
                
                <hr className="border-gray-400 mb-4" />

                <table id="table" className="table-auto border border-black shadow py-4 text-center w-full">
                    <thead className="bg-gray-200 border-b border-b-black-2">
                        <tr>
                            <th className="px-4 py-2 border-r border-black">S.No</th>
                            <th className="px-4 py-2 border-r border-black">Title</th>
                            <th className="px-4 py-2 border-r border-black">Status</th>
                            <th className="px-4 py-2 border-r border-black">Date Added</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records?.map((data, index) => {
                            return (
                                <tr key={index} className="odd:bg-white even:bg-gray-100 ">
                                    <td className='px-4 py-2 border-r border-black'>{index + 1}</td>
                                    <td className="px-4 py-2 border-r border-black">{data.title}</td>
                                    <td className={`px-4 py-2 border-r border-black capitalize font-bold ${statusColor(data.status)}`}>{data.status || "pending"}</td>
                                    <td className="px-4 py-2 border-r border-black">{conversionDate(data.createdAt)}</td>
                                    <td className="px-4 py-2 border-r border-black ">
                                        <button disabled={data.status !== 'pending'} className={`${data.status === "pending" ? "text-red-600": "text-red-600/30"}`}>
                                            <DeleteContributions doi={data.doi} refetchContribition={refetch} />
                                        </button>
                                        <button><LuReplace color="blue" /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Contribution;