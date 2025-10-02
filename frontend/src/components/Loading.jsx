
import { useEffect, useState } from "react"

const Loading = () => {
    const [isOverTheTime, setIsOverTheTime] = useState(false);
    const [index, setIndex] = useState(0);

    const nextMessage = () => {
        setIsOverTheTime(true);
        setIndex((prev) => (prev <= 3 ? prev + 1 : prev));
    }

    const messages = [
        "",
        "Warming things up... it's chilly out here! ❄️",
        "Hang on! Engines are heating up, we’re almost there! 🔥",
        "A few more seconds... the virtual coffee’s brewing! ☕️",
        "Still warming up... almost there, promise! 🤓"
    ]

    useEffect(() => {
        setIsOverTheTime(false);
        const interval = setInterval(nextMessage, 10000);
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed flex flex-col items-center justify-center inset-0 bg-black/60 z-10">
            {isOverTheTime && (
                <p className="absolute top-30 left-1/2 -translate-x-1/2 text-white lg:text-3xl font-bold">
                    {messages[index]}
                </p>
            )}
            <div className="w-25 h-25 border-white border-4 rounded-full border-t-transparent animate-spin">
            </div>
        </div>
    )
}

export default Loading