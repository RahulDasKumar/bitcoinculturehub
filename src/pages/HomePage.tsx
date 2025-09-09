import Header from "@/components/Header";


export default function HomePage(){

return(
    <div>
        <Header/>
        <main className="flex h-screen justify-center">
            <section className="flex w-1/2 h-full border-2 border-black items-center justify-center">
                <section className="w-3/4 h-3/4 border-2 border-black ">
                </section>
                
            </section>
            <section className="flex w-1/2 h-full border-2 border-black items-center justify-center">
                <section className="w-3/4 h-3/4 border-2 border-black ">
                </section>
            </section>

        </main>
    </div>
)

}