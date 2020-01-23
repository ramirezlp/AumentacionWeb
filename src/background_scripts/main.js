class BackgroundResult{
    consultarSitio(){
        console.log('holaaaaaa')
		this.getCurrentTab().then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {
				call: "consultarSitio"
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
});

browser.runtime.onMessage.addListener((request, sender) => {
	console.log("[background-side] calling the message: " + request.call);
	if(extension[request.call]){
		return extension[request.call](request.args);
	}
});