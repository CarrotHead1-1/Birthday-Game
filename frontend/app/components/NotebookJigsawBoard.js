
"use client"

import { useEffect, useState } from "react"

export default function NotebookPuzzle() {

    const [puzzle, setPuzzle] = useState(null);
    const [tiles, setTiles] = useState([]);
    const [solved, setSolved] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/notebookPuzzle")
            .then(res => res.json())
            .then(data => {
                setPuzzle(data);
                if (data.rows && data.cols) {
                    let order = Array.from({ length: data.rows * data.cols }, (_, i) => i);
                    order = shuffle(order);
                    setTiles(order);
                }

            });
    }, []);

    const shuffle = (arr) => {
        return arr.sort(() => Math.random() - 0.5)
    };

    const swap = (index1, index2) => {
        const newTiles = [...tiles];
        [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
        setTiles(newTiles);
    };

    const check = async () => {
        const response = await fetch("http://localhost:8000/checkNotebookPuzzle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: puzzle_id, tiles })
        });
        const data = await response.json();
        setSolved(data.solved);
    }
    if (!puzzle) return <p> Loading Puzzle </p>

    const pieceWidth = 100;
    const pieceHeight = 100;

    return (
        <div className="puzzle-contianer mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4"> {puzzle.name} </h1>
            <div className="grid gap-1 mb-4"
                style={{
                    gridTemplateColumns: `repeat(${puzzle.cols}, ${pieceWidth}px)`,
                    gridTemplateRows: `repeat(${puzzle.rows}, ${pieceHeight}px)`
                }} >
                {tiles.map((tileIndex, i) => (
                    <div
                        key={i}
                        className="relative border border-gray-300 cursor-pointer overflow-hidden"
                        onClick={() => {
                            if (window.confirm()) {
                                if (i > 0) swap(i, i - 1);
                            }
                        }}
                        style={{
                            width: `${pieceWidth}px`,
                            height: `${pieceHeight}px`,
                            backgroundImage: `url(http://localhost:8000${puzzle.image_path})`,
                            backgroundSize: `${puzzle.cols * pieceWidth}px ${puzzle.rows * pieceHeight}px`,
                            backgroundPosition: `-${(tileIndex % puzzle.cols) * pieceWidth}px 
                        -${Math.floor(tileIndex / puzzle.rows) * pieceHeight}`
                        }}
                    />
                ))}
            </div>
            <button onClick={check} className="bg-blue-500 text-white px-4 py-2 rounded">
                Check Solution
            </button>
            {solved !== null && (
                <p className={`mt-4 text-xl ${solved ? "text-green-400" : "text-red-600"}`}>
                    {solved ? "Puzzle solved!" : "Incorrect arragements."}
                </p>
            )}
        </div>
    )
}