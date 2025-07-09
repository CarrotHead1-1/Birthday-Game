
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const EvidenceNavbar = () => {

    const router = useRouter();

    return (
        <nav className="fixed left-0 top-20 w-full h-10 shadow-md bg-gray-100 z-50">
            <div className="flex justify-between items-center h-full w-full px-4 md:px-8 border-b-2">

                <button
                    onClick={() => router.back()}
                    className="mr-6 text-gray-600 hover:text-blue-300 focus::outline-none">
                    Back
                </button>

                <ul className="hidden sm:flex space-x-6 text-lg font-medium text-gray-400">

                    <li className="hover"><Link href="/EvidenceLog/profiles"> Profiles </Link> </li>
                    <li className="hover"><Link href="/EvidenceLog/notebook"> Notebook </Link></li>
                    <li className="hover"><Link href="/EvidenceLog/documents"> Documents </Link></li>
                    <li className="hover"><Link href="/EvidenceLog/spyFiles"> Audio and Video Recordings </Link></li>
                    <li className="hover"><Link href="/EvidenceLog/answer"> Solved the Case? </Link></li>

                </ul>

            </div>
        </nav>
    )
}

export default EvidenceNavbar