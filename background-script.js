chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("dollskill.com/products")) {
        const queryParameters = tab.url.split("/")[3];
        console.log(queryParameters);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            product: queryParameters
        });
    }
});