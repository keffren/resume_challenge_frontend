/*
* AWS CLOUD RESUME CHALLENGE
*  Include a visitor counter that displays how many people have accessed the site
*/

function myDisplayer(visitor_count) {
    document.getElementById("views-counter").innerHTML = visitor_count;
};

async function getVisitorsCount(){
    const request = await fetch(
        "https://5xikcm1l6i.execute-api.eu-west-1.amazonaws.com/dev/visitor-counter"
    );
    
    const promise = await request.json();
    //console.log(promise);

    if(promise["statusCode"] === 200){
        const data_promise = JSON.parse(promise["body"]);
        const count = data_promise["message"];
        //console.log(count);
        //console.log(typeof(count));
        return count;
    }else{
        console.log("HTTP ERROR: " + promise["statusCode"]);
        return "ERROR";
    };
};

async function updateVisitorsCount(){
    let request = await fetch("https://5xikcm1l6i.execute-api.eu-west-1.amazonaws.com/dev/visitor-counter",
        {
            method  : "POST",
            body    : JSON.stringify({"item_to_update": "visitorsNumber"}),
            headers :{
                "Content-Type": "text/plain"
            }
        }
    )

    //Notify the result of update operation
    const promise = await request.json();
    const data_promise = JSON.parse(promise["body"]);
    const message = data_promise["message"];
    console.log(message)
}

//Retrieve the views
//Call getVisitorsCount function and handle its returned Promise object
//await must exist within an async function!!!!
;(async () => {
    const count = await getVisitorsCount();

    //Load the count into HTML
    myDisplayer(count);

    //Update the counter
    updateVisitorsCount();
})();
