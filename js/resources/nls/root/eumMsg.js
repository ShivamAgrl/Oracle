define(
{
    "eua":
    {
        "dimension":
        {
            "endTime":               "End Time",
            "clientBrowser":         "Browser Type",
            "clientBrowserDetail":   "Browser Detail",
            "clientCity":            "Client City",
            "clientCountry":         "Client Country",
            "clientRegionCode":      "Client Region Code",
            "continentCode":         "Continent Code",
            "clientDevice":          "Device Type",
            "clientIP":              "Client IP",
            "clientISP":             "Provider",
            "clientLanguage":        "Language",
            "clientOS":              "Operating System",
            "clientOSDetail":        "Operating System Detail",
            "clientTerritory":       "Territory",
            "countryCode":           "Country Code", 
            "elementID":             "Element ID", 
            "errorMessage":          "Error Message",
            "fileName":              "File Name",
            "httpStatusCode":        "HTTP Status",
            "httpMethod":            "HTTP Method",
            "location":              "Location",
            "screenSize":            "Screen Size",
            "startTime":             "Start Time",
            "urlPath":               "URL Path",
            "userID":                "User ID",
            "windowSize":            "Window Size",
            "pageName":              "Page Name",
            "attributes":               "Attributes"
        },
        "metric":
        {
            "ajaxLoad":              "Call Processing",
            "ajaxLoadTime":          "Call Processing Time",
            "ajaxFetch":             "Call Response",
            "ajaxFetchTime":         "Call Response Time",
            "ajaxRequests":          "Ajax Calls",
            "ajaxErrors":            "Ajax Errors",
            "sessionHealth":         "Session Health",
            "ajaxHealth":            "RPdex",
            "pageHealth":            "Apdex",
            "duration":              "Duration",
            "firstByte":             "First Byte",
            "firstByteTime":         "First Byte Time",
            "instances":             "Instances",
            "interactive":           "Interactive",
            "interactiveTime":       "Interactive Time",
            "loadTime":              "Load Time",
            "pageClicks":            "Page Clicks",
            "pageLoads":             "Page Loads",
            "pageReady":             "Page Ready",
            "pageReadyTime":         "Page Ready Time",
            "pageViews":             "Page Views",
            "scriptErrors":          "JavaScript Errors",
            "viewingTime":           "Viewing Time",
            "sessions":              "Sessions"
        },
        "entity":
        {
            "page":            "Page",
            "pageClick":       "Page Click",
            "scriptError":     "JavaScript Error",
            "ajaxRequest":     "Ajax Call"
        },
        "session":
        {
            "ajaxRequestsErrors": "Ajax Calls / Errors",
            "notFound":           "The referenced session does not (or no longer) exist.",
            "pageContinuation":   "Continuation of activities for Page {pageName} - started on {startTime}",
            "percOfSessions":     "Percentage of sessions",
            "summary":            "Summary",
            "name":               "Name",
            "outsideAppScope":    "Outside of application scope",
            "timeLine":           "Timeline",
            "titleDetails":       "Session Details",
            "titleSessions":      "Sessions",
            "screenWindowSize":   "Screen / Window Size"
        },
        "apdex":
        {
            "apdexRating":     "Apdex Rating",
            "pagePerformance": "Page Performance",
            "ajaxPerformance": "Ajax Performance",
            "component":       "Component",
            "formula":         "Formula",
            "health":          "Health",
            "weight":          "Weight",
            "sumOfWeights":    "Sum of Weights",
            "sumOfHealths":    "Sum of Healths",
            "satisfied":       "Satisfied",
            "tolerating":      "Tolerating",
            "frustrated":      "Frustrated",
            "satisfiedCalls":  "Satisfied Calls",
            "toleratingCalls": "Tolerating Calls",
            "satisfiedViews":  "Satisfied Views",
            "toleratingViews": "Tolerating Views",
            "frustratedViews": "Frustrated Views",
            "titleApdexScore": "Apdex & User Satisfaction",
            "labelApdexScore": "Apdex Score",
            "satisfiedPerc":   "{0}% of page views are satisfied",
            "toleratingPerc":  "{0}% of page views are tolerating",
            "frustratedPerc":  "{0}% of page views are frustrated"
        },
        "clickpath":
        {
            "ariaSunburst":    "Click Path Sunburst visualization chart",
            "ariaLegend":      "Click Path visualization legend",
            "endWith":         "End With",
            "pathDepth":       "Path Depth",
            "pathDirection":   "Path Direction",
            "pathEndPerc":     "Sessions ending with this sequence: {sessionPerc}% ({sessionTotal})",
            "pathStartPerc":   "Sessions starting with this sequence: {sessionPerc}% ({sessionTotal})",
            "reversedOrder":   "Reversed Order",
            "sessionEnd":      "Session End",
            "sessionStart":    "Session Start",
            "startWith":       "Start With",
            "valueLimit":      "Value Limit",
            "viewBy":          "View By"
        },
        "charts":
        {
            "legend":          "Legend"
        },
        "action":
        {
             "save":          "Save",
             "loading":       "Loading...",
             "cancel":        "Cancel"
        },
        "abbreviation":
        {
            "seconds":        "s"
        },
        "format":
        {
            "durationDaysHoursMinutes":    "{days}d {hours}h {minutes}m",
            "durationHoursMinutesSeconds": "{hours}h {minutes}m {seconds}s",
            "durationMinutesSeconds":      "{minutes}m {seconds}s",
            "durationSeconds":             "{seconds}s"
        },
        "cfg":
        {
            "apdexCalcTitle":               "Application Performance Index (APDEX) Settings",
            "apdexCalcSubTitle":            "Apdex is a way to study measurements of any experience that can be interpreted on a scale ranging from excellent to unacceptable. Armed with measurements of many 'events' it is a way to summarize outcomes with a simple, easy-to-understand score. Apdex enables you to present a set of measurements so that a few, significant results receive more weight in the outcome. It also gives a voice to the group of experiences that typical statistical approaches dismiss as outliers.",
            "apdexFormula":                 "Use of the Apdex formula when applied to application response times as seen by the user: Apdex = (Number of Satisfactory samples + Number of Tolerating samples / 2) / Total samples",
            "apdexMeaning":                 "The above means we have to categorize the page loading times or ajax request loading times into three distinct buckets. In the settings screen below the first value chosen is representing the upper limit of time allowed so a page/ajax request is categorized as 'Satisfactory' while the second value represents the lower limit allowed for a page/ajax request to be categorized as 'Frustrated'. Any value between the 2 provided inputs is automatically assigned as being 'Tolerating'. (Note that 'Frustrated' does not participate in the computation of the Apdex.)",
            "apdexNote":                    "Note: As a best practice the lower limit for 'Frustrated' is about 4 times the upper limit for 'Satisfactory', for example 2 seconds and 8 seconds. However this is merely a guideline and any value can be used at your discretion.",
            "apdexCalcPageRange":           "Page Load Time",
            "apdexCalcAjaxRange":           "Ajax Call Response Time",
            "spdexCalcTitle":               "Session Health Settings",
            "spdexCalcSubTitle":            "Session health is using the results of both Apdex calculations for page and ajax requests. But it also takes into account that a user session could be impacted by errors in the execution of javascript and ajax requests. For the errors the categorization is performed  by automatically classifying each ajax request and Javascript execution as either 'ok', 'warning' or 'error'. For these classifications, again the Apdex is automatically calculated.",
            "spdexMeaning":                 "The result is that we now have 4 metrics available that determine the Session health: Page Apdex, Ajax Request Apdex, Javascript error Apdex and the Ajax request error Apdex. (Note: if a metric has no data, it will not be included in the Session health computations.)",
            "spdexNote":                    "In the section below you can influence the weight each component of the Session Health calculation and thus influence the calculated value.",
            "spdexCalcPagePerfWeight":      "Page Performance Weight",
            "spdexCalcAjaxPerfWeight":      "Ajax Performance Weight",
            "spdexCalcScriptErrorsWeight":  "Javascript Errors Weight",
            "spdexCalcAjaxErrorsWeight":    "Ajax Errors Weight",
            "seconds": "seconds",
            "to": "to",
            "satisfactory": "Satisfactory",
            "tolerable": "Tolerable"
        },
        "error":
        {
             "saveFailed": "Error: Save Failed."
        },
        "info":
        {
             "noData": "No data to display."
        }
    }
});
