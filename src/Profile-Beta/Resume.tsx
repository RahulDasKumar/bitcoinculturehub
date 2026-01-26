import React, { useState, useRef, useEffect } from 'react';
import useAuthStore from '@/hooks/use-auth';

interface ResumeHubProps {
    onFileLoaded?: (file: File) => void;
}

const ResumeHub: React.FC<ResumeHubProps> = ({ onFileLoaded }) => {

    
    const [file, setFile] = useState<File | null>(null);
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [showFullPreview, setShowFullPreview] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Zustand
    const resumePreviewUrl = useAuthStore(s => s.resumePreviewUrl);
    const uploadResume = useAuthStore(s => s.uploadResume);
    const getResume = useAuthStore(s => s.getResume);

    // Cleanup object URLs
    useEffect(() => {
        return () => {
            if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
        };
    }, [localPreviewUrl]);


    useEffect(() => {
        getResume();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.type !== 'application/pdf') {
            alert('Please upload a PDF file only.');
            return;
        }

        setFile(selectedFile);
        setAnalysis(null);

        if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
        setLocalPreviewUrl(URL.createObjectURL(selectedFile));

        onFileLoaded?.(selectedFile);

        try {
            await uploadResume(selectedFile);
        } catch (err) {
            console.error('Upload failed', err);
            alert('Failed to upload resume.');
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setAnalysis(null);
        if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
        setLocalPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleAiAnalysis = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            setAnalysis('Nice resume');
            setIsAnalyzing(false);
        }, 1200);
    };

    const previewSrc = resumePreviewUrl;

    return (
        <div className="border border-black p-4 h-80 w-1/4 flex flex-col bg-white relative overflow-hidden">

            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-3 shrink-0">
                <h3 className="font-bold text-sm uppercase">Proof of Competence</h3>
                <div className="flex gap-2">
                    {file && (
                        <button
                            onClick={clearFile}
                            className="text-[10px] font-bold border border-red-200 text-red-400 px-2 py-0.5 hover:bg-red-50"
                        >
                            REMOVE
                        </button>
                    )}
                    <button
                        onClick={triggerUpload}
                        className="text-[10px] font-bold border border-black px-2 py-0.5 hover:bg-black hover:text-white"
                    >
                        {file ? 'UPDATE' : 'UPLOAD'}
                    </button>
                </div>
            </div>

            {previewSrc ? (
                <div className="flex-1 flex flex-col gap-3 min-h-0">
                    <div className="relative flex-1 bg-gray-50 border overflow-hidden rounded-sm">
                        <iframe
                            src={`${previewSrc}#toolbar=0&navpanes=0`}
                            className="w-full h-full"
                            title="Resume Preview"
                        />
                        <button
                            onClick={() => setShowFullPreview(true)}
                            className="absolute top-2 right-2 bg-white border px-2 py-1 text-xs"
                        >
                            Full Screen
                        </button>
                    </div>

                    {!isAnalyzing ? (
                        <button
                            onClick={handleAiAnalysis}
                            className="w-full text-[10px] font-bold bg-[#f7931a] text-white py-2"
                        >
                            {analysis ? 'RE-SUMMARIZE WITH AI' : 'SUMMARIZE WITH AI'}
                        </button>
                    ) : (
                        <div className="text-center text-xs text-gray-500">
                            Mining Insights...
                        </div>
                    )}

                    {analysis && (
                        <div className="p-2 border-l-2 border-[#f7931a] bg-orange-50">
                            <p className="text-xs italic">{analysis}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={triggerUpload}
                    className="flex-1 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black"
                >
                    <span className="text-xs text-gray-500 font-bold uppercase">
                        PDF Resumes Only
                    </span>
                    <p className="text-[10px] text-gray-400">
                        Click to upload
                    </p>
                </div>
            )}

            {showFullPreview && previewSrc && (
                <div className="fixed inset-0 z-50 bg-black/90 flex flex-col p-8">
                    <button
                        onClick={() => setShowFullPreview(false)}
                        className="text-white self-end mb-4"
                    >
                        Close
                    </button>
                    <iframe
                        src={previewSrc}
                        className="flex-1 bg-white rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default ResumeHub;
