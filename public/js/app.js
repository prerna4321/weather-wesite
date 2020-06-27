console.log("app js loaded");

// fetch a url directly
fetch('/weather?address=boston').then((response)=>{
    console.log(response);
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data);    
        }
        
    });
});
// /*
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');

const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    // console.log(search.value);
    const location = search.value;
    
    messageOne.textContent = "Loading.....";
    messageTwo.textContent = "";
    console.log(search.value);
    fetch('/weather?address=' + search.value).then((response)=>{
        console.log(response);
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
                messageTwo.textContent = "";

            }else{
                messageOne.textContent = "for location " + data.location;
                messageTwo.textContent = "current temperature is "+ data.forecast.temperature + " and weather is " + data.forecast.weather;
                console.log(data);    
            }
            
        });
    });


});//*/
    