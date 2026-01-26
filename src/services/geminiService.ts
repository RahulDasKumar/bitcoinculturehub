
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const analyzeResume = async (base64Pdf: string): Promise<string> => {
//     try {
//         const response = await ai.models.generateContent({
//             model: 'gemini-3-flash-preview',
//             contents: {
//                 parts: [
//                     {
//                         inlineData: {
//                             mimeType: 'application/pdf',
//                             data: base64Pdf,
//                         },
//                     },
//                     {
//                         text: "Please provide a professional 3-sentence summary of this resume highlighting the candidate's core Bitcoin or technical skills. Use a confident tone suitable for a Bitcoin developer portal."
//                     }
//                 ]
//             },
//         });

//         return response.text || "Analysis complete. Review your resume to ensure all Bitcoin-related projects are highlighted.";
//     } catch (error) {
//         console.error("Gemini Analysis Error:", error);
//         return "Failed to analyze resume. Please try again later.";
//     }
// };
