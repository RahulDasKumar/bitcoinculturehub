const ComingSoonBanner = ({children}) =>{
    return <>
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="bg-black text-white font-display text-4xl px-8 py-4 border-4 border-bitcoin rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(247,147,26,1)] uppercase tracking-widest z-20">
            Coming Soon
        </div>
            <div className="grayscale opacity-40 pointer-events-none select-none filter blur-[1px]">
                {children}
            </div>    
    </div>
    </>
    
}

export default ComingSoonBanner