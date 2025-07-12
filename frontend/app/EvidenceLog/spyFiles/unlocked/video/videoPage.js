"use client"

import { useEffect, useState } from "react"

export default function SpyFilesPage() {
    const [spyFiles, setSpyFiles] = useState([])

    useEffect(() => {
        const fetchSpyFiles = async () => {
            const res = await fetch("http://localhost:8000/getSpyFiles")
            const data = await res.json()

            // Keep only video files
            const videoFiles = data.filter(file =>
                /\.(mp4|webm|ogg)$/i.test(file.spyfile_path)
            )

            setSpyFiles(videoFiles)
        }
        fetchSpyFiles()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center">Spy Files</h1>
                <p className="text-center text-gray-600">Video Files Only</p>

                <div className="space-y-6">
                    {spyFiles.length === 0 ? (
                        <p className="text-center text-red-400">No unlocked video files found.</p>
                    ) : (
                        spyFiles.map(file => (
                            <div
                                key={file.id}
                                className="border border-gray-200 rounded shadow p-4 bg-gray-50 space-y-2"
                            >
                                <h2 className="text-xl font-semibold">{file.name}</h2>
                                <video
                                    controls
                                    className="w-full rounded shadow"
                                >
                                    <source src={`http://localhost:8000${file.spyfile_path}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
