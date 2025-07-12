"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function NotebookPuzzle() {

    const [puzzle, setPuzzle] = useState(null);
    const [tiles, setTiles] = useState([]);
    const [solved, setSolved] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const router = useRouter();

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

    useEffect(() => {
        fetch(`${baseURL}/notebookPuzzle`)
            .then(res => res.json())
            .then(data => {
                if (data.solved) {
                    router.push("/EvidenceLog/notebook/notebookPages")
                } else {
                    setPuzzle(data);
                    if (data.rows && data.cols) {
                        let order = Array.from({ length: data.rows * data.cols }, (_, i) => i);
                        order = shuffle(order);
                        setTiles(order);
                    }
                }
            });
    }, []);

    const shuffle = (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const swap = (index1, index2) => {
        const newTiles = [...tiles];
        [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
        setTiles(newTiles);
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;
        swap(draggedIndex, index);
        setDraggedIndex(null);
    };

    const check = async () => {
        const response = await fetch(`${baseURL}/checkNotebookPuzzle`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: puzzle.id, tiles })
        });
        const data = await response.json();
        setSolved(data.solved);

        if (data.solved) {

        }
    };

    if (!puzzle) return <p>Loading Puzzle...</p>;

    const pieceWidth = 300;
    const pieceHeight = 175;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{puzzle.name}</h1>

            <div
                className="grid gap-1 mb-4 mx-auto"
                style={{
                    width: `${puzzle.cols * pieceWidth}px`,
                    gridTemplateColumns: `repeat(${puzzle.cols}, ${pieceWidth}px)`,
                    gridTemplateRows: `repeat(${puzzle.rows}, ${pieceHeight}px)`,
                    display: "grid"
                }}
            >
                {tiles.map((tileIndex, i) => (
                    <div
                        key={i}
                        className="border border-gray-300 cursor-move overflow-hidden"
                        draggable
                        onDragStart={() => handleDragStart(i)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(i)}
                        style={{
                            width: `${pieceWidth}px`,
                            height: `${pieceHeight}px`,
                            backgroundImage: `url(${baseURL}${puzzle.image_path})`,
                            backgroundSize: `${puzzle.cols * pieceWidth}px ${puzzle.rows * pieceHeight}px`,
                            backgroundPosition: `-${(tileIndex % puzzle.cols) * pieceWidth}px -${Math.floor(tileIndex / puzzle.cols) * pieceHeight}px`,
                            backgroundRepeat: "no-repeat"
                        }}
                    />
                ))}
            </div>

            <button
                onClick={check}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Check Solution
            </button>

            {solved !== null && (
                <p className={`mt-4 text-xl ${solved ? "text-green-400" : "text-red-600"}`}>
                    {solved ? "Puzzle solved!" : "Incorrect arrangement."}
                </p>
            )}
        </div>
    );
}
