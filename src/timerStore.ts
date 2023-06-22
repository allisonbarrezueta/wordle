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
