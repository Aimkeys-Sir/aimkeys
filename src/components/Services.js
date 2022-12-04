import Card from "./Card"
import "./services.css"
import { faCode, faGamepad, faCubes, faPenNib } from "@fortawesome/free-solid-svg-icons"
import { faCss3, faFigma, faJs, faReact, faUnity } from "@fortawesome/free-brands-svg-icons"
import { useState } from "react"


export default function Services({ goToService }) {
    const [expanded,setExpanded] = useState(null)

    const fields = [
        { text: "Web Development", projects: 12, icon: faCode, comment: "Years of experience", achieve: 3, technologies: [{ icon: faReact }, { icon: faJs }, { icon: faCss3 }, { source: 'icons/ruby.svg' }],works:  [{image:"/images/murife.png",name:"Murife Comparison App",go:"https://github.com/Aimkeys-Sir/online-comm-frontend"},{image:"/images/weather.png",name:"Awesome Weather", go:"https://github.com/Aimkeys-Sir/my-weather"}]},
        { text: "UI/UX Design", projects: 3, icon: faPenNib, comment: "Design items", achieve: 25, technologies: [{ icon: faFigma }, { source: '/icons/illustrator.svg' }], works:  [{image:"/images/gameplace.png",name:"Murife Comparison App",go:"https://github.com/Aimkeys-Sir/online-comm-frontend"},{image:"/images/weather.png",name:"Awesome Weather", go:"https://github.com/Aimkeys-Sir/my-weather"}]},
        { text: "Game Development", projects: 15, icon: faGamepad, comment: "Projects completed", achieve: 4, technologies: [{ icon: faUnity }, { source: '/icons/csharp.png' }], works:  [{image:"/images/camaro.jpg", name:"models collection",go:"https://github.com/Aimkeys-Sir/aimkeys-collections/tree/main/models/Solidworks"},{image:"/images/sword.jpg",name:"Magazine renders",go:"https://github.com/Aimkeys-Sir/aimkeys-collections/tree/main/magazine-renders"}] },
        { text: "3D Modelling", projects: 120, icon: faCubes, comment: "Customers served", achieve: 30, technologies: [{ source: "/icons/blender.svg" }, { source: '/icons/solidworks.png' }], works:  [{image:"/images/watch.png", name:"models collection",go:"https://github.com/Aimkeys-Sir/aimkeys-collections/tree/main/models/Solidworks"},{image:"/images/captain.jpg",name:"Magazine renders",go:"https://github.com/Aimkeys-Sir/aimkeys-collections/tree/main/magazine-renders"}] }
    ]

    return (
        <div onMouseLeave={()=>setExpanded(null)} className="services page">
            <div className="tops">
                <h2 style={{color:"white"}}>AIMKEYS' </h2>
                <h2>WORK</h2>
            </div>
            <div  className="cards">
                {fields.map((field, index) => {
                    return <Card text={field.text}
                        projects={field.projects}
                        icon={field.icon} key={index}
                        comment={field.comment}
                        achieve={field.achieve}
                        goToService={goToService}
                        technologies={field.technologies}
                        works={field.works}
                        expanded= {expanded}
                        setExpanded ={setExpanded}
                        index={index}
                    />
                })}
            </div>

        </div>
    )
}