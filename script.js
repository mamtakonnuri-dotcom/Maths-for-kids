/* =========================================
   MATHS PLAYLAND
   Interactive Maths Playground
   For 1st - 3rd Standard
========================================= */

let score = 0;
let currentActivity = "";


/* ==============================
   SCREEN CONTROL
============================== */

function hidePages() {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
}

function goHome() {
    hidePages();
    document.getElementById("home").classList.add("active");
}

function showActivities() {
    hidePages();
    document.getElementById("activities").classList.add("active");
}

function showPlayground() {
    hidePages();
    document.getElementById("playground").classList.add("active");
}


/* ==============================
   START ACTIVITY
============================== */

function startActivity(activity) {

    currentActivity = activity;

    score = 0;

    document.getElementById("score").textContent = score;

    showPlayground();

    const area = document.getElementById("playArea");

    area.innerHTML = "";

    document.getElementById("message").textContent = "";

    runActivity(activity);
}


/* ==============================
   ACTIVITY SELECTOR
============================== */

function runActivity(activity) {

    switch(activity) {

        case "chocolate":
            chocolateCollector();
            break;

        case "apple":
            appleBasket();
            break;

        case "balloon":
            balloonPop();
            break;

        case "cookie":
            cookieMonster();
            break;

        case "groups":
            equalGroups();
            break;

        case "pizza":
            pizzaMaker();
            break;

        case "sharing":
            fairSharing();
            break;

        case "bunny":
            bunnyCarrots();
            break;

        case "numberline":
            numberLine();
            break;

        case "fishing":
            numberFishing();
            break;

        case "pattern":
            patternTrain();
            break;

        case "sorting":
            sortingGame();
            break;

        case "scale":
            balanceScale();
            break;

        case "blocks":
            buildNumber();
            break;
    }
}


/* ==============================
   1. CHOCOLATE COLLECTOR
============================== */

function chocolateCollector() {

    const a = random(2,5);
    const b = random(2,5);

    document.getElementById("activityTitle").textContent =
        "🍫 Chocolate Collector";

    document.getElementById("instruction").textContent =
        `Help the girl collect ${a} chocolates first!`;

    const area = document.getElementById("playArea");

    area.innerHTML = `
        <div style="text-align:center;font-size:6rem">👧</div>

        <div class="object-row" id="chocolates"></div>

        <div class="basket" id="basket">
            🧺
        </div>

        <p style="text-align:center;font-size:1.2rem">
            🍫 Collected: <span id="count">0</span>
        </p>
    `;

    const container = document.getElementById("chocolates");

    for(let i=0;i<a;i++) {

        const chocolate = document.createElement("div");

        chocolate.className = "object";

        chocolate.textContent = "🍫";

        chocolate.draggable = true;

        chocolate.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", chocolate.id);
        });

        chocolate.id = "choco" + i;

        container.appendChild(chocolate);
    }

    const basket = document.getElementById("basket");

    basket.addEventListener("dragover", e => {
        e.preventDefault();
        basket.classList.add("drag-over");
    });

    basket.addEventListener("dragleave", () => {
        basket.classList.remove("drag-over");
    });

    basket.addEventListener("drop", e => {

        e.preventDefault();

        basket.classList.remove("drag-over");

        const id = e.dataTransfer.getData("text");

        const item = document.getElementById(id);

        if(item) {

            item.classList.add("collected");

            setTimeout(() => item.remove(),400);

            const count =
                document.getElementById("count");

            count.textContent =
                Number(count.textContent) + 1;

            if(Number(count.textContent) === a) {

                setTimeout(() => {

                    additionSecondRound(b);

                },600);
            }
        }
    });
}


