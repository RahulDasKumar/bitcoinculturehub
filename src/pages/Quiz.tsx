import Question from "./Quiz-Components/Question";
import bitcoinQBank from "./Quiz-Components/QuestionBank";
import { useState, FormEvent } from "react";
import { Archtypes } from "./Quiz-Components/QuizContext";
import useArchtype from "./Quiz-Components/QuizContext";
import  ArchtypeProgress  from "./Quiz-Components/ArchtypeProgress";
import { stat } from "fs";
import Header from "@/components/Header";
const Quiz = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };
    const increaseScore = useArchtype((state) => state.increaseScore);
    const archtypes = useArchtype((state) => state.archtypes);
    const role = useArchtype((state)=> state.selection)
    const selectedAnswer = useArchtype((state) => state.selectedRole)
    const handleSubmit = (value: string): React.MouseEventHandler<HTMLDivElement> =>
        (e) => {
            e.preventDefault();
            console.log("Selected:", value);
            console.log(value)
            increaseScore(value as Archtypes);
            selectedAnswer(value as Archtypes)
            console.log(archtypes)
            setQuestionNumber((n) => n + 1);
        };



    return (
        <div>
            <Header></Header>
        <div className="flex items-center gap-x-4">
            <div className="flex-shrink-0 w-2/3">
                <Question
                    question={bitcoinQBank[questionNumber]}
                    selectedOption={selectedOption}
                    onOptionChange={handleOptionChange}
                    onSubmit={handleSubmit}
                />
            </div>
            <div className="flex-shrink-0 w-1/3">
                <ArchtypeProgress selection={role}/>
            </div>
        </div>
        </div>
    );
};

export default Quiz;
