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

/*
 * Global variable to indicate EM Mode
 * Possible values:
 *  a. em_express           => Indicates connected mode. This is the default value.
 *  b. emx_active_report    => Indicates active report mode.
 */
var g_emMode = "em_express";
console.log("+++++ In activeReportInit.js :: g_emMode: " + g_emMode);

var baseUrl = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0] ? document.getElementsByTagName('base')[0].href : '';
var componentURL = "";

// function to get url parameter of the parent window by name
function getURLParam(pname)
{
    pname = pname.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + pname + "=([^&#]*)");
    var results = regex.exec(window.location.href);
    var ret = (results === null) ? "" : results[1];
    return ret;
}

var emModeParamValue = getURLParam('emMode');
if (emModeParamValue !== null && emModeParamValue !== "")
    g_emMode = emModeParamValue;

function constructComponentRootURL(cdata) {
    var compURL = "";
    if (cdata && typeof cdata !== "undefined") {
        if (cdata.indexOf('/orarep/sqlmonitor/list') !== -1) {
            compURL = "sql-monitor/html/sql-monitor-list.html";
        } else if (cdata.indexOf('/orarep/perf/main') !== -1) {
            compURL = "perfhub/html/perfhub.html";
        } else if (cdata.indexOf('/orarep/sqlmonitor/main') !== -1) {
            compURL = "sql-monitor/html/sql-monitor-detail-actreport.html";
        } else if (cdata.indexOf('/orarep/cpaddm/main') !== -1) {
            compURL = "compare-period/html/compare-period-actreport.html";
        }
    }
    componentURL = baseUrl + compURL;
}

function getComponentRootURL(xmlTag)
{
    xmlTag = xmlTag.innerHTML;
    var parser;
    var xmlDoc = null;

    xmlTag = xmlTag.replace(/<!--FXTMODEL-->/g, "");
    //console.log(xmlTag);
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlTag, "text/xml");

    /*
     * NOTE:
     *  1. Every <report> element will have a <report_id> element.
     *  2. Simple/Single active report
     *      - There will be one <report> element and one <report_id>
     *      - Get this <report_id> and extract the contents of CDATA within it
     *  3. In case of composite active report there can be multiple <report_id> elements each for a corresponding <report> element.
     *      - Get the first <report_id> and extract the contents of CDATA within it
     */
    if ((typeof xmlDoc !== "undefined") && (xmlDoc.getElementsByTagName("report_id").length !== 0)) {
        var cdata = xmlDoc.getElementsByTagName("report_id")[0].textContent;
        console.log(cdata);
        constructComponentRootURL(cdata);
    }
}


/*  This function is for dynamically constructing the path of the iframe tag
 *  based on the version of the database release
 */
function writeIframe()
{
    // get the XML
    var xmlTag = document.getElementById("fxtmodel");

    if( xmlTag ) {
        getComponentRootURL(xmlTag);

        console.log("+++++ WRITING iframe TO THE DOCUMENT +++++", componentURL);

        var iFrameElement = document.createElement("iframe");
        iFrameElement.id = "iframe";
        iFrameElement.src = componentURL + 'index.html';
        iFrameElement.width = "100%";
        iFrameElement.height = "99%";
        document.getElementsByTagName('body')[0].appendChild(iFrameElement);
    }
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

//
//function emxActiveReportMessageReceived(event)
//{
//    console.log("+++++ Message received::emxActiveReportMessageReceived!!! :: g_emMode: " + g_emMode);
//    console.log(event);
//    if (g_emMode === "emx_active_report") {
//        g_activeReportXmlData = event.data;
//    }
//}
//
//if (typeof window.addEventListener !== 'undefined')
//{
//    console.log("+++++ emxActiveReport: window.addEventListener: ");
//    window.addEventListener("message", emxActiveReportMessageReceived, false);
//} else if (typeof window.attachEvent !== 'undefined')
//{
//    console.log("+++++ emxActiveReport: window.attachEvent: ");
//    window.attachEvent("onmessage", emxActiveReportMessageReceived);
//}
//
//console.log("+++++ Out emxActiveReport.js :: g_emMode: " + g_emMode);
