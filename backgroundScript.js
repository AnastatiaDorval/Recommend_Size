
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message from "+sender+": ", request);
    if(message != null){
        console.log(message.data);
    }
    sendResponse({received: true}); //can change
});

var id = chrome.runtime.id;

chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    try {
        if (tab.url && tab.url.includes("dollskill")) {
            //console.log(tab.pendingUrl);
            console.log(tab.url);
            const queryParameters = tab.url.split("/")[4];    
            chrome.tabs.sendMessage(id, {
                type: "NEW",
                product: queryParameters
            });
        }
        else if (tab) {
            console.log("Tab exists but url does not?");
            chrome.tabs.sendMessage(id, {
                type: "N/A",
                product: "No url"
            });
        }
        else {
            console.log("Tab does not exist");
            console.log(tab);
            chrome.tabs.sendMessage(id, {
                type: "N/A",
                product: "Tab does not exist"
            });
        }
    }
    
    catch(error){
        console.log(error.stack);
        console.log(error.name);
        console.log(error.message);
    }
});