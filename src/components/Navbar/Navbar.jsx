function Navbar()
{
    return (
        <nav className="bg-rose-800 text-rose-200 flex items-center justify-between p-4">
            {/* logo */}
            <div>
                <h1 className="text-2xl font-bold"> Navbar </h1>
            
            </div>

            {/* search bar */}

            <div>
                <input 
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg bg-rose-200 text-black focus:outline-none focus:ring-2 focus:ring-black"
                
                />
            </div>

            {/* navigation links */}
            <div className="flex space-x-4">
                <i>A</i>
                <i>B</i>
                <i>C</i>
            </div>

            
            



        </nav>
    )
}

export default Navbar;