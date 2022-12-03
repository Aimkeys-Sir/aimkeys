import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Dat from 'dat.gui'
import gsap from 'gsap'



export default function ScrollBasedAnim({setThreeIsLoaded,setLoaderScale}) {
    const [parent, setParent] = useState(false)
    const [isPhone, setIsPhone] = useState(false)

    const ref = useRef(null)

    useEffect((() => {
       ref.current.appendChild(createScene())
    }), [])

    function createScene() {
        const renderer = new THREE.WebGL1Renderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight)

            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })


        const scene = new THREE.Scene()
        const cameraGroup = new THREE.Group()

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        scene.add(cameraGroup)
        cameraGroup.add(camera)

        if (isPhone) {
            camera.position.set(0, 1, 6)
        } else {
            camera.position.set(0, 1, 3)
        }


        /**
         * debug gui
         */
        const gui = new Dat.GUI()
        gui.closed = true

        const tweaks = {
            color: 0xff88cc
        }

        /**
          * Textures
          */
         
        const loadingManager = new THREE.LoadingManager(
            //loaded
            () => {
                console.log("loaded")
                setThreeIsLoaded(true)
            },
            //progress
            (item,itemsLoaded,total) => {
               const progress = itemsLoaded/total
            }
        )
        const textureLoader = new THREE.TextureLoader(loadingManager)
        const gradientTexture = textureLoader.load('/3.png')

        gradientTexture.magFilter = THREE.NearestFilter

        const pointsTexture = textureLoader.load('/particles/scratch_01.png')

        const boxColorTexture = textureLoader.load('/glass/Glass_Frosted_001_basecolor.jpg')
        const boxAOTexture = textureLoader.load('/glass/Glass_Frosted_001_ambientOcclusion.jpg')
        const boxHeightTexture = textureLoader.load('/glass/Glass_Frosted_001_height.jpg')
        const boxNormalTexture = textureLoader.load('/glass/Glass_Frosted_001_normal.jpg')
        const boxRoughnessTexture = textureLoader.load('/glass/Glass_Frosted_001_roughness.jpg')

        /**
       * Load model
       */

        /**
         * objects
         */

        const toonMaterial = new THREE.MeshToonMaterial({
            color: tweaks.color,
            gradientMap: gradientTexture
        })

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(1, 0.4, 16, 32),
            toonMaterial
        )
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(1, 2, 32),
            toonMaterial
        )
        const torusKnot = new THREE.Mesh(
            new THREE.TorusKnotGeometry(1, 0.4, 100, 32),
            toonMaterial
        )
        const objectDistance = -6

        torus.position.set(0, 0)
        torusKnot.position.set(-3.2, objectDistance + 1.3)
        cone.position.set(-4, objectDistance - 2)

        cone.scale.set(0.4, 0.4, 0.4)
        torusKnot.scale.set(0.5, 0.5, 0.5)


        // scene.add(torus, torusKnot)

        const meshes = [torus, torusKnot]

        /**
         * scroll
         */
        let scroll = window.scrollY

        let currentSection = 0

        window.addEventListener('scroll', () => {
            scroll = window.scrollY
            const section = Math.round(scroll / window.innerHeight)

            if (currentSection !== section) {
                currentSection = section


                gsap.to(
                    meshes[currentSection].rotation,
                    {
                        duration: 1.5,
                        ease: 'power2.inOut',
                        x: '+=2',
                        y: '+=5',
                        z: '+=1',
                    }
                )
            }
        })

        /**
         * cursor
         */
        const cursor = new THREE.Vector2()
        const cursorChange = new THREE.Vector2()

        window.addEventListener('mousemove', (e) => {
            let x = (e.clientX / window.innerWidth) - 0.5
            let y = (e.clientY / window.innerHeight) - 0.5

            cursorChange.x = cursor.x - x
            cursorChange.y = cursor.y - y

            gsap.to(
                boxGroup.rotation,
                {
                    ease: "power2.inOut",
                    duration: 5 * cursorChange.length(),
                    x: `+=${5 * cursorChange.y}`,
                    y: `+=${5 * cursorChange.x}`
                }
            )

            cursor.x = x
            cursor.y = y
        })
        /**
         * particles
         */
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: pointsTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
        })
        const particlesGeometry = new THREE.BufferGeometry()

        tweaks.count = 5000

        gui.addColor(tweaks, 'color').onChange(() => {
            particlesMaterial.color.set(tweaks.color)
        })

        const positionsArray = new Float32Array(tweaks.count * 3)
        const colorsArray = new Float32Array(tweaks.count * 3)

        for (let i = 0; i < tweaks.count; i++) {
            const i3 = i * 3

            positionsArray[i3 + 0] = (Math.random() - 0.5) * 15
            positionsArray[i3 + 1] = (Math.random() - 0.85) * 15
            positionsArray[i3 + 2] = (Math.random() - 0.5) * 8

            colorsArray[i3 + 0] = Math.random()
            colorsArray[i3 + 1] = Math.random()
            colorsArray[i3 + 2] = Math.random()

        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3))
        

        const particles = new THREE.Points(particlesGeometry, particlesMaterial)

        scene.add(particles)

        /**
         * plane
         */
        const overlayMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uAlpha: { value: 1 }
            },
            transparent: true,
            vertexShader: `
            void main(){
                gl_Position = vec4(position,1.0);
            }
            `,
            fragmentShader: `
            uniform float uAlpha;
            void main(){
                gl_FragColor = vec4(0.0,0.0,0.0,uAlpha);
            }
            `
        })
        const overlay = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 1, 1),
            overlayMaterial
        )
        overlay.scale.set(4,4)

        // scene.add(overlay)

        /**
         * box
         */
        const boxGroup = new THREE.Group()

        const boxMaterial = new THREE.MeshStandardMaterial({
            map: boxColorTexture,
            aoMap: boxAOTexture,
            roughnessMap: boxRoughnessTexture,
            displacementMap: boxHeightTexture,
            normalMap: boxNormalTexture,
            displacementScale: 0.01,
            roughness: 0.1,
            metalness: .7,
            normalScale: new THREE.Vector2(.1, .1)
        })

        //createBoxes

        const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), boxMaterial)


        box.scale.set(1.5, 1.5, 1.5)


        boxGroup.add(box)





        //cornerlights
        const cornerLight1 = new THREE.PointLight(0xff8874, 3, 50)
        cornerLight1.position.x = 0
        cornerLight1.position.y = 2
        cornerLight1.position.z = 2

        scene.add(cornerLight1)
        boxGroup.position.y = 0

        scene.add(boxGroup)

        const fog = new THREE.Fog(0x262837, 2, 15)
        scene.fog = fog
        /**
         * lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 4)
        directionalLight.position.set(1, 1, 0)

        scene.add(ambientLight)
     
        const clock = new THREE.Clock()
        function dance() {

            const elapsedTime = clock.getDelta()

            for (const mesh of meshes) {
                mesh.rotation.x += elapsedTime * .3
                mesh.rotation.y += elapsedTime * .3
            }
            camera.position.y = 6 * -scroll / window.innerHeight


            const parallaxX = cursor.x
            const parallaxY = -cursor.y

            cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * .05
            cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * .05

            renderer.render(scene, camera)

            window.requestAnimationFrame(dance)
        }
 
        dance()

        return renderer.domElement
    }

    return <div ref={ref} className='scroll-based-anim'></div>
}