import React from "react"

interface PageTitleProps {
    title: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <div className="mb-6 border-b border-gray-200 pb-2">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
    )
}
