"use client"

import React, { useEffect, useState } from "react"

const ProfileCard = ({ }) => {

    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8000/profiles`)
            .then(res => res.json())
            .then(data => setProfiles(data))
    }, [])

    if (!profiles) {
        return <div> Loading Profiles </div>
    }

    return (

        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6"> Character Profiles </h1>

            <ul className="space-y-4 list-none p-2">
                {profiles.map((char) => (
                    <li key={char.id} className="flex border rounded-lg shadow p-4 items-center bg-white">
                        <img
                            src={`http://localhost:8000${char.image_path}`}
                            alt={char.name}
                            className="w-32 h-32 object-cover rounded mr-6"
                        />

                        <div>
                            <h2 className="text-xl font-bold"> {char.name} , Age: {char.age} </h2>
                            <p className="text-grey-700"> {char.description} </p>
                        </div>
                    </li>

                ))}
            </ul>
        </div>

    )
}

export default ProfileCard