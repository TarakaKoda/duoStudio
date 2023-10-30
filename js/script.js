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
document.addEventListener('mousemove', (dets) => {
    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;

    // Calculate the position to keep the cursor centered
    const left = dets.x - cursorWidth / 2;
    const top = dets.y - cursorHeight / 2;

    // Use GSAP to animate the cursor position
    gsap.to(cursor, {
        left: left,
        top: top,
    });
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
    })
    
    video.addEventListener('mouseleave', () => {
        cursor.innerHTML = ''
        gsap.to('.cursor', {
            width: '1.2vw',
            height: '1.2vw',
            borderRadius: '50%',
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
    })
    
    picture.addEventListener('mouseleave', () => {
        cursor.innerHTML = ''
        gsap.to('.cursor', {
            width: '1.2vw',
            height: '1.2vw',
            borderRadius: '50%',
            fontSize: '.8vw'
        })
    })
}

pictureCursor('.left-picture');
pictureCursor('.right-picture');


let circleWrapper = document.querySelector('.circle-wrapper');
let circleContainer = document.querySelector('.circle-container');

circleWrapper.addEventListener('mouseenter', (event) => {
    const min = 350; // Adjust these min and max values as needed
    const max = 200;
    tl = Math.floor(Math.random() * (max - min) + min);
    tr = Math.floor(Math.random() * (max - min) + min);
    br = Math.floor(Math.random() * (max - min) + min);
    bl = Math.floor(Math.random() * (max - min) + min);

    let borderRadius = `${tl}px ${tr}px ${br}px ${bl}px `;
    gsap.to('.cursor', {
        opacity: 0,
        duration: 0
    })

    gsap.to('.circle-container', {
        borderRadius: borderRadius
    })
});
circleWrapper.addEventListener('mouseleave', (event) => {
    gsap.to('.cursor', {
        opacity: 1,
        duration: 0
    })
    gsap.to('.circle-container', {
        borderRadius: '50%'
    })
});


let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top 200vw',
        end: 'top 0',
        scrub: 2
    }
})

tl.to('.heading-container .top', {
    x: '-5vw',
    duration: 1,
    delay: 0
}, 'afrin');
tl.to('.heading-container .bottom', {
    x: '5vw',
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


// let tl2 = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.heading-container .top',
//         scroller: '.main',
//         start: 'top -1000vw',
//         end: 'top -730vw',
//         scrub: true
//     }
// })



// tl2.to('.main', {
//     backgroundColor: '#fff',
//     delay:0,
//     duration: 1
// }, 'jyo')
// tl2.to('.pg-2', {
//     color: '#000',
//     delay:0,
//     duration: 1
// }, 'jyo')

// let tl3 = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.heading-container .top',
//         scroller: '.main',
//         start: 'top -4400vw',
//         end: 'top -600vw',
//         scrub: true
//     }
// })

// tl3.to('.main', {
//     backgroundColor: '#0F0D0D',
//     color: '#fff'
// }, 'pavani')

// tl3.to('.pg-3 h3', {
//     color: '#fff'
// }, 'pavani')
// tl3.to('.pg-3 .pg-2-container', {
//     borderBottom: '2px solid #fff'
// }, 'pavani')

// Create ScrollTrigger timeline for desktop view
let tlDesktop = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top -1000vw',
        end: 'top -730vw',
        scrub: true
    }
});

// Animation for desktop view
tlDesktop.to('.main', {
    backgroundColor: '#fff',
    delay: 0,
    duration: 1
}, 'jyo');

tlDesktop.to('.pg-2', {
    color: '#000',
    delay: 0,
    duration: 1
}, 'jyo');

// Create ScrollTrigger timeline for mobile view
let tlMobile = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top -50vw',   // Adjust the start value for mobile view
        end: 'top -200vw',    // Adjust the end value for mobile view
        scrub: true
    }
});

// Animation for mobile view
tlMobile.to('.main', {
    backgroundColor: '#fff',
    delay: 0,
    duration: 1
}, 'jyo');

tlMobile.to('.pg-2', {
    color: '#000',
    delay: 0,
    duration: 1
}, 'jyo');

// Use media queries to switch between configurations
const desktopMediaQuery = window.matchMedia("(min-width: 768px)");

function handleViewportChange(mediaQuery) {
    if (mediaQuery.matches) {
        // Desktop view
        tlDesktop.scrollTrigger.enable();
        tlMobile.scrollTrigger.disable();
    } else {
        // Mobile view
        tlDesktop.scrollTrigger.disable();
        tlMobile.scrollTrigger.enable();
    }
}

// Initial check and event listener for viewport changes
handleViewportChange(desktopMediaQuery);
desktopMediaQuery.addListener(handleViewportChange);


// Create ScrollTrigger timeline for desktop view
let tl3Desktop = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top -4400vw',
        end: 'top -600vw',
        scrub: true
    }
});

// Animation for desktop view
tl3Desktop.to('.main', {
    backgroundColor: '#0F0D0D',
    color: '#fff'
}, 'pavani');

