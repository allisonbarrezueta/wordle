import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ExampleIcon1 from "../icons/ExampleIcon1";
import ExampleIcon2 from "../icons/ExampleIcon2";
import ExampleIcon3 from "../icons/ExampleIcon3";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    newGame: () => void;
    isFirstVisit: boolean;
    start: () => void;
    isDark: boolean;
};

const HelpModal: React.FC<ModalProps> = ({ isOpen, onClose, isFirstVisit, start, isDark }) => {
    if (!isOpen) {
        return null;
    }

    const play = () => {
        if (isFirstVisit) {
            start();
        }
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={onClose}>
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-[#f3f3f3e2] dark:bg-darkHelpBg dark:border-[#939B9F] dark:border-1 p-6 text-left align-middle transition-all border-black border-1 rounded-md flex flex-col">
                                <div className="font-extrabold leading-11 text-black text-35 justify-center items-center flex dark:text-white my-5">
                                    Cómo Jugar
                                </div>
                                <div className="flex flex-col space-y-3 my-4 dark:text-white text-black">
                                    <span className="text-[19px] font-normal leading-6.5">Adivina la palabra oculta en cinco intentos.</span>
                                    <span className="text-[19px] font-normal leading-6.5">Cada intento debe ser una palabra válida de 5 letras.</span>
                                    <span className="text-[19px] font-normal leading-6.5">
                                        Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
                                    </span>
                                    <span className="text-[19px] font-bold leading-6.5 mb-4">Ejemplos</span>
                                    <ExampleIcon1 isDark={isDark} />
                                    <span className="text-[19px] mt-2">
                                        La letra <b>G</b> está en la palabra y en la posición correcta.
                                    </span>
                                    <ExampleIcon2 isDark={isDark} />
                                    <span className="text-[19px] mt-2">
                                        La letra <b>c</b> La letra C está en la palabra pero en la posición incorrecta.
                                    </span>
                                    <ExampleIcon3 isDark={isDark} />
                                    <span className="text-[19px] mt-2">
                                        La letra <b>O</b> no esta en la palabra.
                                    </span>
                                    <span className="text-[19px] mt-2">
                                        Puede haber letras repetidas. Las pistas son independientes para cada letra.
                                    </span>
                                </div>
                                <span className="text-center text-[19px] mt-2 py-6 dark:text-white text-black">
                                    ¡Una palabra nueva cada 5 minutos!
                                </span>
                                <button onClick={play} className="mt-4 justify-center">
                                    <span className="bg-green-play text-28 font-bold leading-8 border border-transparent text-white rounded-xs px-20 py-2">
                                        !JUGAR¡
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
export default HelpModal;
