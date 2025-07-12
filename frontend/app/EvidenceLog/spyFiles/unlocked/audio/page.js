"use client"

export default function AudioTranscriptPage() {
    const transcript = [
        { speaker: "Bernardo", text: "Will the box be delivered by the 12th July?" },
        { speaker: "Bernardo", text: "Yes, Sir Kevin is Difficult to please." },
        { speaker: "Bernardo", text: "Can I just check the dimensions again." },
        { speaker: "Bernardo", text: "Good, good, Now what about the special compart…" },
        { speaker: null, text: "Just as it was getting interesting he started bashing his stupid desk bobblehead and the bug didn’t pick up any more." }
    ]

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded shadow p-6 space-y-4">
                <h1 className="text-3xl font-bold text-center">Audio Transcript</h1>
                <p className="text-center text-gray-600">Conversation transcript from bug recording</p>

                <div className="space-y-4 mt-6">
                    {transcript.map((line, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded ${line.speaker ? "bg-gray-50 border border-gray-200" : "bg-yellow-50 border border-yellow-200 italic"
                                }`}
                        >
                            {line.speaker && (
                                <p>
                                    <span className="font-bold">{line.speaker}:</span> {line.text}
                                </p>
                            )}
                            {!line.speaker && (
                                <p>{line.text}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