function additionSecondRound(b) {

    document.getElementById("instruction").textContent =
        `Great! 🎉 Now collect ${b} more chocolates!`;

    const container =
        document.getElementById("chocolates");

    for(let i=0;i<b;i++) {

        const chocolate =
            document.createElement("div");

        chocolate.className = "object";

        chocolate.textContent = "🍫";

        chocolate.draggable = true;

        chocolate.id =
            "extra" + i;

        chocolate.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", chocolate.id);
        });

        container.appendChild(chocolate);
    }

    const basket =
        document.getElementById("basket");

    basket.ondrop = function(e) {

        e.preventDefault();

        const id =
            e.dataTransfer.getData("text");

        const item =
            document.getElementById(id);

        if(item) {

            item.classList.add("collected");

            setTimeout(() => item.remove(),400);

            const count =
                document.getElementById("count");

            count.textContent =
                Number(count.textContent) + 1;

            if(Number(count.textContent) ===
               document.querySelectorAll(".object").length + Number(count.textContent)) {
            }

            const remaining =
                document.querySelectorAll(".object").length;

            if(remaining === 0) {

                celebrate(
                    `🍫 Amazing! You collected ${Number(count.textContent)} chocolates!`
                );

                score += 10;

                updateScore();
            }
        }
    };
}


/* ==============================
   2. APPLE BASKET
============================== */

function appleBasket() {

    const apples = random(5,9);

    document.getElementById("activityTitle").textContent =
        "🍎 Apple Basket";

    document.getElementById("instruction").textContent =
        `Drag all ${apples} apples into the basket!`;

    const area =
        document.getElementById("playArea");

    area.innerHTML = `
        <div style="text-align:center;font-size:6rem">
            🌳
        </div>

        <div class="object-row" id="appleObjects"></div>

        <div class="basket" id="appleBasket">
            🧺
        </div>

        <p style="text-align:center">
            Apples collected:
            <b id="appleCount">0</b>
        </p>
    `;

    const objects =
        document.getElementById("appleObjects");

    for(let i=0;i<apples;i++) {

        const apple =
            document.createElement("div");

        apple.className = "object";

        apple.textContent = "🍎";

        apple.draggable = true;

        apple.id = "apple" + i;

        apple.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", apple.id);
        });

        objects.appendChild(apple);
    }

    setupBasket(
        "appleBasket",
        "appleCount",
        apples,
        "🍎"
    );
}


/* ==============================
   GENERIC BASKET
============================== */

function setupBasket(
    basketId,
    countId,
    total,
    emoji
) {

    const basket =
        document.getElementById(basketId);

    basket.addEventListener("dragover", e => {
        e.preventDefault();
        basket.classList.add("drag-over");
    });

    basket.addEventListener("dragleave", () => {
        basket.classList.remove("drag-over");
    });

    basket.addEventListener("drop", e => {

        e.preventDefault();

        basket.classList.remove("drag-over");

        const id =
            e.dataTransfer.getData("text");

        const item =
            document.getElementById(id);

        if(!item) return;

        item.remove();

        const count =
            document.getElementById(countId);

        count.textContent =
            Number(count.textContent) + 1;

        if(Number(count.textContent) === total) {

            celebrate(
                `${emoji} You collected all ${total} objects!`
            );

            score += 10;

            updateScore();
        }
    });
}


/* ==============================
   3. BALLOON POP
============================== */

function balloonPop() {

    const total = random(6,10);

    const remove = random(2,4);

    document.getElementById("activityTitle").textContent =
        "🎈 Balloon Pop";

    document.getElementById("instruction").textContent =
        `There are ${total} balloons! Pop ${remove} balloons.`;

    const area =
        document.getElementById("playArea");

    area.innerHTML = `
        <div class="balloon-area" id="balloonArea"></div>

        <h2 style="text-align:center">
            🎈 Balloons left:
            <span id="balloonCount">${total}</span>
        </h2>
    `;

    const balloonArea =
        document.getElementById("balloonArea");

    for(let i=0;i<total;i++) {

        const balloon =
            document.createElement("div");

        balloon.className = "balloon";

        balloon.textContent =
            ["🎈","🎈","🎈","🎈"][i % 4];

        balloon.onclick = function() {

            if(balloon.classList.contains("pop"))
                return;

            balloon.classList.add("pop");

            setTimeout(() => {
                balloon.remove();

                const count =
                    document.getElementById("balloonCount");

                count.textContent =
                    Number(count.textContent) - 1;

                const popped =
                    total -
                    Number(count.textContent);

                if(popped === remove) {

                    celebrate(
                        `🎈 Great! ${Number(count.textContent)} balloons are left!`
                    );

                    score += 10;

                    updateScore();
                }
            },300);
        };

        balloonArea.appendChild(balloon);
    }
}


