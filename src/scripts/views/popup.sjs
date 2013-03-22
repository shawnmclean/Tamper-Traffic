$(function(){
    //get the caller tabId
    var tabId = parseInt(window.location.search.substring(1));
    var tamperStarted = false;

    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            $('#logs').append("<li>request made on tab: "+details.requestId + "</li>");

            //if tampering is started, ask to tamper request.
            if(tamperStarted == true)
            {
                if(confirm("Tamper url: "+ details.url))
                {
                    var r = window.showModalDialog('tamper.html',
                        details, "dialogwidth: 450; dialogheight: 300; resizable: yes");
                }
            }

            return; //{requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"], tabId : tabId},
        ["blocking", "requestHeaders"]
    );

    //UI interactions
    $('#btnTamperToggle').click(function(){
        tamperStarted = !tamperStarted;
        if(tamperStarted)
        {
            $(this).html('Stop');
        }
        else
        {
            $(this).html('Start');
        }
    });
});