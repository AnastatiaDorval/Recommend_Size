let productt = "";
const dollskills = [];
chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const {type, product} = obj;
    if (type === "NEW"){
        productt = product;
        getSize();
        console.log(productt);
    }
    else {
        productt = product;
        console.log(productt);
    }
});

const getSize = () => {
    const size_guide = document.getElementsByClassName("pdp-size-section");
    if(size_guide && size_guide.length > 0){
        console.log(size_guide.length);
        for(let i = 0; i < size_guide.length; i++){ 
            console.log(size_guide.item(i));
            size_guide.item(i).click();
            const size_guides = document.getElementsByClassName("size-table");
            for (let j = 0; j < size_guides.length; j++) {
                console.log(size_guides.item(j));
            }
        }
    }
    else{
        console.log("Can't find size guide :(");
    }
}