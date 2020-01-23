class Result {
    consultarSitio(){
        console.log('Te encuentras en:',document.location['origin'])
        document.querySelector("body").style["background-color"] = "yellow";
    }
}



var pageManager = new Result();

//Listening for background's messages
browser.runtime.onMessage.addListener((request, sender) => {
	console.log("[content-side] calling the message: " + request.call);
	if(pageManager[request.call]){
		pageManager[request.call](request.args);
	}
});