/* ==============================
   4. COOKIE MONSTER
============================== */

function cookieMonster() {

    const total = 10;
    const eat = random(2,5);

    document.getElementById("activityTitle").textContent =
        "🍪 Cookie Monster";

    document.getElementById("instruction").textContent =
        `The monster has ${total} cookies. Click ${eat} cookies to feed him!`;

    const area =
        document.getElementById("playArea");

    area.innerHTML = `
        <div style="text-align:center;font-size:7rem">
            😋
        </div>

        <div class="object-row" id="cookies"></div>

        <h2>
            Cookies left:
            <span id="cookieCount">${total}</span>
        </h2>
    `;

    const cookies =
        document.getElementById("cookies");

    for(let i=0;i<total;i++) {

        const cookie =
            document.createElement("div");

        cookie.className = "object";

        cookie.textContent = "🍪";

        cookie.onclick = function() {

            if(cookie.classList.contains("collected"))
                return;

            cookie.classList.add("collected");

            setTimeout(() => {

                cookie.remove();

                const count =
                    document.getElementById("cookieCount");

                count.textContent =
                    Number(count.textContent) - 1;

                const eaten =
                    total -
                    Number(count.textContent);

                if(eaten === eat) {

                    celebrate(
                        `🍪 Yummy! ${Number(count.textContent)} cookies are left!`
                    );

                    score += 10;

                    updateScore();
                }

            },300);
        };

        cookies.appendChild(cookie);
    }
}


/* ==============================
   5. EQUAL GROUPS
============================== */

function equalGroups() {

    const groups = random(2,4);
    const each = random(2,5);

    document.getElementById("activityTitle").textContent =
        "📦 Equal Groups";

    document.getElementById("instruction").textContent =
        `Make ${groups} groups with ${each} objects in each group.`;

    const area =
        document.getElementById("playArea");

    area.innerHTML = `
        <h2 style="text-align:center">
            ✖️ ${groups} groups × ${each} objects
        </h2>

        <div class="groups" id="groups"></div>

        <div class="object-row" id="groupObjects"></div>
    `;

    const groupsArea =
        document.getElementById("groups");

    for(let i=0;i<groups;i++) {

        const group =
            document.createElement("div");

        group.className = "group";

        group.innerHTML =
            `<div class="group-title">
                Group ${i+1}
             </div>`;

        group.addEventListener("dragover", e => {
            e.preventDefault();
        });

        group.addEventListener("drop", e => {

            e.preventDefault();

            const id =
                e.dataTransfer.getData("text");

            const item =
                document.getElementById(id);

            if(!item) return;

            if(group.querySelectorAll(".group-item").length >= each)
                return;

            item.classList.add("group-item");

            group.appendChild(item);

            checkGroups(groups,each);
        });

        groupsArea.appendChild(group);
    }

    const objects =
        document.getElementById("groupObjects");

    for(let i=0;i<groups*each;i++) {

        const item =
            document.createElement("div");

        item.className = "object";

        item.textContent = "⭐";

        item.draggable = true;

        item.id = "groupItem" + i;

        item.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", item.id);
        });

        objects.appendChild(item);
    }
}


function checkGroups(groups,each) {

    const all =
        document.querySelectorAll(".group");

    let complete = true;

    all.forEach(group => {

        if(group.querySelectorAll(".group-item").length !== each) {
            complete = false;
        }
    });

    if(complete) {

        celebrate(
            `🌟 Perfect! ${groups} groups of ${each}!`
        );

        score += 15;

        updateScore();
    }
}


/* ==============================
   6. PIZZA MAKER
============================== */

