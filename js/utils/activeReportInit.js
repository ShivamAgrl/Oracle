/*
 * Copyright (c) 2016, 2018, Oracle and/or its affiliates. All rights reserved.
 *
 * FileName: activeReportInit.js
 *
 * USAGE:
 *  1. Include this file on top of the landing html file where you
 *          intend to support active report functionality.
 *   eg: To include this file in SQL Monitor List page, add the follwing line
 *          in the sql-monitor-list.html file
 *   <script src="ui-utils/common/@version@/js/util/activeReportInit.js"></script>
 *
 *   2. Consume the global variables g_activeReportXmlData and g_emMode
 *
 * MODIFIED  (MM/DD/YY)
 *
 * sshastry - 01/20/17 - Creation
 *
 */

/*
 * Global variable that contains active report xml data
 */
var g_activeReportXmlData = "";

 
/*  This function is for dynamically constructing the path of the iframe tag
 *  based on the version of the database release
 */
function writeIframe()   
{
        console.log("+++++ WRITING iframe TO THE DOCUMENT +++++");
        var iFrameElement = document.createElement("iframe");
        iFrameElement.id = "iframe";
        iFrameElement.src = 'index.html';
        iFrameElement.width = "100%";
        iFrameElement.height = "99%";
        document.getElementsByTagName('body')[0].appendChild(iFrameElement);
}


document.onreadystatechange = function(e)
{
    switch (document.readyState) {
        case "loading":
            // The document is still loading.

            break;
        case "interactive":
            // The document has finished loading. We can now access the DOM elements.
            writeIframe();
            break;
    }

};


/*  This function is called when the html is loaded to pass the
 *  xml to the em express active report html on OTN/OMC/CDN
 */
function sendXML()
{
    // get the XML
    var xmlTag = document.getElementById("fxtmodel");

    // get the iframe
    var frame = document.getElementById("iframe");
    var frameWindow = document.getElementById("iframe").contentWindow;

    // if xml is found, pass it to em express active report on ONT
    if (xmlTag != null)
    {
        var xml = xmlTag.innerHTML + '';
        console.log("+++++ Sending message to parent +++++", xml);
        frameWindow.postMessage(xml, "*");
    }
}
