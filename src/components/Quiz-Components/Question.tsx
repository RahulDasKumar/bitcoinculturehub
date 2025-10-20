
import React, { Component, DetailedHTMLProps, FormEvent, HTMLAttributes, MouseEventHandler } from "react";
import Options from "./Options";
import { Archtypes } from "./QuizContext";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
type QuestionType = {
    id: number;
    question: string;
    options: [string, string][];
};

type QuestionProps = {
    question: QuestionType;
    selectedOption: string;
    onOptionChange: (option: string) => void;
    onSubmit: (value:string) => MouseEventHandler<HTMLDivElement>;
};

const Question : React.FC<QuestionProps> = ({ question, selectedOption, onOptionChange, onSubmit } ) =>
{

        return (
            <div className="flex-column justify-center items-center">
                <h5 className="flex justify-center items-center h-[20vh] text-4xl md:text-4xl font-bold mb-6">{question.question}</h5>
                    <Options
                        options={question.options}
                        selectedOption={selectedOption}
                        onSubmit={onSubmit}
                    />
            </div>
        );
    }

export default Question;
