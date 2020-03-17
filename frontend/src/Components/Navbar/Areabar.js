import React from 'react'
import { Link } from 'react-router-dom'

export default function Areabar(props) {
    return (
        <div className="navbar">
            <ul>
                <li>
                    {props.areaActive &&
                        <div>
                            <button className="navBtn" onClick={props.clickArea}>{props.nameArea}</button>
                            <span>&bull;</span>
                            <button className="navBtn" onClick={props.archiveTodos}>{props.nameArchive}</button>
                        </div>
                    }
                </li>
            </ul>
        </div>
    )
}
