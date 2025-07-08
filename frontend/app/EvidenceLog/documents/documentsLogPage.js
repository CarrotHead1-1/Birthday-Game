
"use client"
import { useEffect, useState } from "react"

export default function DocumentPageImages() {
    const [images, setImages] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetch("http://localhost:8000/")
            .then(res => res.json())
            .then(data => {
                setImages(data)
            })
    }, [])

    const next = () => {
        setIndex((prev) => (index + 1) % images.length)
    }

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-4">
            <h1 className="text-3xl font-bold mb-6"> Documents </h1>

            <div className="relative w-full max-w-3xl overflow-hidden">
                {images.length > 0 && (
                    <img
                        src={`http://localhost:8000${images[index].image_path}`}
                        alt={`Document Item ${index + 1}: ${images[index].name}`}
                        className="w-full max-h-[80vh] object-contai transition-all duration-300"
                    />
                )}

                <button
                    onClick={prev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80
                p-3 rounded-full shadow hover:bg-opacity-100 transition"
                > Back </button>

                <button
                    onClick={next}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80
                p-3 rounded-full shadow hover:bg-opacity-100 transition"
                > Next </button>
            </div>
        </div>
    )
}