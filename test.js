let menButton = document.getElementById("men");
let womenButton = document.getElementById("women");
let kidsButton = document.getElementById("kids");

let productsListElement = document.getElementById("productsList");
let tab = "Men";

let url = ' https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
let options = {
    methon: "GET"
};
const productCard = function(item) {
    let {
        badge_text,
        compare_at_price,
        image,
        price,
        title,
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
    listItem.appendChild(cartButtonEl);



    productsListElement.appendChild(listItem);
}
const getProduct = function(data) {
    for (let item of data) {
        productCard(item);
    }
}
const doNetworkCall = async () => {
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const data = jsonData.categories;
    if (response.status === 200) {
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