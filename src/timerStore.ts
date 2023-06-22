// import create from "zustand";

// const STORAGE_KEY = "timerApp.currentTime";

// const getStoredTime = (): number | 0 => {
//     const storedTime = localStorage.getItem(STORAGE_KEY);
//     return storedTime ? parseInt(storedTime, 10) : 0;
// };

// const storeTime = (currentTime: number) => {
//     localStorage.setItem(STORAGE_KEY, currentTime.toString());
// };

// interface TimerState {
//     currentTime: number;
//     resetTimer: () => void;
//     startTimer: () => void;
//     // stopTimer: () => void;
// }

// export const useTimerStore = create<TimerState>((set) => ({
//     currentTime: getStoredTime(),
//     resetTimer: () => {
//         const currentTime = Date.now();
//         set({ currentTime });
//         storeTime(currentTime);
//     },
//     startTimer: () => {
//         const storedTime = getStoredTime();
//         if (storedTime) {
//             set({ currentTime: storedTime });
//         } else {
//             const currentTime = Date.now();
//             set({ currentTime });
//             storeTime(currentTime);
//         }
//     },
// }));

import React, { useEffect } from "react";
import createSignal from "zustand";

type TimerStore = {
    timer: number;
    intervalId: NodeJS.Timeout | null;
    start: () => void;
    stop: () => void;
    restart: () => void;
};

export const useTimerStore = createSignal<TimerStore>((set) => {
    const storedTimer = localStorage.getItem("timer");
    const initialTimer = storedTimer ? parseInt(storedTimer) : 5 * 60;

    return {
        timer: initialTimer,
        intervalId: null,
        start: () => {
            if (initialTimer > 0) {
                const interval = setInterval(() => {
                    set((state) => {
                        if (state.timer > 0) {
                            return { timer: state.timer - 1, intervalId: state.intervalId };
                        } else {
                            clearInterval(state.intervalId!);
                            return { timer: 0, intervalId: null };
                        }
                    });
                }, 1000); // Update every second

                set({ intervalId: interval });
            }
        },
        stop: () => {
            set((state) => {
                clearInterval(state.intervalId!);
                return { timer: state.timer, intervalId: null };
            });
        },
        restart: () => {
            set({ timer: 5 * 60 });
        },
    };
});
