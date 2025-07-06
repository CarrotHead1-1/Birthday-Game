import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full h-20 shadow-md bg-white z-50">
            <div className="flex justify-between items-center h-full w-full px-4 md:px-8">

                <ul className="hidden sm:flex space-x-6 text-lg font-medium">
                    <li className="hover"> The Launch Party Mystery </li>

                    <li className="hover"><Link href="/EvidenceLog"> Evidence Log </Link> </li>
                </ul>

            </div>
        </nav>
    )
}

export default Navbar