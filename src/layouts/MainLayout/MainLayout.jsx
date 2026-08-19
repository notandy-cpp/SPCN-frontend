import LeftSidebar from "../../components/Sidebar/LeftSidebar.jsx";
import RightSidebar from "../../components/Sidebar/RightSidebar.jsx";

function MainLayout({children}, {pageName})
{
    return (
        <>
            <div className="min-h-screen bg-primary flex flex-col py-6 px-8 w-full">
        
        <header className="mb-4 text-center">
            <h1
            className="text-5xl font-bold text-black tracking-wide"
            style={{ fontFamily: "'Playfair Display', 'Georgia', cursive, serif" }}
            >
            ({pageName})
            </h1>
            </header>

                  <div className="flex-1 flex items-start justify-between gap-8 w-full max-w-[2000px] mx-auto">
                <LeftSidebar></LeftSidebar>
                <main className="flex-1 bg-secondary border border-gray-800 rounded-4xl overflow-hidden min-h-[calc(100vh-140px)] flex flex-col shadow-sm">
                    <div>({children})</div>
                </main>
                
                <RightSidebar></RightSidebar>
                </div>
            </div>
        </>  
    )
}

export default MainLayout;