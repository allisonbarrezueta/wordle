import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { formatTime } from "../../utils";

export enum GameState {
    WON,
    LOST,
    IN_PROGRESS,
}

type IGameStatus = {
    gameOver: boolean;
    state: GameState;
    wins: number;
    totalPlays: number;
};

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    gameStatus: IGameStatus;
    answer: string;
    newGame: () => void;
    timer: number;
    stop: () => void;
    restart: () => void;
    start: () => void;
};

const StatisticModal: React.FC<ModalProps> = ({ isOpen, onClose, gameStatus, answer, newGame, timer, stop, restart, start }) => {
    if (!isOpen) {
        return null;
    }

    const { wins, totalPlays, state } = gameStatus;

    const closeStatistic = () => {
        if (state === GameState.IN_PROGRESS) {
            onClose();
        } else {
            onClose();
            newGame();
            stop();
            restart();
            start();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={closeStatistic}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[#262b3ce2];" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-5 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-background dark:bg-darkHelpBg p-6 text-left align-middle transition-all border-black border-1 rounded-md flex flex-col">
                                <div className="font-extrabold leading-11 dark:text-white text-black text-35 justify-center items-center flex">
                                    Estadísticas
                                </div>
                                <div className="flex flex-row space-x-10 my-6 justify-around dark:text-white text-black">
                                    <div>
                                        <span className="font-extrabold leading-11 text-35 justify-center items-center flex">{totalPlays}</span>
                                        <span>Jugadas</span>
                                    </div>
                                    <div>
                                        <span className="font-extrabold leading-11 text-35 justify-center items-center flex">{wins}</span>
                                        <span>Victorias</span>
                                    </div>
                                </div>
                                {state === GameState.LOST && (
                                    <span className="flex flex-row text-center text-[19px] my-2 justify-center dark:text-white text-black">
                                        La palabra era: <span className="font-bold uppercase mx-2">{answer}</span>
                                    </span>
                                )}
                                <span className="flex flex-col text-center text-[19px] mt-2 pb-6 dark:text-white text-black">
                                    <span className="uppercase text-19 leading-6.5 py-4">Siguiente palabra</span>
                                    <span className="text-24 font-bold leading-8">{formatTime(timer)}</span>
                                </span>
                                <button onClick={closeStatistic} className="flex my-2 justify-center">
                                    <span className="bg-green-play text-28 font-bold leading-8 border border-transparent text-white rounded-xs px-20 py-2">
                                        Aceptar
                                    </span>
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default StatisticModal;
