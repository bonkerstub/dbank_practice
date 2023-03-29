import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
    // console.log("Finished loading");
    const currentAmount = (Math.round((await dbank.checkBalance()) * 100) / 100);
    document.getElementById("value").innerText = currentAmount
});

document.querySelector("form").addEventListener("submit", async function (event) {
    
    // Prevent reloading
    event.preventDefault();
    console.log("submit action");
    
    // disable button
    //document.getElementById("submit-btn").setAttribute("disabled", "");
    event.target.querySelector("#submit-btn").setAttribute("disabled", "")

    // check add and withdraw amounts
    const add = parseInt(document.getElementById("input-amount").value);
    const withdraw = parseInt(document.getElementById("withdrawal-amount").value);
    console.log(add);
    console.log(withdraw);
    if (document.getElementById("withdrawal-amount").value.length !== 0) {
        await dbank.withdraw(withdraw);

    }

    if (document.getElementById("input-amount").value.length !== 0) {
        await dbank.topUp(add);
    }

    await dbank.compound();
    const currentAmount = (Math.round((await dbank.checkBalance()) * 100) / 100);
    document.getElementById("value").innerText = currentAmount
    
    // enable button
    // document.getElementById("submit-btn").removeAttribute("disabled");
    event.target.querySelector("#submit-btn").removeAttribute("disabled", "")

    document.getElementById("input-amount").value = ""
    document.getElementById("withdrawal-amount").value
});