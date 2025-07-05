
"use client"

import React from "react";
import Link from "next/link";

export default function EvidenceLogPage() {
    const sections = [
        { name: "Profiles", href: "/EvidenceLog/profiles", description: "Veiw Character Profiles" },
        { name: "Notebook", href: "/notebook", description: "View Mallendra's Notebook " },
        { name: "Documents", href: "/documents", description: "View Documents" },
        { name: "Spy Files", href: "/spyfiles", description: "View Secret Recordings and Videos" }
    ];

    return (
        <section className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center"> Evidence Log Dashbaord </h1>

            <div className="flex flex-col space-y-4">
                {sections.map((section) => (
                    <Link
                        key={section.name}
                        href={section.href}
                        className="block border border-gray-300 rounded-lg shadow hover:shadow-lg
                    transition p-6 bg-white hover:bg-gray-50">
                        <h2 className="text-xl font-bold mb-2"> {section.name} </h2>
                        <p className="text-gray-600"> {section.description} </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
