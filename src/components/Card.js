import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Card({ goToService, text, icon, projects, index, achieve, comment, technologies, works, expanded, setExpanded }) {

    function handleExpand() {
        if (expanded === text) {
            setExpanded(null)
        } else {
            setExpanded(text)
        }
    }
    const smaller = text !== expanded && expanded

    function PictureCard({ item }) {
        return (
            <a target={"_blank"} className="pic-link" key={index} href={item.go} style={{ position: "relative" }}>
                <img src={item.image} alt={item.name} className="port-pic" />
                <div className="invisible"></div>
                {<div className="cover-div" >{item.name}<FontAwesomeIcon icon={faArrowUpRightFromSquare}/></div>}
            </a>
        )
    }

    return <div className="expander">
        {index > 1 ? <div className={`${text !== expanded ? "works" : "works-active"}`}>
            <div className="port-pictures">
                {works.map((item, index) => {
                    return <PictureCard item={item} key={index}/>
                })}
            </div>
        </div> : null}
        <div>
            <div className="card">
                <FontAwesomeIcon onClick={handleExpand} className={`card-icon ${smaller ? "smaller-icon" : ""}`} icon={icon} />
                <h2>{text}</h2>
                <p className="projects-span">{projects} projects</p>
                <div className="technologies"> {technologies.map((tech, index) => {
                    return (
                        <div key={index}>
                            {tech.icon ?
                                <FontAwesomeIcon icon={tech.icon} className={`tech-icon ${smaller ? "smaller-tech" : ""}`} /> :
                                <img src={tech.source} className={`tech-img ${smaller ? "smaller-img" : ""}`} />
                            }
                        </div>
                    )
                })}
                </div>
            </div>
            <div className="comment">
                <h2>{achieve} +</h2>
                <p>{comment}</p>
            </div>
        </div>
        {index < 2 ? <div className={`${text !== expanded ? "works" : "works works-active"}`}>
            <div className="port-pictures">
                {works.map((item, index) => {
                    return <PictureCard item={item} key={index}/>
                })}
            </div>
        </div> : null}
    </div>
}