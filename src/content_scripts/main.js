class Result {
    consultarSitio() {
        console.log('Te encuentras en:', document.location['origin'])
        //document.querySelector("body").style["background-color"] = "yellow";
        var div = this.createContainer("300px", window.innerHeight + "px", (window.innerWidth - 300) + "px", "0px");
        document.body.appendChild(div);
        //console.log($('nav').children())
    }

    retrieveSearch(res){
        console.log(res);
    }

    retrieveResultados(img){
        var resultados = document.getElementsByClassName("b_algo");
        var img = document.createElement("img");
        img.src = "https://img.utdstc.com/icons/duckduckgo-search-and-stories-android.png:l"
        for (var i=0; i < resultados.length; i++){
            resultados[i].firstChild.firstChild.appendChild(img);
        }
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