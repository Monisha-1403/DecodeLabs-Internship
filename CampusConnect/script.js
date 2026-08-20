const searchInput = document.getElementById("searchInput");
const eventCards = document.querySelectorAll(".event-card");
const filters = document.querySelectorAll(".filter");
const detailButtons = document.querySelectorAll(".details-button");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    eventCards.forEach(function (card) {

        const eventName = card.querySelector("h3").textContent.toLowerCase();

        if (eventName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        filters.forEach(function (button) {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.textContent.toLowerCase();

        eventCards.forEach(function (card) {

            if (category === "all") {
                card.style.display = "block";
            } else {

                const eventType = card.dataset.type;

                if (eventType === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            }

        });

    });

});

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card = button.parentElement;

        const title = card.querySelector("h3").textContent;
        const date = card.querySelector(".event-date").textContent;
        const description = card.querySelector("p:nth-of-type(2)").textContent;

        alert(
            title + "\n\n" +
            "Date: " + date + "\n\n" +
            description
        );

    });

});
