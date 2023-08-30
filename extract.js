console.log('[ Loaded schedule extractor ]');

var injectElementParent = document.getElementsByClassName('span6right')[0];

const newsContainer = document.getElementById('news_con');
newsContainer.remove();

const injectFrameElement = document.createElement("div")
injectFrameElement.style = "background-color:#000;border-radius:5px;justify-content:center;text-align:center;padding:15px;"
injectElementParent.appendChild(injectFrameElement)

const injectMessageElement = document.createElement("h2");
injectMessageElement.textContent = "[ Schedule Extraction Script 1.0 ]";
injectMessageElement.style = "color:#05f735;";
injectFrameElement.appendChild(injectMessageElement);

const injectButtonElement = document.createElement("button");
injectButtonElement.textContent = "start extraction";
injectButtonElement.style = "background-color:#fff;border-radius:15px;font-size:15px;"
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

    var scheduleItemArray = document.getElementsByClassName('cal-lesson');

    for (let i = 0; i < scheduleItemArray.length; i++) {
        log(scheduleItemArray[i].textContent);
    }
    
    log("----- Extraction end -----")
}