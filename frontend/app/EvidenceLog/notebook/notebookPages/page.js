
"use client"
import React from "react";


export default function NotebookPages() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
            <div
                className="relative w-full max-w-3xl p-8 shadow-lg
            bg-[url('http://localhost:8000/static/NotebookBackground.png')]
            bg-cover bg-no-repeat
            before: content-['']
            before: absolute before:inset-0
            befoer:bg-[repeating-linear-gradient(to_bottom, transparent,
            transparent_22px, rgba(194,178,128,0.7)_23px)]
            before:pointer-events-none
            rounded-lg
            ">
                <div className="relative z-10 ml-16 space-y-4 text-gray-800 leading-relaxed font-serif">
                    <h1 className="text-3xl font-bold">My Notebook Page</h1>
                    <p>
                        This text sits on top of the background texture and the ruled lines.
                        It is offset to the right of the red margin line, creating the
                        classic notebook feel.
                    </p>
                    <p>
                        You can add as much content as you want here. The lines will
                        automatically repeat down the entire page.
                    </p>
                </div>
            </div>
        </div>
    )
}
