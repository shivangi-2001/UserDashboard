const Navbar = () => {
    return ( 
        <nav className="hidden md:flex p-2 xl:px-8 w-full flex-row justify-between bg-white h-16 shadow">
            <img src="/iitm.svg" alt=""  className="w-12" />
            <div className="flex flex-col justify-center">
                <div className="text-xl text-pretty text-black capitalize" style={{letterSpacing: '1px'}}>Centre for Atomistic Modelling and Materials Design</div>
                <div className="text-center text-red-800 font-extrabold text-lg">Electrochemical Energy Storage Database</div>
            </div>
            <img src="/cammd.jpg" alt="" className="w-12" />
        </nav>
    );
}

export default Navbar;