import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import ScrollBasedAnim from './experience/ScrollBasedAnim';
import {useState,useRef,useEffect} from 'react'
import Services from './components/Services'

function App() {
  const [service, setService] = useState("Web Development")
  const [threeIsLoaded, setThreeIsLoaded] = useState(false)
  const [loaderScale, setLoaderScale] = useState(0)
  const ref = useRef(null)
  const refServive = useRef(null)

  function handleScrollTo() {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  useEffect((() => {

  }), [service])


  return (
    <div className="App">
      <div className={`over-lay ${threeIsLoaded?"fading-out":""}`}>
        <div className='loading-bar' ></div>
      </div>
      <ScrollBasedAnim setThreeIsLoaded={setThreeIsLoaded} />

      {
       threeIsLoaded ?
          <div className='load-anim'>
            <Home handleScrollTo={handleScrollTo} />
            <div ref={ref}>
              <Services />
            </div>
          </div>
          : null
      }

      {/* <Shaders/> */}
    </div>
  )
}

export default App;
