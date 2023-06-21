import React, { useEffect, useState } from "react";
import HelpIcon from "./icons/HelpIcon";
import StatisticIcon from "./icons/StatisticIcon";

type ModalProps = {
    openHelpModal: () => void;
    openStatisticModal: () => void;
};

const Header: React.FC<ModalProps> = ({ openHelpModal, openStatisticModal }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isChecked) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isChecked]);

    const handleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="p-5 bg-background dark:bg-darkHeader dark:bg-opacity-3 rounded-md flex flex-row items-center justify-center w-10/12 relative">
            <button className="absolute left-0 inset-y-0 pl-6" onClick={openHelpModal}>
                <HelpIcon />
            </button>
            <span className="text-textHeader dark:text-white leading-17 text-40">WORDLE</span>
            <div className="flex flex-row absolute right-0 inset-y-0 pr-6">
                <button onClick={openStatisticModal}>
                    <StatisticIcon />
                </button>
                <div className="flex flex-row items-center">
                    <input type="checkbox" id="toggle" className="toggle--checkbox" onChange={handleAll} />
                    <label htmlFor="toggle" className="toggle--label">
                        <span className="toggle--label-background"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Header;
