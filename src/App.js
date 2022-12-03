import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import ScrollBasedAnim from './experience/ScrollBasedAnim';
import {useState,useRef,useEffect} from 'react'
import Services from './components/Services'


function App() {
  const [threeIsLoaded, setThreeIsLoaded] = useState(false)
  const ref = useRef(null)
  const refServive = useRef(null)

  function handleScrollTo() {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }


  return (
    <div className="App">
      <div className={`over-lay ${threeIsLoaded?"fading-out":""}`}>
        <img src='/hand.gif' alt='loading'/>
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
    </div>
  )
}

export default App;
