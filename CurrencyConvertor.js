const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const convertBtn=document.querySelector("button");

const FromCurr=document.querySelector(".From select");
const ToCurr=document.querySelector(".To select");

const msg=document.querySelector(".result");
//Or
const F=document.querySelector("#s1");
const contry1=document.querySelector("#f");
const T=document.querySelector("#s2");
const contry2=document.querySelector("#t");
//





function updateFlag(element){
    let currCode=element.value;
   // console.log(currCode);
    
    let countryCode=countryList[currCode];
   // console.log(countryCode);

    let imgTag=element.parentNode.querySelector("img");
    let flagOf=countryCode;
    let flagSrc=`https://flagsapi.com/${flagOf}/flat/64.png`;
    imgTag.src=flagSrc;

}


//program starts
for(let select of dropdowns){

    for (let currency in countryList) {
        // console.log(currency, countryList[currency]);

        let newOption = document.createElement("option");
        newOption.innerText = currency;
        newOption.value = currency;

        if(select.name==="from" && currency==="USD"){
            newOption.selected="selected";
        }else if(select.name==="To" && currency==="INR"){
            newOption.selected="selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
       // console.log(evt.target);
        updateFlag(evt.target);//function call  
    });

}

convertBtn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//because by default page refreshes if form button is clicked
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if (amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value=1;
    }
       
    console.log("From",FromCurr.value,"To",ToCurr.value);
    const url= `${baseURL}/${FromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;

    // try{
        
        let response=await fetch(url);
        console.log(response);
        if (response.status===404) document.body.innerText="ERROR Occured 404"
    // }catch(err){
    //     console.log(err);
    //     document.body.innerText="ERROR occured 404"
    // }
    
    let data=await response.json();
   // console.log(data);

    // let keyArr=Object.keys(data);
    // console.log(keyArr[1]);
    let rate=data[ToCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount=amountVal*rate;

   // msg.innerText=` ${amountVal} ${FromCurr.value} = ${finalAmount.toFixed(2)} ${ToCurr.value} `
   //Or
    F.innerText=amountVal;
    contry1.innerText=FromCurr.value+" = ";
    T.innerText=finalAmount.toFixed(3)
    contry2.innerText=" "+ToCurr.value;

});






