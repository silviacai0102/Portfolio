document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for header links
    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            const targetPosition = targetSection.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const scrollAmount = ease(progress / duration) * distance + startPosition;

                window.scrollTo(0, scrollAmount);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, targetPosition);
                }
            }

            window.requestAnimationFrame(step);
        });
    });

    // General Slideshow functionality with seamless wrapping
    const slideshows = document.querySelectorAll(".slideshow-container");

    slideshows.forEach(slideshow => {
        let currentSlide = 0;
        const images = slideshow.querySelectorAll(".slideshow-image");
        const slidesWrapper = slideshow.querySelector(".slides-wrapper");
        const totalSlides = images.length;

        slidesWrapper.style.width = `${100 * totalSlides}%`;
        images.forEach(image => {
            image.style.width = `${100 / totalSlides}%`;
        });

        function showSlide(index) {
            const offset = -index * 100 / totalSlides;
            slidesWrapper.style.transition = "transform 0.5s ease-in-out";
            slidesWrapper.style.transform = `translateX(${offset}%)`;
            currentSlide = index;
        }

        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(0); // Wrap to the first slide
            }
        }

        function previousSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            } else {
                showSlide(totalSlides - 1); // Wrap to the last slide
            }
        }

        slideshow.querySelector(".next").addEventListener("click", () => {
            clearInterval(autoplay);
            nextSlide();
            autoplay = setInterval(nextSlide, 3000);
        });

        slideshow.querySelector(".prev").addEventListener("click", () => {
            clearInterval(autoplay);
            previousSlide();
            autoplay = setInterval(nextSlide, 3000);
        });

        let autoplay = setInterval(nextSlide, 3000);
    });

    // Photography Slideshow functionality

    // Define project images
    const projectImages = {
        'cat': [
            'pic/cat/IMG_4304.jpeg',
            'pic/cat/IMG_7848 2.JPG',
            'pic/cat/IMG_4309.jpeg',
            'pic/cat/IMG_9912.JPG',
            'pic/cat/IMG_4302.jpeg',
            'pic/cat/DV9A2577.JPG',
            'pic/cat/IMG_7850 2.JPG',
            'pic/cat/IMG_4284.jpeg',
            'pic/cat/IMG_4289.jpeg',
            'pic/cat/c31570a9e2758435b7d97bda9a819504.JPG',
            'pic/cat/IMG_6980.jpeg',
            'pic/cat/IMG_4290.jpeg',
            'pic/cat/DV9A2583.JPG',
            'pic/cat/DV9A2585.JPG',
            'pic/cat/IMG_4287.jpeg',
            'pic/cat/IMG_4293.HEIC',
            'pic/cat/20d26c299b6df4c7f5c5785b11bc2dc4.JPG',
            'pic/cat/IMG_7844 2.JPG',
        ],
        'P2T 2023': [
            'pic/P2T 2023/IMG_7829.JPG',
            'pic/P2T 2023/IMG_7838.JPG',
            'pic/P2T 2023/IMG_3790.JPG',
            'pic/P2T 2023/IMG_3786.JPG',
            'pic/P2T 2023/IMG_3789.JPG',
            'pic/P2T 2023/IMG_7840.JPG',
            'pic/P2T 2023/IMG_7835.JPG',
            'pic/P2T 2023/IMG_7821.JPG',
            'pic/P2T 2023/IMG_7834.JPG',
            'pic/P2T 2023/IMG_7822.JPG',
            'pic/P2T 2023/IMG_7836.JPG',
            'pic/P2T 2023/IMG_7837.JPG',
            'pic/P2T 2023/IMG_7823.JPG',
            'pic/P2T 2023/IMG_7827.JPG',
            'pic/P2T 2023/IMG_7832.JPG',
            'pic/P2T 2023/IMG_7826.JPG',
            'pic/P2T 2023/IMG_7830.JPG',
            'pic/P2T 2023/IMG_7824.JPG',
            'pic/P2T 2023/IMG_7825.JPG',
        ],
        'APAC table tennis': [
            'pic/APAC table tennis/DV9A0316.JPG',
            'pic/APAC table tennis/DV9A0300.JPG',
            'pic/APAC table tennis/DV9A0377.JPG',
            'pic/APAC table tennis/DV9A0433.JPG',
            'pic/APAC table tennis/DV9A0355.JPG',
            'pic/APAC table tennis/DV9A0391.JPG',
            'pic/APAC table tennis/DV9A0321.JPG',
        ],
        'dog rescue': [
            'pic/dog rescue/DSCF2396.JPG',
            'pic/dog rescue/DSCF2382.JPG',
            'pic/dog rescue/DSCF2381.JPG',
            'pic/dog rescue/IMG_5021.jpeg',
            'pic/dog rescue/DSCF2378.jpg',
            'pic/dog rescue/IMG_8170.JPG',
            'pic/dog rescue/IMG_8150.JPG',
            'pic/dog rescue/DSCF2371.jpg',
        ],
        'APAC band 2024': [
            'pic/APAC band 2024/IMG_2950.JPG',
            'pic/APAC band 2024/IMG_2945.JPG',
            'pic/APAC band 2024/IMG_3027.JPG',
            'pic/APAC band 2024/IMG_3023.JPG',
            'pic/APAC band 2024/IMG_2914.JPG',
            'pic/APAC band 2024/IMG_3016.JPG',
            'pic/APAC band 2024/IMG_2974.JPG',
        ],
        'ningxia': [
            'pic/ningxia/IMG_5308.jpeg',
            'pic/ningxia/IMG_5355.jpeg',
            'pic/ningxia/IMG_5249.jpeg',
            'pic/ningxia/IMG_5370.jpeg',
            'pic/ningxia/IMG_5311.jpeg',
        ],
        'honk (musical)': [
            'pic/honk (musical)/DV9A0921 (1).JPG',
            'pic/honk (musical)/DV9A0881.JPG',
            'pic/honk (musical)/DV9A1219.JPG',
            'pic/honk (musical)/DV9A0767.JPG',
            'pic/honk (musical)/DV9A1130.JPG',
            'pic/honk (musical)/DV9A1180 (1).JPG',
            'pic/honk (musical)/DV9A0963.JPG',
            'pic/honk (musical)/DV9A0785.JPG',
            'pic/honk (musical)/DV9A0884 (1).JPG',
            'pic/honk (musical)/DV9A1206 (1).JPG',
            'pic/honk (musical)/DV9A1321 (1).JPG',
            'pic/honk (musical)/DV9A0719.JPG',
            'pic/honk (musical)/DV9A1079 (1).JPG',
            'pic/honk (musical)/DV9A0897 (1).JPG',
            'pic/honk (musical)/DV9A0956 (1).JPG',
        ],
        'Passion ': [
            'pic/Passion /DV9A1546.JPG',
            'pic/Passion /DV9A1783.JPG',
            'pic/Passion /DV9A2261.JPG',
            'pic/Passion /DV9A1782.JPG',
            'pic/Passion /DV9A1531.JPG',
            'pic/Passion /DV9A2423.JPG',
            'pic/Passion /DV9A1701.JPG',
            'pic/Passion /DV9A2124.JPG',
            'pic/Passion /DV9A2050.JPG',
            'pic/Passion /DV9A1767.JPG',
            'pic/Passion /DV9A1606.JPG',
            'pic/Passion /DV9A1611.JPG',
            'pic/Passion /DV9A2269.JPG',
        ],
        'season one opening 2024': [
            'pic/season one opening 2024/DV9A3756.jpg',
            'pic/season one opening 2024/DV9A3959.JPG',
            'pic/season one opening 2024/DV9A3813.jpg',
            'pic/season one opening 2024/DV9A3751.jpg',
            'pic/season one opening 2024/DV9A3746.jpg',
            'pic/season one opening 2024/DV9A3800.jpg',
            'pic/season one opening 2024/DV9A3784.jpg',
            'pic/season one opening 2024/DV9A3790.jpg',
            'pic/season one opening 2024/DV9A3708.JPG',
            'pic/season one opening 2024/DV9A3709.jpg',
            'pic/season one opening 2024/DV9A3904.jpg',
            'pic/season one opening 2024/DV9A3858.jpg',
            'pic/season one opening 2024/DV9A3726.jpg',
            'pic/season one opening 2024/DV9A3874.jpg',
            'pic/season one opening 2024/DV9A3928.jpg',
            'pic/season one opening 2024/DV9A3692.jpg',
            'pic/season one opening 2024/DV9A3926.jpg',
            'pic/season one opening 2024/DV9A3701.JPG',
            'pic/season one opening 2024/DV9A3919.jpg',
            'pic/season one opening 2024/DV9A3707.jpg',
            'pic/season one opening 2024/DV9A3698.JPG',
            'pic/season one opening 2024/DV9A3869.jpg',
            'pic/season one opening 2024/DV9A3704.JPG',
            'pic/season one opening 2024/DV9A3665.jpg',
            'pic/season one opening 2024/DV9A4081.jpg',
            'pic/season one opening 2024/DV9A3777.jpg',
            'pic/season one opening 2024/DV9A3767.jpg',
            'pic/season one opening 2024/DV9A3983.JPG',
        ],
        'Boston': [
            'pic/Boston/IMG_3301.jpeg',
            'pic/Boston/IMG_3350.jpeg',
            'pic/Boston/IMG_3353.jpeg',
            'pic/Boston/IMG_3332.jpeg',
            'pic/Boston/IMG_3299.jpeg',
            'pic/Boston/IMG_3352.jpeg',
            'pic/Boston/IMG_3354.jpeg',
        ],
        'international fair 2023': [
            'pic/international fair 2023/IMG_7790.JPG',
            'pic/international fair 2023/IMG_7814.JPG',
            'pic/international fair 2023/IMG_7800.JPG',
            'pic/international fair 2023/IMG_7801.JPG',
            'pic/international fair 2023/IMG_7791.JPG',
            'pic/international fair 2023/IMG_7793.JPG',
            'pic/international fair 2023/IMG_7787.JPG',
            'pic/international fair 2023/IMG_7803.JPG',
            'pic/international fair 2023/IMG_7817.JPG',
            'pic/international fair 2023/IMG_7802.JPG',
            'pic/international fair 2023/IMG_7792.JPG',
            'pic/international fair 2023/IMG_7796.JPG',
            'pic/international fair 2023/IMG_7806.JPG',
            'pic/international fair 2023/IMG_7812.JPG',
            'pic/international fair 2023/IMG_7807.JPG',
            'pic/international fair 2023/IMG_7797.JPG',
            'pic/international fair 2023/IMG_2942 2.JPG',
            'pic/international fair 2023/IMG_2941.JPG',
            'pic/international fair 2023/IMG_7804.JPG',
            'pic/international fair 2023/IMG_7794.JPG',
            'pic/international fair 2023/IMG_2932.JPG',
            'pic/international fair 2023/IMG_3788.JPG',
            'pic/international fair 2023/IMG_7799.JPG',
            'pic/international fair 2023/IMG_7809.JPG',
            'pic/international fair 2023/IMG_7820.JPG',
            'pic/international fair 2023/IMG_7798.JPG',
            'pic/international fair 2023/IMG_7818.JPG',
            'pic/international fair 2023/IMG_7819.JPG',
            'pic/international fair 2023/IMG_7789.JPG',
        ],
        'Shanghai aquarium': [
            'pic/Shanghai aquarium/DV9A2738.JPG',
            'pic/Shanghai aquarium/DV9A2788.JPG',
            'pic/Shanghai aquarium/DV9A2777.JPG',
            'pic/Shanghai aquarium/DV9A2782.JPG',
            'pic/Shanghai aquarium/DV9A2791.JPG',
        ],
        'international fair 2024': [
            'pic/international fair 2024/DV9A3555.jpg',
            'pic/international fair 2024/DV9A3434.JPG',
            'pic/international fair 2024/DV9A3547.jpg',
            'pic/international fair 2024/DV9A3424.JPG',
            'pic/international fair 2024/DV9A3640.JPG',
            'pic/international fair 2024/DV9A3537.jpg',
            'pic/international fair 2024/DV9A3482.jpg',
            'pic/international fair 2024/DV9A3469.jpg',
            'pic/international fair 2024/DV9A3455.JPG',
            'pic/international fair 2024/DV9A3518.jpg',
            'pic/international fair 2024/DV9A3486.JPG',
            'pic/international fair 2024/DV9A3475.JPG',
            'pic/international fair 2024/DV9A3471.jpg',
            'pic/international fair 2024/DV9A3465.JPG',
            'pic/international fair 2024/DV9A3499.JPG',
            'pic/international fair 2024/DV9A3472.jpg',
            'pic/international fair 2024/DV9A3507.JPG',
            'pic/international fair 2024/DV9A3562.JPG',
            'pic/international fair 2024/DV9A3638.JPG',
            'pic/international fair 2024/DV9A3607.jpg',
            'pic/international fair 2024/DV9A3570.JPG',
        ],
        'street': [
            'pic/street/DSCF2343.JPG',
            'pic/street/IMG_0564.HEIC',
            'pic/street/DSCF1049.JPG',
            'pic/street/IMG_3177.jpeg',
            'pic/street/DSCF2336.JPG',
            'pic/street/DSCF2335.JPG',
            'pic/street/IMG_3079.jpeg',
            'pic/street/IMG_6914.jpeg',
            'pic/street/IMG_3216.jpeg',
            'pic/street/IMG_7022.jpeg',
            'pic/street/IMG_0564.jpeg',
            'pic/street/IMG_4086.jpeg',
            'pic/street/IMG_6947.jpeg',
        ],
        'turkey bowl': [
            'pic/turkey bowl/IMG_4503.JPG',
            'pic/turkey bowl/IMG_4473.JPG',
            'pic/turkey bowl/IMG_4410.JPG',
            'pic/turkey bowl/IMG_4599.JPG',
            'pic/turkey bowl/IMG_4409.JPG',
            'pic/turkey bowl/IMG_4424.JPG',
            'pic/turkey bowl/IMG_4455.JPG',
            'pic/turkey bowl/IMG_4736.JPG',
            'pic/turkey bowl/IMG_4508.JPG',
            'pic/turkey bowl/IMG_4683.JPG',
            'pic/turkey bowl/IMG_4532.JPG',
            'pic/turkey bowl/IMG_4478.JPG',
        ],
        'APAC volleyball': [
            'pic/APAC volleyball/DV9A4414.JPG',
            'pic/APAC volleyball/DV9A4400.JPG',
            'pic/APAC volleyball/DV9A4365.JPG',
            'pic/APAC volleyball/DV9A4758.JPG',
            'pic/APAC volleyball/DV9A4823.JPG',
            'pic/APAC volleyball/DV9A4639.JPG',
            'pic/APAC volleyball/DV9A4439.JPG',
            'pic/APAC volleyball/DV9A4411.JPG',
            'pic/APAC volleyball/DV9A5040.JPG',
            'pic/APAC volleyball/DV9A4982.JPG',
            'pic/APAC volleyball/DV9A4503.JPG',
            'pic/APAC volleyball/DV9A4488.JPG',
            'pic/APAC volleyball/DV9A4893.JPG',
            'pic/APAC volleyball/DV9A4459.JPG',
            'pic/APAC volleyball/DV9A5021.JPG',
            'pic/APAC volleyball/DV9A4896.JPG',
            'pic/APAC volleyball/DV9A4882.JPG',
            'pic/APAC volleyball/DV9A4906.JPG',
            'pic/APAC volleyball/DV9A4901.JPG',
            'pic/APAC volleyball/DV9A4917.JPG',
            'pic/APAC volleyball/DV9A4622.JPG',
            'pic/APAC volleyball/DV9A4391.JPG',
            'pic/APAC volleyball/DV9A4387.JPG',
            'pic/APAC volleyball/DV9A4635.JPG',
            'pic/APAC volleyball/DV9A4379.JPG',
            'pic/APAC volleyball/DV9A4999.JPG',
            'pic/APAC volleyball/DV9A4383.JPG',
        ],
        'APAC robotics': [
            'pic/APAC robotics/DV9A0229.JPG',
            'pic/APAC robotics/DV9A0200.JPG',
            'pic/APAC robotics/DV9A0174.JPG',
            'pic/APAC robotics/DV9A0148.JPG',
            'pic/APAC robotics/DV9A0217.JPG',
            'pic/APAC robotics/DV9A0159.JPG',
            'pic/APAC robotics/DV9A0212.JPG',
            'pic/APAC robotics/DV9A0220.JPG',
            'pic/APAC robotics/DV9A0180.JPG',
            'pic/APAC robotics/DV9A0153.JPG',
            'pic/APAC robotics/DV9A0243.JPG',
            'pic/APAC robotics/DV9A0241.JPG',
        ],
        'APAC season 1 kick- off': [
            'pic/APAC season 1 kick- off/DV9A3342.jpg',
            'pic/APAC season 1 kick- off/DV9A3287.jpg',
            'pic/APAC season 1 kick- off/DV9A3292.jpg',
            'pic/APAC season 1 kick- off/DV9A3280.jpg',
            'pic/APAC season 1 kick- off/DV9A3080.jpg',
            'pic/APAC season 1 kick- off/DV9A2942.jpg',
            'pic/APAC season 1 kick- off/DV9A2981.jpg',
            'pic/APAC season 1 kick- off/DV9A3335.jpg',
            'pic/APAC season 1 kick- off/DV9A3123.jpg',
            'pic/APAC season 1 kick- off/DV9A2957.jpg',
            'pic/APAC season 1 kick- off/DV9A3099.jpg',
            'pic/APAC season 1 kick- off/DV9A2965.jpg',
            'pic/APAC season 1 kick- off/DV9A3110.jpg',
            'pic/APAC season 1 kick- off/DV9A3298.jpg',
            'pic/APAC season 1 kick- off/DV9A3076.JPG',
            'pic/APAC season 1 kick- off/DV9A3274.JPG',
            'pic/APAC season 1 kick- off/DV9A3300.jpg',
            'pic/APAC season 1 kick- off/DV9A3315.jpg',
            'pic/APAC season 1 kick- off/DV9A3212.jpg',
            'pic/APAC season 1 kick- off/DV9A3148.jpg',
            'pic/APAC season 1 kick- off/DV9A2929.jpg',
        ]
    };

    let photographySlideIndex = 0;
    let photographyImages = [];

    // Open photography slideshow for a specific project
    window.openPhotographySlideshow = function(projectName) {
        // Check if project images exist for the given project name
        if (projectImages[projectName]) {
            photographyImages = projectImages[projectName];
            photographySlideIndex = 0;
            displayPhotographySlide(photographySlideIndex);
            document.getElementById("photographyModal").style.display = "flex";
        } else {
            console.error(`Project "${projectName}" does not exist in projectImages.`);
        }
    };

    // Close the photography slideshow
    window.closePhotographySlideshow = function() {
        document.getElementById("photographyModal").style.display = "none";
    };

    // Change the current slide in the photography slideshow
    window.changePhotographySlide = function(direction) {
        photographySlideIndex = (photographySlideIndex + direction + photographyImages.length) % photographyImages.length;
        displayPhotographySlide(photographySlideIndex);
    };

    // Display the current slide based on the index
    function displayPhotographySlide(index) {
        document.getElementById("photographySlideshowImage").src = photographyImages[index];
    }


    // Open Portfolio PDF in Modal
    function openPortfolio(pdfFile) {
        document.getElementById("portfolioFrame").src = pdfFile;
        document.getElementById("portfolioModal").style.display = "flex";
        document.body.classList.add("modal-open");
    }

    function closePortfolio() {
        document.getElementById("portfolioModal").style.display = "none";
        document.getElementById("portfolioFrame").src = "";
        document.body.classList.remove("modal-open");
    }

    // Video Modal Controls
    function openVideoModal() {
        document.getElementById("videoModal").style.display = "flex";
        const video = document.getElementById("modalVideo");
        video.play();
    }

    function closeVideoModal() {
        const video = document.getElementById("modalVideo");
        video.pause();
        video.currentTime = 0;
        document.getElementById("videoModal").style.display = "none";
    }

    // Expose open and close functions to the global scope if needed
    window.openPortfolio = openPortfolio;
    window.closePortfolio = closePortfolio;
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
});