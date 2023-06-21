import React, { useEffect, useState } from "react";
import "./App.css";
import HelpModal from "./components/modals/HelpModal";
import StatisticModal from "./components/modals/StatisticModal";
import Header from "./components/Header";
import KeyboardInput from "./components/keyboard";
import { useGuess } from "./hooks";
import GuessGrid from "./components/GuessGrid";
import useStore from "./store";

function App() {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isStatisticModalOpen, setIsStatisticHelpModalOpen] = useState(false);
    const { gameStatus, newGame, answer, timeLeft } = useStore();
    const [guess, setGuess, addGuessLetter] = useGuess();

    const openHelpModal = () => {
        setIsHelpModalOpen(true);
    };

    const closeHelpModal = () => {
        setIsHelpModalOpen(false);
    };

    const openStatisticModal = () => {
        setIsStatisticHelpModalOpen(true);
    };

    const closeStatisticModal = () => {
        setIsStatisticHelpModalOpen(false);
    };

    useEffect(() => {
        console.log("gameStatus", gameStatus);
        if (gameStatus.state !== 2) {
            openStatisticModal;
        }
    }, [gameStatus]);

    return (
        <div className="flex flex-col bg-background bg-opacity-89 dark:bg-darkHelpBg dark:bg-opacity-89 min-h-screen items-center px-48 py-4">
            <Header openHelpModal={openHelpModal} openStatisticModal={openStatisticModal} />
            <GuessGrid guess={guess} setGuess={setGuess} />
            <KeyboardInput onLetterPressed={addGuessLetter} />
            <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
            <StatisticModal isOpen={isStatisticModalOpen} onClose={closeStatisticModal} gameStatus={gameStatus} timeLeft={timeLeft} />
        </div>
    );
}

export default App;
