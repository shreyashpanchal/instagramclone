import React from 'react'
import "./index.css"
import { Ripple } from 'react-spinners-css'
const ModalIg = () => {
    return (
        <div className="ModalIg">
            <Ripple className="hu" size={400} color="gold"></Ripple>
            <h1>Loading...</h1>
        </div>
    )
}

export default ModalIg
