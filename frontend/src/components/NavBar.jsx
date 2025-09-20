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
    console.log(isDarkMode)

    return (
        <div className="flex flex-row justify-between items-center py-4 px-10 shadow-lg">
            <h1 className="text-3xl font-bold">Scheduling Algorithm</h1>
            <div className="flex flex-row border-1 rounded-xl">
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