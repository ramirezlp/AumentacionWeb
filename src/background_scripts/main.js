class BackgroundResult {
    consultarSitio() {
        this.getCurrentTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                call: "consultarSitio"
            });
        });
    }

    //-----------Busca para el PopUp-----------//

    retrieveBingSearch(busca){
        var results = [];
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("b_algo");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild.firstChild;
                results.push(link.getAttribute('href'));
            }
            extension.retrieveGoogleSearch(results, busca);
        }
        oReq.open("GET","https://www.bing.com/search?q=" + busca);
        oReq.send();   
    }

    retrieveGoogleSearch(resB, busca){
        var results = [];
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("rc");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild.firstChild;
                results.push(link.getAttribute('href'));
            }
            extension.retrieveDuckDuckGoSearch(results, resB, busca);
        }
        oReq.open("GET","https://www.google.com/search?q=" + busca);
        oReq.send();   
    }

    retrieveDuckDuckGoSearch(resG, resB, busca){
        var results = [];
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("result__body");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].childNodes[3].childNodes[1];
                results.push(link.getAttribute('href'));
            }
            browser.runtime.sendMessage({call: "obtengoDatos", args: [resG, resB, results]});
        }
        oReq.open("GET","https://duckduckgo.com/html/?q=" + busca);
        oReq.send();   
    }

    //-----------Busca para Bing-----------//

    retrieveForBing(busca){
        var busqueda = extension.parsearString(busca);
        this.retrieveDuckForB(busqueda);
    }

    retrieveDuckForB(busca){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("result__body");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].childNodes[3].childNodes[1];
                results[link.textContent]=link.getAttribute('href');
            }
            extension.retrieveGoogleForB(results, busca);
        }
        oReq.open("GET","https://duckduckgo.com/html/?q=" + busca);
        oReq.send();   
    }

    retrieveGoogleForB(resD, busca){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("rc");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild.firstChild;
                results[link.lastChild.textContent]=link.getAttribute('href');
            }
            extension.getCurrentTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    call: "addIcons",
                    args: [resD, results, "https://img.utdstc.com/icons/duckduckgo-search-and-stories-android.png:l", "data:image/png;base64,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", "b_algo"]
                });
            });
        }
        oReq.open("GET","https://www.google.com/search?q=" + busca);
        oReq.send();   
    }

    //-----------Busca para Google-----------//

    retrieveForGoogle(busca){
        var busqueda = extension.parsearString(busca);
        this.retrieveDuckForG(busqueda);
    }

    retrieveDuckForG(busca){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("result__body");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].childNodes[3].childNodes[1];
                results[link.textContent]=link.getAttribute('href');
            }
            extension.retrieveBingForG(results, busca);
        }
        oReq.open("GET","https://duckduckgo.com/html/?q=" + busca);
        oReq.send();   
    }

    retrieveBingForG(resD, busca){
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
            extension.getCurrentTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    call: "addIcons",
                    args: [resD, results, "https://img.utdstc.com/icons/duckduckgo-search-and-stories-android.png:l", "data:image/png;base64,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", "rc"]
                });
            });
        }
        oReq.open("GET","https://www.bing.com/search?q=" + busca);
        oReq.send();   
    }

    //-----------Busca para Duck-----------//

    retrieveForDuck(busca){
        var busqueda = extension.parsearString(busca);
        this.retrieveBingForD(busca);
    }

    retrieveBingForD(busca){
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
            extension.retrieveGoogleForD(results, busca);
        }
        oReq.open("GET","https://www.bing.com/search?q=" + busca);
        oReq.send();   
    }

    retrieveGoogleForD(resD, busca){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("rc");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild.firstChild;
                results[link.lastChild.textContent]=link.getAttribute('href');
            }
            extension.getCurrentTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    call: "addIcons",
                    args: [results, resD, "data:image/png;base64,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", "data:image/png;base64,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", "result__body"]
                });
            });
        }
        oReq.open("GET","https://www.google.com/search?q=" + busca);
        oReq.send();   
    }


    parsearString(busqueda){
        return busqueda.replace(" ", "+");
    }

    retrieveResultados(){
        extension.getCurrentTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                call: "retrieveResultados"
            });
        });
    }

    getCurrentTab(callback) {
        return browser.tabs.query({
            active: true,
            currentWindow: true
        });
    }

    dataPopUp(busca){
        var busqueda = extension.parsearString(busca);
        extension.retrieveBingSearch(busqueda);
    }
}

var extension = new BackgroundResult();
browser.browserAction.onClicked.addListener(() => {

});

browser.runtime.onMessage.addListener((request, sender) => {
    console.log("[background-side] calling the message: " + request.call);
    if (extension[request.call]) {
        extension[request.call](request.args);
    }
});