"use client"

import React from "react"

export default function NewsPaperArticle() {
    return (
        <section className="bg-[#fdf6e3] text-gray-900 font-serif py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto border border-gray-800 shadow-lg bg-white">

                {/* Red Headline Banner */}
                <div className="bg-red-700 text-white p-4 text-center border-b border-gray-800">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
                        The Launch Party Mystery
                    </h1>
                    <p className="italic text-sm mt-1">
                        Published: July, 2025 - The Copthorne Courier
                    </p>
                </div>

                {/* Article Body in 2 Columns on Desktop */}
                <div className="p-6 md:p-10 space-y-6 md:columns-2 md:gap-8 text-lg md:text-xl leading-relaxed">
                    <p>
                        While the home electronics industry was eagerly awaiting the new product
                        announcement from KEIB Ltd, someone from his inner circle appears to have
                        stolen the designs for the latest gadget! The CEO, Sir Kevin Escott, is a
                        somewhat controversial figure. He has faced multiple accusations of copying
                        rivals' products. Many lawsuits have been filed but none successful so far.
                    </p>

                    <p>
                        The design was to be unveiled at an intimate party at Sir Kevin's mansion,
                        an unusual venue for a product launch. Rumours abound about possible financial
                        woes at the firm. The gossip columns fill inches with debate over why Kev Jr,
                        a talented and ambitious young man, has no proper role in daddy's firm and
                        why has his sister, the elusive Mallendra, suddenly dropped off the party
                        scene?
                    </p>

                    <p className="italic text-right text-gray-700 mt-4">
                        — Staff Correspondent
                    </p>
                </div>
            </div>
        </section>
    )
}
