var productt = "";

var available_sizeguides = []; //lists out size guides

var available_sizes = {}; //lists out size guides and their available sizes, key is sizeguide

var measures = {}; //lists out measures, key is sizeguide

var measurements = {}; //lists out measurements, key is concatenated sizeguide-size-measure

var user_measures = {};

var user_matches = {}; //key will be the measurement, and value will be size

var user_size = "";

chrome.storage.local.get(['user_measures'], (result) => {
    user_measures = result['user_measures'];
    console.log(user_measures);
});

function isNumberInRange(number, rangeString) {
    // Step 1: Extract the minimum and maximum values from the range string
    const [minStr, maxStr] = rangeString.split('-');
    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);
  
    // Step 2: Convert the number to a numeric value (if it's not already)
    const num = parseFloat(number);
  
    // Step 3: Compare the number against the minimum and maximum values
    return num >= min && num <= max;
}

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
                            //storeInfo[clothing] = {};
                            available_sizeguides.push(clothing); //adding clothing to list of available sizeguides
                            available_sizes[clothing] = new Set();
                            measures[clothing] = new Set();
                            for (let k = 1; k < first_row.length; k++){
                                var size = first_row.item(k).textContent;
                                //storeInfo[clothing][size] = {};
                                available_sizes[clothing].add(size); //adding size to list that corresponds with sizeguide
                                for (let l = 1; l < rows.length; l++){
                                    var measure_store = rows.item(l).children.item(0).textContent;
                                    var measurement = rows.item(l).children.item(k).textContent;
                                    //storeInfo[clothing][size][measure_store] = measurement;
                                    measures[clothing].add(measure_store); //adding measure to list that corresponds with sizeguide
                                    var key = clothing+'-'+size+'-'+measure_store; //creating unique key
                                    measurements[key] = measurement; //to store the measurement that corresponds with sizeguide, size and measurement
                                    var measure = measure_store.split(" ")[0];
                                    var store_measure = clothing+'-'+measure;
                                    var user_measurement = user_measures[measure];
                                    if(user_measurement != null){
                                        if(isNumberInRange(user_measurement, measurement)){
                                            //console.log("Recommended Size for "+store_measure+" is: "+size);
                                            user_matches[store_measure] = size;
                                        }
                                    }
                                    else{
                                        //console.log("Recommended Size for "+store_measure+" is: No User Entered Measurement");
                                        user_matches[store_measure] = "No User Entered Measurement";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        console.log("Can't find size guide");
    }
}

const recommendSize = () => {
    var matches = Object.values(user_matches);
    //first, get unique values
    var uni_matches = [...new Set(matches)];
    //second, count each unique value
    var max = 0;
    var size = "";
    for(var i = 0; i < uni_matches.length; i++){
        if(uni_matches[i]!= "No User Entered Measurement" && matches.filter(item => item === uni_matches[i]).length > max){
            max = matches.filter(item => item === uni_matches[i]).length;
            size = uni_matches[i];
        }
    }
    user_measures["user_size"] = size;
    user_size = size;
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const {type, product} = obj;
    if (type === "NEW"){
        productt = product;
        console.log(productt);
        getSize();
        recommendSize();
        chrome.storage.local.set({ user_size }, () => {
            console.log(user_size);
            chrome.runtime.sendMessage({ type: "dataReady" });
        });
    }
    else {
        productt = product;
        console.log(productt);
    }
});