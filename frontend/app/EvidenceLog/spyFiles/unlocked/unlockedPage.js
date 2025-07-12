
"use client"

import React from "react"
import Link from "next/link"
import Router from "next/navigation"

export default function SpyFilesLogPage() {
    const sections = [
        { name: "Video Files", href: "/EvidenceLog/spyFiles/unlocked/video", description: "View video Files" },
        { name: "Audio Files", href: "/EvidenceLog/spyFiles/unlocked/audio", description: "Listen to Audio Files" },
        { name: "Staff Data", href: "/EvidenceLog/spyFiles/unlocked/staffData", description: "View KEIB staff stored staff data" }
    ];

    return (
        <section className="mex-w-3xl mx-auto p-6">
            <h1 className="text 3xl font-bold mb-8 text-center"> Secret File Log </h1>

            <div className="flex flex-col space-y-4">
                {sections.map((section) => (
                    <Link
                        key={section.name}
                        href={section.href}
                        className="block border border-gray-300 rounded-lg shadow hover:shadow-lg
                    transition p-6 bg-white hover:bg-gray-50">
                        <h2 className="text-xl font-bold mb-2"> {section.name} </h2>
                        <p className="text-gray-500"> {section.description} </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}