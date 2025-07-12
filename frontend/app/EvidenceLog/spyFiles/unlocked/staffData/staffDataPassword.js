
"use client"

import { useRouter } from "next/router";
import React, { useState } from "react";

export default function PasswordPage() {
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState(null)
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`${baseURL}/checkPassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guess, name: "biometricPassword" })
        })

        const data = await res.json()
        setFeedback(data)

        if (data.correctPositions && data.correctPositions.every((d) => d !== null)) {
            router.push("EvidenceLog/spyFiles/unlocked/staffDataPage");
        }
    }

    return (
        <div className="min-h-screen bg-green-600 flex flex-col justify-center items-center p-6">
            <h1 className="text-white text-4xl font-bold mb-2">Private &amp; Confidential</h1>
            <h2 className="text-green-100 text-2xl mb-6">Staff Biometric Files</h2>

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded text-lg w-72 focus:outline-none"
            />

            <p className="text-green-200 mt-4 italic">Hint: Ebtide Kilim</p>
        </div>
    );
}
