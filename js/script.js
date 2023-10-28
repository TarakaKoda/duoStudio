function init() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

init();

let cursor = document.querySelector('.cursor');
let main = document.querySelector('.main');
main.addEventListener('mousemove', (dets) => {
    gsap.to('.cursor', {
        left:dets.x -10,
        top:dets.y - 10,
    })
})

function videoCursor(element) {
    let video = document.querySelector(element);
    video.addEventListener('mouseenter', () => {
        cursor.innerHTML = '<P>SOUND ON</p>'
        gsap.to('.cursor', {
            width: '5.5vw',
            height: '1.3vw',
            borderRadius: '3vw',
            fontSize: '0.8vw',
        })
        main.addEventListener('mousemove', (dets) => {
            gsap.to('.cursor', {
                left:dets.x -40,
                top:dets.y - 10,
                duration: 1
            })
        })
    })
    
    video.addEventListener('mouseleave', () => {
        cursor.innerHTML = ''
        gsap.to('.cursor', {
            width: '1.2vw',
            height: '1.2vw',
            borderRadius: '50%',
        })

        main.addEventListener('mousemove', (dets) => {
            gsap.to('.cursor', {
                left:dets.x -10,
                top:dets.y - 10,
                duration: 1
            })
        })
    
    })
}
videoCursor('.main-video');
videoCursor('.right-video')
videoCursor('.left-video');

function pictureCursor(element) {
    let picture = document.querySelector(element);
    picture.addEventListener('mouseenter', () => {
        cursor.innerHTML = '<P>view</p>'
        gsap.to('.cursor', {
            width: '4vw',
            height: '1.3vw',
            borderRadius: '3vw',
            fontSize: '1vw'
        })

        main.addEventListener('mousemove', (dets) => {
            gsap.to('.cursor', {
                left:dets.x -30,
                top:dets.y - 10,
                duration: 1,
            })
        })
        
    })
    
    picture.addEventListener('mouseleave', () => {
        cursor.innerHTML = ''
        gsap.to('.cursor', {
            width: '1.2vw',
            height: '1.2vw',
            borderRadius: '50%',
            fontSize: '.8vw'
        })

        main.addEventListener('mousemove', (dets) => {
            gsap.to('.cursor', {
                left:dets.x -10,
                top:dets.y - 10,
                duration: 1
            })
        })
    
    })
}

pictureCursor('.left-picture');
pictureCursor('.right-picture');


let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top 30%',
        end: 'top 0',
        scrub: 2
    }
})

tl.to('.heading-container .top', {
    x: -100,
    duration: 1,
    delay: 0
}, 'afrin');
tl.to('.heading-container .bottom', {
    x: 100,
    duration: 1,
    delay: 0
}, 'afrin') ;
tl.to('.video-content', {
    width: '100%',
    duration: 1,
    delay: 0
}, 'afrin') ;
tl.to('.video-wrapper video', {
    width: '100%',
    duration: 1,
    delay: 0
}, 'afrin') ;


let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top -90%',
        end: 'top -130%',
        scrub: true
    }
})

tl2.to('.main', {
    backgroundColor: '#fff',
    delay:0,
    duration: 1
}, 'jyo')
tl2.to('.pg-2', {
    color: '#000',
    delay:0,
    duration: 1
}, 'jyo')
