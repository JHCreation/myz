import { LinkText_1 } from "~/components/ui/LinkText";
import { animated, easings, useScroll, useSpring } from "@react-spring/web";
import { MagneticCursor } from "~/components/cursor/MagneticCursor";
import { Link, useNavigate } from "@remix-run/react";
import Logo from "~/layout/home/main/Logo";
import { ReactLenis, useLenis } from 'lenis/react'
import {FloatingOverlay, FloatingPortal} from '@floating-ui/react';
import { useEffect, useRef, useState } from "react";
import { route } from "../route";
import { useRootLenis } from "~/store/store";
const duration= 1800;
const delay= 600;
export const Navigation= ({ root })=> {
  const {setRootLenis}= useRootLenis();
  const rootLenis= useLenis();
  // setRootLenis(rootLenis)
  useEffect(()=> {
    if( rootLenis ) setRootLenis(rootLenis)
  }, [rootLenis])

  const navigate = useNavigate();
  const [transition, setTransition]= useState<any>(false)
  
  const handleClick = (menu)=> (event) => {
    event.preventDefault();

    setTransition(menu)
    let trTiming;
    trTiming= setTimeout(e=> {
      setTransition(false)
      clearTimeout(trTiming)
    }, duration)

    let navTiming;
    navTiming= setTimeout(() => {
      navigate(menu.to)
      clearTimeout(navTiming)
    }, delay);
    
  };

  return (
    <ReactLenis root>
      <nav className="bg-paper border-b">

        <div className="flex w-full mx-auto justify-between pl-6 pr-8 py-2">
          <Link to={'/'} className="btn btn-ghost btn-sm text-md md:text-xl w-[200px]">
            <Logo className="h-full"/>
          </Link>
          <ul className="flex gap-10">
            {
              route.map( menu=> 
              <li key={menu.name} className="flex items-center ">
                <MagneticCursor className="px-0 custom-hover">
                  <div className="list_item_1 pl-3">
                    <span className="leading-none ">
                      <LinkText_1>
                        {/* {
                          menu.transition &&
                          <LinksWrap 
                            menu={menu} setTransition={setTransition} 
                            duration={1000}
                            delay={500}
                          />
                        } */}
                        {
                          menu.transition &&
                          <Link 
                            to={menu.to} onClick={handleClick(menu)} 
                            prefetch="intent"
                            // preventScrollReset
                          >
                            {menu.name}
                          </Link>
                        }
                        {
                          !menu.transition &&
                          <Link 
                            to={menu.to} 
                            // unstable_viewTransition 
                            prefetch="intent"
                            // preventScrollReset

                          >
                            {menu.name}
                          </Link>
                        }
                        
                      </LinkText_1>
                    </span>
                  </div>
                </MagneticCursor>
              </li> )
            }
          </ul>
        </div>
      </nav>
      {
        transition && root && 
        <>
        <FloatingPortal 
          root={root}
          // id="custom-root-id" 
        >
          
          <div className="fixed top-0 left-0 w-full z-50 ">
            <div className="overflow-hidden">
              
              <BgAni />
              {/* <div className="absolute top-0 left-0 w-full h-full p-20">
                {transition.name}
              </div> */}
            </div>
          </div>
        </FloatingPortal>
        {/* <FloatingOverlay lockScroll>
          <div className="w-full h-dvh bg-primary z-50"></div>
        </FloatingOverlay> */}
        </>
      }
    </ReactLenis>
  )
}


const BgAni= ()=> {
  
  const [styles] = useSpring(()=> ({
    config:{
      // duration: 500,
      // bounce: 100,
      easing: easings.easeInCubic,
    },
    from : { scaleY: 0, transformOrigin: '50% 100%' },
    to: [
      { scaleY: 1, transformOrigin: '50% 100%', config: { duration: 600 } },
      { scaleY: 1.2, transformOrigin: '50% 0%', config: { duration: 300 } },
      // { scaleY: 1, transformOrigin: '50% 0%', duration: 100 },
      { scaleY: 0, transformOrigin: '50% 0%', config: { duration: 600 } },
    ],
    // reset: true
    /* from: {
      opacity: 0,
      x: 0,
      backgroundColor: '#ff0',
    }, */
    /* to: {
      opacity: 1,
      x: '0%',
      backgroundColor: '#ff0000',
    }, */
  }) )
  const easing= {
    y: easings.easeInBounce,
    opacity: easings.easeInOutBounce,
  }
  const [styles_1, api] = useSpring(()=> ({
    
    // immediate: true,
    // reverse: false,
    // reset: false,
    // loop: false,
    from: {
      opacity: 0,
      y: '-20%',
      // config: { duration: 350, },
    },
    to: [
      { opacity: 1, y: '.1%', config: { duration: 250, },},
      { opacity: 1, y: '0%', config: { duration: 300, },},
      { opacity: 0, y: '0%', config: { duration: 200, },},
    ],
    delay: 600
  }) )

  console.log(styles_1)

  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(()=> {
    console.log('init animation')
    // setIsAnimated(true)
    /* api.start({
      to: [
        { opacity: 1, y: '0%', config: { duration: 500, },},
        { opacity: 0, y: '-20%', config: { duration: 150, },},
        // { opacity: 1, y: '0%' },
        // { opacity: 0, y: '-10%', },
      ],
      delay: 500
    }) */
  }, [])
  return (
    <div className="h-dvh flex items-center justify-center">
    <animated.div
      style={styles}
      className={`absolute top-0 left-0 bg-black w-full h-dvh`}
    >
    </animated.div>

    {
      // isAnimated && 
      <animated.div
        style={styles_1}
      >
        <Logo className="relative w-[10vw] fill-paper"/>
      </animated.div>
    }
    

    </div>
  )
}









const LinksWrap= ({menu, setTransition, duration, delay})=> {
  /* const isTransitioning = unstable_useViewTransitionState(menu.to);
  useEffect(()=> {
    if( isTransitioning ) {
      
    }
  }, [isTransitioning]) */


  const navigate = useNavigate();
  
  const handleClick = (event) => {
    event.preventDefault();
    setTransition(menu)
    setTimeout(e=> {
      setTransition(false)
    }, duration)
    setTimeout(() => {
      navigate(menu.to)
    }, delay);
    
  };


  return (
    <>
    <Link to={menu.to} onClick={handleClick} >
      {menu.name}
    </Link>
    </>
  )
}