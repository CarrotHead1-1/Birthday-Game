
"use client"

import { useEffect, useState } from "react"

export default function NotebookPages() {
    const [pages, setPages] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetch("http://localhost:8000/getNotebookPages")
            .then(res => res.json())
            .then(data => {
                setPages(data)
            })

    }, [])

    const next = () => {
        setIndex((prev) => (index + 1) % pages.length)
    }
    const prev = () => {
        setIndex((prev) => (prev - 1 + pages.length) % pages.length)
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-4">
            <h1 className="text-3xl font-bold mb-6"> Notebook Pages</h1>

            <div className="relative w-full max-w-3xl overflow-hidden">
                <img
                    src={`http://localhost:8000/${pages[index].page_path}`}
                    alt={`Notebook Page ${index + 1}`}
                    className="w-full max-h-[80vh] object-contain transition-all duration-300"
                />

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

            <div className="flex mt-4 space-x-2">
                {pages.map((_, i) => (
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