function pizzaMaker() {

    const pizzas = 3;
    const slices = 4;

    document.getElementById("activityTitle").textContent =
        "🍕 Pizza Maker";

    document.getElementById("instruction").textContent =
        `Put ${slices} slices on each pizza!`;

    const area =
        document.getElementById("playArea");

    area.innerHTML = `
        <div class="groups" id="pizzaGroups"></div>

        <div class="object-row" id="pizzaSlices"></div>
    `;

    const groups =
        document.getElementById("pizzaGroups");

    for(let i=0;i<pizzas;i++) {

        const pizza =
            document.createElement("div");

        pizza.className = "group";

        pizza.innerHTML =
            `<div class="group-title">
                🍕 Pizza ${i+1}
            </div>`;

        pizza.addEventListener("dragover", e => {
            e.preventDefault();
        });

        pizza.addEventListener("drop", e => {

            e.preventDefault();

            const id =
                e.dataTransfer.getData("text");

            const slice =
                document.getElementById(id);

            if(!slice) return;

            if(pizza.querySelectorAll(".pizza-item").length >= slices)
                return;

            slice.classList.add("pizza-item");

            pizza.appendChild(slice);

            checkPizza(pizzas,slices);
        });

        groups.appendChild(pizza);
    }

    const slicesArea =
        document.getElementById("pizzaSlices");

    for(let i=0;i<pizzas*slices;i++) {

        const slice =
            document.createElement("div");

        slice.className = "object";

        slice.textContent = "🍕";

        slice.draggable = true;

        slice.id = "slice" + i;

        slice.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text",slice.id);
        });

        slicesArea.appendChild(slice);
    }
}


function checkPizza(pizzas,slices) {

    let complete = true;

    document.querySelectorAll(".group").forEach(group => {

        if(group.querySelectorAll(".pizza-item").length !== slices) {
            complete = false;
        }
    });

    if(complete) {

        celebrate(
            `🍕 Amazing! ${pizzas} × ${slices} = ${pizzas*slices}`
        );

        score += 15;

        updateScore();
    }
}


/* ==============================
   7. FAIR SHARING
============================== */

function fairSharing() {

    const children = 3;
    const candies = 12;

    document.getElementById("activityTitle").textContent =
        "🍬 Fair Sharing";

    document.getElementById("instruction").textContent =
        `Share ${candies} candies equally among ${children} children.`;

    const area =
        document.getElementById("playArea");

    area.innerHTML = `
        <div class="groups" id="children"></div>

        <div class="object-row" id="candies"></div>
    `;

    const childArea =
        document.getElementById("children");

    for(let i=0;i<children;i++) {

        const child =
            document.createElement("div");

        child.className = "group";

        child.dataset.count = "0";

        child.innerHTML =
            `<div class="group-title">
                ${["👧","👦","👧"][i]}
                <br>
                Basket: <span>0</span>
            </div>`;

        child.addEventListener("dragover", e => {
            e.preventDefault();
        });

        child.addEventListener("drop", e => {

            e.preventDefault();

            const id =
                e.dataTransfer.getData("text");

            const candy =
                document.getElementById(id);

            if(!candy) return;

            const count =
                Number(child.dataset.count);

            if(count >= 4) return;

            child.dataset.count =
                count + 1;

            child.querySelector("span").textContent =
                count + 1;

            candy.remove();

            checkSharing();
        });

        childArea.appendChild(child);
    }

    const candyArea =
        document.getElementById("candies");

    for(let i=0;i<candies;i++) {

        const candy =
            document.createElement("div");

        candy.className = "object";

        candy.textContent = "🍬";

        candy.draggable = true;

        candy.id = "candy" + i;

        candy.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text",candy.id);
        });

        candyArea.appendChild(candy);
    }
}


function checkSharing() {

    const groups =
        document.querySelectorAll("#children .group");

    let correct = true;

    groups.forEach(group => {

        if(Number(group.dataset.count) !== 4) {
            correct = false;
        }
    });

    if(correct) {

        celebrate(
            "🎉 Perfect sharing! 12 ÷ 3 = 4"
        );

        score += 20;

        updateScore();
    }
}


/* ==============================
   8. BUNNY CARROTS
=============