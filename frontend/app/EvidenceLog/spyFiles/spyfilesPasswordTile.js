"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SpyFilesPassword() {
    const [digits, setDigits] = useState(["", "", "", "", "", ""])
    const [feedback, setFeedback] = useState(null)

    const router = useRouter()

    const handleDigitChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1)    // only one character
        if (!/^\d?$/.test(value)) return                   // only allow digits

        const newDigits = [...digits]
        newDigits[index] = value
        setDigits(newDigits)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const guess = digits.join("")

        const res = await fetch("http://localhost:8000/checkPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ guess })
        })

        const data = await res.json()
        setFeedback(data)

        if (data.correctPositions && data.correctPositions.every(d => d !== null)) {
            router.push("/spyfiles/unlocked")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded p-6 space-y-4 shadow">
                <h1 className="text-2xl font-bold text-center">Enter Spy Files Code</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-2 justify-center">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                className="w-12 h-12 text-center border border-gray-300 rounded text-xl focus:outline-none focus:ring"
                                required
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit Code
                    </button>
                </form>

                {feedback && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4">
                        <h2 className="text-lg font-semibold mb-2">Feedback:</h2>
                        <p>Correct digits in correct positions:</p>
                        <div className="flex space-x-2 mt-2 justify-center">
                            {feedback.correctPositions.map((digit, idx) => (
                                <span
                                    key={idx}
                                    className="w-12 h-12 flex items-center justify-center border border-green-300 rounded bg-green-100 text-xl"
                                >
                                    {digit !== null ? digit : "_"}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
