$(function(){
    //get the caller tabId
    var tabId = parseInt(window.location.search.substring(1));

    //watch for tab changes
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        tabId = activeInfo.tabId;
    });

    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            //use only requests from the current tabId
            if(details.tabId == tabId)
            {
                $('#logs').append("<li>request made on tab: "+details.tabId + "</li>");
            }

            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders.splice(i, 1);
                    break;
                }
            }
            return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]
    );
});