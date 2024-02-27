let menButton = document.getElementById("men");
let womenButton = document.getElementById("women");
let kidsButton = document.getElementById("kids");
let productsListElement = document.getElementById("productsList");
let productsListElement2 = document.getElementById("productsList2");
let count = document.getElementById("count");
let cart = document.getElementById("cart");
let main = document.getElementById("main");
let con = document.getElementById("con");
let homeBtn = document.getElementById("homeBtn");
let cartProducts = document.getElementById("cartProducts");
let total = document.getElementById("total");
let countOfItems = document.getElementById("countOfItems");

let cartOpen = false;

let cartProIdList = [];
homeBtn.onclick = function() {
    con.classList.add("display-containers");
    main.classList.remove("display-containers");
    cartOpen = false;
}

cart.onclick = function() {
    productsListElement2.textContent = '';
    con.classList.remove("display-containers");
    main.classList.add("display-containers");
    cartOpen = true;
    doNetworkCall();
}
let url = ' https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
let options = {
    methon: "GET"
};

let tab = "Men";
const productCard = function(item) {
    let {
        badge_text,
        compare_at_price,
        image,
        price,
        title,
        id,
        vendor
    } = item;

    let listItem = document.createElement("li");
    listItem.classList.add("list-item");

    let imgContainer = document.createElement("div");
    imgContainer.style.backgroundImage = `url(${image})`;
    imgContainer.classList.add("img-container");
    listItem.appendChild(imgContainer);

    if (badge_text !== null) {
        let tag = document.createElement("p");
        tag.textContent = badge_text;
        imgContainer.appendChild(tag);
        tag.classList.add("tag");
    }

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    listItem.appendChild(titleContainer);

    let titleEl = document.createElement("p");
    titleEl.textContent = title;
    titleEl.classList.add("title");
    titleContainer.appendChild(titleEl);

    let labelEl = document.createElement("p");
    labelEl.classList.add("label");
    labelEl.textContent = "• " + vendor;
    titleContainer.appendChild(labelEl);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("title-container");
    listItem.appendChild(priceContainer);

    let priceEl = document.createElement("p");
    priceEl.classList.add("price");
    priceEl.textContent = "Rs " + price;
    priceContainer.appendChild(priceEl);

    let comparePriceEl = document.createElement("p");
    comparePriceEl.classList.add("compare-price");
    comparePriceEl.textContent = " " + compare_at_price;
    priceContainer.appendChild(comparePriceEl);

    let percentageOffEl = document.createElement("p");
    percentageOffEl.classList.add("persentage-off");
    let change = compare_at_price - price;
    let persentage = Math.round((change / compare_at_price) * 100);
    percentageOffEl.textContent = `${persentage}% off`;
    priceContainer.appendChild(percentageOffEl);

    let cartButtonEl = document.createElement("button");
    cartButtonEl.textContent = "Add to Cart";
    cartButtonEl.classList.add("cart-button");
    cartButtonEl.setAttribute("id", id);
    cartButtonEl.addEventListener('click', function(Event) {
        let initCount = count.textContent;
        count.textContent = Number(initCount) + 1;
        cartProIdList.push(id);
    });
    if (cartOpen) {
        productsListElement2.appendChild(listItem);
        total.textContent = Number(total.textContent) + Number(price);
    } else {
        listItem.appendChild(cartButtonEl);
        productsListElement.appendChild(listItem);
    }
}
const getCartProducts = function(data) {
    for (let i of data) {
        for (let j of i.category_products) {
            if (cartProIdList.includes(j.id)) {
                productCard(j);
            }
        }
    }
}
const getProduct = function(data) {
    for (let item of data) {
        productCard(item);
    }
};
const doNetworkCall = async () => {
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const data = jsonData.categories;
    if (response.status === 200) {

        if (cartOpen) {
            getCartProducts(data)
        } else {
            switch (tab) {
                case "Men":
                    getProduct(data[0].category_products);
                    break;
                case "Women":
                    getProduct(data[1].category_products);
                    break;
                case "Kids":
                    getProduct(data[2].category_products);
                    break;
            }
        }

    } else {
        productsListElement.textContent = `SOMETHING WENT WRONG!`;
    }


};
menButton.classList.add("highlight-button");
doNetworkCall();

menButton.onclick = function() {
    menButton.classList.add("highlight-button");
    womenButton.classList.remove("highlight-button");
    kidsButton.classList.remove("highlight-button");
    productsListElement.textContent = "";
    tab = "Men";
    doNetworkCall();
};

womenButton.onclick = function() {
    menButton.classList.remove("highlight-button");
    womenButton.classList.add("highlight-button");
    kidsButton.classList.remove("highlight-button");
    productsListElement.textContent = "";
    tab = "Women";
    doNetworkCall();
};

kidsButton.onclick = function() {
    menButton.classList.remove("highlight-button");
    womenButton.classList.remove("highlight-button");
    kidsButton.classList.add("highlight-button");
    productsListElement.textContent = "";
    tab = "Kids";
    doNetworkCall();
};
