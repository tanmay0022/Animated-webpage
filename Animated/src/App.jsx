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
        <div  className="w-full">
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

      <div className="w-full h-screen relative mt-[-5%] flex justify-between p-12">
        {showingCanvas &&
          data[2].map((canvasDetails, index) => (
            <Canvas details={canvasDetails} key={index} />
          ))}
        <div className="w-full">
          <h3 className={`text-black text-3xl font-regular pl-20 `}>
            03 - OUR EXPERTISE
          </h3>
        </div>
        <div className="w-full">
          <h2 className={`text-black text-4xl font-semibold w-[70%] pl-20 `}>
            From concept to execution, we specialize in creating cutting-edge digital experiences.
          </h2>
        </div>
      </div>

      <div className="w-full h-screen relative mt-[-5%] flex justify-between p-12">
        {showingCanvas &&
          data[3].map((canvasDetails, index) => (
            <Canvas details={canvasDetails} key={index} />
          ))}
        <div className="w-full">
          <h2 className={`text-black text-4xl font-semibold w-[70%] pl-20`}>
            Our collaborative approach ensures your vision is transformed into impactful digital reality.
          </h2>
        </div>
        <div className="w-full">
          <h3 className={`text-black text-3xl font-semibold pl-32`}>
            04 - COLLABORATION
          </h3>
        </div>
      </div>
      <div className="w-full min-h-screen relative mt-[-5%] flex flex-col justify-center p-12">
        <div className="w-full mb-12">
          <h3 className={`text-black text-3xl font-semibold pl-32`}>
            05 - GET IN TOUCH
          </h3>
        </div>

        <form className="w-[70%] mx-auto space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-black text-lg font-medium mb-2 pl-2">
              Name
            </label>
            <input 
              type="text"
              id="name"
              className="bg-transparent border-2 border-black rounded-lg p-3 text-black focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-black text-lg font-medium mb-2 pl-2">
              Email
            </label>
            <input 
              type="email"
              id="email"
              className="bg-transparent border-2 border-black rounded-lg p-3 text-black focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="feedback" className="text-black text-lg font-medium mb-2 pl-2">
              Feedback
            </label>
            <textarea
              id="feedback"
              rows="5"
              className="bg-transparent border-2 border-black rounded-lg p-3 text-black focus:outline-none focus:border-red-600 transition-colors resize-none"
              placeholder="Share your thoughts with us"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
      <footer className="w-full bg-black text-white py-12 mt-20">
        <div className="w-[80%] mx-auto">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h4 className="text-2xl font-bold">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="https://twitter.com/animated_studio" className="hover:text-red-600 transition-colors cursor-pointer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://instagram.com/animated.designs" className="hover:text-red-600 transition-colors cursor-pointer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/animated-studio" className="hover:text-red-600 transition-colors cursor-pointer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://dribbble.com/animated_studio" className="hover:text-red-600 transition-colors cursor-pointer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-2xl font-bold">Location</h4>
              <p>123 Creative Street</p>
              <p>Design District</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2024 Animated Studio. All rights reserved.
          </div>
        </div>
      </footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-black text-white dark:bg-white dark:text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Back to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
}

export default App;
