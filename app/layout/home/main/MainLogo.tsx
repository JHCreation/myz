import { animated, useScroll, useSpring } from "@react-spring/web";
import React, { useContext, useEffect, useRef } from "react";
import { ScreenContext } from "../Layout1";
import SectionScroll from "./SectionScroll";
import Logo from "./Logo";
import Test from "./Test.client";
// const Test = React.lazy(() => import('./Test.client'));
const scrolls= new SectionScroll({
  actionOffset: {
    start: 0,
    end: 0
  },
  distanceOffset: {
    start: 0,
    end: 0
  },
  // print: true
})

const scrolls_1= new SectionScroll({})

const colorInterval= [0, 
  .1, .3, .6, 
  .7, 1]
/* const colorInterpolation= ['#0c0a09', 
  '#57534e', '#a8a29e',  '#d6d3d1', 
  '#f5f5f4', '#f5f5f4'] */
const colorInterpolation= ['#343300', 
  '#419400', '#edd000',  '#bdc000', 
  '#f8fdef', '#f8fdef']
export default function MainLogo () {
  const {screen, windowSize} = useContext(ScreenContext)
  const scroll= useScroll({
    onChange:(result,spring,item)=> {
      // console.log(result,spring,item)
      const progress= scrolls.getProgress('logo')
      console.log(progress)
      if( !progress ) return;

      scrolls_1.set({
        distanceOffset: {
          start: -100,
          end: (-screen?.height?.get()*-1.5 || scrolls_1.get("distanceOffset").end)
        }
      })
      const progress_1= scrolls_1.getProgress('logo1')
      console.log(progress_1)
      if( !progress_1 ) return;

      apiTitle.start({
        per: progress,
        per_1: progress_1
      })
    }
  })
  const [springTitle, apiTitle]= useSpring(() => ({
    from: { per: 0, per_1: 0 },
  }))

  console.log(scroll)
  
  

  const containerRef= useRef<HTMLDivElement>(null)
  useEffect(()=> {
    console.log(containerRef.current, windowSize)
    if( containerRef.current && windowSize ) {
      scrolls.set({ 
        container: containerRef.current,
        distanceOffset: {
          start: 0,
          end: 0
        }
      }) 
    
      scrolls_1.set({ 
        container: containerRef.current,
        distanceOffset: {
          start: -100,
          end: -(screen?.height?.get()*-1.5 || windowSize?.height*-1.5),
        }
      }) 
    }
  }, [containerRef.current, windowSize])



  return (
    <div className="bg-paper z-10 relative">
      <section ref={containerRef} className='h-[800lvh]'>
        <div className="sticky h-dvh top-0 flex items-center overflow-hidden pt-nav-m md:pt-nav">
          <div className="h-full max-h-svh w-full flex flex-col justify-between  ">
            <div className=" font-type-en text-stroke-[1px] font-black text-stroke-gray-500 text-stroke-fill-transparent leading-[.8] text-[20px] md:text-[60px] uppercase italic">
              <h1 className="">Web/Graphic</h1>
              <h1 className="">Unique Design</h1>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full max-h-svh flex items-center justify-center">
              {
                // screen?.width &&
              
                <animated.div
                  style={{
                    scale: springTitle.per.to(progress=> {
                      console.log(progress, screen?.width?.get(), windowSize?.width)
                      const screenWidth= screen?.width?.get() || windowSize?.width
                      const def= 1950
                      const ratio= (screenWidth)/def
                      const varWidth= ratio < 0 ? 1 : ratio
                      const value= progress*(varWidth)*150
                      return value < 1 ? 1 : value
                    }),
                    /* opacity: springTitle.per.to(progress=> {
                      const value= progress*10 > 1 ? 1 : progress*10
                      return value
                    }), */
                    /* left: springTitle.per.to(progress=> {
                      const val= 100*progress > 50 ? 50 : 100*progress
                      return `${val}%`
                    }), 
                    top: springTitle.per.to(progress=> {
                      const val= 100*progress > 50 ? 50 : 100*progress
                      return `${val}%`
                    }),
                    x: springTitle.per.to(progress=> {
                      const val= 100*progress > 50 ? 50 : 100*progress
                      return `-${val}%`
                    }),
                    y: springTitle.per.to(progress=> {
                      const val= 100*progress > 50 ? 50 : 100*progress
                      return `-${val}%`
                    }), */
                    color: springTitle.per_1.to(colorInterval, colorInterpolation),
                    fill: springTitle.per_1.to(colorInterval, colorInterpolation)
                  }}
                  className={`whitespace-nowrap scale-0 `}
                >
                  <div className="flex items-center justify-center">
                    <div
                      // style={springTitle}
                      className=""
                    >
                      <Logo className="h-full w-[10vw] relative"/>
                    </div>
                  </div>
                </animated.div>
              }
            </div>
            <animated.div
              style={{
                x: springTitle.per.to(progress=> {
                  return `${progress*100}%`
                }),
              }}
              className="font-type-en text-stroke-[1px] font-extrabold text-stroke-gray-500- text-stroke-fill-transparent- leading-[.7] text-[30px] md:text-[60px] uppercase italic">
              {/* <animated.div>
                {
                  // springTitle.per.to([0,.5],['Let’s create', 'Let’s go'])
                  springTitle.per.to(progress=> {
                    // if( progress > .2 ) return 'Let it go'
                    // if( progress > .1 ) return 'Let’s go'
                    // if( progress > 0 ) return 'Let’s create'
                    // return ''
                    return `${progress*100}%`
                  })
                }
              </animated.div> */}
              <h1 className="">Let’s create</h1>
            </animated.div>
            {/* <div className="absolute top-[50%] left-[13%] ">
              <animated.div 
                style={{
                  scale: springTitle.per.to(progress=> {
                    const screenWidth= screen.width.get() || windowSize?.width
                    const def= 1950
                    const ratio= (screenWidth)/def
                    const varWidth= ratio < 0 ? 1 : ratio
                    if( progress > .5 ) return (progress-.5)*(screenWidth/1000)*300
                    return ''
                  }),
                  opacity: springTitle.per.to(progress=> {
                    if( progress > .5 ) return 1;
                    return 0;
                  }),
                  skew: '-37deg',
                  backgroundColor: springTitle.per_1.to(colorInterval, colorInterpolation)
                }}
                className={'w-10 h-40  skew-x-[-37deg]'}
              >
                
              </animated.div>
              
            </div> */}




            <div className="absolute top-[50%] left-[49%] rotate-[29deg]">

              { 
                // screen?.width && 
                <animated.div 
                  style={{
                    scale: springTitle.per.to(progress=> {
                      const screenWidth= screen?.width?.get() || windowSize?.width
                      // const def= 1950
                      // const ratio= (screenWidth)/def
                      // const varWidth= ratio < 0 ? 1 : ratio
                      
                      if( progress > .5 ) {
                        const value= (progress-.5)*(screenWidth/1000)*130
                        return [value, value]
                      }
                      // return '';
                      return [0,0]
                    }),
                    opacity: springTitle.per.to(progress=> {
                      if( progress > .5 ) return 1;
                      return 0;
                    }),
                    // skew: '-37deg',
                    backgroundColor: springTitle.per_1.to(colorInterval, colorInterpolation),
                    // backgroundColor: '#fff',
                    // x: `-70%`
                  }}
                  className={'w-10 h-40 '}
                >
                  
                </animated.div>
              }
            </div>
          </div>
        </div>
      </section>
      {/* <Test /> */}

    </div>
  )
}