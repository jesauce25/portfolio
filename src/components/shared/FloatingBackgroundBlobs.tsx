import { useEffect, useRef } from "react";
import gsap from "gsap";

const FloatingBackgroundBlobs = () => {
  const blobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobsRef.current) return;
    
    const blobs = blobsRef.current;
    const blobsCtx = gsap.context(() => {
      const blob1 = blobs.querySelector('.blob-1');
      const blob2 = blobs.querySelector('.blob-2');
      const blob3 = blobs.querySelector('.blob-3');
      const blob4 = blobs.querySelector('.blob-4');
      const blob5 = blobs.querySelector('.blob-5');
      
      if (blob1 && blob2 && blob3) {
        // First blob animation
        gsap.to(blob1, {
          x: "10vw",
          y: "5vh",
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        
        // Second blob animation
        gsap.to(blob2, {
          x: "-15vw",
          y: "10vh",
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
        
        // Third blob animation
        gsap.to(blob3, {
          x: "5vw",
          y: "-8vh",
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });

        if (blob4) {
          gsap.to(blob4, {
            x: "-10vw",
            y: "15vh",
            duration: 17,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5,
          });
        }
        if (blob5) {
          gsap.to(blob5, {
            x: "8vw",
            y: "-12vh",
            duration: 19,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2,
          });
        }
      }
    }, blobs);
    
    return () => blobsCtx.revert();
  }, []);

  return (
    <div 
      ref={blobsRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="blob-1 morphing-blob w-[600px] h-[600px] opacity-30 top-[-100px] left-[-100px]"></div>
      <div className="blob-2 morphing-blob w-[800px] h-[800px] opacity-20 bottom-[-200px] right-[-200px]"></div>
      <div className="blob-3 morphing-blob w-[500px] h-[500px] opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="blob-4 morphing-blob w-[400px] h-[400px] opacity-15 top-[20%] right-[10%]"></div>
      <div className="blob-5 morphing-blob w-[700px] h-[700px] opacity-25 bottom-[10%] left-[10%]"></div>
    </div>
  );
};

export default FloatingBackgroundBlobs; 