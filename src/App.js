import './App.css';

import ScrollBasedAnim from './components/ScrollBasedAnim';

import Home from './components/Home';

import Services from './components/Services';
import React, { useEffect, useRef, useState } from 'react';




function App() {
  const [threeIsLoaded, setThreeIsLoaded] = useState(true)
  const [service,setService] = useState("Web Development")
  const ref = useRef(null)

  function handleScrollTo() {
    ref.current.scrollIntoView({behavior: 'smooth', block: 'start'} )
  }
  // function goToService(text){
  //   setService(text)
  //   refServive.current.scrollIntoView({behavior: 'smooth', block:"end"})
  // }

  useEffect((()=>{
  
  }),[service])

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
