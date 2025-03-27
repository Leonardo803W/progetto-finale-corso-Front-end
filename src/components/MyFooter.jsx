import { useState, useEffect } from "react";

const MyFooter = () => {

    const [now, setNow] = useState(new Date());
    
        useEffect(() => {

            const intervalId = setInterval(() => {
                setNow(new Date());
            }, 1000);
    
            return () => clearInterval(intervalId); 
        }, []);
    
        return (
            <div className="footerBorder">
                {now.toString()}
            </div>
        );
}

export default MyFooter;
