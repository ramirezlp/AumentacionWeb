class PopUp {

    obtengoDatos(args) {
        var engines = {
            0: 'Google',
            1: 'Bing',
            2: 'DuckDuckGo'
        }
        for (var i = 1; i < 6; i++) {
            var div = document.getElementById(i);
            for (var j = 0; j < 3; j++) {
                var a = document.createElement("A");
                a.setAttribute('href', args[j][i - 1]);
                a.setAttribute('target', '_blank');
                a.textContent = i + ' resultado de ' + engines[j];
                var p = document.createElement('P');
                p.appendChild(a);
                div.appendChild(p);
            }
        }
    }

}

var pageManager = new PopUp;
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        call: "giveStringBack"
    });
});

chrome.runtime.onMessage.addListener((request, sender) => {
    console.log("[content-side] calling the message: " + request.call);
    if (pageManager[request.call]) {
        pageManager[request.call](request.args);
    }
});