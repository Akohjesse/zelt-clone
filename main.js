import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
  


  const item = document.querySelector('.first');
  gsap.to(item, {
    scrollTrigger: {
      scrub: true,
      start: "center center",
      end: "+=900",
     trigger:item
    },
    opacity: 0,
    duration: 2,
  })

  const canvas = document.getElementById("zeltAnim");
  const context = canvas.getContext("2d");
  const frameCount = 118;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const currentFrame = (index) => {
    return `https://zelt.app/assets/img/home/hero/sequence/${index.toString()}.webp`;
  };

  const img = new Image();
  img.src = currentFrame(1);
  img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  window.addEventListener("scroll", () => {
    const html = document.documentElement;
    const wrap = document.querySelector(".container_wrap");
    const scrollTop = html.scrollTop;
    const maxScrollTop = wrap.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(scrollFraction * frameCount)
    );
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  });

  preloadImages();
});
