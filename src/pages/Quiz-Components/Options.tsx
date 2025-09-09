import React, { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import useArchtype, { Archtypes } from "./QuizContext";
import { QuestionCard } from "@/components/QuestionCard";
type OptionsProps = {
    options: [string, string][];
    selectedOption: string;
    onSubmit: (option: string) => MouseEventHandler<HTMLDivElement>;
};

const Options: React.FC<OptionsProps> = ({
    options,
    selectedOption,
    onSubmit
}) => {


    return (
        <div className="flex flex-column flex-wrap  h-[60vh] justify-center">
            {options.map((answerChoice) => (
                <span
                    className="w-1/2 m-5 cursor-pointer"
                    onClick={onSubmit(answerChoice[1])} 
                >
                    <QuestionCard
                        description={answerChoice[0]}
                        className="flex justify-center items-center h-full w-full"
                    />
                </span>
            ))}
        </div>
    );
};

export default Options;
