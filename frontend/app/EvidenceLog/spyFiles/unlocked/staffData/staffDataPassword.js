"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState(null);
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const router = useRouter();

    useEffect(() => {
        const checkSolved = async () => {
            const res = await fetch(`${baseURL}/checkPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "biometricPassword" })
            })
            const data = await res.json()
            if (data.solved) {
                router.push("/EvidenceLog/spyFiles/unlocked/staffData/staffDataPage")
            }
        }
        checkSolved()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${baseURL}/checkPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guess: password, name: "biometricPassword" })
            });

            const data = await res.json();
            setFeedback(data);

            if (data.correctPositions && data.correctPositions.every((d) => d !== null)) {
                router.push("/EvidenceLog/spyFiles/unlocked/staffData/staffDataPage");
            }
        } catch (err) {
            console.error("Error:", err);
            setFeedback({ error: "Network or server error" });
        }
    };

    return (
        <div className="min-h-screen bg-green-600 flex flex-col justify-center items-center p-6">
            <h1 className="text-white text-4xl font-bold mb-2">Private &amp; Confidential</h1>
            <h2 className="text-green-100 text-2xl mb-6">Staff Biometric Files</h2>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"                     // <-- show user input
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-3 rounded text-lg w-72 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="mt-4 bg-white text-green-700 px-4 py-2 rounded hover:bg-green-100 transition"
                >
                    Submit
                </button>
            </form>

            <p className="text-green-200 mt-4 italic">Hint: Ebtide Kilim</p>

            {feedback?.error && (
                <p className="text-red-300 mt-2">{feedback.error}</p>
            )}
        </div>
    );
}