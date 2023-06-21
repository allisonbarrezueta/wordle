import React, { useState } from "react";
import "./App.css";
import HelpModal from "./components/modals/HelpModal";
import StatisticModal from "./components/modals/StatisticModal";
import Header from "./components/Header";
import KeyboardInput from "./components/keyboard";
import { useGuess } from "./hooks";
import GuessGrid from "./components/GuessGrid";

function App() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isStatisticModalOpen, setIsStatisticHelpModalOpen] = useState(false);

  localStorage.theme = "light";
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

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

  // const [guess, setGuess, addGuessLetter] = useGuess();

  const [guess, setGuess] = useState<string>(""); // [guess, setGuess
  const addGuessLetter = () => {};

  return (
    <div className="flex flex-col bg-background bg-opacity-89 dark:bg-darkHelpBg dark:bg-opacity-89 min-h-screen items-center px-48 py-4">
      <Header
        openHelpModal={openHelpModal}
        openStatisticModal={openStatisticModal}
      />
      <GuessGrid guess={guess} setGuess={setGuess} />
      <KeyboardInput onLetterPressed={addGuessLetter} />
      <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
      <StatisticModal
        isOpen={isStatisticModalOpen}
        onClose={closeStatisticModal}
      />
    </div>
  );
}

export default App;
