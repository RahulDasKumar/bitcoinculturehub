import { create } from "zustand"

export type Archtypes = "HODLer" | "Creator" | "Explorer" | "Maximalist" | "Begninner";

type QuizState = {
    archtypes: Record<Archtypes, number>;
    increaseScore: (type: Archtypes) => void;
    selection:string;
    selectedRole: (type:Archtypes) => void;
};

const useArchtype = create<QuizState>((set) => ({
    archtypes: {
        "HODLer": 0,
        "Creator": 0,
        'Explorer': 0,
        "Maximalist": 0,
        "Begninner": 0,
    },
    selection:"",

    increaseScore: (type) =>
        set((state) => ({
            archtypes: {
                ...state.archtypes,
                [type]: state.archtypes[type] + 2,
            },
        })),
    selectedRole: (selected_answer) => set({selection:selected_answer})
}));


export default useArchtype;
