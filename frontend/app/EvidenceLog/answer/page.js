"use client"

import { useEffect, useState } from "react"

export default function AnswerPage() {
    const [characters, setCharacters] = useState([]);
    const [userGuesses, setUserGuesses] = useState(["", ""]);
    const [answers, setCorrect] = useState(null);
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

    useEffect(() => {
        fetch(`${baseURL}/characters`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCharacters(data);
                }
            })

    }, []);

    const handleSelect = (index, value) => {
        const newGuesses = [...userGuesses];
        newGuesses[index] = value;
        setUserGuesses(newGuesses);
    }

    const checkAnswers = async (e) => {
        e.preventDefault();

        if (!userGuesses[0] || !userGuesses[1]) {
            return;
        }

        const res = await fetch(`${baseURL}/checkAnswers`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userGuesses })
        });

        const data = await res.json();
        setCorrect(data);
    }

    if (!characters.length) {
        return <div>Loading Characters...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center">Submit Your Answers</h1>

                <form onSubmit={checkAnswers} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Select Answer 1</label>
                        <select
                            value={userGuesses[0]}
                            onChange={(e) => handleSelect(0, e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                            required
                        >
                            <option value=""> -- Choose a Character -- </option>
                            {characters.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">Select Answer 2</label>
                        <select
                            value={userGuesses[1]}
                            onChange={(e) => handleSelect(1, e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                            required
                        >
                            <option value=""> -- Choose a Character -- </option>
                            {characters.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit Answers
                    </button>
                </form>

                {answers && (
                    <div className="mt-4 text-center text-lg">
                        {answers.correct ? (
                            <span className="text-green-600">✅ Correct!</span>
                        ) : (
                            <span className="text-red-600">❌ Incorrect!</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
