
"use client"

import React, { useEffect, useState } from "react"

export default function staffDatabasePage() {
    const [staffData, setStaffData] = useState([])

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

    useEffect(() => {
        fetch(`${baseURL}/getStaffData`)
            .then(res => res.json())
            .then(data => setStaffData(data))
    }, [])

    if (!staffData) {
        return <div> Loading Staff Data </div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6"> KEIB Ltd Staff Database </h1>

            <ul className="space-y-4 list-none p-2">
                {staffData.map((staff) => (
                    <li
                        key={staff.id}
                        className="flex flex-col sm:flex-row sm:items-center border rounded-lg shadow-md p-6 bg-white">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-gray-900"> {staff.name || "-"} </h2>
                            <p className="text-gray-600 mt-1">
                                <span className="font-semibold"> Age: </span> {staff.age || "-"}
                            </p>
                            <p className="text-gray-600 mt-1">
                                <span className="font-semibold"> Position: </span> {staff.position || "-"}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}