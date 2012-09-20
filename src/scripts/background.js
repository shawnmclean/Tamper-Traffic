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
            //if window is closed then create it, else focus the already opened window
            if(wind == null)
            {
                createPopup(tab.id);
            }
            else
            {
                //focus the window
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
            var index=-1;
            for(var i=0;i<relatedPopups.length;i++)
                if(relatedPopups[i].tabId===tabId){index=i;break;}

            relatedPopups.splice(index, 1);

            //add new combination
            relatedPopups.push({tabId:tabId, windowId: window.id});
        }
    );
}