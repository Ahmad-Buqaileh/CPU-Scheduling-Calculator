import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useEffect, useState } from "react";

function NavBar() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("isDarkMode") === "true";
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("isDarkMode", "true");
        }
        else {
            document.body.classList.remove("dark");
            localStorage.setItem("isDarkMode", "false");
        }
    }, [isDarkMode])

    return (
        <div className="flex flex-row justify-between items-center py-4 px-10 shadow-lg">
            <h1 className="text-2xl font-bold">CPU Scheduling Algorithm Calculator</h1>
            <div className="flex flex-row border-1 border-[#ced4da] rounded-xl dark:border-0 dark:bg-white/6">
                <button
                    className="flex items-center py-2 px-4 cursor-pointer"
                    onClick={() => setIsDarkMode(prev => !prev)}
                >
                    <div>
                        {isDarkMode ? (
                            <FaRegMoon className="w-5 h-5" />
                        ) : (
                            <FaRegSun className="w-5 h-5" />
                        )}
                    </div>
                </button>

            </div>
        </div>
    );
}

export default NavBar;