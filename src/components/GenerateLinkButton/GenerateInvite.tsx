import { useState } from "react";
import { Clipboard } from "lucide-react"; // Lucide icon
import { API_URL } from "@/config";
const devurl = "http://127.0.0.1:8000"

function GenerateInvite({ orgId, role, token }) {
    const [link, setLink] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const handleClick = async () => {
        // If we already have a link, copy it
        if (link) {
            navigator.clipboard.writeText(link);
            showToast();
            return;
        }

        // Otherwise, generate the link
        const res = await fetch(`${devurl}/authorize/invite/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                org_id: orgId,
                role: role,
                expires_in_hours: 24,
            }),
        });
        
        if (!res.ok) {
            const err = await res.json();
            alert("Error: " + err.detail);
            return;
        }

        const data = await res.json();
        setLink(data.invite_link);
        navigator.clipboard.writeText(data.invite_link);
        showToast();
    };

    const showToast = () => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000); // hide after 2s
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="w-10 mt-6 h-10 flex items-center justify-center rounded-full border border-black bg-white transition-colors duration-150 hover:bg-gray-100"
                title="Copy Invite"
            >
                <Clipboard size={20} className="stroke-black" />
            </button>

            {/* Toast */}
            {toastVisible && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-14 px-4 py-2 bg-black text-white text-sm rounded shadow-lg">
                    Link copied to clipboard!
                </div>
            )}
        </div>
    );
}

export default GenerateInvite;
