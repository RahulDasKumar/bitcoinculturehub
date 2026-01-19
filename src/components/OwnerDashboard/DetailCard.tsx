
import React from 'react';
import { EditIcon } from 'lucide-react';

interface Prompt {
    prompt_key: string;
    custom_text: string;
}
interface DetailCardProps {
    section: Prompt;
    onClick: () => void;
}

const DetailCard: React.FC<DetailCardProps> = ({ section, onClick }) => {
    const formatPromptKey = (key: string) =>
        key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    return (
        <button
            onClick={onClick}
            className="group flex flex-col items-start p-6 bg-white border border-gray-200 hover:border-black transition-all duration-200 text-left w-full h-full shadow-sm hover:shadow-md"
        >
            <div className="flex justify-between items-center w-full mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-black">{formatPromptKey(section.prompt_key)}</h3>
                <EditIcon />
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
                {section.custom_text || "Click to add details..."}
            </p>
        </button>
    );
};

export default DetailCard;
