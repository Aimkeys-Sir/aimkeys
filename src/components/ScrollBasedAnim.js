import { useEffect, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ScrollBasedAnim() {
  const [parent, setParent] = useState(false)
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    setParent(document.getElementById("canvas-parent"))
    setIsPhone(window.innerWidth < 480)
  }, [])

  function createScene() {
    const renderer = new THREE.WebGL1Renderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight)

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    })

    // window.addEventListener('dblclick', () => {
    //     if (!document.fullscreenElement) {
    //         renderer.domElement.requestFullscreen()
    //     } else {
    //         document.exitFullscreen()
    //     }
    // })

    const scene = new THREE.Scene()
    const cameraGroup = new THREE.Group()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    scene.add(cameraGroup)
    cameraGroup.add(camera)

    if (isPhone) {
      camera.position.set(0, 1, 6)
    } else {
      camera.position.set(0, 1, 3)
    }
    // const orbitControls = new OrbitControls(camera, renderer.domElement)

    /**
     * debug gui
     */

    const tweaks = {
      color: 0xff88cc,
    }
    const orbitControls = new OrbitControls(camera, renderer.domElement)

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()
    const gradientTexture = textureLoader.load("/3.png")

    gradientTexture.magFilter = THREE.NearestFilter

    const pointsTexture = textureLoader.load("/particles/star1.png")

    const boxColorTexture = textureLoader.load(
      "/glass/Glass_Frosted_001_basecolor.jpg"
    )
    const boxAOTexture = textureLoader.load(
      "/glass/Glass_Frosted_001_ambientOcclusion.jpg"
    )
    const boxHeightTexture = textureLoader.load(
      "/glass/Glass_Frosted_001_height.jpg"
    )
    const boxNormalTexture = textureLoader.load(
      "/glass/Glass_Frosted_001_normal.jpg"
    )
    const boxRoughnessTexture = textureLoader.load(
      "/glass/Glass_Frosted_001_roughness.jpg"
    )

    /**
     * Load model
     */

    /**
     * objects
     */

    const toonMaterial = new THREE.MeshToonMaterial({
      color: tweaks.color,
      gradientMap: gradientTexture,
    })

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 32),
      toonMaterial
    )
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), toonMaterial)
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

    window.addEventListener("scroll", () => {
      scroll = window.scrollY
      const section = Math.round(scroll / window.innerHeight)

      if (currentSection !== section) {
        currentSection = section

        gsap.to(meshes[currentSection].rotation, {
          duration: 1.5,
          ease: "power2.inOut",
          x: "+=2",
          y: "+=5",
          z: "+=1",
        })
      }
    })

    /**
     * cursor
     */
    const cursor = new THREE.Vector2()
    const cursorChange = new THREE.Vector2()

    window.addEventListener("mousemove", (e) => {
      let x = e.clientX / window.innerWidth - 0.5
      let y = e.clientY / window.innerHeight - 0.5

      cursorChange.x = cursor.x - x
      cursorChange.y = cursor.y - y

      gsap.to(boxGroup.rotation, {
        ease: "power2.inOut",
        duration: 5 * cursorChange.length(),
        x: `+=${5 * cursorChange.y}`,
        y: `+=${5 * cursorChange.x}`,
      })

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
      // vertexColors: true
    })
    const particlesGeometry = new THREE.BufferGeometry()

    tweaks.count = 8000

    const positionsArray = new Float32Array(tweaks.count * 3)
    const colorsArray = new Float32Array(tweaks.count * 3)

    for (let i = 0; i < tweaks.count; i++) {
      const i3 = i * 3

      positionsArray[i3 + 0] = (Math.random() - 0.5) * 15
      positionsArray[i3 + 1] = (Math.random() - 0.85) * 23
      positionsArray[i3 + 2] = (Math.random() - 0.5) * 10

      colorsArray[i3 + 0] = Math.random()
      colorsArray[i3 + 1] = Math.random()
      colorsArray[i3 + 2] = Math.random()
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsArray, 3)
    )
    // particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)

    scene.add(particles)

    /**
     * particles
     */

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
      // transparent: true,
      // opacity: 0.3,
      roughness: 0.1,
      metalness: 0.7,
      normalScale: new THREE.Vector2(0.1, 0.1),
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
    boxGroup.position.y = -1

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
    // , directionalLight)

    /**
     * update function
     */
    const clock = new THREE.Clock()
    function dance() {
      // orbitControls.update()

      const elapsedTime = clock.getDelta()

      for (const mesh of meshes) {
        mesh.rotation.x += elapsedTime * 0.3
        mesh.rotation.y += elapsedTime * 0.3
      }

      camera.position.y = (6 * -scroll) / window.innerHeight

      camera.position.z += 0.001 * Math.sin(clock.getElapsedTime())
      // console.log(elapsedTime)

      const parallaxX = cursor.x
      const parallaxY = -cursor.y

      cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.05
      cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.05

      renderer.render(scene, camera)

      window.requestAnimationFrame(dance)
    }
    parent.appendChild(renderer.domElement)
    dance()
  }
  if (parent) createScene()

  return (
    <div className="scroll-based-anim">
      <div id="canvas-parent"> </div>
    </div>
  )
}
