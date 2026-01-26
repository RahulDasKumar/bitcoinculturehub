import { Briefcase, Plus, FileUser } from "lucide-react"
import SectionHeader from "./ui/SectionHeader"

interface ProfileBadgeComponent {
    username:string
}


const ProfileBadge: React.FC<ProfileBadgeComponent> = ({username}) =>{
    return <>
        <div
            className="w-80 border border-gray-200 aspect-square flex flex-col items-center justify-center p-6 hover:border-black transition-colors group cursor-pointer bg-white"
        >
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-black mb-4 group-hover:bg-[#FF6B00] transition-colors">
                {username[0]}
            </div>

            <div className="text-center">
                <h4 className="font-black uppercase text-xs mb-1 tracking-wide">
                    {username}
                </h4>

                {/*
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {org.opportunityCount} Opportunities
                </p>
                */}
            </div>
        </div>
    </>
}

export default ProfileBadge