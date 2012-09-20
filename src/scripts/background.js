//stores the tabid of the tab being tampered and the related popup window
var relatedPopups = [];

chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.getCurrent(function(win) {
        chrome.tabs.getSelected(win.id, actionClicked);
    });

});
function actionClicked(tab) {
    //check if the tab already has a window opened.
    var relatedPopup= _.find(relatedPopups, function(element)
        {
            return tab.id == element.tabId;
        }
    );
    if(relatedPopup != null)
    {
        //check if the matching windowId is still opened.
        chrome.windows.get(relatedPopup.windowId, function(wind){
            //if window is closed, then remove the element from the array and open a window
            if(wind == null)
            {
                createPopup(tab.id);
            }
            else
            {
                chrome.windows.update(wind.id, {focused:true });
            }
        });
    }
    else
    {
        createPopup(tab.id);
    }
}

function createPopup(tabId)
{
    chrome.windows.create({url: "pages/popup.html?" + tabId, type: "popup", width: 800, height: 600},
        function(window)
        {
            //remove elements with matching tabId

            //add new combination
            relatedPopups.push({tabId:tabId, windowId: window.id});
        }
    );
}