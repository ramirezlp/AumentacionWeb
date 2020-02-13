class Result {
    consultarSitio() {
        return document.location['origin'];
    }
    addIcons(args){
        var resultados = document.getElementsByClassName(args[4]);
        for (var i=0; i < resultados.length; i++){
            var existe1 = 0;
            var existe2 = 0;
            var pos1 = 0;
            var pos2 = 0;
            if (args[4] == "result__body"){

                for (var key in args[0]){
                    pos1 = pos1 + 1;
                    if (args[0][key] == resultados[i].childNodes[3].childNodes[1].getAttribute('href')){
                        existe1 = pos1;
                    }
                }

                for (var key in args[1]){
                    pos2 = pos2 + 1;
                    if (args[1][key] == resultados[i].childNodes[3].childNodes[1].getAttribute('href')){
                        existe2 = pos2;
                    }
                }
                
                var res = resultados[i].childNodes[3];

                var img1 = document.createElement("img");
                img1.src = args[2];
                img1.style.height = '25px';
                img1.style.width = '25px';
                var div1 = document.createElement("div");
                div1.classList.add("col-sm-2");
                div1.classList.add("container");
                div1.appendChild(img1);
                var tex1 = document.createElement("div");
                tex1.style.color = 'red';
                tex1.classList.add("top-right-d");

                if (existe1 == 0){
                    tex1.innerHTML+="-";
                } else{
                    tex1.innerHTML+=existe1;
                }
                
                div1.appendChild(tex1);

                var img2 = document.createElement("img");
                img2.src = args[3];
                img2.style.height = '25px';
                img2.style.width = '25px';
                var div2 = document.createElement("div");
                div2.classList.add("col-sm-2");
                div2.classList.add("container");
                div2.appendChild(img2);
                var tex2 = document.createElement("div");
                tex2.style.color = 'red';
                tex2.classList.add("top-right-d");

                if (existe2 == 0){
                    tex2.innerHTML+="-";
                } else{
                    tex2.innerHTML+=existe2;
                }

                div2.appendChild(tex2);

                var divrow = document.createElement("div");
                divrow.classList.add("row");

                var relleno = document.createElement("div");
                relleno.classList.add("col-sm-8");
                divrow.appendChild(relleno);

                divrow.appendChild(div1);
                divrow.appendChild(div2);

                var divcon = document.createElement("div");
                divcon.classList.add("container");
                divcon.appendChild(divrow);

                res.appendChild(divcon);

            } else if (args[4] == "rc") {

                for (var key in args[0]){
                    pos1 = pos1 + 1;
                    if (args[0][key] == resultados[i].firstChild.firstChild.getAttribute('href')){
                        existe1 = pos1;
                    }
                }

                for (var key in args[1]){
                    pos2 = pos2 + 1;
                    if (args[1][key] == resultados[i].firstChild.firstChild.getAttribute('href')){
                        existe2 = pos2;
                    }
                }

                var res = resultados[i].firstChild;

                var img1 = document.createElement("img");
                img1.src = args[2];
                img1.style.height = '30px';
                img1.style.width = '30px';
                var div1 = document.createElement("div");
                div1.classList.add("col-sm-2");
                div1.classList.add("container");
                div1.appendChild(img1);
                var tex1 = document.createElement("div");
                tex1.style.color = 'red';
                tex1.style.fontSize = 'large';
                tex1.classList.add("top-right-g");

                if (existe1 == 0){
                    tex1.innerHTML+="-";
                } else{
                    tex1.innerHTML+=existe1;
                }

                div1.appendChild(tex1);

                var img2 = document.createElement("img");
                img2.src = args[3];
                img2.style.height = '25px';
                img2.style.width = '25px';
                var div2 = document.createElement("div");
                div2.classList.add("col-sm-2");
                div2.classList.add("container");
                div2.appendChild(img2);
                var tex2 = document.createElement("div");
                tex2.style.color = 'red';
                tex2.style.fontSize = 'large';
                tex2.classList.add("top-right-g");

                if (existe2 == 0){
                    tex2.innerHTML+="-";
                } else{
                    tex2.innerHTML+=existe2;
                }

                div2.appendChild(tex2);

                var divrow = document.createElement("div");
                divrow.classList.add("row");

                var relleno = document.createElement("div");
                relleno.classList.add("col-sm-8");
                divrow.appendChild(relleno);

                divrow.appendChild(div1);
                divrow.appendChild(div2);

                var divcon = document.createElement("div");
                divcon.classList.add("container");
                divcon.appendChild(divrow);

                res.appendChild(divcon);

            } else {

                for (var key in args[0]){
                    pos1 = pos1 + 1;
                    if (args[0][key] == resultados[i].firstChild.firstChild.getAttribute('href')){
                        existe1 = pos1;
                    }
                }

                for (var key in args[1]){
                    pos2 = pos2 + 1;
                    if (args[1][key] == resultados[i].firstChild.firstChild.getAttribute('href')){
                        existe2 = pos2;
                    }
                }

                var res = resultados[i].firstChild.firstChild;

                var img1 = document.createElement("img");
                img1.src = args[2];
                img1.style.height = '30px';
                img1.style.width = '30px';
                var div1 = document.createElement("div");
                div1.classList.add("col-sm-2");
                div1.classList.add("container");
                div1.appendChild(img1);
                var tex1 = document.createElement("div");
                tex1.style.color = 'red';
                tex1.classList.add("top-right-b");

                if (existe1 == 0){
                    tex1.innerHTML+="-";
                } else{
                    tex1.innerHTML+=existe1;
                }

                div1.appendChild(tex1);

                var img2 = document.createElement("img");
                img2.src = args[3];
                img2.style.height = '28px';
                img2.style.width = '28px';
                var div2 = document.createElement("div");
                div2.classList.add("col-sm-2");
                div2.classList.add("container");
                div2.appendChild(img2);
                var tex2 = document.createElement("div");
                tex2.style.color = 'red';
                tex2.classList.add("top-right-b");
                
                if (existe2 == 0){
                    tex2.innerHTML+="-";
                } else{
                    tex2.innerHTML+=existe2;
                }

                div2.appendChild(tex2);

                var divrow = document.createElement("div");
                divrow.classList.add("row");

                var relleno = document.createElement("div");
                relleno.classList.add("col-sm-8");
                divrow.appendChild(relleno);

                divrow.appendChild(div1);
                divrow.appendChild(div2);

                var divcon = document.createElement("div");
                divcon.classList.add("container");
                divcon.appendChild(divrow);

                res.appendChild(divcon);
            }

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

    getString(sitio){
        return document.getElementsByClassName(sitio)[0].getAttribute("value");
    }

    giveStringBack(){
        var sitio = pageManager.consultarSitio();
        if (sitio == "https://www.bing.com") {
            var data = document.getElementsByClassName("b_searchbox")[0].getAttribute("value");
        } else if (sitio == "https://www.google.com") {
            var data = document.getElementsByClassName("gLFyf")[0].getAttribute("value");
        } else {
            var data = document.getElementsByClassName("search__input")[0].getAttribute("value");
        }
        browser.runtime.sendMessage({call: "popUpResults", args: data});
    }
}

var pageManager = new Result();
var sitio = pageManager.consultarSitio();
if (sitio == "https://www.bing.com") {
    var busca = pageManager.getString("b_searchbox");
    console.log('busca_bing',busca)
    browser.runtime.sendMessage({call: "retrieveSearchResults", args: [busca, 'BingEngine']});
} else if (sitio == "https://www.google.com") {
    var busca = pageManager.getString("gLFyf");
    console.log('busca_google',busca)
    browser.runtime.sendMessage({call: "retrieveSearchResults", args: [busca, 'GoogleEngine']});
} else {
    if (document.location == "https://duckduckgo.com/html/"){
        var busca = pageManager.getString("search__input");
        browser.runtime.sendMessage({call: "retrieveSearchResults", args: [busca, 'DuckDuckGoEngine']});
        console.log('busca_duckduck',busca)
    } else {
        console.log('entra aca')
        document.location.replace("https://duckduckgo.com/html/");
    }
}

//Listening for background's messages
browser.runtime.onMessage.addListener((request, sender) => {
    console.log("[content-side] calling the message: " + request.call);
    if (pageManager[request.call]) {
        pageManager[request.call](request.args);
    }
});
