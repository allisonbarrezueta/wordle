import React, { useEffect, useState } from "react";
import "./App.css";
import HelpModal from "./components/modals/HelpModal";
import StatisticModal from "./components/modals/StatisticModal";
import Header from "./components/Header";
import KeyboardInput from "./components/keyboard";
import { useGuess } from "./hooks";
import GuessGrid from "./components/GuessGrid";
import useStore, { GameState } from "./store";
import { useTimerStore } from "./timerStore";

function App() {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isStatisticModalOpen, setIsStatisticHelpModalOpen] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
    const [guess, setGuess, addGuessLetter] = useGuess();
    const { gameStatus, newGame, answer, outOfTime } = useStore();
    const [isDark, setIsDark] = useState<boolean>(false);

    const { timer, start, stop, restart } = useTimerStore();

    useEffect(() => {
        localStorage.setItem("timer", timer.toString());
        if (timer <= 0) {
            outOfTime();
            stop();
            openStatisticModal();
        }
    }, [timer]);

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
        const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
        if (hasVisitedBefore !== "true") {
            setIsFirstVisit(true);
            localStorage.setItem("hasVisitedBefore", "true");
        } else {
            setIsFirstVisit(false);
        }

        const storedStartTime = localStorage.getItem("timer");
        if (storedStartTime && !isFirstVisit && gameStatus.state !== GameState.WON && gameStatus.state !== GameState.LOST) {
            const startTime = parseInt(storedStartTime);

            if (startTime >= 0) {
                start();
            }
        }
    }, []);

    useEffect(() => {
        if (isFirstVisit) openHelpModal();
    }, [isFirstVisit]);

    useEffect(() => {
        if ((gameStatus.state === GameState.WON || gameStatus.state === GameState.LOST) && !isFirstVisit) {
            stop();
            openStatisticModal();
        }
    }, [gameStatus]);

    return (
        <div className="flex flex-col bg-background bg-opacity-89 dark:bg-darkHelpBg dark:bg-opacity-89 min-h-screen items-center px-10 lg:px-48 py-4">
            <Header openHelpModal={openHelpModal} openStatisticModal={openStatisticModal} setIsDark={setIsDark} isDark={isDark} />
            <GuessGrid guess={guess} setGuess={setGuess} />
            <KeyboardInput onLetterPressed={addGuessLetter} />

            <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} newGame={newGame} isFirstVisit={isFirstVisit} start={start} />
            <StatisticModal
                isOpen={isStatisticModalOpen}
                onClose={closeStatisticModal}
                gameStatus={gameStatus}
                answer={answer}
                newGame={newGame}
                timer={timer}
                stop={stop}
                restart={restart}
                start={start}
            />
        </div>
    );
}

export default App;
