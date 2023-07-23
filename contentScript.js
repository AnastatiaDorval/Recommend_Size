let productt = "";
window.storeInfo = {};

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
                if(size_guides.item(j)){ //checking if size guide exists
                    console.log(size_guides.item(j));
                    var curr_size_guide = size_guides.item(j);

                    if(curr_size_guide.children.item(0)){ //checking if tbody exists
                        var curr_tbody = curr_size_guide.children.item(0);
                        console.log(curr_tbody);

                        if(curr_tbody.children.item(0)){ //checking if first tr exists
                            var rows = curr_tbody.children;
                            var first_row = curr_tbody.children.item(0).children;
                            var clothing = first_row.item(0).textContent; //storing piece of clothing
                            window.storeInfo[clothing] = {};
                            console.log(window.storeInfo[clothing]);
                            for (let k = 1; k < first_row.length; k++){
                                var size = first_row.item(k).textContent;
                                window.storeInfo[clothing][size] = {};
                                for (let l = 1; l < rows.length; l++){
                                    var measure_store = rows.item(l).children.item(0).textContent;
                                    var measurement = rows.item(l).children.item(k).textContent;
                                    window.storeInfo[clothing][size][measure_store] = measurement;
                                    if(localStorage.getItem(measure_store.split(" ")[0])){
                                        if(measurement.includes("-") > -1){
                                            var upanddown = measurement.split("-");
                                            if(parseInt(localStorage.getItem(measure_store.split(" ")[0])) >= parseInt(upanddown[0]) && parseInt(localStorage.getItem(measure_store.split(" ")[0])) <= parseInt(upanddown[1])){
                                                console.log("We found a measurement that matches you");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(window.storeInfo);
    }
    else{
        console.log("Can't find size guide :(");
    }
}