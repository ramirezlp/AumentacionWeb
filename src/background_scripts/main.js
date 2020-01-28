class BackgroundResult {
    consultarSitio() {
        this.getCurrentTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                call: "consultarSitio"
            });
        });
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
            extension.getCurrentTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    call: "retrieveSearch",
                    args: results
                });
            });
        }
        oReq.open("GET","https://www.bing.com/search?q=estudiantes");
        oReq.send();   
    }

    retrieveGoogleSearch(){
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
                    call: "retrieveSearch",
                    args: results
                });
            });
        }
        oReq.open("GET","https://www.google.com/search?q=estudiantes");
        oReq.send();   
    }

    retrieveDuckDuckGoSearch(){
        var results = {};
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e){
            var parser = new DOMParser ();
            var responseDoc = parser.parseFromString (oReq.response, "text/html");
            var organicResults = responseDoc.getElementsByClassName("result__body");
            for (var i=0; i < organicResults.length; i++){
                var link = organicResults[i].firstChild.firstChild;
                results[link.textContent]=link.getAttribute('href');
            }
            extension.getCurrentTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    call: "retrieveSearch",
                    args: results
                });
            });
        }
        oReq.open("GET","https://duckduckgo.com/html/?q=estudiantes");
        oReq.send();   
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
}

var extension = new BackgroundResult();
browser.browserAction.onClicked.addListener(() => {
    extension.consultarSitio();
    extension.retrieveResultados();
    extension.retrieveDuckDuckGoSearch();
});

browser.runtime.onMessage.addListener((request, sender) => {
    console.log("[background-side] calling the message: " + request.call);
    if (extension[request.call]) {
        return extension[request.call](request.args);
    }
});