import React from 'react';


const Footer = () => {
    return (
        <footer className="bg-[#202536] text-white px-3 py-12 mt-20 md:min-h-500">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-5">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold">Battery Materials</h3>
                        <ul className="mt-4 text-md">
                            <li className='mb-2'><a href="#" className="text-blue-400 hover:text-white">Apps Overview</a></li>
                            <li className='mb-2'><a href="#" className="text-blue-400 hover:text-white">About</a></li>
                            <li className='mb-2'><a href="#" className="text-blue-400 hover:text-white">Community</a></li>
                            <li className='mb-2'><a href="#" className="text-blue-400 hover:text-white">Machine Learning</a></li>
                            <li className='mb-2'><a href="#" className="text-blue-400 hover:text-white">API</a></li>
                            <li className='mb-2'><a href="#" className="text-blue-400 hover:text-white">Dashboard</a></li>
                        </ul>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold">About</h3>
                        <ul className="mt-4 text-md">
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">News and Updates</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">People</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">Partners and Support</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">How to Cite</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">Open Source Software</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">Publications</a></li>
                        </ul>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold">Community</h3>
                        <ul className="mt-4 text-md">
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">Seminar</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">Documentation</a></li>
                            <li className='mb-1.5'><a href="#" className="text-blue-400 hover:text-white">Forum</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/iitm.svg" alt="Berkeley Lab Logo" className="w-24 h-24 mb-4" />
                        <p>The Battery Materials Project is powered by open-source software...</p>
                        <p>The current website version is 2.0 and database version is 2024-2025</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
