import { useEffect, useState, useRef } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


function App() {
  const [showingCanvas, setShowingCanvas] = useState(false);
  const headingref = useRef(null);
  const growingspan = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    new LocomotiveScroll();
  }, [showingCanvas]);

  useEffect(() => {
    audioRef.current = new Audio('/background-music.mp3.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showingCanvas && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => console.log('Audio playback error:', err));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [showingCanvas]);

useGSAP(() => {
    const handleClick = (e) => {
      setShowingCanvas(!showingCanvas);
      gsap.killTweensOf(growingspan.current);
      
      if (!showingCanvas) {
        // Growing animation
        gsap.set(growingspan.current, {
          display: 'block',
          top: e.clientY,
          left: e.clientX,
          scale: 0,
          opacity: 0,
          transformOrigin: '50% 50%'
        });
        
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" }
        });
        
        tl.to(growingspan.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        })
        .to(growingspan.current, {
          scale: 1000,
          duration: 1.8,
          onComplete: () => {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
          }
        });
      } else {
        // Shrinking animation
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" }
        });
        
        tl.to(growingspan.current, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.in(1.7)",
          onComplete: () => {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
          }
        })
        .set(growingspan.current, { display: 'none' });
      }
    };

    // Add event listener
    headingref.current.addEventListener('click', handleClick);
    
    // Cleanup function
    return () => {
      headingref.current.removeEventListener('click', handleClick);
    };
}, [showingCanvas]);

  return (
    <>
      <span
        ref={growingspan}
        className="growingspan block bg-red-600 w-5 h-5 rounded-full fixed top-[-10%] left-[-10%]"
        style={{ zIndex: -1}}
      ></span>
      <div className={`w-full min-h-screen z-[1] relative font-["Helvetica"] `}>
        {showingCanvas &&
          data[0].map((canvasDetails, index) => (
            <Canvas details={canvasDetails} key={index} />
          ))}
        <div className="w-full h-screen ">
          <nav className="p-8 z-50">
            <div className="flex justify-between items-center">
              <a
                href="#home"
                className={`text-2xl font-regular hover:opacity-70 transition-colors duration-300 text-black`}
              >
                thirtysixstudios
              </a>
              <ul className="flex gap-8">
                {["Home", "About", "Projects", "Contact"].map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="relative text-md hover:opacity-70 transition-colors duration-300 group"
                    >
                      {link}
                      <span className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="container w-full px-[20%] mt-10">
            <div className="text w-[50%] text-3xl leading-[1.4]">
              <h3 className={`text-black font-regular `}>
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
            </div>
            <p className={`text-black font-regular text-sm mt-8 w-[70%] `}>
              We're a boutique production studio focused on design, motion, and
              creative technology, constantly reimagining what digital craft can
              do for present-time ads and campaigns
            </p>
              <p className={`mt-10 ${showingCanvas ? 'dark-mode text-black' : 'light-mode text-black'}`}>scroll</p>
          </div>
          <div className="w-full  mt-20">
            <h1
              ref={headingref}
              className={`text-black text-[11rem] font-normal leading-[1] mt-7 tracking-tight px-12 `}
            >
            Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full h-screen relative mt-[20%] flex justify-between p-12">
        {showingCanvas &&
          data[1].map((canvasDetails, index) => (
            <Canvas details={canvasDetails} key={index} />
          ))}
        <div className="w-full">
          <h3 className={`text-black text-3xl font-regular pl-20 `}>
            01 - WHAT WE DO
          </h3>
        </div>
        <div className="w-full">
          <h2 className={`text-black text-4xl font-semibold w-[70%] pl-20 `}>
            We aim to revolutionize digital production in the advertising space,
            bringing your ideas to life.
          </h2>
        </div>
      </div>

      <div className="w-full h-screen relative mt-[-5%] flex justify-between p-12">
        {showingCanvas &&
          data[0].map((canvasDetails, index) => (
            <Canvas details={canvasDetails} key={index} />
          ))}
        <div className="w-full">
          
          <h2 className={`text-black text-4xl font-semibold w-[70%] pl-20`}>
            We aim to revolutionize digital production in the advertising space,
            bringing your ideas to life.
          </h2>
        </div>
        <div className="w-full">
            <h3 className={`text-black text-3xl font-semibold pl-32`}>
            02 - OUR PROCESS
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
