class PopUp{

    obtengoDatos(args){
        for (var i=1; i < 6; i++){
            var div = document.getElementById(i);
            for (var j=0; j <3; j++){
                if (j == 0){
                    var link = i + " resultado de Google: " + args[j][i-1];
                } else if ( j == 1){
                    var link = i + " resultado de Bing: " + args[j][i-1];
                } else if ( j ==2 ){
                    var link = i + " resultado de Duck: " + args[j][i-1];
                }
                var h = document.createElement("H4");
                var t = document.createTextNode(link);
                h.appendChild(t);
                div.appendChild(h);
                //var a = document.createElement("a");
                //var t = document.createTextNode(link);
                //a.appendChild(t);
                //a.tittle = link;
                //a.href = link;
                //div.appendChild(a);
                //var br = document.createElement("br");
                //div.appendChild(br);
            }
        }
    }

}

var pageManager = new PopUp;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {call:"giveStringBack"});
});

chrome.runtime.onMessage.addListener((request, sender) => {
    console.log("[content-side] calling the message: " + request.call);
    if (pageManager[request.call]) {
        pageManager[request.call](request.args);
    }
});