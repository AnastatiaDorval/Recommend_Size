(() => {
    let productt = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, product} = obj;

        if (type === "NEW"){
            productt = product;
            getSize();
            console.log(productt);
        }
    });

    const getSize = () => {
        const size_guide = document.getElementsByClassName("pdp-size-section").item(0);
        console.log(size_guide);
    }
})();