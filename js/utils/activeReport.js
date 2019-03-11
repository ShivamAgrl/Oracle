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
			
function emxActiveReportMessageReceived(event)
{
    console.log("+++++ Message received::emxActiveReportMessageReceived!!! :: g_emMode: ");
    console.log(event);
	if(typeof event.data != "object")
	{
		if(event.data.indexOf("Fxtmodel") != -1)
		{
			console.log("+++++ Message received::emxActiveReportMessageReceived!!! in main");
			g_activeReportXmlData = event.data;
		}
	}
	
        //  Framework (either JET or omc) is posting other messages with event.data set to an object {id: 1, message: "oj-setImmeidate"}. 
        //  This will override the value of g_activeReportXmlData with the active report xml. Hence put additional checks
        //  window.DBCSPERF_APP_MODE = "ACTIVE_REPORT" always in active report mode and hence will not suffice
        // if (event.data && (event.data.indexOf("<report") !== -1)) {  //DOES'NT work, since event.data may not be a string always.
}

if (typeof window.addEventListener !== 'undefined')
{
    console.log("+++++ activeReportInit.js: window.addEventListener: ");
    window.addEventListener("message", emxActiveReportMessageReceived, false);  
} else if (typeof window.attachEvent !== 'undefined')
{
    console.log("+++++ activeReportInit.js: window.attachEvent: ");
    window.attachEvent("onmessage", emxActiveReportMessageReceived);
}     