import React from 'react'
import { Link } from 'react-router-dom'

const UserNotExist = () => {
    return (
        <div>
            <h1>User not found</h1>
            <Link to="/">Click to go to HomePage</Link>
        </div>
    )
}

export default UserNotExist
