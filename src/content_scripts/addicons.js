

var sitio = pageManager.consultarSitio();
if (sitio == "https://www.bing.com") {
    browser.runtime.sendMessage({call: "retrieveForBing"});
} else if (sitio == "https://www.google.com") {
    browser.runtime.sendMessage({call: "retrieveForGoogle"});
} else {
    browser.runtime.sendMessage({call: "retrieveForDuck"});
}


