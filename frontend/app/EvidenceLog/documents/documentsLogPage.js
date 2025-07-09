"use client"
import { useEffect, useState } from "react"

export default function DocumentPageImages() {
    const [images, setImages] = useState([])
    const [index, setIndex] = useState(0)

    const fetchDocuments = async () => {
        const res = await fetch("http://localhost:8000/getDocuments")
        const data = await res.json()
        const unlocked = data.filter(doc => !doc.locked)
        setImages(unlocked)
        setIndex(0)
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length)
    }
    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-4">
            <h1 className="text-3xl font-bold mb-6"> Documents </h1>

            <div className="relative w-full max-w-3xl overflow-hidden">
                {images.length > 0 ? (
                    <img
                        src={`http://localhost:8000${images[index].doc_path}`}
                        alt={`Document Item ${index + 1}: ${images[index].name}`}
                        className="w-full max-h-[80vh] object-contain transition-all duration-300"
                    />
                ) : (
                    <p>No unlocked documents available.</p>
                )}

                {images.length > 0 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80
                                    p-3 rounded-full shadow hover:bg-opacity-100 transition"
                        >
                            Back
                        </button>

                        <button
                            onClick={next}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80
                                    p-3 rounded-full shadow hover:bg-opacity-100 transition"
                        >
                            Next
                        </button>
                    </>
                )}
            </div>

            <div className="flex mt-4 space-x-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition ${i === index ? "bg-blue-300" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </div>
    )
}
