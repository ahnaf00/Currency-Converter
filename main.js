const select    = document.querySelectorAll("select")
const input1    = document.querySelector("#num")
const input2    = document.querySelector("#ans")
const btn       = document.querySelector("#btn")
const alertMessage = document.querySelector("#alertMessage")
// console.log(input1.value)
// console.log(input2.value)

function display(response)
    {
        const entries = Object.entries(response)
        for(let i = 0; i<entries.length; i++)
        {
            select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
            select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
        }
    }

fetch("https://api.frankfurter.app/currencies")
    .then((response) => response.json())
    .then((response) =>{
        display(response)
    })

    

function convert(currency1, currency2, value)
{
    const host = "api.frankfurter.app"
    fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
        .then((val) => val.json())
        .then((val)=>{
            // console.log(Object.values(val.rates)[0])
            input2.value = Object.values(val.rates)[0]
        })
}
function hideMessage()
{
    const newMessageElm = document.querySelector("#message")
    setTimeout(() => {
        newMessageElm.remove()
    }, 2000);
}
function showMessage(msg)
{
    const elm = `<div class='alert alert-danger' id='message'>${msg}</div>`
    alertMessage.insertAdjacentHTML("afterBegin", elm)
    hideMessage()
}
function validateInput(currency1, currency2, value)
{
    if( currency1 === "" || currency2 === "" || value === "")
    {
        showMessage("Please Select Necessary Information")
        return true
    }else if( currency1 ===  currency2 ){
        showMessage("Select Different Currency")
        return true
    }else{
        convert(currency1, currency2, value)            
        return false
    }   
}
function getInputValues()
{
    let currency1 = select[0].value
    let currency2 = select[1].value
    // console.log(currency1, currency2)
    let value = input1.value
    // console.log(value)
    const isInValid = validateInput( currency1, currency2, value)
    // console.log(isInValid)
    if( isInValid ) return 
    return {
        currency1, currency2, value
    }
    // convert(currency1, currency2, value)      

}

btn.addEventListener("click", () =>{
    getInputValues()
})

    
