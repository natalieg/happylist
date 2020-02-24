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
                        </div>
                    }
                </li>
{/* 
                {!props.areaActive && <li className="padFix" onClick={props.toggleArea}>
                    <Link className="navBtn" to="/">
                        Areas
                    </Link>
                    <span>&bull;</span>
                </li>
                }
                { <li className="padFix" onClick={props.toggleArea}>
                    <Link className="navBtn" to="/generateList">
                        Generate List
                    </Link>
                    <span>&bull;</span>
                </li>}
                <li className="padFix">
                    <Link className="navBtn" to="/createList">
                        Create List
                    </Link>
                </li> */}
            </ul>
        </div>
    )
}
