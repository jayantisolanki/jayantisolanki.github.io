const elemItems = document.querySelectorAll(".left .inner ul li");

elemItems.forEach(function (element) {
    element.addEventListener("click", function () {
        this.classList.add("active");

        elemItems.forEach(function (el) {
            if (el !== this) {
                el.classList.remove("active");
            }
        }, this);
    });
});


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function formSubmitFun(event) {
    //alert("yes");
    let currentForm = document.forms['submit-to-google-sheet'];
    let loader = document.querySelector(".ap_loader");
    let successMsg = document.querySelector(".successMessage");
    loader.style.display = "flex";
    //        debugger;
    event.preventDefault();
    const data = new FormData(currentForm);
    const action = event.target.action;
    fetch(action, {
        method: "POST",
        body: data,
    }).then(() => {
        //            alert("Success!");
        loader.style.display = "none";
        successMsg.style.display = "block";
        currentForm.reset();
    });
}



// confetti

function showPopup() {
    const popup = document.querySelector('.jn_popup');
    popup.classList.add('show');
}

function handleKeyPress(event) {
    // Check if the pressed key is the 'Esc' key
    if (event.keyCode === 27) {
        // Select elements with the class 'modal_wrapper' and remove the 'show' class
        document.querySelectorAll('.jn_popup').forEach(function(element) {
        element.classList.remove('show');
        });
    }
}

// Add an event listener to the document to listen for key presses
document.addEventListener('keydown', handleKeyPress);

let hidePopup = document.querySelectorAll("[data-popup='close_modal']");
hidePopup.forEach(element => {
    // get which element hit 
    let pCall = element.getAttribute("data-p-call");
    console.log(pCall);

    // set loop for all popups
    element.addEventListener("click", function(){
        let pTarget = document.querySelector(`.jn_popup[data-p-target='${pCall}']`);
        pTarget.classList.remove("show");
    });
});

document.addEventListener('click', function(e) {
    // Check if the clicked element has the 'modal_wrapper' class
    if (e.target.classList.contains('show')) {
        // Select elements with the class 'modal_wrapper' and remove the 'show' class
        document.querySelectorAll('.jn_popup').forEach(function(element) {
            element.classList.remove('show');
        });
    }
});
  



let confettieCheck = sessionStorage.getItem("setConfettie");
console.log(confettieCheck);

if(confettieCheck == null){
    window.onload = showPopup;

    const duration = 3.5 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
    sessionStorage.setItem("setConfettie", true);
}


// add class on scroll

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 30) {
        header.classList.add('darkHdrScroll');
      } else {
        header.classList.remove('darkHdrScroll');
      }
});