import "../style/home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDribbble, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faAngleDown, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

export default function Home({ handleScrollTo }) {
    const [isPhone, setIsPhone] = useState(false)
    const [showContacts, setShowContacts] = useState(false)
    const [goDown, setGoDown] = useState(false)

    window.addEventListener('resize', () => {
        if (window.innerWidth < 430) {
            setIsPhone(true)
        } else {
            setIsPhone(false)
        }
    })

    useEffect((() => {
        if (window.innerWidth < 430) {
            setIsPhone(true)
        } else {
            setIsPhone(false)
        }
    }))

    function handleContactOnclick() {
        setShowContacts(show => !show)
    }


    return (
        <div className="home page">
            <div className="navbar">
                <div className="name-point" style={{ display: "flex" }}>
                    {/* <h2>AI</h2> */}
                    <h2>Mk</h2>
                    <FontAwesomeIcon style={{ margin: "35px 5px", fontSize: "10px", color: "#E4AA48" }} icon={faCircle} />
                    {/* <h2>EYS</h2> */}
                </div>
                <div className="links">
                    <h2 onClick={handleScrollTo}>Portfolio</h2>
                    <h2>Blogs</h2>
                    <div className="contacts-div">
                        <h2 onClick={handleContactOnclick} className="contact-line">Contact</h2>
                        {showContacts ? <div className="phone-icons">
                            <div className="active-contacts-line"></div>
                            <div className="all-icons">
                                <FontAwesomeIcon className="b-icons twitter" icon={faTwitter} />
                                <FontAwesomeIcon className="b-icons dribble" icon={faDribbble} />
                                <FontAwesomeIcon className="b-icons linkedin" icon={faLinkedin} />
                            </div>
                        </div> : null}
                    </div>
                    {/* {isPhone ?
                        null
                        : <>
                            <h3>|</h3>
                            <FontAwesomeIcon className="b-icons" icon={faTwitter} />
                            <FontAwesomeIcon className="b-icons" icon={faDribbble} />
                            <FontAwesomeIcon className="b-icons" icon={faLinkedin} />
                        </>} */}
                </div>

            </div>
            <div className="content">
                <div className="title">
                    <h2>Mwaura</h2>
                    <div style={{ display: "flex" }}>
                        <h2 id="aim">Aimkeys</h2>
                        <FontAwesomeIcon style={{ fontSize: "16px", color: "#E4AA48" }} icon={faCircle} />
                    </div>


                    <div className="line"></div>

                    <div className="contacts up">
                        <h4>Instagram</h4>
                        <h4>|</h4>
                        <h4>LinkedIn</h4>
                    </div>
                    <div className="contacts down">
                        <h4>Dribble</h4>
                        <h4>|</h4>
                        <h4>CodePen</h4>
                    </div>

                    <div onClick={() => window.open("mailto:aimkeys.mwaura@gmail.com?subject=Talk to Aimkeys&body=/*Hello there. You can always send me a email, I reply quite fast, or use my socials, thank you!*/")} className="contact-button">
                        Contact Me
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    {/* <div className="circle"></div> */}
                    {/* <img id="picture" src="/mk2.png" alt="mk" /> */}

                </div>
                <div className="blocks-for-life">
                    <div className="blocks">Blocks</div>
                    <div className="for-life">For Life</div>
                </div>
                <div className="introduction">
                    <h1>I am</h1>
                    <h3 className="intro">A Full Stack Web Developer</h3>
                    <p> I have expertise in designing web apps using react for the frontend and ruby on rails for the backend. </p>
                    <p>I love to learn all that I can, to share, teach and mentor.</p>
                    <a style={{ textDecoration: "none", color: "white" }} href="/cv/kelvin_mwaura.pdf" download><div className="contact-button">
                        Download my CV
                    </div>
                    </a>

                </div>

            </div>
            <div className="go-down">
                <FontAwesomeIcon className="go-down-icon" onClick={handleScrollTo} icon={faAngleDown} />
            </div>
        </div>
    )
}