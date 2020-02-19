import React from 'react'

export default function Areabar(props) {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <button className="navBtn" onClick={props.clickArea} >{props.nameArea}</button>
                    {/* <span>&bull;</span>  */}
                </li>
            </ul>
        </div>
    )
}
