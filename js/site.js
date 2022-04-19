// Button event listener

document.getElementById("btnSubmit").addEventListener("click", getValues)

// Controller Function
function getValues(){

    let loanAmount = document.getElementById("loanAmount").value;
    let loanLength = document.getElementById("loanLength").value;
    let interestRate = document.getElementById("interestRate").value;

    loanAmount = parseInt(loanAmount);
    loanLength = parseInt(loanLength);
    interestRate = parseInt(interestRate);
    
    if(Number.isInteger(loanAmount) && Number.isInteger(loanLength) && Number.isInteger(interestRate)){
        
        let values = new Object();
        values = generatePayments(loanAmount, loanLength, interestRate);
        displayNumbers(values.tableArray, values.totalInterest, values.paymentAmount, loanAmount);


    }else{
        alert("You must enter Integer Values!")
    }
}

// logic function
function generatePayments(loanAmount, loanLength, interestRate){
    tableArray = [];

    let paymentAmount = (loanAmount * (interestRate/1200)) / (1 - ( 1 + (interestRate/1200))**-loanLength)
    let totalInterest = 0;

    // alert(paymentAmount.toFixed(2));

    for (let index = 0; index < loanLength; index++) {
        month = index + 1;
        interest = loanAmount * interestRate / 1200;
        totalInterest += interest;
        principal = paymentAmount - interest;

        tableRow = `<td class="row">${month}</td>
                    <td>${paymentAmount.toFixed(2)}</td>
                    <td>${principal.toFixed(2)}</td>
                    <td>${interest.toFixed(2)}</td>
                    <td>${totalInterest.toFixed(2)}</td>
                    <td>${loanAmount.toFixed(2)}</td>`;
    
        tableArray.push(tableRow);
        loanAmount -= principal;
    }
    return {
        tableArray,
        totalInterest,
        paymentAmount
    };

}

// display function
function displayNumbers(tableArray, totalInterest, paymentAmount, loanAmount){

    totalCost = loanAmount + totalInterest;

    let s = (/\B(?=(\d{3})+(?!\d))/g)

    document.getElementById("monthlyPayments").innerHTML = `$${paymentAmount.toFixed(2).toString().replace(s, ",")}`;
    document.getElementById("totalPrincipal").innerHTML = `$${loanAmount.toFixed(2).toString().replace(s, ",")}`;
    document.getElementById("totalInterest").innerHTML = `$${totalInterest.toFixed(2).toString().replace(s, ",")}`;
    document.getElementById("totalCost").innerHTML = `$${totalCost.toFixed(2).toString().replace(s, ",")}`;

    tableBody = document.getElementById("tableBody")


    for (let index = 0; index < tableArray.length; index++) {
        tableBody.innerHTML += tableArray[index]
        
    }
}
