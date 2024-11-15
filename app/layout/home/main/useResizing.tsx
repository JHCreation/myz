import { useState, useEffect } from 'react';
import { useResize } from '@react-spring/web';

export default function useResizing() {
  const [size, setSize] = useState<any>({ width: null, height: null });
  const screen = useResize({});
  const { width, height } = screen;
  /* useEffect(()=> {
    if( window ) {
      console.log('window:', window.innerWidth, window.innerHeight)
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }, []) */
  
  /* useEffect(() => {
    console.log('resize!', width.get())
    setSize({ width: width, height: height });
  }, [width, height]); */

  return screen
}