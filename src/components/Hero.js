import React, { useEffect, useRef } from 'react';
import './Hero.css';
import VID from '../video/video.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        // GSAP ScrollTrigger timeline
        let tl = gsap.timeline({
            defaults: { duration: 1 },
            scrollTrigger: {
                trigger: "#container",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });

        // When the video metadata is loaded, set the animation
        const handleLoadedMetadata = () => {
            tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });
        };

        // Add loadedmetadata event listener
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        // Fetch the video and create a blob URL after a delay
        const fetchVideoBlob = () => {
            const src = video.currentSrc || video.src;
            setTimeout(() => {
                if (window.fetch) {
                    fetch(src)
                        .then((response) => response.blob())
                        .then((response) => {
                            const blobURL = URL.createObjectURL(response);
                            video.setAttribute("src", blobURL);
                            video.currentTime = video.currentTime + 0.01;
                        });
                }
            }, 100);
        };

        fetchVideoBlob();

        // Cleanup event listeners on component unmount
        return () => {
            // document.documentElement.removeEventListener("touchstart", handleTouchStart);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    return (
        <div id='container' className="hero">
            <video ref={videoRef} className='hero-video' src={VID} controls={false} muted></video>
        </div>
    );
};

export default Hero;
