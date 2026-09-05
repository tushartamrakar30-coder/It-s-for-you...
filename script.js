/* =========================================
   ROMANTIC PROPOSAL WEBSITE
   PART 3 — SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const screens = document.querySelectorAll(".screen");

    const song1 = document.getElementById("song1");
    const song2 = document.getElementById("song2");

    const firstYes = document.getElementById("firstYes");
    const firstYes2 = document.getElementById("firstYes2");

    const song1Button = document.getElementById("song1Button");
    const song2Button = document.getElementById("song2Button");

    const envelope = document.getElementById("envelopeContainer");
    const openLetter = document.getElementById("openLetter");

    // 16 Photos Modal Elements
    const letterModal = document.getElementById("letterModal");
    const closeLetterModal = document.getElementById("closeLetterModal");
    const letterActiveImg = document.getElementById("letterActiveImg");
    const prevLetterImg = document.getElementById("prevLetterImg");
    const nextLetterImg = document.getElementById("nextLetterImg");
    const letterCounter = document.getElementById("letterCounter");

    const finalYes = document.getElementById("finalYes");
    const notYet = document.getElementById("notYet");

    const backgroundHearts =
        document.getElementById("backgroundHearts");

    const particles =
        document.getElementById("particles");

    const heartExplosion =
        document.getElementById("heartExplosion");

    const photoLightbox =
        document.getElementById("photoLightbox");

    const closeLightbox =
        document.getElementById("closeLightbox");

    const largePhoto =
        document.getElementById("largePhoto");

    const largePhotoCaption =
        document.getElementById("largePhotoCaption");


    /* =========================================
       16 PHOTOS LIST FOR LETTER POPUP
    ========================================= */

    const letterPhotoList = [
        "photos/photo01.jpg",
        "photos/photo02.jpg",
        "photos/photo03.jpg",
        "photos/photo04.jpg",
        "photos/photo05.jpg",
        "photos/photo06.jpg",
        "photos/photo07.jpg",
        "photos/photo08.jpg",
        "photos/photo09.jpg",
        "photos/photo10.jpg",
        "photos/photo11.jpg",
        "photos/photo12.jpg",
        "photos/photo13.jpg",
        "photos/photo14.jpg",
        "photos/photo15.jpg",
        "photos/photo16.jpg"
    ];

    let currentPhotoIndex = 0;

    function updateLetterModal() {
        if (!letterActiveImg) return;
        letterActiveImg.src = letterPhotoList[currentPhotoIndex];

        if (letterCounter) {
            letterCounter.textContent = `${currentPhotoIndex + 1} / ${letterPhotoList.length}`;
        }

        if (prevLetterImg) {
            prevLetterImg.disabled = (currentPhotoIndex === 0);
        }

        if (nextLetterImg) {
            nextLetterImg.disabled = (currentPhotoIndex === letterPhotoList.length - 1);
        }
    }


    /* =========================================
       SCREEN CHANGE FUNCTION
    ========================================= */

    function showScreen(number) {

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        const nextScreen =
            document.getElementById(`screen${number}`);

        if (nextScreen) {
            nextScreen.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =========================================
       STOP ALL MUSIC
    ========================================= */

    function stopMusic() {

        if (song1) {
            song1.pause();
            song1.currentTime = 0;
        }

        if (song2) {
            song2.pause();
            song2.currentTime = 0;
        }
    }


    /* =========================================
       PLAY SONG 1
    ========================================= */

    function startSong1() {

        if (!song1) return;

        stopMusic();

        song1.volume = 0.8;

        const playPromise = song1.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Song 1 could not autoplay.");
            });
        }
    }


    /* =========================================
       PLAY SONG 2
    ========================================= */

    function startSong2() {

        if (!song2) return;

        if (song1) {
            song1.pause();
        }

        song2.currentTime = 0;
        song2.volume = 0.8;

        const playPromise = song2.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Song 2 could not autoplay.");
            });
        }
    }


    /* =========================================
       FIRST SCREEN BUTTONS
       ANY BUTTON → SONG 1 + SCREEN 2
    ========================================= */

    if (firstYes) {

        firstYes.addEventListener("click", () => {

            startSong1();

            showScreen(2);

            typeLetter();
        });
    }


    if (firstYes2) {

        firstYes2.addEventListener("click", () => {

            startSong1();

            showScreen(2);

            typeLetter();
        });
    }


    /* =========================================
       SONG 1 BUTTON
    ========================================= */

    if (song1Button) {

        song1Button.addEventListener("click", () => {

            if (song1.paused) {

                song1.play().catch(() => {});

                song1Button.innerHTML =
                    "⏸ Pause My Song";

            } else {

                song1.pause();

                song1Button.innerHTML =
                    "▶ Continue My Song";
            }
        });
    }


    /* =========================================
       LETTER TYPING
    ========================================= */

    let letterStarted = false;

    function typeLetter() {

        if (letterStarted) return;

        letterStarted = true;

        const element =
            document.getElementById("letterTyping");

        if (!element) return;

        const text =
            "I love you without knowing your name. " +
            "I love you without seeing you. " +
            "And somehow, my heart already knew " +
            "that you were someone special. ❤️";

        element.innerHTML = "";

        let index = 0;

        const cursor =
            document.createElement("span");

        cursor.className = "cursor";

        element.appendChild(cursor);

        function write() {

            if (index < text.length) {

                cursor.before(
                    document.createTextNode(text[index])
                );

                index++;

                setTimeout(write, 45);

            }
        }

        write();
    }


    /* =========================================
       DATA-NEXT BUTTONS
    ========================================= */

    document.querySelectorAll("[data-next]").forEach(button => {

        button.addEventListener("click", () => {

            const next =
                parseInt(button.dataset.next);

            if (!next) return;

            if (next === 3) {
                showScreen(3);
            }

            if (next === 4) {
                showScreen(4);
            }

            if (next === 5) {
                showScreen(5);
            }

        });

    });


    /* =========================================
       ENVELOPE & 16 PHOTOS MODAL
    ========================================= */

    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.toggle("open");
        });
    }

    if (openLetter) {
        openLetter.addEventListener("click", () => {
            if (envelope) {
                envelope.classList.add("open");
            }
            // 16 Photos popup modal show karein
            if (letterModal) {
                currentPhotoIndex = 0;
                updateLetterModal();
                letterModal.classList.add("show");
            }
        });
    }

    if (closeLetterModal) {
        closeLetterModal.addEventListener("click", () => {
            if (letterModal) {
                letterModal.classList.remove("show");
            }
        });
    }

    if (letterModal) {
        letterModal.addEventListener("click", (event) => {
            if (event.target === letterModal) {
                letterModal.classList.remove("show");
            }
        });
    }

    if (prevLetterImg) {
        prevLetterImg.addEventListener("click", () => {
            if (currentPhotoIndex > 0) {
                currentPhotoIndex--;
                updateLetterModal();
            }
        });
    }

    if (nextLetterImg) {
        nextLetterImg.addEventListener("click", () => {
            if (currentPhotoIndex < letterPhotoList.length - 1) {
                currentPhotoIndex++;
                updateLetterModal();
            }
        });
    }


    /* =========================================
       SONG 2
    ========================================= */

    if (song2Button) {

        song2Button.addEventListener("click", () => {

            if (song2.paused) {

                startSong2();

                song2Button.innerHTML =
                    "⏸ Pause Our Song";

            } else {

                song2.pause();

                song2Button.innerHTML =
                    "▶ Play Our Song";

            }

        });

    }


    /* =========================================
       PHOTO GALLERY (SCREEN 4 LIGHTBOX)
    ========================================= */

    const photoFrames =
        document.querySelectorAll(".photo-frame");

    photoFrames.forEach(frame => {

        frame.addEventListener("click", () => {

            const image =
                frame.querySelector("img");

            if (!image) return;

            largePhoto.src = image.src;

            largePhoto.alt =
                image.alt || "Our Memory ❤️";

            if (largePhotoCaption) {

                largePhotoCaption.textContent =
                    image.alt || "A beautiful memory ❤️";

            }

            photoLightbox.classList.add("show");

        });

    });


    /* =========================================
       CLOSE PHOTO
    ========================================= */

    if (closeLightbox) {

        closeLightbox.addEventListener("click", () => {

            photoLightbox.classList.remove("show");

        });

    }


    if (photoLightbox) {

        photoLightbox.addEventListener("click", event => {

            if (event.target === photoLightbox) {

                photoLightbox.classList.remove("show");

            }

        });

    }


    /* =========================================
       ESC KEY CLOSE PHOTO & MODAL
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (photoLightbox) {
                photoLightbox.classList.remove("show");
            }

            if (letterModal) {
                letterModal.classList.remove("show");
            }

        }

    });


    /* =========================================
       MOVING "NOT YET" BUTTON
    ========================================= */

    let escapeCount = 0;

    function moveNotYet() {

        if (!notYet) return;

        escapeCount++;

        const buttonWidth =
            notYet.offsetWidth;

        const buttonHeight =
            notYet.offsetHeight;

        const maxX =
            Math.max(20, window.innerWidth - buttonWidth - 20);

        const maxY =
            Math.max(20, window.innerHeight - buttonHeight - 20);

        const x =
            Math.random() * maxX;

        const y =
            Math.random() * maxY;

        notYet.style.position = "fixed";
        notYet.style.left = `${x}px`;
        notYet.style.top = `${y}px`;
        notYet.style.zIndex = "500";

        if (escapeCount >= 5) {

            notYet.innerHTML =
                "Okay okay 😂❤️";

        }

    }


    if (notYet) {

        notYet.addEventListener("mouseenter", moveNotYet);

        notYet.addEventListener("touchstart", event => {

            event.preventDefault();

            moveNotYet();

        });

        notYet.addEventListener("click", event => {

            event.preventDefault();

            moveNotYet();

        });

    }


    /* =========================================
       FINAL YES
    ========================================= */

    if (finalYes) {

        finalYes.addEventListener("click", () => {

            stopMusic();

            showScreen(6);

            createHeartExplosion();

            createFireworks();

            createExtraHearts();

        });

    }


    /* =========================================
       HEART EXPLOSION
    ========================================= */

    function createHeartExplosion() {

        if (!heartExplosion) return;

        heartExplosion.innerHTML = "";

        const hearts = [
            "❤️",
            "💖",
            "💕",
            "💗",
            "💓",
            "💞",
            "💘",
            "💝"
        ];

        const totalHearts = 230;

        for (let i = 0; i < totalHearts; i++) {

            const heart =
                document.createElement("div");

            heart.className = "explosion-heart";

            heart.textContent =
                hearts[Math.floor(Math.random() * hearts.length)];

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                180 + Math.random() * 650;

            const x =
                Math.cos(angle) * distance;

            const y =
                Math.sin(angle) * distance;

            const scale =
                0.5 + Math.random() * 1.5;

            const rotate =
                -360 + Math.random() * 720;

            heart.style.setProperty(
                "--x",
                `${x}px`
            );

            heart.style.setProperty(
                "--y",
                `${y}px`
            );

            heart.style.setProperty(
                "--scale",
                scale
            );

            heart.style.setProperty(
                "--rotate",
                `${rotate}deg`
            );

            heart.style.animationDelay =
                `${Math.random() * 0.7}s`;

            heartExplosion.appendChild(heart);

        }

        setTimeout(() => {

            heartExplosion.innerHTML = "";

        }, 4000);

    }


    /* =========================================
       CONTINUOUS FLOATING HEARTS
    ========================================= */

    function createFloatingHeart() {

        if (!backgroundHearts) return;

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        const heartTypes = [
            "❤️",
            "💗",
            "💖",
            "💕",
            "💓"
        ];

        heart.textContent =
            heartTypes[
                Math.floor(Math.random() * heartTypes.length)
            ];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${12 + Math.random() * 22}px`;

        const duration =
            6 + Math.random() * 7;

        heart.style.animationDuration =
            `${duration}s`;

        backgroundHearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, duration * 1000);

    }


    setInterval(
        createFloatingHeart,
        500
    );


    /* =========================================
       BACKGROUND PARTICLES
    ========================================= */

    function createParticle() {

        if (!particles) return;

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${5 + Math.random() * 8}s`;

        particle.style.animationDelay =
            `${Math.random() * 3}s`;

        particles.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 13000);

    }


    for (let i = 0; i < 35; i++) {

        setTimeout(
            createParticle,
            Math.random() * 5000
        );

    }

    setInterval(
        createParticle,
        500
    );


    /* =========================================
       FIREWORKS EFFECT
    ========================================= */

    function createFireworks() {

        const container =
            document.createElement("div");

        container.style.position =
            "fixed";

        container.style.inset = "0";

        container.style.pointerEvents =
            "none";

        container.style.zIndex =
            "1000";

        document.body.appendChild(container);


        for (let burst = 0; burst < 8; burst++) {

            setTimeout(() => {

                const centerX =
                    10 + Math.random() * 80;

                const centerY =
                    10 + Math.random() * 60;

                for (let i = 0; i < 35; i++) {

                    const particle =
                        document.createElement("div");

                    particle.innerHTML =
                        "✦";

                    particle.style.position =
                        "fixed";

                    particle.style.left =
                        `${centerX}%`;

                    particle.style.top =
                        `${centerY}%`;

                    particle.style.fontSize =
                        `${8 + Math.random() * 12}px`;

                    particle.style.color =
                        "white";

                    particle.style.textShadow =
                        "0 0 10px #ff4d91";

                    const angle =
                        Math.random() * Math.PI * 2;

                    const distance =
                        50 + Math.random() * 180;

                    const x =
                        Math.cos(angle) * distance;

                    const y =
                        Math.sin(angle) * distance;

                    particle.animate(
                        [
                            {
                                transform: "translate(0,0) scale(1)",
                                opacity: 1
                            },
                            {
                                transform:
                                    `translate(${x}px,${y}px) scale(0)`,
                                opacity: 0
                            }
                        ],
                        {
                            duration:
                                900 + Math.random() * 700,
                            easing:
                                "cubic-bezier(.2,.7,.2,1)"
                        }
                    );

                    container.appendChild(particle);

                }

            }, burst * 350);

        }


        setTimeout(() => {

            container.remove();

        }, 5000);

    }


    /* =========================================
       EXTRA HEART RAIN AFTER YES
    ========================================= */

    function createExtraHearts() {

        const duration = 5000;

        const interval =
            setInterval(() => {

                const heart =
                    document.createElement("div");

                heart.t
