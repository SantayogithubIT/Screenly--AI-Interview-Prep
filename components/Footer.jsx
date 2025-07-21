import Image from "next/image";

export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full">
            <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
                
                <div className="max-w-96">
                    <Image src="/logo.svg" alt="Screenly" height={200} width={550} />
                    <p className="mt-6 text-sm text-gray-500">
                        "Practicing interviews has never been this smart. Screenly – Where preparation meets precision."
                    </p>
                </div>
          {/* LINKS */}
                <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">Priyanka Shee</h2>
                        <ul className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="https://drive.google.com/drive/u/0/folders/10uSYT92l9w3vjgN23GSS5L2qVAmURuMH">Resume</a></li>
                            <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=priyankashee7716@gmail.com" target="_blank">Gmail</a></li>
                            <li><a href="https://www.linkedin.com/in/priyanka-shee-669a15251/">LinkedIn</a></li>
                            <li><a href="https://github.com/priyankas77">Github</a></li> 
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">Santayo Kundu</h2>
                        <div className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="https://drive.google.com/drive/u/0/folders/1ZlrIplGFaNuFChJi5bZNEMgBR1aGVQTf">Resume</a></li>
                           <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=santayokundu4@gmail.com" target="_blank">Gmail</a></li>
                            <li><a href="https://www.linkedin.com/in/santayo-kundu-35024b254/">LinkedIn</a></li>
                            <li><a href="https://github.com/SantayogithubIT">Github</a></li> 
                        </div>
                    </div>
                </div>
        
            </div>
            <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                Made with ❤️ by Priyanka & Santayo 
            </p>
        </footer>
    );
};