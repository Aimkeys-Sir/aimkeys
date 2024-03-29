import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faAngleDown, faCircle, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

export default function Home({ handleScrollTo }) {
    const [isPhone, setIsPhone] = useState(false)

    const [activeItem, setActiveItem] = useState("")
    const [textCopied, setTextCopied] = useState("")

    window.addEventListener('resize', () => {
        setIsPhone(window.innerWidth < 480)
    })

    useEffect((() => {
        if (window.innerWidth < 430) {
            setIsPhone(true)
        } else {
            setIsPhone(false)
        }
    }))

    function handleContactOnclick() {
        if(activeItem === 'contacts') {
            setActiveItem("")
        }else{
            setActiveItem('contacts')
        }
        
    }
    function copyToClipBoard(text, value) {
        navigator.clipboard.writeText(value)
            .then(() => setTextCopied(text))

    }
    if (textCopied) {
        setTimeout(() => {
            setTextCopied("")
        }, 2000);
    }


    return (
        <div className="home page">
            <div className="navbar">
                <div className="name-point" style={{ display: "flex" }}>
                    <h2>Mk</h2>
                    <FontAwesomeIcon style={{ margin: "35px 5px", fontSize: "10px", color: "#E4AA48" }} icon={faCircle} />
                </div>
                <div className="links">
                    <h2 onClick={handleScrollTo}>Portfolio</h2>
                   <a style={{textDecoration: 'none',color:"white"}} href="https://medium.com/@kelvostein/javascript-a-project-a-day-bf02d5d0ffc0" target='_blank'>  <h2 className={`${activeItem === "blogs" ? "c-active" : ""}`} onClick={() => setActiveItem('blogs')}>Blogs</h2></a>
                    <div className="contacts-div">
                       <h2 onBlur={() => setActiveItem("")} onClick={handleContactOnclick} className={`contact-line ${activeItem === "contacts" ? "c-active" : ""}`}>Contact</h2>
                        {activeItem === "contacts" ? <div className="phone-icons">
                            <div className="active-contacts-line"></div>
                            <div className="all-icons">
                                {/* <div><FontAwesomeIcon className="b-icons twitter" icon={faTwitter} /></div> */}
                                <div className="contact-items"><div>aimkeys.mwaura@gmail.com</div>  <FontAwesomeIcon onClick={() => copyToClipBoard("email", "aimkeys.mwaura@gmail.com")} className="b-icons email" icon={faEnvelope} /></div>
                                <div className="contact-items"><div>+254 795 217 556</div><FontAwesomeIcon onClick={() => copyToClipBoard("phone no.", "+254795217556")} className="b-icons phonee" icon={faPhone} /></div>
                                {/* <div></div> */}
                            </div>
                        </div> : null}
                        {textCopied ? <p className="text-copied">{textCopied} copied!</p> : null}
                    </div>
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
                        <a target='_blank' href="https://twitter.com/aimkeys_m"><h4>Twitter</h4> <FontAwesomeIcon className="b-icon twitter" icon={faTwitter} /></a>
                        <h4>|</h4>
                        <a target='_blank' href="https://www.linkedin.com/in/kelvin-aimkeys-mwaura-654447244/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B59jwljWAScC7grxd1d7wEg%3D%3D"><h4>LinkedIn</h4><FontAwesomeIcon className="b-icon linkedin" icon={faLinkedin} /></a>
                    </div>
                    <div className="contacts down">
                        <a target='_blank' href="https://github.com/Aimkeys-Sir"><h4>Github</h4> <FontAwesomeIcon className="b-icon github" icon={faGithub} /></a>
                        <h4>|</h4>
                        <a target='_blank' href="https://www.codewars.com/users/Aimkeys-Sir"><h4>CodeWars</h4><img className="codewars" src="/icons/codewars.svg" alt="codewars" /></a>
                    </div>

                    <div onClick={() => window.open("mailto:aimkeys.mwaura@gmail.com?subject=Talk to Aimkeys&body=/*Hello there. You can always send me a email, I reply quite fast, or use my socials, thank you!*/")} className="contact-button">
                        Contact Me
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    {/* <div className="circle"></div> */}
                    {/* <img id="picture" src="/mk2.png" alt="mk" /> */}

                </div>
                {isPhone ? null :
                    <div className="blocks-for-life">
                        <div className="blocks">Blocks</div>
                        <div className="for-life">For Life</div>
                    </div>}
                <div className="introduction">
                    <h1>I am</h1>
                    <h3 className="intro">A Full Stack Web Developer</h3>
                    <p> I design your favourite web apps. I use react on the frontend and ruby on rails on the backend. </p>
                    <p>I love to learn all that I can, to share, teach and mentor.</p>
                    <a style={{ textDecoration: "none", color: "white" }} href="/cv/Kelvinmwaura.pdf" download><div className="contact-button">
                        Download my CV
                    </div>
                    </a>

                </div>

            </div>
            {isPhone ? null : <div className="go-down">
                <FontAwesomeIcon className="go-down-icon" onClick={handleScrollTo} icon={faAngleDown} />
            </div>}
        </div>
    )
}