

import React from "react";
import GobalLayout from '../layout';
import EvidenceNavbar from "../components/EvidenceNavbar";


export default function EvidenceLogLayout({ children }) {
    return (
        <div>
            <EvidenceNavbar />

            <div className="container mx-auto px-4 md:px-8 py-4">
                <section className="flex flex-col md:flex-row md:space-x-6 justify-center items-center">
                    {children}
                </section>

            </div>
        </div>
    )
}