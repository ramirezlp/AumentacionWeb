class Result {
    consultarSitio() {
        console.log('Te encuentras en:', document.location['origin'])
        //document.querySelector("body").style["background-color"] = "yellow";
        var div = this.createContainer("300px", window.innerHeight + "px", (window.innerWidth - 300) + "px", "0px");
        document.body.appendChild(div);
        //console.log($('nav').children())
    }
    retrieveGoogleSearch(){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("r");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild;
                results[link.lastChild.textContent]=link.getAttribute('href');
            }
            console.log(results);
        }
        oReq.open("GET","https://www.google.com/search?q=estudiantes");
        oReq.send();   
    }
    retrieveBingSearch(){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("b_algo");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild.firstChild;
                results[link.textContent]=link.getAttribute('href');
            }
            console.log(results);
        }
        oReq.open("GET","https://www.bing.com/search?q=estudiantes");
        oReq.send();   
    }

    retrieveDuckDuckGoSearch(){
        console.log('hola')
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            console.log(responseDoc)
            var organicResults = responseDoc.getElementsByClassName("result");
            console.log(organicResults)
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i];
                console.log(link)
                //results[link.textContent]=link.getAttribute('href');
            }
            //console.log(results);
        }
        oReq.open("GET","https://duckduckgo.com/html/?q=estudiantes&t=h_&ia=web");
        oReq.send();   
    }

    createContainer(width, height, left, top) {
        var div = document.createElement("div");
        div.style.width = width;
        div.style.height = height;
        div.style.position = "fixed";
        div.style.background = "white";
        div.style.top = top;
        div.style.left = left;
        div.style.zIndex = this.getMaxZindex() + 1;

        div.onclick = function () {
            this.remove();
        }
        return div;
    }
    getMaxZindex() {
        return Array.from(document.querySelectorAll('body *'))
            .map(a => parseFloat(window.getComputedStyle(a).zIndex))
            .filter(a => !isNaN(a)).sort().pop();
    }
}



var pageManager = new Result();

//Listening for background's messages
browser.runtime.onMessage.addListener((request, sender) => {
    console.log("[content-side] calling the message: " + request.call);
    if (pageManager[request.call]) {
        pageManager[request.call](request.args);
    }
});