import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <div>
            <ul>
                <li>
                    <a onClick={props.click} href="#">{props.name}</a>
                </li>
            </ul>
        </div>
    )
}
