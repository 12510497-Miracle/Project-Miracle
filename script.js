
document.addEventListener("DOMContentLoaded", function () {

    // LOADING ANIMATION
    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                loader.classList.add("hide");
            }, 500);
        });

        setTimeout(function () {
            loader.classList.add("hide");
        }, 3000);
    }

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    // HERO SLIDER
    const slides = document.querySelectorAll(".hero-slide");
    const dotsContainer = document.getElementById("sliderDots");
    const nextButton = document.getElementById("nextSlide");
    const prevButton = document.getElementById("prevSlide");

    if (slides.length > 0) {
        let currentSlide = 0;
        let sliderInterval;

        function showSlide(index) {
            slides[currentSlide].classList.remove("active");

            if (dotsContainer) {
                dotsContainer.children[currentSlide]?.classList.remove("active");
            }

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add("active");

            if (dotsContainer) {
                dotsContainer.children[currentSlide]?.classList.add("active");
            }
        }

        function startSlider() {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        if (dotsContainer) {
            slides.forEach(function (_, index) {
                const dot = document.createElement("button");
                dot.className = "slider-dot" + (index === 0 ? " active" : "");
                dot.setAttribute("aria-label", "Tampilkan slide " + (index + 1));

                dot.addEventListener("click", function () {
                    showSlide(index);
                    startSlider();
                });

                dotsContainer.appendChild(dot);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                showSlide(currentSlide + 1);
                startSlider();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                showSlide(currentSlide - 1);
                startSlider();
            });
        }

        startSlider();
    }

    // MENU FILTER
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            menuItems.forEach(function (item) {
                if (filter === "all" || item.dataset.category === filter) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    // ORDER CONFIRMATION
    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("customerName").value.trim();
            const phone = document.getElementById("customerPhone").value.trim();
            const product = document.getElementById("productSelect").value;
            const quantity = document.getElementById("quantity").value;
            const notes = document.getElementById("notes").value.trim();

            if (!name || !phone || !product || Number(quantity) < 1) {
                alert("Mohon lengkapi data pesanan.");
                return;
            }

            const message =
                "Pesanan telah diterima!\n\n" +
                "Nama: " + name + "\n" +
                "Menu: " + product + "\n" +
                "Jumlah: " + quantity + "\n" +
                "Catatan: " + (notes || "-") + "\n\n" +
                "Terima kasih telah memesan di GOODSPEED Coffee & More!";

            alert(message);
            orderForm.reset();
        });
    }

});
