

import React from "react";
import GobalLayout from '../layout';
import EvidenceNavbar from "../components/EvidenceNavbar";


export default function EvidenceLogLayout({ children }) {
    return (
        <GobalLayout>

            <div>
                <EvidenceNavbar />

                <div className="containter mx-auto px-4 md:pz-8 py-4">
                    <section className="flex flex-col md:flex-row md:space-x-6 justify-center items-center">
                        {children}
                    </section>

                </div>
            </div>


        </GobalLayout>
    )
}