tl3Desktop.to('.pg-3 h3', {
    color: '#fff'
}, 'pavani');

tl3Desktop.to('.pg-3 .pg-2-container', {
    borderBottom: '2px solid #fff'
}, 'pavani');

// Create ScrollTrigger timeline for mobile view
let tl3Mobile = gsap.timeline({
    scrollTrigger: {
        trigger: '.heading-container .top',
        scroller: '.main',
        start: 'top -900vw',  // Adjust the start value for mobile view
        end: 'top -100vw',    // Adjust the end value for mobile view
        scrub: true
    }
});

// Animation for mobile view
tl3Mobile.to('.main', {
    backgroundColor: '#0F0D0D',  // Modify for mobile
    color: '#fff'           // Modify for mobile
}, 'pavani');

tl3Mobile.to('.pg-2 p', {
    backgroundColor: '#0F0D0D',  // Modify for mobile
    color: '#fff'           // Modify for mobile
}, 'pavani');

tl3Mobile.to('.pg-3 h3', {
    color: '#fff'  // Modify for mobile
}, 'pavani');

tl3Mobile.to('.pg-3 .pg-2-container', {
    borderBottom: '2px solid #000'  // Modify for mobile
}, 'pavani');

// Use media queries to switch between configurations
const desktopMediaQuery2 = window.matchMedia("(min-width: 768px)");

function handleViewportChange2(mediaQuery) {
    if (mediaQuery.matches) {
        // Desktop view
        tl3Desktop.scrollTrigger.enable();
        tl3Mobile.scrollTrigger.disable();
    } else {
        // Mobile view
        tl3Desktop.scrollTrigger.disable();
        tl3Mobile.scrollTrigger.enable();
    }
}

// Initial check and event listener for viewport changes
handleViewportChange2(desktopMediaQuery2);
desktopMediaQuery2.addListener(handleViewportChange2);




function mentionBox() {
    let box = document.querySelectorAll('.box');
    box.forEach((element) => {
        element.addEventListener('mouseenter', function() {
            let attribute = element.getAttribute('data-image');
            gsap.to(cursor, {
                width: '35vw',
                height: '22vw',
                borderRadius: 0,
                background: `url(${attribute})`,
                mixBlendMode: 'normal',
            });
        })
        element.addEventListener('mouseleave', function() {
            gsap.to(cursor, {
                width: '1.2vw',
                height: '1.2vw',
                borderRadius: '50%',
                background: '#EDBFFF',
                mixBlendMode: 'difference',
            });
        })
    })

}
mentionBox();

function clientTop(element) {
    let elementVariable = document.querySelector(element);
    elementVariable.addEventListener('mouseenter', function() {
        gsap.to(cursor, {
            width: '3vw',
            height: '3vw'
        })
    })
    elementVariable.addEventListener('mouseleave', function() {
        gsap.to(cursor, {
            width: '1.2vw',
            height: '1.2vw'
        })
    })
}
function navTop(element) {
    let elementVariable = document.querySelector(element);
    elementVariable.addEventListener('mouseenter', function() {
        gsap.to(cursor, {
            width: '3vw',
            background:'#000',
            height: '3vw',
            mixBlendMode: 'normal'
        })
    })
    elementVariable.addEventListener('mouseleave', function() {
        gsap.to(cursor, {
            width: '1.2vw',
            height: '1.2vw',
            background: '#EDBFFF',
            mixBlendMode: 'difference'
        })
    })
}

clientTop('.client-top');
clientTop('.element-container.strategy');
clientTop('.element-container.identity');
clientTop('.element-container.experience');
navTop('.nav-2');
navTop('.nav-3');
navTop('.nav-4');

function hoverPage(innerHtml) {
    let pElements = document.querySelectorAll('.hover-page p');
    pElements.forEach(function(elem) {
        elem.innerHTML = innerHtml
    })
}

function magicPage(element, innerHtml) {
    let work = document.querySelector(element);
    work.addEventListener('mouseenter', function() {
        hoverPage(innerHtml);
        gsap.to('.hover-page', {
            zIndex: 2
        })
    })
    work.addEventListener('mouseleave', function() {
        gsap.to('.hover-page', {
            zIndex: 0
        })
    })
}

magicPage('.nav-2', 'Work');
magicPage('.nav-3', 'Studio');
magicPage('.nav-4', 'Contact');


function loadingVideo(smallELement, largeELement) {
    // Wait for the page to load
    window.addEventListener("load", function() {
        // Hide the small video
        var smallVideo = document.getElementById(smallELement);
        smallVideo.style.display = "none";
        
        // Show the large video
        var largeVideo = document.getElementById(largeELement);
        largeVideo.style.display = "block";
    
        // Play the large video
        largeVideo.play();
    });
}

loadingVideo('smallVideo', 'largeVideo');
loadingVideo('rightVideoSmall', 'rightVideoLarge');
loadingVideo('leftVideoSmall', 'leftVideoLarge');