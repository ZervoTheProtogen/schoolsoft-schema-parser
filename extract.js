console.log('[ Loaded schedule extractor ]');

// Configurative variables
const sourceLink = 'https://github.com/ZervoTheProtogen/schoolsoft-schema-parser/blob/main/grab.js'

var injectElementParent = document.getElementsByClassName('span6right')[0];

const newsContainer = document.getElementById('news_con');
newsContainer.remove();

const injectFrameElement = document.createElement("div")
injectFrameElement.style = "background-color:#000;border-radius:5px;justify-content:center;text-align:center;padding:15px;"
injectElementParent.appendChild(injectFrameElement)

const injectTitleElement = document.createElement("h2");
injectTitleElement.textContent = "[ Schedule Extraction Script 1.0 ]";
injectTitleElement.style = "color:#05f735;";
injectFrameElement.appendChild(injectTitleElement);

const injectButtonElement = document.createElement("button");
injectButtonElement.textContent = "start extraction";
injectButtonElement.style = "background-color:#303030;border:none;border-radius:15px;color:white;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;"
injectButtonElement.addEventListener("click", extract, false);
injectFrameElement.appendChild(injectButtonElement);

const injectConsoleElement = document.createElement("div");
injectConsoleElement.style = "background-color:#202020;border:5px green;border-radius:5px;padding:15px;max-height:200px;overflow-y:scroll;color:#ffffff;text-align:left;";

function log(msg) {
    const injectConsoleMessageElement = document.createElement("p");
    injectConsoleMessageElement.textContent = msg;
    injectConsoleElement.appendChild(injectConsoleMessageElement);
}

function extract() {
    injectButtonElement.remove();
    injectFrameElement.appendChild(injectConsoleElement);
    log("----- Extraction start -----");

    var jsonArray = [] // prepare output json object

    var scheduleItemArray = Array.from(document.getElementsByClassName('cal-lesson')); // get all classes

    var day = 1;
    var lastEndtime = 0

    for (let x in scheduleItemArray) {

        // prepare output variables
        var outId = x;
        var outName = '';
        var outStart = '';
        var outEnd = '';
        var outDay = '';

        log(scheduleItemArray[x].textContent);

        let scheduleItemArraySplit = scheduleItemArray[x].textContent.split(" "); // split current class string

        let scheduleItemTimesArray = scheduleItemArraySplit[0].split("-"); // split times section into 
        
        // write times to output variables
        outStart = scheduleItemTimesArray[0];
        outEnd = scheduleItemTimesArray[1];

        // do calculations for which day it is
        let startTrim = Number(outStart.replace(/:/g,''));
        if (startTrim < lastEndtime) {
            console.log(day);
            day += 1;
        }
        lastEndtime = Number(outEnd.replace(/:/g,''));
        switch(day) {
            case 1:
                outDay = 'mon';
                break;
            case 2:
                outDay = 'tue';
                break;
            case 3:
                outDay = 'wed';
                break;
            case 4:
                outDay = 'thu';
                break;
            case 5:
                outDay = 'fri';
                break;
            default:
                outDay = '';
                break;
        } 

        // write name to output variable
        outName = scheduleItemArraySplit[1];

        // write output variables to object
        const outObject = {
            id: outId,
            name: outName,
            start: outStart,
            end: outEnd,
            day: outDay
        };

        // assign object to main output array
        jsonArray.push(outObject);
    }

    console.log(jsonArray);

    log("----- Extraction end -----")
}