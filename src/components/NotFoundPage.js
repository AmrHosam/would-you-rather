import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFoundPage(){
    return(
        <div>
            <h1>404 PAGE NOT FOUND</h1>
            <p className="center">
                <Link to="/">Go to Home</Link>
            </p>
        </div>
    )
}