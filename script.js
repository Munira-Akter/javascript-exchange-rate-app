// Get all needed selector tag
let currency_one = document.getElementById("currency-one");
let currency_two = document.getElementById("currency-two");
let swap = document.getElementById("swap");
let rate = document.getElementById("rate");
let amount_two = document.getElementById("amount-two");
let amount_one = document.getElementById("amount-one");

function rateFunction() {
    let value_one = currency_one.value;
    let value_two = currency_two.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${value_one}`)
        .then((currency_api) => currency_api.json())
        .then((json_conen) => {
            rate.innerHTML = `1 ${value_one} = ${json_conen.rates[value_two]} ${value_two}`;

            amount_two.value = (
                amount_one.value * json_conen.rates[value_two]
            ).toFixed(2);
        });
}

let swaprate = () => {
    const newval = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = newval;
    rateFunction();
};

currency_one.onchange = rateFunction;
currency_two.onchange = rateFunction;
amount_two.addEventListener("input", rateFunction);
amount_one.addEventListener("input", rateFunction);
swap.onclick = swaprate;