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

,
        "generalProperties":
        {
            "MS": "ms"
            ,"MS_WITH_VALUE": "{0} ms"
            ,"NS": "ns"
            ,"NS_WITH_VALUE": "{0} ns"
            ,"SECONDS": "s"
            ,"SECONDS_WITH_VALUE": "{0} s"
            ,"MINUTES": "m"
            ,"MINUTES_WITH_VALUE": "{0} m"
            ,"HOURS": "h"
            ,"HOURS_WITH_VALUE": "{0} h"
            ,"DAYS": "d"
            ,"DAYS_WITH_VALUE": "{0} d"
            ,"SUMMARY": "Summary"
            ,"EXPAND": "Expand"
            ,"COLLAPSE": "Collapse"
            ,"UA_INITIAL_TEXT": "Welcome to Application Performance Monitoring."
            ,"YES": "Yes"
            ,"NO": "No"
            ,"OK": "OK"
            ,"CANCEL": "Cancel"
            ,"CLOSE": "Close"
            ,"SAVE": "Save"
            ,"APPLY": "Apply"
            ,"NOT_APPLICABLE": "-"
            ,"NONE": "-"
            ,"TOOLTIP_DATE": "Date"
            ,"TOOLTIP_TIME": "Time"
            ,"SELECT_ONE": "select one"
            ,"DEFAULT_LIST_MESSAGE": "List of objects"
            ,"TOTAL": "total"
            ,"HIDE_COLUMN": "Hide Column"
            ,"INSERT_COLUMN": "Insert Column"
            ,"COLUMN_MENU": "Column Menu"
            ,"ADD": "Add"
            ,"REMOVE": "Remove"
            ,"UPDATE" : "Update"
            ,"ENABLED": "Enabled"
            ,"TIME_UNIT_MILLISECONDS": "milliseconds"
            ,"TIME_UNIT_SECONDS": "seconds"
            ,"TIME_UNIT_MINUTES": "minutes"
            ,"TIME_UNIT_HOURS": "hours"
            ,"ADDITIONAL_INFO_FOR": "Additional information for {0}" //This is the title for a popup that provides additional data about the object named in {0}
            ,"ADDITIONAL_INFO": "Additional Information"
            ,"CLOSE_POPUP": "Close Popup"
            ,"ADDITIONAL_INFO_TABLE_SUMMARY": "Additional information for {0} from related REST calls"
            ,"ERROR": "Error"
            ,"RIGHT_POINT_DOUBLE_ANGLE_QUOTATION": "&#187;"
            ,"UNSAVED_TOOL_WARNING":"There are unsaved changes. Are you sure you want to leave this page?"
            ,"REDEPLOY":"Redeploy"
            ,"ROW_SELECTION_REQUIRED": "Row selection required."
        },
        "errorProperties":
        {
            "ERROR_DIALOG_TITLE": "Error Message(s)"
            ,"ERROR_DIALOG_TOOLTIP": "Show error(s)"
            ,"ERROR": " (error)"
            ,"REST_ERROR_NOT_AVAILABLE": "APM UI cannot be shown. ApmDataServer service is either unavailable or not in a ready state."
            ,"REST_ERROR_NO_REST_STATUS": "ApmDataServer service did not return a status page.  The ApmDataServer URL is: {0} {1}"
            ,"UA_GOT_ERROR_TEXT": "The page could not render properly.  There were errors, please open error dialog to view error(s) details."
            ,"SAVE_SEARCHES_NOT_AVAILABLE": "Save Search Framework is not available."
            ,"SAVE_SEARCHES_CANNOT_SAVE": "The search cannot be saved."
            ,"SAVE_SEARCHES_CANNOT_LOAD": "Could not load saved searches."
            ,"NO_AGENTS_COMMENT": "There are no APM Agents installed. Please install APM agents on each of the application servers that host the applications you wish to monitor."
            ,"INVALID_TENANT": "The identity domain name you entered is not valid."
            ,"INVALID_TENANT_COMMENT": "Please contact your Oracle Cloud administrator."
            ,"UNKNOWN_INIT_ERROR": "An unknown error occurred during initialization of APM UI."
            ,"UNKNOWN_INIT_ERROR_COMMENT": "To view the error click on the warning icon above.  Please contact your Oracle Cloud administrator."
            ,"INVALID_TIME_PERIOD": "The time period specified on the URL is not valid."
            ,"INVALID_TIME_PERIOD_COMMENT": "Please modify the URL to specify a valid time period. "
            ,"404_ERROR": "The requested page was not found."
            ,"ERROR_GETTING_DIAGRAM_DATA": "Error getting diagram data."
            ,"FILE_API_NOT_SUPPORTED_BY_BROWSER": "The File APIs are not fully supported in this browser."
            ,"FILE_PROPERTY_OF_FILE_INPUT_NOT_SUPPORTED": "This browser doesn't seem to support the `files` property of file inputs."
            ,"ERROR_LOG_ANALYTICS": "Error retrieving data from the Log Analytics service."
            ,"ERROR_MONITORING_SERVICE": "Error retrieving data from the Monitoring service."
            ,"ERROR_EVENT_SERVICE": "Error retrieving data from the Event service."
            ,"ERROR_PLANNED_DOWNTIME": "Cannot complete user action, perhaps due to scheduled downtime/maintenance."
            ,"ERROR_TENANT_LOCKED": "Cannot complete user action due to a conflict. Please try again shortly."
        },        
        "headerProperties":
        {
            "HOME_TITLE": "Home"
            ,"SESSIONS_TITLE": "Sessions"
            ,"SYNTESTS_TITLE": "Synthetic Tests"
            ,"SYNTHETIC_MONITORING_TITLE" : "Synthetic Monitoring"
            ,"APPLICATION_DEFINITIONS_TITLE": "Application Definitions"
            ,"BROWSER_AGENT_TITLE": "Browser Agent"
            ,"APPLICATIONS_TITLE": "Applications"
            ,"PAGES_TITLE": "Pages"
            ,"MOBILE_CLIENTS_TITLE": "Mobile Clients"
            ,"MOBILE_METHODS_TITLE" : "View Controllers/Activities"
            ,"MOBILE_REQUESTS_TITLE" : "HTTP Requests"
            ,"MOBILE_CLIENT_REG_TITLE" : "Mobile Client Registrations"
            ,"BROWSER_TITLE": "End Users"
            ,"MOBILE_TITLE": "Mobile"
            ,"SERVER_TITLE": "Server"
            ,"DB_TIER": "DB Tier"
            ,"CONTAINERS": "Dockers/Containers"
            ,"AJAX_CALLS_TITLE": "Ajax Calls"
            ,"REQUESTS_TITLE": "Server Requests"
            ,"LOGICAL_REQUESTS_TITLE": "Logical Server Requests"
            ,"THREAD_PROFILERS": "Thread Profiles"
            ,"APP_TYPE": "AppServer Type"
            ,"AGENT_VERSION": "Agent Version"
            ,"JFR_SUPPORTED": "{0} Support"
            ,"DIAG_HEAP_DUMP": "Heap Dumps"
            ,"DIAG_CLASS_HISTOGRAM": "Class Histograms"
            ,"DIAG_JFR_FINDING": "Findings"
            ,"DIAG_CLASS_HISTO": "Class Histogram"
            ,"DIAG_START_HEAP_DUMP": "Take Heap Dump"
            ,"DIAG_START_CLASS_HISTOGRAM": "Create Class Histograms"
            ,"DIAG_JFR": "JFR Dumps"
            ,"DIAG_JFR_CONFIG_ON": "Yes"
            ,"DIAG_JFR_CONFIG_DISABLED": "Disabled"
            ,"DIAG_JFR_CONFIG_NOT_SUPPORTED": "No"
            ,"DIAG_JFR_CONFIG_OFF": "Off"
            ,"DIAG_JFR_CONFIG_UNDEFINED": "No"
	    ,"DIAGNOSTIC_SNAPSHOTS": "Diagnostic Snapshots"
            ,"DIAG_START_JFR": "Dump JFR"
            ,"DIAGNOSTIC_SNAPSHOTS_VIEW": "View Diagnostic Snapshots"
            ,"THREAD_PROFILERS_SUMMARY": "Thread Profile Summary"
            ,"CLASS_HISTOGRAM_SUMMARY": "Class Histogram Summary"
            ,"SERVERS_TITLE": "AppServers"
            ,"ALERTS_TITLE" : "Alerts"
            ,"ALERT_RULES_TITLE" : "Alert Rules"
            ,"LOGS_TITLE" : "Log Explorer"
            ,"NO_DATA": "No data to display."
            ,"FEATURE_DISABLED": "This feature is disabled."
            ,"NO_DATA_MORE_TEXT": " The list of objects or the object you are trying to view cannot be found.  Make sure you have the correct time period selected."
            ,"LOADING": "Loading..."
            ,"NO_TITLE": " " //this needs to be a space, if it is empty string the key value displays instead
            ,"INSTANCE": "Server Request Instance"
            ,"APP_SERVER": "AppServer"
            ,"DEPLOYMENT": "Deployment"
            ,"FLOW_START": "Is Flow Start"
            ,"DOMAIN": "Domain"
            ,"NAME": "Name"
            ,"DESCRIPTION": "Description"
            ,"TYPE": "Type"
            ,"HOST": "Host"
            ,"PORT": "Port"
	    ,"SESSION": "Session"
	    ,"SYNTEST": "Synthetic Test"
            ,"PAGE": "Page"
            ,"PAGE_URL": "URL"
            ,"REQUEST": "Server Request"
            ,"REQUEST_INSTANCE": "Server Request Instance"
            ,"LOGICAL_REQUEST": "Logical Server Request"
            ,"AJAX_CALL": "Ajax Call"
            ,"MOBILE_CLIENT": "Mobile Client"
            ,"VIEW_CONTROLLER" : "View Controller"
            ,"ACTIVITY" : "Activity"
            ,"MOBILE_REQUEST" : "HTTP Request"
            ,"OPERATING_SYSTEM": "O/S"
            ,"START_TIME": "Start Time"
            ,"FILTER_PLACEHOLDER": "Search all Server Requests..."
            ,"PREFERENCES": "Preferences..."
            ,"HELP": "Help..."
            ,"ABOUT": "About..."
            ,"HIDE_UA": "Hide User Assistant"
            ,"SHOW_UA": "Show User Assistant"
            ,"SIGN_OUT": "Sign Out"
            ,"PRODUCT_NAME_EM": "Enterprise Manager"
            ,"PRODUCT_NAME_EM_CLOUD": "Cloud Service"
            ,"APPLICATION_NAME": "Application Performance Monitoring"
            ,"REQUEST_TYPE_DETAIL_ALT": "Server Request"
	    ,"SESSION_DETAIL_ALT": "Session"
	    ,"SYNTEST_DETAIL_ALT": "Synthetic Test"
	    ,"THREAD_RPOFILER_SUMMARY_ALT": "Thread Profile"
            ,"PAGE_DETAIL_ALT": "Page"
            ,"INSTANCE_DETAIL_ALT": "Server Request Instance"
            ,"AJAX_DETAIL_ALT": "Ajax Request"
            ,"APPSERVER_DETAIL_ALT": "AppServer"
            ,"MOBILE_CLIENT_DETAIL_ALT": "Mobile Client"
            ,"MOBILE_METHOD_DETAIL_ALT": "View Controllers/Activities"
            ,"MOBILE_REQUEST_DETAIL_ALT": "Mobile HTTP Request"
            ,"URL": "URL"
            ,"VIEW_LOG": "View Log"
            ,"VIEW_REPORT":"Download"
            ,"START_THREAD_PROFILER": "Start Thread Profiler"
            ,"THREAD_PROFILER_TITLE": "Thread Profiler"
            ,"VIEW_RELATED_APPSERVERS": "View Related Appservers"
            ,"VIEW_RELATED_LOG": "View Related Logs"
            ,"VIEW_LOG_NO_LA": "Cannot view logs"
            ,"VIEW_LOG_SIGNUP_EE": "To use this feature the APM Enterprise Edition License is required."
            ,"VIEW_LOG_SIGNUP_LA": "Unable to locate the Log Analytics Cloud Service."
            ,"VIEW_LOG_SIGNUP_ITA": "Unable to locate the IT Analytics Cloud Service."
            ,"VIEW_LOG_NO_TARGETS": "No targets found. You may not have permissions to view related targets."
            ,"CANNOT_LOCATE_MS": "Unable to locate the Monitoring Cloud Service."
            ,"VIEW_MS_SIGNUP_MONITORING": "Unable to locate the Monitoring Cloud Service."
            ,"NO_HOST_ENTITY_ID": "Host ID is not available to show info."
            ,"SORT_FIELD_LABEL": "Sort Field Selection"
            ,"TIME_SELECTION_LABEL": "Time Range Selection"
            ,"ADMINISTRATION_TITLE": "APM Admin"
            ,"TOPOLOGY": "Topology"
            ,"ALERTS": "Alerts"
            ,"SETTINGS_TITLE": "Metric Settings"
            ,"IP_MASKING_TITLE": "IP Masking"
            ,"IP_MASKING_DESCRIPTION": "It may be required, e.g. to be compliant with country specific data privacy laws and restrictions, to enable IP masking for all data monitored by the Browser Agent. When enabled, IP addresses will be blanked (0.0.0.0) prior to its use and storage. Note that this will also disable geographic reporting."
            ,"BEACON_POOL_TITLE": "Synthetic Test Locations"
            ,"HAR_VIEWER_TITLE":"Har Statistics"
            ,"VIEW_MODE_LIST": "List View"
            ,"VIEW_MODE_CHART": "Chart View"
        },
        "listProperties":
        {
            "DEFAULT_LIST_MESSAGE": "List of objects"
            ,"DASHBOARD_SERVER_REQUESTS_LIST": "List of top 5 Server Requests for selected metric."
            ,"DASHBOARD_PAGES_LIST": "List of top 5 Pages for selected metric."
            ,"DASHBOARD_APPSERVER_LIST": "List of top 5 AppServers for selected metric."
            ,"AJAX_CALLS_FOR_PAGE": "List of Ajax Calls for current Page"
            ,"SERVER_REQUESTS_FOR_PAGE": "List of Server Requests for current Page"
            ,"SERVER_REQUESTS_FOR_AJAX": "List of Server Requests for current Ajax Call"
            ,"SERVER_REQUESTS_FOR_APPSERVER": "List of Server Requests for current AppServer"
            ,"LINKS_FOR_SERVER_REQUEST": "List of Links for current Server Request"
            ,"CALLERS_FOR_SERVER_REQUEST": "List of Callers for current Server Request"
            ,"DATABASE_CALLS_FOR_SERVER_REQUEST": "List of Database Calls for current Server Request"
        },
        "tabNameProperties":        
        {
            "SUMMARY": "Metrics"
            ,"PAGE_SUMMARY": "Page Summary"
            ,"REQUEST_SUMMARY": "Server Request Summary"
            ,"APPSERVER_SUMMARY": "AppServer Summary"
            ,"AJAX_SUMMARY": "Ajax Call Summary"
            ,"LINKS": "Links"
            ,"DATABASE": "Database"
            ,"INSTANCES": "Instances"
            ,"CHARTS": "Charts"
            ,"REQUESTS": "Server Requests"
            ,"THREAD_PROFILER": "Thread Profiles"
            ,"AJAX": "Ajax Calls"
            ,"CALLERS": "Callers"
            ,"DIAGRAM": "Diagram"
            ,"GEOGRAPHY": "Geography"
            ,"ALERTS": "Alerts"
            ,"USAGE": "Usage"
            ,"PROFILER_REQUEST" : "Requests"
            ,"PROFILER_STACKS" : "Stacks"
            ,"PROFILER_THREAD":"Thread"
            ,"PAGES": "Pages"
            ,"APP_METRIC": "Application Metrics"
            ,"APP_PERF": "Performance Analysis"
            ,"APP_ENDUSERS": "End Users"
        },
        "timeSelectorProperties":
        {
            "LAST_HOUR": "Last Hour"
            ,"LAST_DAY": "Last Day"
            ,"LAST_WEEK": "Last Week"
            ,"LAST_UPDATED": "Last Updated:"
            ,"TODAY": "Today " // notice space
            ,"YESTERDAY": "Yesterday " // notice space
        },
        "tierProperties":
        {
             "APP_SERVER": "AppServer"
            ,"DATABASE": "Database"
            ,"EXTERNAL": "External"
            ,"TIER_LABEL_application": "AppServer"
            ,"TIER_LABEL_database": "Database"
            ,"TIER_LABEL_external": "External"
            ,"AVG_APP_SERVER": "Average AppServer Time"
            ,"AVG_DATABASE": "Average Database Time"
            ,"AVG_EXTERNAL": "Average External Time"
        },
        "chartProperties":
        {
             "AVG_RESP_TIME": "Avg Response Time"
            ,"MIN_RESP_TIME": "Min Response Time"
            ,"MAX_RESP_TIME": "Max Response Time"
            ,"AVG_LOAD_TIME": "Avg Load Time"
            ,"MIN_LOAD_TIME": "Min Load Time"
            ,"MAX_LOAD_TIME": "Max Load Time"
            ,"MAX_MIN_LOAD_TIME": "Max/Min Load Time Range"
            ,"MAX_MIN_RESPONSE_TIME": "Max/Min Response Time Range"
            ,"AVG_CONTENT_LOAD_TIME": "Avg Content Load Time"
            ,"AVG_REDIRECT_TIME": "Avg Redirect Time"
            ,"AVG_CONNECT_TIME": "Avg Connect Time"
            ,"AVG_FIRST_BYTE_TIME": "Avg First Byte Time"
            ,"UNIT_SECONDS": "Seconds"
            ,"UNIT_BYTES": "Bytes"
            ,"UNIT_BYTES_PER_SEC": "B/s"
            ,"SUCCESSFUL": "Successful"
            ,"SUCCESSFUL_CALLS": "Successful Calls"
            ,"SUCCESSFUL_VIEWS": "Successful Views"
            ,"SATISFIED": "Satisfied"
            ,"SATISFIED_PCT": "Satisfied %"
            ,"SATISFIED_VIEWS": "Satisfied Views"
            ,"TOLERATING": "Tolerating"
            ,"TOLERATING_PCT": "Tolerating %"
            ,"TOLERATING_VIEWS": "Tolerating Views"
            ,"FRUSTRATED": "Frustrated"
            ,"FRUSTRATED_PCT": "Frustrated %"
            ,"FRUSTRATED_VIEWS": "Frustrated Views"
            ,"SUCCESSFUL_TESTS": "Successful Tests"
            ,"EXECUTED_TESTS": "Executed Tests"
            ,"AJAX_CALLS": "Ajax Calls"
            ,"TOTAL": "Total"
            ,"TOTAL_CALLS": "Total Calls"
            ,"TOTAL_VIEWS": "Total Views"
            ,"FAILED": "Failed"
            ,"FAILED_TESTS": "Failed Tests"
            ,"TRANSFER_RATE": "Transfer Rate"
            ,"AVG_TRANSFER_RATE": "Avg Transfer Rate"
            ,"DOWNLOAD_SIZE": "Download Size"
            ,"AVG_DOWNLOAD_SIZE": "Avg Download Size"
            ,"ERRORS": "Errors"
            ,"MIN_TIME": "Min Time"
            ,"MAX_TIME": "Max Time"
            ,"NORMAL": "Normal"
            ,"FAULT": "Fault"
            ,"SYNTHETIC": "Synthetic"
            ,"OTHER_REASON": "Other"
            ,"INSTANCE_SUFFIX": "Instance"
            ,"ERROR": "Error"
            ,"APDEX": "Apdex"
            ,"TIME_OCCURRED": "Time Occurred"
            ,"MEASUREMENT_CHARTS": "Measurement Charts"
            ,"GRANULARITY": "Granularity"
            ,"RESPONSE_TIME_MS": "Milliseconds"
            ,"NUMBER_OF_CALLS": "Count"
            ,"NUMBER_OF_VIEWS": "Count"
            ,"AVG_RESPONSE_TIME_MS": "Milliseconds"
            ,"AVG_LOAD_TIME_MS": "Milliseconds"
            ,"OVERVIEW_TITLE": "Time Selection"
            ,"REQUEST_LINE_TITLE": "Request Response Time"
            ,"PAGE_LINE_CHART_TITLE": "Page Load Time"
            ,"AJAX_LINE_CHART_TITLE": "Ajax Call Response Time"
            ,"CALLS_TITLE": "Calls"
            ,"ERRORS_TITLE": "Errors"
            ,"PAGE_VIEWS_TITLE": "Page Views"
            ,"PAGE_ERRORS_TITLE": "Page Errors"
            ,"AJAX_CALLS_TITLE": "Calls & Errors"
            ,"TIER_BREAKDOWN_TITLE": "Tier Average Response"
            ,"PAGE_BREAKDOWN_TITLE": "Average Page Load Breakdown"
            ,"PAGE_USER_SATISFACTION_TITLE": "Page User Satisfaction"
            ,"AJAX_BREAKDOWN_TITLE": "Average Response Breakdown"
            ,"SELECTED_TIME_RANGE": "Selected Time Range"
            ,"RESPONSE_TIME_RANGE": "Response Time Range"
            ,"ADJUST_TIME_RANGE": "Set the global page time to match the currently selected time window"
            ,"CRASH_COUNT_TITLE": "Crash Counts"
            ,"DEVICE_COUNT_TITLE": "Device Counts"
            ,"ADJUST_HANDLES_TO_CHANGE_GRANULARITY": "Adjust the handles to change data granularity."
            ,"PERCENTILES_TITLE": "Response Time Percentiles"
            ,"PERCENTILE_99": "99th"
            ,"PERCENTILE_95": "95th"
            ,"PERCENTILE_75": "75th"
            ,"PERCENTILE_50": "50th"
            ,"PERCENTILE_25": "25th"
            ,"CHART_MENU": "Chart Menu"
            ,"CREATE_ALERT_RULE": "Create Alert Rule"
        },
        "mobileProperties":
        {
            "OS_TYPE_ANDROID": "Android"
            ,"OS_TYPE_IOS": "iOS"
            ,"CRASHES": "Crashes"
            ,"VERSION": "Version"
            ,"OS_TYPE": "OS Type"
            ,"APPLICATION": "Application"
            ,"MOBILE_CLIENT_NAME": "Mobile Client"
            ,"DEVICE": "Device"
            ,"VIEW_CONTROLLERS": "View Controllers"
            ,"ACTIVITIES": "Activities"
            ,"MOBILE_METHODS" : "View Controllers/Activities"
            ,"MOBILE_METHOD" : "View Controller/Activity"
            ,"HTTP_REQUESTS": "HTTP Requests"
            ,"CALLS_AND_ERRORS_CHART_TITLE": "Calls and Errors"
            ,"CRASH_COUNTS_RATE_CHART_TITLE": "Crashes"
            ,"RESPONSE_TIME_CHART_TITLE": "Response Time"
            ,"VOLUME": "Volume"
            ,"ERRORS": "Errors"
            ,"CRASH_DISTRIBUTION": "Crash Distribution"
            ,"NO_MOBILE_REGISTRATIONS": "You have no mobile client registrations to display."
            ,"TRY_CREATING_AN_MOBILE_CLIENT": "To register a mobile client, click the Register Mobile Client button above."
            ,"CREATE_NEW_MOBILE_CLIENT_BUTTON": "Register Mobile Client"
            ,"MOBILE_TOOL_TITLE_CREATE": "Register Mobile Client"
            ,"MOBILE_CLIENT_SPEC": "Mobile Client Specification"
            ,"MOBILE_CLIENT_NEW_INTRO": "Specify properties for your mobile client registration. APM will use the properties to register new mobile client. "
            ,"MOBILE_CLIENT_NAME_LABEL": "Mobile Client Name"
            ,"MOBILE_GENRE_LABEL": "Mobile Client Platform"
            ,"MOBILE_REG_KEY_LABEL": "Registration Key"
            ,"MOBILE_CLIENT_APP_ID": "Mobile Client App Id"
            ,"MOBILE_REG_INPUT_ERROR_MSG": "Failed to register mobile client. Check if your mobile client name or registration key is valid; mobile client name should be unique."
            ,"MEID": "MEID"
            ,"REGISTER": "Register"
        },
        "requestProperties":
        {
            "ON": "{0} on {1}"  // used in request instance call tree external operation. {0} is the operation name. {1} is the deployment
            ,"IN": "in"
            ,"AVG": "Avg"
            ,"MAX": "Max"
            ,"MIN": "Min"
            ,"AVG_METRIC": "Avg {0}"    // {0} is the name of a metric name (i.e. "Response Time")
            ,"MAX_METRIC": "Max {0}"    // {0} is the name of a metric name (i.e. "Response Time")
            ,"MIN_METRIC": "Min {0}"    // {0} is the name of a metric name (i.e. "Response Time")
            ,"AVG_SMALL": "{0} avg" // used on request response time tile, {0} is a unit of time (i.e. 'ms'), "avg" is an abbreviation of "average"
            ,"AVG_RESPONSE": "Avg Response"
            ,"MAX_MIN_RESPONSE": "Max, Min Response"
            ,"RESPONSE_TIME_MS": "Response Time (ms)"
            ,"RESPONSE_TIME": "Response Time"
            ,"REQUEST_RESPONSE_TIME": "Request Response Time"
            ,"SELF_TIME_MS": "Self Time (ms)"
            ,"LOAD": "Load"
            ,"ERRORS": "Errors"
            ,"CALL_RATE": "Call Rate (/min)"
            ,"TILE_CALL_RATE": "Call Rate"
            ,"TILE_ERROR_RATE": "Error Rate"
            ,"LOAD_AND_ERRORS": "Calls & Errors"
            ,"AVG_TIER_TIME": "Avg Tier Time"
            ,"OPERATION_NAME": "Server Request Name"
            ,"AVERAGE_RESPONSE_TIME": "Average Response Time"
            ,"MAXIMUM_RESPONSE_TIME": "Maximum Response Time"
            ,"MINIMUM_RESPONSE_TIME": "Minimum Response Time"
            ,"ERROR_PERCENTAGE": "Error %"
            ,"SERVER_NAME": "Server Name"
            ,"TYPE": "Type"
            ,"FLOW_START": "Is Flow Start"
            ,"APP_SERVER": "AppServer"
            ,"APP_SERVER_HOST": "AppServer Host"
            ,"APP_SERVER_PORT": "AppServer Port"
            ,"APP_SERVER_SSL_PORT": "AppServer SSL Port"
            ,"DEPLOYMENT": "Deployment"
            ,"REQUEST_SUMMARY": "Request Summary"
            ,"RESPONSE": "Response"
            ,"AVERAGE": "Average"
            //,"PRIOR_HOUR": "prior hour"
            //,"PRIOR_DAY": "prior day"
            //,"PRIOR_WEEK": "prior week"
            ,"PCT_OF_PRIOR": "{0}% of prior" // {0} is percentage value
            ,"NO_PRIOR_DATA": "no prior data"
            ,"NO_CHANGE": "no change"
            ,"SAME_AS": "same as prior"
            ,"PRIOR_TOOLTIP_UP": "Current value increased {0}% from prior period's value of {1}" // {0} is % number, {1} is value number
            ,"PRIOR_TOOLTIP_DOWN": "Current value decreased {0}% from prior period's value of {1}" // {0} is % number, {1} is value number
            ,"AVG_RESP_TIME_METER_TOOLTIP": "Avg response time: {2}\nMax response time: {1}\nMin response time: {0}"
            ,"CALLS": "Calls"
            ,"VIEWS": "Page Views"
            ,"PER_MIN": "/min"
            ,"TOTAL": "Total"
            ,"TOTAL_ERRORS": "Total Errors"
            ,"UP": "Increased"
            ,"DOWN": "Decreased"
            ,"TIER_BREAKDOWN": "Tier Average Response"
            ,"HEAP_MEMORY": "Heap Memory"
            ,"AVERAGE_USAGE_PER_CPU": "CPU Usage"
            ,"CPU_USAGE": "CPU Usage"
            ,"CPU_USAGE_PERCENT": "CPU Usage Percentage"
            ,"MEMORY_ALLOCATION": "Allocation"
            ,"MEMORY_ALLOCATION_PERCENT": "Allocation Rate"
            ,"OP_FULL_NAME": "{0} in {1}" // {0} is operation Name, {1} is server request name
            ,"NO_PERCENTILES_BECAUSE_OF_LONG_TIME_PERIOD": "To see percentiles, please narrow the time selection to less than two hours."
            ,"REQUEST_TYPE_TOOLTIP": "Server Request Type: {0} (based on start operation)" // {0} request type, eg. Servlet, JDBC, JMS etc
        },
        "instanceProperties":
        {
            "REQUEST_INSTANCES": "Request Instances"
            ,"TABLE": "Table"
            ,"SECONDS": "sec"
            ,"START_TIME": "Start Time"
            ,"END_TIME": "End Time"
            ,"DURATION": "Duration"
            ,"DURATION_MS": "Duration (ms)"
            ,"ERRORS": "Errors"
            ,"LINKS": "Internal Calls"
            ,"REASON_CAPTURED": "Reason Captured"
            ,"CPU_USAGE": "CPU Usage"
            ,"CPU_USAGE_MS": "CPU Usage (ms)"
            ,"ALLOCATION": "Allocation"
            ,"ALLOCATION_MB": "Allocation (MB)"
            ,"SNAPSHOTS": "Snapshots"
            ,"FINDING_TITLE": "Show Findings"
            ,"PERCENTAGE": "%"
            ,"SLASH": "/"
            ,"COLON": ": "
            ,"OPEN_BRACKET": "("
            ,"CLOSE_BRACKET": ")"
            ,"STATUS": "Status"
            ,"TIER_TIME": "Tier Time"
            ,"REQUEST_INSTANCE_SUMMARY": "Instance Summary"
            ,"ERROR": "Error"
            ,"NO_ERROR": "No error"
            ,"RESPONSE_TIME": "Response Time"
            ,"APP_SERVER": "AppServer"
            ,"CALL_TREE": "Call Tree"
            ,"TREE_TABLE": "Tree Table"
            ,"FLAT_TABLE": "Flat Table"
            ,"TIME_LINE": "Time Line"
            ,"DIAGRAM": "Diagram"
            ,"NAME": "Name"
            ,"DEPLOYMENT": "Deployment"
            ,"SQL_ID": "SQL ID"
            ,"SNAPSHOT": "Snapshot"
            ,"COMPONENT_TYPE": "Component Type"
            ,"TIER": "Tier"
            ,"CALL_START_TIME": "Start Time"
            ,"CALL_END_TIME": "End Time"
            ,"SELF_TIME_MS": "Self Time (ms)"
            ,"SELF_TIME": "Self Time"
            ,"RESPONSE_TIME_MS": "Response Time (ms)"
            ,"RESPONSE_TIME_AND_TIER_BREAKDOWN_MS": "Tiers & Response Time (ms)"
            ,"RESPONSE_TIME_AND_TIER_BREAKDOWN": "Tiers & Response Time"
            ,"CALL_TYPE": "Call Type"
            ,"PERCENT_OF_RESPONSE_TIME_METER_TOOLTIP": "{0} ms is {1}% of this instance's overall response time"
            ,"THREAD_STATE_RUNNABLE": "Runnable"
            ,"THREAD_STATE_LOCK": "Lock"
            ,"THREAD_STATE_DB": "DB"
            ,"THREAD_STATE_NETWORK": "Network"
            ,"THREAD_STATE_IO": "I/O"
            ,"THREAD_STATE_OTHER": "Other"
            ,"CALLER": "Caller"
            ,"CALLEE": "Callee"
            ,"ABRIDGED": "Abridged"
            ,"SHOWING_N_OF_M_LINKS": "(showing {0} of {1} internal calls)"
            ,"SHOWING_ALL_M_LINKS": "(showing all {0} internal calls)"
            ,"ECID": "ECID"
            ,"LATENCY_MS": "Latency (ms)"
            ,"LATENCY": "Latency"
            ,"INSTANCE_START": "Instance Start"
            ,"N0_INSTANCES_BECAUSE_OF_LONG_TIME_PERIOD": "To see instances, please narrow the time selection to two days or less."
            ,"CLICKING_ICON_WILL_OPEN_RELATED_INSTANCE": "Double click icon to open related instance."
            ,"TIER_BREAKDOWN_IS_UNAVAILABLE_FOR_ABRIDGED_INSTANCES": "Tier breakdown is unavailable for abridged instances."
            ,"SUCCESS": "Success"
            ,"FAILURE": "Failure"
            ,"ERROR_DETAILS_DIALOG_TITLE_INSTANCE_LIST": "Instance Started at {0} Error Details"        // {0} is the date and time. For example ''
            ,"ERROR_DETAILS_DIALOG_TITLE_INSTANCE_SUMMARY": "{0} Error Details"
            ,"ERROR_TYPE_CODE": "Error"
            ,"ERROR_MESSAGE": "Error Message"
            ,"ERROR_STACK": "Error Stack"
            ,"NO_ERROR_DETAILS_AVAILABLE": "No error details are available."
            ,"NO_ERROR_DETAILS_AVAILABLE_BECAUSE_INSTANCE_EXPIRED": "No error details are available because the instance may have expired."
            ,"ERROR_STACK_LINE_FORMAT": "  at {0}.{1} ({2}:{3})"    // {0} is class name, {1} is method name, {2} is file name, and {3} is line number. For example ' at TableModel.getRow (tableModel.js:123)'. This is one line of an error stack and is not part of a concatenation.
            ,"ERROR_STACK_LINE_NATIVE": "  at {0}.{1} (Native)"     // {0} is class name, {1} is method name
            ,"ERROR_STACK_LINE_UNKNOWN": "  at {0}.{1} (Unknown)"     // {0} is class name, {1} is method name
            ,"NO_STACK_AVAILABLE_FOR_ERROR": "No stack is available for this error."
            ,"LOG_MESSAGES": "Log Messages"
            ,"OTHER_SEVERITIES": "Other"
            ,"NO_MESSAGES": "No log messages"
            ,"APPSERVER_RESPONSE_TIME": "AppServer Response Time"
            ,"DATABASE_RESPONSE_TIME": "Database Response Time"
            ,"EXTERNAL_RESPONSE_TIME": "External Response Time"
            ,"ERROR_VIEWING_SQL_DETAILS": "Cannot view SQL details because APM cannot determine the entity ID of the database connection."
            ,"REQUEST_APM_FINDING": "We detected multiple executions of certain SQL statements in the course of completing the request instance. You may want to change the code or configuration to optimize the access to the DB, by reducing the count of executions."
            ,"FINDING_SQL_STATEMENT": "SQL Statement"
            ,"FINDING_EXECUTIONS": "Executions"
            ,"FINDING_AVERAGE_TIME": "Average Time (ms)"
            ,"FINDING_TOTAL_TIME": "Total Time (ms)"
        },
        "callStackProperties":
        {
            "CALL_STACK_TREE" : "Call Stack Tree"
            ,"TREE_TABLE": "Tree Table"
            ,"METHOD_NAME": "Method Name"
            ,"SELF_SNAPSHOTS": "Snapshot Count"
            ,"JVM_TIME": "Occurrence (%)"
            ,"FILE_NAME": "File Name"
            ,"LINE_NUMBER": "Line"
            ,"FIRST_SNAPSHOT": "First Snapshot"
            ,"TOTAL_SNAPSHOT": "Total Snapshot"
            ,"THREAD_COUNT": "Thread Count"
            ,"FREQUENCY": "Interval"
            ,"GC_OVERHEAD": "GC Overhead"
            ,"SNAPSHOT_SUMMARY": "Snapshot Summary"
            ,"SNAPSHOTS": "Snapshots"
            ,"SNAPSHOTS_TIMELINE": "Snapshots Timeline"
            ,"SHOW_SNAPSHOT": "Show Snapshot"
            ,"BLOCK_TIME": "Block Time"
            ,"SHOW_CALLER": "Show Caller"
            ,"HIDE_CALLER": "Hide Caller"
            ,"SNAPSHOT_NOT_AVAILABLE_MESSAGE": "Snapshots are available only for Java Servers."
            ,"NO_SNAPSHOT_AVAILABLE_FOR_JAVA_AGENT": "No Snapshots are available for this instance."
            ,"SNAPSHOT_TIMELINE_MESSAGE":"Click on Chart Item to view snapshot stack information"


        },
        "jfrProperties":
        {
             "DUMP_JFR" : "JFR Dump"
            ,"DUMP_FILE_SIZE" : "JFR Dump File Size"
            ,"JFR_MESSAGE": "JFR dumps can be analyzed through JMC (Java Mission Control). For Oracle JDK 1.7.0_04 and later, JVM process should be run with the following java options '-XX:+UnlockCommercialFeatures -XX:+FlightRecorder'."
            ,"JFR_RECORD_MESSAGE": "Specify the duration to dump the JFR (Java Flight Recorder). JFR snapshot can be analyzed through JMC (Java Mission Control). For Oracle JDK 1.7.0_04 and later, JVM process should be run with the following java options '-XX:+UnlockCommercialFeatures -XX:+FlightRecorder'. "
            ,"START_JFR" : "Dump JFR"
            ,"JFR_DISABLED" : "Dump JFR {0} for this AppServer"
            ,"JFR_DESC_TEXT" : "Please enter JFR Description"
            ,"JFR_SUCESS_MESSAGE": "JFR - {0} created successfully."
            ,"DUMP_NAME" : "JFR Dump Name"
            ,"JFR_DUMP_FILE" : "JFR Dump file"
            ,"JFR_DUMP_REPORT" : "Download JFR Report"
            ,"SERVER_REPORT" : "Download Report"
            ,"DELETE_HINT" : "Remove this JFR dump"
            ,"DELETE_POPUP_TITLE" : "Delete JFR Dump"
            ,"DELETE_POPUP_TEXT" : "Do you want to delete JFR dump : {0}?"
            ,"JFR_DUMP_CONFLICT_ERROR" : "An instance of JFR dump is already scheduled. Please try after some time."
            ,"JFR_DUMP_DUPLICATE_NAME" : "JFR dump with the name - {0} already exists. Please choose a different name and try again."
            ,"JFR_DUMP_OLDER_JAVA_AGENT" : "APM agent is not compatible for using JFR dump"
            ,"JFR_DUMP_QUOTA_EXCEEDED" : "Please remove an existing JFR dump to start a new JFR dump."
            ,"JFR_DUMP_INVALID_DIAGNOSTIC":"Either the Server is invalid or the Diagnostic is invalid."
            ,"JFR_DUMP_TARGET_SERVER_DOWN":"The target server is currently down."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5100": "Other JFR dump is already being taken. Please note that only one JFR dump can be taken at a time."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5101": "Internal error, failed to take JFR dump"
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5102": "Feature is not supported by JVM"
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5103": "Feature is not enabled."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5104": "Invalid JFR recording name or start time."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5105": "No running JFR recording found for dump."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5106": "JFR dump is turned off from configuration file."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5107": "JFR recording is in 'stopped' state."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5108": "Internal error, jfr dump file not found."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5109": "Internal error, failed to upload JFR data."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5110": "JVM out of memory."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5111": "Disk out of space."
            ,"JFR_UPLOAD_FAILED_LIMIT_EXCEED" : "APM agent did not upload JFR data as it exceeds set jfr file size limit"
            ,"JFR_UPLOAD_FAILED_PWD_IN_ENV" : "APM agent did not upload JFR file as password is present in environment variables"
            ,"JFR_UPLOAD_FAILED_PWD_IN_SYS" : "APM agent did not upload JFR file as password is present in system property"
            ,"JFR_UPLOAD_FAILED_PWD_IN_JVM_ARG" : "APM agent did not upload JFR data as password is set as part of JVM arguments"
            ,"JFR_UPLOAD_GENERATE_ERROR" : "Internal error, failed to generate JFR report"
            ,"JFR_HTTP_ERROR_500" : "Internal error while downloading Jfr file."
            ,"JFR_HTTP_ERROR_404" : "Jfr file not found.This might got purged or deleted."
        },
        "heapDumpProperties":
        {
            "HEAPDUMP_MESSAGE": "Heap Dump file can be analyzed through third party tool."
            ,"START_HEAPDUMP" : "Take Heap Dump"
            ,"HEAP_DUMP_DESC_TEXT" : "Please enter Heap Dump Description"
            ,"HEAP_DUMP_SUCESS_MESSAGE": "Head Dump - {0} started successfully."
            ,"HEAP_DUMP_NAME" : "Heap Dump Name"
            ,"HEAP_DUMP_FILE" : "Heap Dump file"
            ,"DELETE_HINT" : "Remove this heap dump"
            ,"DELETE_POPUP_TITLE" : "Delete Heap Dump"
            ,"DELETE_POPUP_TEXT" : "Do you want to delete heap dump : {0}?"
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5200": "Other heap dump is already being taken. Please note that only one heap dump can be taken at a time."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5201": "internal error, failed to take heap dump."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5202": "Feature is not supported by JVM."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5203": "Heap dump is turned off from configuration file."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5204": "Feature is not supported."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5205": "Heap dump file not found for IBM JDK v1.6"
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5206": "JVM out of memory."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5207": "Disk out of space."
        },
        "classHistogramProperties":
        {
            "CLASS_HISTOGRAM_NAME": "Click to start Class Histogram."
            ,"CLASS_HISTOGRAM_MESSAGE": "Class histogram results would be available a couple minutes after the class histogram collection end. "
            ,"START_CLASS_HISTOGRAM" : "Create Class Histogram"
            ,"CLASS_HISTOGRAM_DESC_TEXT" : "Please enter Class Histogram Description"
            ,"CLASS_HISTOGRAM_SUCESS_MESSAGE": "Class Histogram - {0} created successfully."
            ,"CLASS_HISTOGRAM_NAME" : "Class Histogram Name"
            ,"DELETE_HINT" : "Remove this class histogram"
            ,"CLASS_NAME" : "Class Name"
            ,"CLASS_INSTANCES" : "Instances"
            ,"TOTAL_SIZE" : "Total Size (KB)"
            ,"TOTAL_SIZE_BYTES" : "Total Size (Bytes)"
            ,"AVG_SIZE" : "Avg Size (KB)"
            ,"DELETE_POPUP_TITLE" : "Delete Class Histogram"
            ,"DELETE_POPUP_TEXT" : "Do you want to delete class histogram : {0}?"
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5300": "Other class histogram is already running. Please note that only one Class Histogram can run at a time."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5301": "internal error, failed to take class histogram"
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5302": "Feature is not supported by JVM."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5303": "Class histogram is turned off from configuration file."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5304": "JDK(tools.jar must be in classpath) is required for this feature."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5305": "JVM out of memory."
        },
        "threadProfilerProperties":
        {
            "PROFILER_NAME" : "Profile Name"
            ,"PROFILER_REQUEST_OP_NAME" : "Request Name"
            ,"PROFILER_THREAD_OP_NAME" : "Thread Name"
            ,"PROFILER_INSTANCE_COUNT" : "Instance Count"
            ,"PROFILER_REQUEST_COUNT" : "Request Count"
            ,"PROFILER_ERROR_COUNT" : "Error Count"
            ,"PROFILER_AVERAGE_TIME" : "Avg CPU Time (ms)"
            ,"PROFILER_AVERAGE_ALLOCATION" : "Avg Allocations (MB)"
            ,"PROFILER_AVERAGE_GCOVERHEAD" : "Avg GC Overhead (ms)"
            ,"PROFILER_AVERAGE_RESPONSE" : "Avg Response Time (ms)"
            ,"PROFILER_RESPONSE" : "Response Time (ms)"
            ,"PROFILER_CPU_TIME" : "CPU Time (ms)"
            ,"PROFILER_ALLOCATION" : "Allocations (MB)"
            ,"PROFILER_GCOVERHEAD" : "GC Overhead (ms)"
            ,"SHOW_SNAPSHOT" : "Please click to view snapshots. Snapshot Count is {0}"
            ,"REQUEST_STACK_DIALOG_TITLE" : "Call Stack Tree for {0}"
            ,"NAME" : "Name"
            ,"MIN_S" : "Min(s)"
            ,"MINS" : "{0} Min(s)"
            ,"INSTANCE_TAB_MESSAGE" : "Click on Chart Item to view stack information."
            ,"DISABLE_BUTTON_MESSAGE" : "This Application server does not support this feature or its disabled by agent configuration file."
            ,"DESC_TEXT" : "Please enter Profiler Description"
            ,"PROFILER_DESCRIPTION":"Description"
            ,"PROFILER_DURATION" : "Duration"
            ,"START_PROFILER" : "Start Profiler"
            ,"SELECT_APPSERVER" :"Select Appserver"
            ,"ADD_APPSERVER" :"Add Appserver"
            ,"REMOVE_APPSERVER" :"Remove Appserver"
            ,"REMOVE_APPSERVER_TOOL_INTRO": "Removing appserver will remove appserver from the list"
            ,"REMOVE_APPSERVER_TOOL_CONFIRM": "Do you really want to remove appserver \"{0}\"?"
            ,"EMPTY_APPSERVERS_TABLE": "Use \"Select Appserver\" Button to select appserver."
            ,"APPSERVER_TABLE_SUMMARY": "Table of appserver"
            ,"APPSERVER_TOOL_INTRO": "Use <Click> with  \"Select Appserver\" to select one appserver shown in the list."
            ,"REQUESTED_TIME": "Requested Time"
            ,"START_TIME": "Start Time"
            ,"END_TIME": "End Time"
            ,"SELF_SNAPSHOTS": "Snapshots Count"
            ,"SNAPSHOTS": "Snapshots"
            ,"THREADS": "Threads"
            ,"TOTAL_SNAPSHOTS": "Total Snapshots"
            ,"NO_OF_CLASSES": "Class Count"
            ,"TOTAL_SAMPLES" : "Sample"
            ,"PERCENT_OF_STATE_TIME_TOOLTIP": "{0}% of thread state"
            ,"PROFILER_SAMPLES" : "Samples"
            ,"PROFILER_CPUS" : "CPUs"
            ,"PROFILER_FOR" : "for"
            ,"PROFILER_REQUESTS" : "Throughput"
            ,"PROFILER_ERRORS" : "Errors"
            ,"PROFILER_REQUEST_USER" : "Creator"
            ,"PROFILER_APPSERVER" : "AppServer"
            ,"PROFILER_APPSERVER_NAME" : "AppServer Name"
            ,"PROFILER_APPSERVER_HOST" : "AppServer Host"
            ,"PROFILER_APPSERVER_PORT" : "AppServer Port"
            ,"PROFILER_APPSERVER_SSLPORT" : "AppServer SSL Port"
            ,"PROFILER_REQUEST_STATUS" : "Status"
            ,"PROFILER_CPU_UTILIZATION" : "CPU Utilization"
            ,"PROFILER_MEMORY_UTILIZATION" : "Memory Utilization"
            ,"PROFILER_CPU_USAGE" : "CPU Usage"
            ,"PROFILER_MEMORY_USAGE" : "Heap Usage"
            ,"PROFILER_DELETE" : "Delete" 
            ,"PROFILER_YES" : "Yes"
            ,"PROFILER_NO" : "No"
            ,"PROFILER_PERCENTAGE" : "%"
            ,"PROFILER_INSTANCE_UNIT" : "Request Instance (/min)" 
            ,"PROFILER_PENDING" : "Pending"
            ,"PROFILER_RUNNING" : "Running"
            ,"PROFILER_RUNNING_AGENTPUSH" : "Running - Agent processed data"
            ,"PROFILER_RUNNING_UPLOADING" : "Running - Uploading to DB"
            ,"PROFILER_PASSED" : "Passed"
            ,"PROFILER_SCHEDULED" : "Scheduled"
            ,"PROFILER_PREPARED" : "Prepared"
            ,"PROFILER_FAILED" : "Failed"
            ,"PROFILER_FAILED_UPLOAD" : "Failed - Error in data upload"
            ,"PROFILER_FAILED_DISABLE" : "Failed - Profiler disable in agent"
            ,"PROFILER_FAILED_INTERNAL" : "Failed - Internal Error"
            ,"PROFILER_GC_OVERHEAD" : "GC Overhead"
            ,"PROFILER_SUMMARY" : "Profile Summary"
            ,"PROFILER_REQUEST_DATE" : "Request Date"
            ,"THREAD_PROFILER_DESCRIPTION" : "Description"
            ,"DELETE_HINT" : "Remove this thread profile"
            ,"SELECT_APPSERVER_TEXT" :"Please select an appserver"
            ,"START_THREAD_PROFILER_ERROR" :"Thread Profiler Error"
            ,"PROFILER_TOO_LONG" : "Number of characters is too high. Enter at most {max} characters"
            ,"PROFILER_TOO_SHORT" : "Too few characters"
            ,"PROFILER_LONG" : "Too many characters"
            ,"PROFILER_SHORT_MESSAGE" : "Number of characters is too low. Enter at least {min} characters."
            ,"PROFILER_LONG_MESSAGE" : "Number of characters is too high. Enter at most {max} characters"
            ,"DELETE_POPUP_TITLE" : "Delete Thread Profile"
            ,"DELETE_POPUP_TEXT" : "Do you want to delete thread profile : {0}?"
            ,"INSTANCE_COUNT" : "Instance Count"
            ,"REQUEST_COUNT" : "Request Count"
            ,"ERROR_COUNT" : "Error Count"
            ,"AVG_CPU_TIME" : "Avg CPU Time"
            ,"AVG_ALLOCATIONS" : "Avg Allocations"
            ,"AVG_GCOVERHEAD" : "Avg GC Overhead"
            ,"AVG_RESPONSE_TIME" : "Avg Response Time"
            ,"SNAPSHOT_COUNT" : "Snapshot Count"
            ,"THREAD_STATE" : "Thread States"
            ,"THREAD_CATEGORY" : "Thread Category"
            ,"THREAD_CATEGORY_FOREGROUND" : "Foreground Threads"
            ,"THREAD_CATEGORY_BACKGROUND" : "Background Threads"
            ,"NO_DATA_MORE_TEXT": " The list of objects or the object you are trying to view cannot be found.  This feature is available only for Java servers."
            ,"THREAD_PROFILER_CONFLICT_ERROR" : "An instance of {0} is already scheduled. Please try after some time."
            ,"THREAD_PROFILER_DUPLICATE_NAME" : "Diagnostics Snapshot with the name - {0} already exists in the database. Please choose a different name and try again."
            ,"THREAD_PROFILER_OLDER_JAVA_AGENT" : "APM agent is not compatible for using thread profiler or APM agent version is less than 1.16 for java agent or less than 1.25 for Dot Net agent"
            ,"THREAD_PROFILER_QUOTA_EXCEEDED" : "Please remove an existing {0} to start a new {0}."
            ,"THREAD_PROFILER_MESSAGE": "Specify the duration to capture the stack traces. Snapshots would be collected every 125ms for the specified duration. The results would be available a couple minutes after the snapshot collection end. "
            ,"DIAGNOSTICS_TYPE_ERRORMSG": "There is internal error processing thread profiler."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5000": "There is thread profiler already scheduled."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5001": "There is thread profiler already running."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5002": "There is internal error processing thread profiler."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5003": "There is internal error failed to upload data."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5004": "Thread profiler is disabled in APM agent."
            ,"DIAGNOSTICS_TYPE_ERRORMSG_5005": " JVM out of memory."
            ,"DIAGNOSTICS_SUCCESS_MESSAGE": "{0} - {1} created successfully."
            
        },
        "callTypeProperties":
        {
            "SYNC": "synchronous"
            ,"ASYNC": "asynchronous"
            ,"UNKNOWN": "Unknown"
            ,"CALL_TYPE": "Call Type"
        },
        "pageProperties":
        {
            "PAGE_SUMMARY": "Page Summary"
            ,"PAGE_REQUESTS": "Page Requests"
            ,"RESPONSE_BREAKDOWN": "Average Response Breakdown"
            ,"LOAD_BREAKDOWN": "Average Page Load Breakdown"
            ,"LOAD_TIME": "Page Load Time"
            ,"LOAD_TIME_MS": "Milliseconds"
            ,"AVERAGE_LOAD_TIME": "Average Load Time"
            ,"AVG_LOAD_TIME": "Avg Load Time"
            ,"MAX_MIN_LOAD_TIME": "Max, Min Load Time"
            ,"MIN_LOAD_TIME": "Minimum Load Time"
            ,"MAX_LOAD_TIME": "Maximum Load Time"
            ,"VIEWS": "View Rate (/min)"
            ,"TILE_VIEW_RATE": "View Rate"
            ,"VIEWS_AND_ERRORS": "Views and Errors"
            ,"PAGE_URL": "URL"
            ,"ERRORS": "Page Errors"
            ,"TITLE": "Title"
            ,"CONTEXT": "Context"
            ,"ATTRIBUTES": "Attributes"
            ,"PAGE_TITLE": "Page Title"
            ,"PAGE_AJAX": "Ajax Calls"
            ,"AJAX_URL": "Ajax URL"
            ,"AJAX_CALL_SUMMARY": "Ajax Call Summary"
            ,"CALL_METHOD": "Call Method"
            ,"CALL_TO_URL": "Call to URL"
            ,"FILTER_CALL_METHOD": "Call Method"
            ,"FILTER_CALL_TO_URL": "Call to URL"
            ,"DISTINCT": "distinct"
            ,"PER_MIN_TOTAL": "/min total"
            ,"SLOWEST": "Slowest"
            ,"MOST_ERRORS": "Most Errors"
            ,"ATTRIBUTES_ATTR1" : "Attribute1"
            ,"ATTRIBUTES_ATTR2" : "Attribute2"
            ,"ATTRIBUTES_TOOLTIP" : "Attribute1: {0}\nPage Title: {1}\nAttribute2: {2}"
        },
        "pagePhaseProperties":
        {
             "FIRST_BYTE": "First Byte"
            ,"DOM_READY": "DOM Ready"
            ,"INTERACTIVE": "Interactive"
            ,"PAGE_READY": "Page Loaded"
        },
        "ajaxCallPhaseProperties":
        {
            "CALL_RESPONSE": "Call Response"
            ,"CALL_PROCESSING": "Call Processing"
        },
        "appserverProperties":
        {
            "GARBAGE_COLLECTIONS": "Garbage Collections"
            ,"TOTAL": "total"
            ,"COUNT": "Count"
            ,"MEMORY": "Memory"
            ,"HEAP_MEMORY": "Heap Memory"
            ,"NON_HEAP_MEMORY": "Non Heap Memory"
            ,"CPU": "CPU"
            ,"GARBAGE_COLLECTION": "Garbage Collection"
            ,"GARBAGE_COLLECTION_PCT": "Garbage Collection %"
            ,"GARBAGE_COLLECTION_TIME": "Garbage Collection Time"
            ,"GARBAGE_COLLECTION_COUNT": "Garbage Collections"
            ,"CPU_USAGE": "CPU Usage"
            ,"PEAK_HEAP_MEMORY_USAGE": "Peak Usage"
            ,"PEAK_USED_OF_COMMITTED": "Peak Used of Committed"
            ,"PEAK_NON_HEAP_OF_COMMITTED": "Peak Used of Committed"
            ,"PEAK_NON_HEAP_MEMORY_USAGE": "Peak Usage"
            ,"PEAK_HEAP_MEMORY_USAGE_FILTER": "Peak Heap Usage"
            ,"PEAK_USED_OF_COMMITTED_FILTER": "Peak Heap Used of Committed"
            ,"PEAK_NON_HEAP_OF_COMMITTED_FILTER": "Peak Non Heap Used of Committed"
            ,"PEAK_NON_HEAP_MEMORY_USAGE_FILTER": "Peak Non Heap Usage"
            ,"DOMAIN": "Domain"
            ,"HOST_OS_NAME": "Host Operating System"
            ,"HOST": "Host"
            ,"PORT": "Port"
            ,"HOST_AND_PORT": "Host : Port"
            ,"SSL_PORT": "SSL Port"
            ,"PORTS_HTTP_SSL": "Ports"
            ,"TYPE": "Type"
            ,"JFR_SUPPORT": "JFR Support"
            ,"SUPPORT": "Support"
            ,"VERSION": "Version"
            ,"NAME": "Name"
            ,"OS": "Operating System"
            ,"MEMORY_USED": "Memory Usage"
            ,"TOTAL_USED": "Total Used"
            ,"HEAP": "Heap"
            ,"NON_HEAP": "Non Heap"
            ,"TIME_SPENT_IN_GC": "Time Spent in GC"
            ,"HEAP_MEMORY_TITLE": "Heap Memory Usage"
            ,"HEAP_MEMORY_YAXIS": "Megabytes"
            ,"AVERAGE_USED_HEAP": "Average Used Heap"
            ,"AVG_USED_HEAP": "Avg Used Heap"
            ,"AVG_USED": "Average Used"
            ,"MAX_HEAP": "Max"
            ,"COMMITTED_HEAP": "Committed"
            ,"MB": "MB"
            ,"GC_TITLE": "Garbage Collections"
            ,"GC_COUNT_YAXIS": "Count"
            ,"GC_TIME_SPENT_YAXIS": "Time Spent (ms)"
            ,"GC_COUNT": "Count"
            ,"GC_TIME_SPENT": "Time Spent"
            ,"GC_TIME_SPENT_PCT": "% Time Spent"
            ,"CPU_USAGE_TILE_TITLE": "CPU Usage"
            ,"CPU_PERCENTAGE": "CPU %"
            ,"CPU_TIME_TITLE": "CPU Time"
            ,"CPU_TIME_YAXIS": "Milliseconds"
            ,"TOTAL_CPU_TIME": "Total CPU Time"
            ,"THREAD_POOL": "Thread Pool"
            ,"STUCK": "Stuck"
            ,"AVG_STUCK": "Average Stuck"
            ,"WAITING_IN_QUEUE": "Wait Queue"
            ,"FOR_N_CPUS": "for {0} CPUs"
            ,"PERCENT_SIGN_WITH_COMMA_SPACE": "%, " // this is mainly to avoid HCS audit issues....
            ,"OF_COMMITTED": "of committed"         // this is used in tile with big number followed by small '%' and then 'of commited'
            ,"MAX_USED": "Max Used"
            ,"LOG_ANALYTICS_COUNT_CHART_TITLE": "Log Messages"
            ,"CLASSIFICATIONS": "Classifications"
            ,"AVAILABILITY": "Availability"
            ,"CPU_UTILIZATION" : "CPU Utilization"
            ,"CPU_UTILIZATION_AVG" : "CPU Utilization Avg"
            ,"MEMORY_UTILIZATION" : "Memory Utilization"
            ,"MEMORY_UTILIZATION_AVG" : "Memory Utilization Avg"
            ,"OPEN_MONITORING_SERVICE": "Open monitoring service tab for host '{0}' details."
            ,"MAJOR": "Major"
            ,"MINOR": "Minor"
            ,"COLLECTIONS": "Collections"
            ,"MAJOR_TIME_SPENT_PCT": "% Major Collection Time"
            ,"MINOR_TIME_SPENT_PCT": "% Minor Collection Time"
            ,"MAJOR_COLLECTIONS": "Major Collections"
            ,"MINOR_COLLECTIONS": "Minor Collections"
            ,"MAJOR_COLLECTIONS_OCCURRED": "Major Collections Occurred"
        },
        "timePeriodProperties":
        {
             "TIME_2MINS": "2 minutes"
            ,"TIME_5MINS": "5 minutes"
            ,"TIME_10MINS": "10 minutes"
            ,"TIME_30MINS": "30 minutes"
            ,"TIME_1HOUR": "1 hour"
            ,"TIME_8HOURS": "8 hours"
            ,"TIME_1DAY": "1 day"
        },
        "timePeriodShortProperties":
        {
            "TIME_1MIN": "1 m"
            ,"TIME_2MINS": "2 m"
            ,"TIME_5MINS": "5 m"
            ,"TIME_10MINS": "10 m"
            ,"TIME_30MINS": "30 m"
            ,"TIME_1HOUR": "1 h"
            ,"TIME_4HOURS": "4 h"
            ,"TIME_8HOURS": "8 h"
            ,"TIME_1DAY": "1 d"
        },
        "pagingProperties":
        {
            "VIEW": "View"
            ,"FIRST_PAGE": "First page"
            ,"PREVIOUS": "Previous page"
            ,"NEXT": "Next page"
            ,"SHOWING": "Showing"
            ,"SHOWING_WITHOUT_TOTAL": "Showing {0} - {1} objects"
            ,"SHOWING_WITH_TOTAL": "Showing {0} - {1} of {2} objects"
            ,"OBJECTS": "{0} objects"
            ,"OBJECTS25": "25 objects"
            ,"OBJECTS50": "50 objects"
            ,"OBJECTS100": "100 objects"
        },
        "requestLinkProperties":
        {
            "SELF_TIME_MS": "Self Time"
            ,"AVG_SELF_TIME": "Avg Self Time"
            ,"MAX_MIN_SELF_TIME": "Max, Min Self Time"
            ,"MIN_SELF_TIME": "Min Self Time"
            ,"MAX_SELF_TIME": "Max Self Time"
            ,"RESPONSE_TIME_MS": "Response Time (ms)" 
            ,"TIER": "Tier"
            ,"CALLER_TYPE": "Call Type"
            ,"ALL_CALLERS": "Multiple Callers"
            ,"UNKNOWN_CALLER": "Unknown Callers"
            ,"CALLER_OPERATION": "From Operation"
            ,"CALLED_OPERATION": "To Operation"
            ,"NO_DATA": "There are no calls for this Server Request"
            ,"NO_CALLER_DATA": "Information is not available for any callers of this Server Request"
            ,"KNOWN_CONTRIBUTORS": "APM has detected the following callers, there may be additional ones."
            ,"MAYBE_MORE_CALLERS": "(there may be additional callers)"
            ,"NON_SERVER_REQUESTS": "OTHER CALLERS"
            ,"NAME": "Caller"
            ,"TITLE": "Title"
            ,"TYPE": "Type"
            ,"AVG_LOAD_RESP_TIME": "Avg Load/ Response Time (ms)"
            ,"TOTAL_CALLS": "Total Calls"
            ,"SHOW_DETAILS": "show details"
            ,"HIDE_DETAILS": "hide details"
            ,"NO_DETAILS": "(No additional details)"
            ,"CALLER_METRIC_TITLE": "Metrics for {0} as called by each caller"
        },
        "diagramProperties":
        {
            "VIEW_DETAIL": "Go to details"
            ,"LOADING": "Loading Diagram..."
            ,"VIEW_LA_APPSERVER": "View AppServer Log"
            ,"VIEW_LA_DB": "View Database Log"
            ,"NODE_SIZE": "Node Size"
            ,"ARROW_SIZE": "Arrow Width"
            ,"LAYER": "Layer"
            ,"HIDE_OUTBOUNDS": "Hide Outbound Paths"
            ,"HIDE_INBOUNDS": "Hide Inbound Paths"
            ,"HIDE_NODE": "Hide this node Onward"
            ,"HIDE_OPERATION": "Hide this Operation Onward"
            ,"HIDE_SQL": "Hide SQL"
            ,"HIDE_DATABASE": "Hide Database"
            ,"ISOLATE_NODE": "Isolate this node's Calls"
            ,"ISOLATE_OPERATION": "Isolate this Operation's Calls"
            ,"ISOLATE_FULL_PATH": "Show All Paths Through Here"
            ,"SHOW_ALL_PATHS": "Show All"
            ,"SHOW_ALL_INBOUNDS": "Show All Inbound Links"
            ,"SHOW_ALL_OUTBOUNDS": "Show All Outbound Links"
            ,"MORE_NODES_TO_SHOW": "For performance reason, this diagram is not displaying all possible data."
            ,"ATTR_LABEL_weightedSelfTime": "Weighted Self Time"
            ,"ATTR_LABEL_averageSelfTime": "Avg Self Time"
            ,"ATTR_LABEL_completedCount": "Calls"
            ,"ATTR_LABEL_failureCount": "Errors"
            ,"ATTR_LABEL_errorPercentage": "Error %"
            ,"ATTR_LABEL_averageResponseTime": "Avg Response Time"
            ,"ATTR_LABEL_default": "Fixed Width"
            ,"HOVER_INTRO": "Hover over node or link to view more detail."
            ,"HOVER_LABEL_INTRO": "Tooltip/Selected"
            ,"HOVER_LABEL_TOOLTIP": "Tooltip"
            ,"HOVER_LABEL_SELECTED": "Selected Object"
            ,"HOVER_LABEL_TIERUSAGE": "Tier Usage"
            ,"HOVER_LABEL_CONTROLS": "Diagram Controls"
            ,"HOVER_LABEL_SELECTED_OBJECT": "Selected Object: "
            ,"HOVER_LABEL_FROM": "From:"
            ,"HOVER_LABEL_TO": "To:"
            ,"HOVER_LABEL_SELF_TIME": "Self Time"
            ,"HOVER_LABEL_AVG": "Average"
            ,"HOVER_LABEL_MAX": "Max"
            ,"HOVER_LABEL_MIN": "Min"
            ,"HOVER_LABEL_WEIGHTED": "Weighted"
            ,"HOVER_LABEL_RESP_TIME": "Response Time"
            ,"HOVER_LABEL_RESP_TIME_AVG": "Avg Response Time"
            ,"HOVER_LABEL_RESP_TIME_MAX": "Max Response Time"
            ,"HOVER_LABEL_RESP_TIME_MIN": "Min Response Time"
            ,"HOVER_LABEL_TOTAL_CALLS": "Total Calls"
            ,"HOVER_VALUE_TOTAL_CALLS": "{0} ({1}/min)"
            ,"HOVER_LABEL_ERRORS": "Errors"
            ,"HOVER_VALUE_ERRORS": "{0}% ({1} total)"
            ,"HOVER_LABEL_TIER": "Tier"
            ,"HOVER_LABEL_OP_TYPE": "Type"
            ,"HOVER_LABEL_TO_TIER": "To Tier"
            ,"HOVER_LABEL_TO_TYPE": "To Type"
            ,"HOVER_LABEL_CALL_TYPE": "Call Type"
            ,"HOVER_CALL_TYPE_SYNC": "synchronous"
            ,"HOVER_CALL_TYPE_ASYNC": "asynchronous"
            ,"HOVER_CALL_TYPE_UNKNOWN": "Unknown"
            ,"HOVER_LABEL_AJAX_TITLE": "Ajax Title"
            ,"HOVER_LABEL_AJAX_URL": "Ajax URL"
            ,"HOVER_LABEL_APPSERVER": "AppServer"
            ,"HOVER_LABEL_APPSERVER_TYPE": "AppServer Type"
            ,"HOVER_LABEL_OPERATION": "Operation"
            ,"SELECTED_TABLE_SUMMARY": "Selected Object List"
            ,"CELL_LABEL_LOAD_RATE": "({0}/min)"
            ,"CELL_LABEL_ERROR_PERCENTAGE": "{0}%"
            ,"HEADER_LABEL_CALL_FROM": "Call From"
            ,"HEADER_LABEL_CALL_TO": "Call To"
            ,"HEADER_LABEL_weightedSelfTime": "Weighted Self Time (ms)"
            ,"HEADER_LABEL_averageResponseTime": "Average Response Time (ms)"
            ,"LABEL_CONNECTION_STRING": "Connection String"
            ,"LABEL_BROWSER_CLIENTS": "Browser Clients"
            ,"LABEL_UNKNOWN": "Unknown"
            ,"TOOMUCH_DATA": "There are too much nodes and links to show a usable topology."
            ,"LABEL_DETAILS": "Details"
            ,"LABEL_EXECUTION_FLOWS": "Transactions"
            ,"SELECTED_TABLE_STARTS_WITH": "Flow starts with "
            ,"LABEL_SINGLE_FLOW":"Single Transaction"
            ,"LABEL_VIEW_FLOW": "View Transaction"
            ,"LABEL_VIEW_APPSERVER": "View App Server"
            ,"LABEL_VIEW_SR": "View Service Request"
        },
        "filterProperties":
        {
            "ASC": "Ascending"
            ,"DESC": "Descending"
            ,"SAVE_SEARCH": "Save Filter"
            ,"LOAD_SEARCHES": "Load Filters"
            ,"SEARCH_EXIST": "Filter already exists, would you like to replace it?"
            ,"SEARCH_NAME_ERROR": "Filter name cannot begin with whitespace"
            ,"OPEN": "Create and manage filters"
            ,"CLOSE": "Close Filter"
            ,"SELECT_CRITERIA": "Select Criteria"
            ,"FILTER": "Apply"
            ,"ADD_CRITERION": "Add Criterion"
            ,"REMOVE_CRITERION": "Remove Criterion"
            ,"MATCH": "Match"
            ,"ALL": "All"
            ,"ANY": "Any"
            ,"SEARCH_CRITERIA_TITLE": "Search Criteria for {0}"//{0} is name of filter attribute
            ,"TRUE": "True"
            ,"FALSE": "False"
            ,"CONTAINS": "contains"
            ,"NOT_CONTAIN": "does not contain"
            ,"IS": "is"
            ,"IS_NOT": "is not"
            ,"STARTS_WITH": "starts with"
            ,"NOT_START_WITH": "does not start with"
            ,"ENDS_WITH": "ends with"
            ,"NOT_END_WITH": "does not end with"    
            ,"LATER_THAN": "later than"
            ,"EARLIER_THAN": "earlier than"
            ,"REMOVE_SAVED_SEARCH_INTRO": "Do you want to remove saved filter "
            ,"REMOVE_SAVED_SEARCH_TITLE": "Remove selected filter?"
            ,"TAB_FILTER": "Filter"
            ,"TAB_SAVED": "Saved Filters"
            ,"TAB_FILTER_INTRO": "Choose Attributes To Filter"
            ,"TAB_SAVED_INTRO": "Choose Filter to Execute"
            ,"SAVE_SEARCH_DLG_TITLE": "Save Filter"
            ,"SAVE_SEARCH_ALREADY_EXIST_DLG_TITLE": "Filter Already Exists"
            ,"FILTER_ERROR_DLG_TITLE": "Filter Error"
            ,"ATTRIBUTE_STATUS_ACTIVE": "Attribute is active"
            ,"ATTRIBUTE_STATUS_INACTIVE": "Attribute is inactive"
            ,"CLEAR": "clear"
            ,"REMOVE": "Remove {0}"
            ,"SEPARATOR": " | "
            ,"SORT": "Sort"
            ,"ENTER_VALID_STRING": "Please enter a non-empty string."
            ,"ENTER_VALID_NUMBER": "Please enter a number."
            ,"SAVE_EMPTY_FILTER_ERROR": "Cannot save an empty filter."
            ,"SAVED_FILTER_NO_LONGER_EXISTS": "Saved filter '{0}' no longer exists."
            ,"THIS_FILTER_NO_LONGER_EXISTS": "This filter no longer exists."
            ,"LABEL_APP": "Application"
            ,"LABEL_APP_NAME": "Application Name"
            ,"LABEL_APP__LAST_EVALUATED": "Last Evaluated"
            ,"LABEL_APP_CREATED": "Created"
            ,"NO_APPLICATION_DEFINED": "No application defined.  Please define new application in the Application Definitions page."
            ,"CONJUNCTION_LABEL_and": "and"
            ,"CONJUNCTION_LABEL_or": "or"
            ,"NUMBER_OF_SESSIONS": "Number of Sessions"
            ,"NUMBER_OF_PAGES": "Number of Pages"
            ,"NUMBER_OF_AJAX_CALLS": "Number of Ajax Calls"
            ,"NUMBER_OF_SERVER_REQUESTS": "Number of Server Requests"
            ,"NUMBER_OF_APPSERVERS": "Number of AppServers"
            ,"NUMBER_OF_MOBILE_CLIENTS": "Number of Mobile Clients"
            ,"NUMBER_OF_MOBILE_METHODS": "Number of View Controllers/Activities"
            ,"NUMBER_OF_MOBILE_REQUESTS": "Number of HTTP Requests"
            ,"MOBILE_CLIENT_NAME": "Mobile Client Name"
            ,"MOBILE_GENRE": "OS Type"
            ,"MOBILE_CLASS_COUNT": "View Controllers/Activities"
            ,"MOBILE_METHOD_NAME": "View Controllers/Activities"
            ,"MOBILE_HTTP_COUNT": "HTTP Requests"
            ,"MOBILE_CRASH_COUNT": "Crash Count"
            ,"MOBILE_CRASH_RATE": "Crash Rate"
            ,"MOBILE_VERSION": "Version"
            ,"MOBILE_CALLS": "Calls"
            ,"MOBILE_ERRORS": "Errors"
            ,"MOBILE_MAX_RESP": "Max Response Time"
            ,"MOBILE_MIN_RESP": "Min Response Time"
            ,"MOBILE_AVG_RESP": "Average Response Time"
            ,"MOBILE_HTTP_CALL_NAME": "HTTP Request"
            ,"SERVER_REQUEST_AVG_RESPONSE_TIME": "Server Request Avg Response Time"
            ,"SERVER_REQUEST_VOLUME": "Server Request Volume"
            ,"SERVER_REQUEST_ERROR_PERCENT": "Server Request Error Percent"
            ,"DB_TIER_AVG_RESPONSE_TIME": "DB Tier Avg Response Time"
        },
        
        "homePageProperties":
        {
            "TOP_5": "Top 5"
           ,"TREEMAP_TITLE": "Server Requests By AppServer"
            ,"PAGEDATA":"Database Summary"
           ,"COLOR": "Color"
 	   ,"SIZE": "Box Size"
 	   ,"ERRORS": "Errors"
           ,"VOLUME_RATE": "Volume Rate"
           ,"VOLUME_RATE_PER_MINUTE": "{0} /min"
           ,"AVG_RESPONSE_TIME": "Average Response Time"
           ,"NO_NODES_FOR_SIZE": "There are no Server Requests with values for box size metric {0}"
           ,"VALUE": "Value"
           ,"CHANGE": "Change"
           ,"TREND": "Trend"
           ,"APDEX": "User Satisfaction"
        },
        
        "tooltipProperties":
        {
            "USER_MENU": "Use this menu to customize the dashboards, view Help, About and User Assistant and also log out of APMCS."
            ,"USER_ASSISTANT": "The User Assistant displays the current status of APMCS. If the application has encountered an error, the error message is displayed here. You can view or hide the User Assistant using the User Menu."
            ,"TIME": "Choose the duration for which to display data."
            ,"SORT_BY": "Choose a criterion to sort the information displayed in the dashboard."
            ,"DASHBOARDS": "Select the dashboard you want to view."
            ,"ALERTS": "Click to view alerts."
            ,"ALERT_RULES": "Click to create APM alert rules and manage them."
            ,"HOME": "Click to view the top 5 pages, requests and servers being monitored by APMCS."
            ,"SESSIONS": "Click to view all the sessions being monitored by APMCS."
            ,"PAGES": "Click to view all the pages being monitored by APMCS."
            ,"AJAX_CALLS": "Click to view all the ajax calls being monitored by APMCS."
            ,"APPLICATION_DEFINITIONS": "Click to view all of the application definitions."
            ,"SYNTHETIC_TEST_DEFINITIONS": "Click to view all of the available synthetic tests definitions."
            ,"BEACON_POOL_DEFINITIONS": "Click to view all of the available locations definitions."
            ,"BROWSER_AGENT": "Click to view browser agent javascript."
            ,"APPLICATIONS": "Click to view all of the applications."
            ,"MOBILE_CLIENTS":"Click to view all of the mobile clients being monitored by APMCS."
            ,"MOBILE_METHODS":"Click to view all of the View Controllers/Activities being monitored by APMCS."
            ,"MOBILE_REQUESTS":"Click to view all of the mobile HTTP Requests being monitored by APMCS."
            ,"MOBILE_REGISTRATIONS":"Click to view all of the mobile client registrations."
            ,"REQUESTS": "Click to view all the requests being serviced by APMCS."
            ,"SERVERS": "Click to view all the servers being monitored by APMCS."
            ,"ADMINISTRATION": "Click to view APM administrative options."
            ,"LOGS" : "Click to navigate to Log Analytics to view application's related logs."
            ,"VIEW": "Customize the number of items you want to view in the dashboard."
            ,"PAGE_NAME": "Click to view summary, charts on response times, requests and other details of the page."
            ,"PAGE_INSTANCE_NAME": "Click to view details of the page within its session timeline."
            ,"PAGE_LOAD_TIME_CHART": "The minimum, maximum, and average load time the page has taken to service a request."
            ,"PAGE_USER_SATISFACTION_CHART": "The satisfied, tolerating, and frustrated views based on response time of the page."
            ,"PAGE_VIEWS_AND_ERRORS_CHART": "Comparison of successful views and errors on this page."
            ,"PAGE_SUMMARY": "Displays a detailed summary of the page."
            ,"PAGE_REQUESTS": "Displays a list of requests serviced by the page."
            ,"PAGE_AJAX": "Displays a list of ajax calls made by the page."
            ,"AJAX_CALL_NAME": "Click to view summary, charts on response times, requests and other details of the ajax call."
            ,"AJAX_CALL_SUMMARY": "Displays a detailed summary of the ajax call."
            ,"AJAX_CALL_REQUESTS": "Displays a list of requests serviced by the ajax call."
            ,"AJAX_CALL_RESPONSE_TIME_CHART": "The minimum, maximum, and average response time of the ajax call."
            ,"AJAX_CALL_CALLS_AND_ERRORS_CHART": "Comparison of successful calls and errors of this ajax call."
            ,"MOBILE_CLIENT_NAME": "Click to view summary, charts on crashes, view controllers/activities and other details of the mobile client."
            ,"MOBILE_METHOD_NAME": "Click to view summary, charts on response time, volume, errors and other details of the View Controller/Activity."
            ,"MOBILE_REQUEST_NAME": "Click to view summary, charts on response time, volume, errors and other details of the HTTP Request."
            ,"MOBILE_CRASH_COUNTS_RATE_CHART": "The crash count and rate of this mobile client." 
            ,"MOBILE_METHOD_RESPONSE_TIME_CHART": "The response time of this View Controller/Activity."   
            ,"MOBILE_METHOD_CALLS_AND_ERRORS_CHART": "Comparison of successful calls and errors of this View Controller/Activity." 
            ,"dT_RESPONSE_TIME_CHART": "The response time of this HTTP Request."
            ,"MOBILE_REQUEST_CALLS_AND_ERRORS_CHART": "Comparison of successful calls and errors of this HTTP Request."   
            ,"CREATE_NEW_MOBILE_CLIENT": "Register a new mobile client."
            ,"REQUEST_NAME": "Click to view summary, charts on response times, instances and other details of the request."
            ,"LOGICAL_REQUEST_NAME": "Click to view summary, charts on response times, instances and other details of the logical request."
            ,"THREAD_PROFILER_NAME": "Click to view stack summary and other details of the thread profile."
            ,"JFR_FINDING_TITLE": "Click to view JFR Dump findings."
            ,"DIAGNOSTIC_SNAPSHOT_NAME": "Click to start JFR, Class Histogram, Heap Dump and Thread profiles."
            ,"JFR_NAME": "Click to start JFR."
            ,"HEAP_DUMP_DETAIL_NAME": "Click to view details of the Heap Dump."
            ,"CLASS_HISTO_NAME": "Click to view details of the Class Histogram."
            ,"JFR_DUMP_NAME": "Click to view details of the JFR Dump."
            ,"REQUEST_RESPONSE_TIME_CHART": "The minimum, maximum, and average response time taken to service the request."
            ,"REQUEST_CALLS_AND_ERRORS_CHART": "Comparison of successful calls and errors of this request."
            ,"REQUEST_TIER_CHART": "The average time spent in the appserver, database, and external tiers."
            ,"REQUEST_SUMMARY": "Displays a detailed summary of the request."
            ,"REQUEST_LINKS": "Displays details of all the links associated with this request."
            ,"REQUEST_LINKS_CALLS": "Displays details of the calls serviced by the request."
            ,"REQUEST_LINKS_CALLERS": "Displays details of the callers serviced by the request."
            ,"REQUEST_DB": "Displays details of the database associated with this request."
            ,"REQUEST_INSTANCES": "Displays details of all the instances of this request."
            ,"SERVER_NAME": "Click to view summary, charts on memory, CPU time, requests and other details serviced by the server."
            ,"SERVER_HEAP_MEMORY_CHART": "Details about heap memory usage by the server."
            ,"SERVER_NONHEAP_MEMORY_CHART": "Details about non-heap memory usage by the server."
            ,"SERVER_GARBAGE_COLLECTION_CHART": "Details about garbage collection and time spent in GC by the server."
            ,"SERVER_CPU_CHART": "Details about CPU usage by the server."
            ,"SERVER_SUMMARY": "Displays a detailed summary for the server."
            ,"SERVER_REQUESTS": "Displays details of the requests running on the server."
            ,"SYNTESTS": "Click to view all the synthetic test definitions."
            ,"SYNTEST_NAME": "Click to view details of the synthetic test."
            ,"SYNTESTS_EXEC_TIME_CHART": "The minimum, maximum, and average execution time the test has taken to complete."
            ,"SYNTESTS_AVAILABILITY_CHART": "Comparison of successful executions and failures of this test."
            ,"SESSION_NAME": "Click to view summary, charts on response times, instances and other details of the session."
            ,"CPU_AVERAGE_PER_CPU": "{0}% average per CPU"
            ,"INSTANCE_STATUS": "Did instance end in failure or was it a success?"
            ,"INSTANCE_START_TIME": "Start time of instance."
            ,"INSTANCE_END_TIME": "End time of instance."
            ,"INSTANCE_RESPONSE_TIME": "Response time of instance in milliseconds."
            ,"INSTANCE_TIER_TIME": "Percent of time for each tier of instance."
            ,"INSTANCE_RESPONSE_TIME_AND_TIER_BREAKDOWN": "Response time of instance in milliseconds and tier breakdown percentage."
            ,"INSTANCE_LINKS": "Number of internal calls (not including instance start call) in call tree."
            ,"INSTANCE_ERRORS": "Number of errors."
            ,"INSTANCE_REASON_CAPTURED": "Reason the instance was captured."
            ,"INSTANCE_CPU_USAGE": "CPU usage in milliseconds."
            ,"INSTANCE_ALLOCATION": "Memory allocation in megabytes."
            ,"INSTANCE_SNAPSHOTS": "Number of snapshots."
            ,"INSTANCE_SNAPSHOT": "Click the icon to see the snapshot."
            ,"INSTANCE_ECID": "ECID of instance."
            ,"INSTANCE_ABRIDGED": "Not all information about the instance is available due to our efforts to minimize resource impact on the monitored application."
            ,"INSTANCE_LINK_NAME": "Operation name of call."
            ,"INSTANCE_LINK_CALLER": "Caller operation name."
            ,"INSTANCE_LINK_CALLEE": "Called operation name."
            ,"INSTANCE_LINK_DEPLOYMENT": "Called operation deployment."
            ,"INSTANCE_SQL_ID": "SQL ID of JDBC call."
            ,"INSTANCE_LINK_COMPONENT_TYPE": "Component type of call."
            ,"INSTANCE_LINK_TIER": "Tier of call."
            ,"INSTANCE_LINK_CALL_START_TIME": "Start time of call."
            ,"INSTANCE_LINK_RESPONSE_TIME": "Response time of call in milliseconds."
            ,"INSTANCE_LINK_SELF_TIME": "Time spent in an operation that is attributable neither to a called operation nor to server latency (in milliseconds)."
            ,"INSTANCE_LINK_LATENCY": "Time spent in an operation that is attributable to neither the operation itself nor a called operation (in milliseconds)."
            ,"INSTANCE_LINK_ERROR": "Was there an error?"
            ,"INSTANCE_LINK_CALL_TYPE": "Type of call."
            ,"INSTANCE_VIEW_SQL_IN_DB_PERF": "View SQL details in Database Performance Diagnostics."
            ,"IP_MASKING": "Click to view IP masking configuration."
            ,"HIDE_OR_SHOW_BROWSER_CALLERS": "Show or hide additional information about Pages or Ajax Calls to this Server Request."
            ,"CREATE_NEW_APP": "Create a new application definition."
            ,"EDIT_APP": "Edit this application definition."
            ,"COPY_APP": "Duplicate this application definition."
            ,"DELETE_APP": "Delete this application definition."
            ,"EDIT_SM_TEST": "Edit this syntehtic test definition."
            ,"REMOVE_SM_TEST": "Remove this synthetic test definition."
            ,"APPLICATION_NAME": "Click to go to the Home dashboard filtered by this application definition."
            ,"INSTANCE_EXCLUDED_FROM_METRICS": "This instance completed after the time period specified and is excluded from the aggregated metrics above."
            ,"ALERT_SEVERITY": "Current severity of alert."
            ,"ALERT_RULE_NAME": "Name of rule that generated alert."
            ,"ALERT_RULE_CONDITION": "Condition of rule that generated alert."
            ,"ALERT_EVENT_MESSAGE": "Last message of alert."
            ,"ALERT_CREATED": "Creation date of alert."
            ,"ALERT_UPDATED": "Updated date of alert."
            ,"INSTANCE_SHOW_ERROR": "Click to display error details."
            ,"SETTINGS": "Click to configure apdex and spdex."
            ,"APP_TOOL_PAGES_TITLE_HEADER": "Page title."
            ,"APP_TOOL_PAGES_URL_HEADER": "Page URL."
            ,"APP_TOOL_REQUESTS_NAME_HEADER": "Name of server request."
            ,"APP_TOOL_REQUESTS_SERVER_HEADER": "AppServer host of server request."
            ,"APP_TOOL_REQUESTS_DEPLOYMENT_HEADER": "Deployment of server request."
            ,"APP_TOOL_MOBILE_CLIENTS_NAME_HEADER": "Mobile Client Name."
            ,"APP_TOOL_MOBILE_CLIENTS_VERSION_HEADER": "Mobile Client Version."
            ,"APP_TOOL_APPSERVER_HOST_NAME_HEADER": "AppServer Host Name Name."
            ,"APP_TOOL_APPSERVER_TYPE_HEADER": "AppServer Type."
            ,"BEACON_POOL_NAME": "Location Name."
            ,"BEACON_POOL_METRIC_DETAILS" : "Click to get the agent compatibilty details."
            ,"BEACON_POOL_METRICS_NOT_AVAILABLE" : "Agent compatibility details not yet available or agent version is less than 1.12"
            ,"TEST_STATUS" : "Click to get the synthetic test status."
            ,"REMOVE_PARAMTER" : "Remove this parameter"
            ,"ADD_QUERY_PARAM" : "Click to add a new query parameter"
            ,"ADD_HEADER_PARAM" : "Click to add a new header parameter"
            ,"NONE_NOT_APPLICABLE": "Not applicable"
        },
        "geoRegionProperties":
        {
            "MAP_TITLE": "Pages By Geography"
            ,"MOBILE_MAP_TITLE": "Locations"
            ,"ZOOM_IN": "Zoom In"
            ,"ZOOM_OUT": "Zoom Out"
            ,"COLOR": "Color"
            ,"METRIC": "Metric"
            ,"BROWSER_BREAKDOWN_TITLE": "Browser Type Breakdown"
            ,"OS_BREAKDOWN_TITLE": "Device O/S Breakdown"
            ,"MOBILE_CARRIER_TITLE": "Carriers"
            ,"MOBILE_CONNECTION_TITLE": "Connections"
            ,"MOBILE_OSNAME_TITLE": "Operating Systems"
            ,"MOBILE_DEVICE_TITLE": "Devices"
            ,"MOBILE_OSVERSION_TITLE": "O/S Versions"
            ,"MOBILE_CARRIER": "Carrier"
            ,"MOBILE_CONNECTION": "Connection"
            ,"MOBILE_OSNAME": "Operating System"
            ,"MOBILE_DEVICE": "Device"
            ,"MOBILE_OSVERSION": "O/S Version"
            ,"BREAKDOWN_TOOLTIP": "Click to view the version breakdown"
            ,"BREAKDOWN_GOBACK": "Go back"
            ,"BREAKDOWN_UNKNOWN": "unknown"
            ,"SUB_TITLE_SUFFIX": "Versions"
            ,"DIM_LEVEL_BROWSER_TYPE_NAME": "Browser Type Name"
            ,"DIM_LEVEL_BROWSER_VERSION": "Browser Version"
            ,"DIM_LEVEL_OS_FAMILY_NAME": "OS Family Name"
            ,"DIM_LEVEL_OS_NAME": "OS Name"
            ,"UNCLASSIFIED_DATA_INFO_TITLE": "Internal / geo location could not be mapped:"
            ,"UNSUPPORT_ZOOMIN_FOR_COUNTRY": "Zoom In for this country is not supported!"
            ,"UNSUPPORT_ZOOMIN_FOR_REGION": "Zoom In for this region is not supported!"
        },
        "baselineProperties":
        {
             "CALCULATING": "Calculating baseline..."
             ,"BASELINES": "Baselines"
             ,"AVG_LOAD_TIME_BASELINE": "Avg Load Time Baseline"
             ,"PAGE_VIEWS_BASELINE": "Page Views Baseline"
             ,"HTTP_REQUESTS_BASELINE": "HTTP Requests Baseline"
             ,"CRASH_COUNTS_BASELINE": "Crash Counts Baseline"
             ,"AVG_RSP_TIME_BASELINE": "Avg Response Time Baseline"
             ,"CALLS_BASELINE": "Calls Baseline"
             ,"ANOMALOUS_PERIODS": "Anomalous Periods"
             ,"BASELINE_DISPLAYED": "Baseline available - click legend to show in chart"
             ,"BASELINE_NOT_AVAILABLE_REASON_CODE": "No baseline data available"
             ,"BASELINE_NOT_AVAILABLE_REST_ERROR": "Baseline data is not available due to error"
             ,"BASELINE_TIME_RANGE": "To see baselines, please narrow the time selection to one hour or less."
             ,"ABOVE_BASELINE": "Above Baseline"
             ,"BELOW_BASELINE": "Below Baseline"
             ,"ABOVE_BASELINE_COUNT": "{0} Above Baseline"
             ,"BELOW_BASELINE_COUNT": "{0} Below Baseline"
        },
        "synTestProperties":
        {
            "SCHEDULE": "Schedule"
            ,"AVAILABILITY": "Availability"
            ,"CURRENT_STATUS": "Current Status"
            ,"NAME": "Name"
            ,"BASE_URL": "Base URL"
            ,"METHOD_TYPE": "Method Type"
            ,"ERROR_MSG": "Error Message"
            ,"COLLECTION_FREQUENCY": "Collection Frequency"
            ,"LOCATION_COUNT": "Location Count"
            ,"LOCATION": "Location"
            ,"TYPE": "Type"
            ,"PASSED": "Passed"
            ,"FAILED": "Failed"
            ,"AVG_EXEC_TIME": "Avg Exec Time"
            ,"MIN_EXEC_TIME": "Min Exec Time"
            ,"MAX_EXEC_TIME": "Max Exec Time"
            ,"MAX_MIN_EXEC_TIME": "Max, Min Exec Time"
            ,"EXEC_TIME": "Execution Time"
            ,"LOAD_TIME": "Load Time"
            ,"TOTAL_TIME": "Total Elapsed Time"
            ,"CONTENT_LOAD_TIME": "Content Load Time"
            ,"FIRST_BYTE_TIME": "First Byte Time"
            ,"REDIRECT_TIME": "Redirect Time"
            ,"CONNECT_TIME": "Connect Time"
            ,"DOWNLOAD_SIZE": "Download Size"
            ,"TRANSFER_RATE": "Transfer Rate"
            ,"TOTAL_LOAD_TIME_BREAKDOWN": "Total Load Time Breakdown"
            ,"PING_TIME_BREAKDOWN": "Ping Time Breakdown"
            ,"REST_TIME_BREAKDOWN": "Rest Time Breakdown"
            ,"FREQ_DETAILS": "Run every {minuteCount} minute(s)"
            ,"FREQUENCY": "{minuteCount} minute(s)"
            ,"VIEW_SESSION": "View Session"
            ,"VIEW_HAR": "View Har"
            ,"DOWNLOAD" : "Download Har"
            ,"BACK_TO_TEST": "Back to test"
            ,"TEST_NAME":"Test Name"
            ,"LOCATION_NAME":"Location Name"
            ,"TEST_TYPE":"Test Type"
	    ,"RESPONSE_DOWNLOAD" : "Response Download"
        },
        "applicationProperties":
        {
            "CREATE_NEW_APP_BUTTON": "Create Application Definition"
            ,"APP_NOT_EXISTS": "The application named {0} does not exist"
            ,"APP_TOOL_TITLE_CREATE": "Create Application Definition"
            ,"APP_TOOL_TITLE_EDIT": "Edit Application Definition"
            ,"APP_TOOL_TITLE_COPY": "Duplicate Application Definition"
            ,"APP_SPEC": "Application Specification"
            ,"APP_NEW_INTRO": "Specify page, server request or mobile client type and the filter criteria for your application definition.  APM will use the objects meeting your criteria as seeds to dynamically construct the contents of the Application at any given time by traversing the dependencies and automatically including all related objects.  The Application Name must be unique."
            ,"APP_NAME_LABEL": "Application Name"
            ,"DEFINED_BY_LABEL": "Derive Application Contents Based on Collection of"
            ,"DEFINED_BY_PAGES": "Pages"
            ,"DEFINED_BY_FLOWSTART": "Server Requests that Start a Flow"
            ,"DEFINED_BY_MOBILE": "Mobile Clients"
            ,"DEFINED_BY_APPSERVER_CLASSIFICATION": "AppServers with Classifications"
            ,"CRITERIA_PAGES": "Criteria for Pages"
            ,"CRITERIA_FLOWSTART": "Criteria for Server Requests"
            ,"CRITERIA_MOBILE": "Criteria for Mobile Clients"  
            ,"CRITERIA_APPSERVERS": "Criteria for AppServers"  
            ,"DELETE_APPLICATION_TITLE": "Delete Application Definition?"
            ,"DELETE_APPLICATION_BODY": "Do you want to delete application definition {0}?" // {0} is definition name
            ,"NO_APPLICATION_DEFINITIONS": "You have no application definitions to display."
            ,"NO_APPLICATIONS": "You have no applications to display."
            ,"TRY_CREATING_AN_APPLICATION": "To create an application definition, click the Create Application Definition button above."
            ,"APP_NAME_FORMAT_MESSAGE": "Enter alphanumeric or underscore characters starting with a non-numeric character, up to {0} characters."
            ,"APP_NAME_ALREADY_EXISTS_SUMMARY": "Application name already exists."
            ,"APP_NAME_ALREADY_EXISTS_DETAIL": "An application definition already exists with this name.  Please change this one to a unique name."
            ,"APP_LIST_DEFINED_BY_LABEL": "Defined by"
            ,"APP_LIST_CREATED_LABEL": "Created"
            ,"NO_CRITERIA_SPECIFIED": "No criteria are specified. Click the Select Criteria button, choose attribute, enter value, and click the OK button."
            ,"APP_LIST_LAST_EVALUATED_LABEL": "Last Evaluated"
            ,"PENDING_STATE": "Pending"
            ,"PREVIEW": "Preview"
            ,"NUM_PAGES": "{0} Pages currently in seed collection defined by criteria for the last day."   // {0} is a number
            ,"NUM_REQUESTS": "{0} Server Requests currently in seed collection defined by criteria for the last day."  // {0} is a number
            ,"NUM_MOBILE_CLIENTS": "{0} Mobile Clients currently in seed collection defined by criteria for the last day."  // {0} is a number
            ,"NUM_APPSERVERS": "{0} AppServers currently in seed collection defined by criteria for the last day."  // {0} is a number
            ,"APP_TOOL_PAGES_TITLE_HEADER": "Page Title"
            ,"APP_TOOL_PAGES_URL_HEADER": "Page URL"
            ,"APP_TOOL_REQUESTS_NAME_HEADER": "Server Request Name"
            ,"APP_TOOL_REQUESTS_SERVER_HEADER": "AppServer Host"
            ,"APP_TOOL_REQUESTS_DEPLOYMENT_HEADER": "Deployment"
            ,"APP_TOOL_MOBILE_CLIENTS_NAME_HEADER": "Mobile Client Name"
            ,"APP_TOOL_MOBILE_CLIENTS_VERSION_HEADER": "Mobile Client Version"
            ,"APP_TOOL_APPSERVER_HOST_NAME_HEADER": "AppServer Host Name"
            ,"APP_TOOL_APPSERVER_TYPE_HEADER": "AppServer Type"
            ,"APP_HOME_ALERTS_TILE_TITLE": "APM Alerts"
            ,"APP_HOME_INFRASTRUCTURE_HEALTH_TILE_TITLE": "Infrastructure Health"
            ,"APP_HOME_HOSTS": "Hosts"
            ,"APP_HOME_APPSERVERS": "AppServers"
            ,"APP_HOME_DATABASES": "Databases"
            ,"APP_HOME_UP": "Up"
            ,"APP_HOME_DOWN": "Down"
            ,"APP_HOME_ERROR": "Error"
            ,"APP_HOME_UNAVAILABLE": "Unavailable"
            ,"APP_HOME_UNKNOWN": "Unknown"
            ,"APP_HOME_NOT_APPLICABLE": "Not Applicable"
            ,"AJAX_CALL_ERRORS": "Ajax Call Errors"
            ,"FLOW_TOPOLOGY": "Flow Topology"
            ,"HAS_ITEM_WITH_PLACEHOLDER": "has item {0}" 
            ,"HAS_ITEM": "has item" 
            ,"SUMMARY_TITLE_EUM": "Browser Workload and Performance Metrics"
            ,"SUMMARY_TITLE_SERVER": "Appserver Workload and Performance Metrics"
            ,"SUMMARY_ITEM_sessions": "Sessions"
            ,"SUMMARY_ITEM_pages": "Pages"
            ,"SUMMARY_ITEM_ajaxcalls": "Ajax Calls"
            ,"SUMMARY_ITEM_clicks": "Clicks"
            ,"SUMMARY_ITEM_javascriptErrors": "JavaScript Errors"
            ,"SUMMARY_ITEM_executionFlows": "Transactions"
            ,"SUMMARY_ITEM_requests": "Server Requests"
            ,"SUMMARY_ITEM_dbTierTime": "Database Tier Time"
            ,"SUMMARY_ITEM_appTierTime": "AppServer Tier Time"
            ,"HOST_ARCHITECTURE": "Host Architecture"
            ,"PROCESSORS": "Processors"
            ,"HOST_NAME": "Host Name"  
            ,"INVALID_TIMERANGE_FOR_APPLIST_COMPONENT":"This is an invalid time range for the application list. Time range must be less than 7 days."
            ,"VOLUMERATE_TITLE": "Volume Rate: {0}/min, Volume Count: {1}"
            ,"CHANGE_TITLE": "Previous time period ( {0} ) : {1}"
            ,"ERRORS_TITLE": "Error Count: {1}"
            ,"ERRORPERCENTAGE_TITLE": "Error %: {0}%, Error Count: {1}"
            ,"INFRASTRUCTURE_HEALTH_NO_DATA": "For more details, enable Infrastructure Monitoring."
        },
        "smProperties" : {
            "SM_TITLE" : "Create Synthetic Test"
           ,"SM_TOOL_TITLE_CREATE" : "Create Synthetic Monitoring Test"
           ,"SM_SPEC" : "Synthetic Test Configuration"
           ,"SM_TYPE" : "Type"
           ,"SM_PING" : "HTTP Ping"
           ,"SM_PAGE_LOAD" : "Page Load"
           ,"SM_SCRIPT_ACTION" : "Scripted Actions"
           ,"SM_SCRIPT_ACTION_ASTERISK" : "Scripted Actions*"
           ,"SM_WEB_SERVICES" : "Rest Web Service"
           ,"SM_TEST_NAME_LABEL" : "Name"
           ,"SM_TEST_END_POINT_URL_LABEL" : "URL"
           ,"SM_TEST_BASE_URL_LABEL" : "Base URL"
           ,"SM_NAME_FORMAT_MESSAGE" : "Enter a valid name upto {0} characters long. First letter can not be a numeric or special character(underscore is allowed). Whitespaces are not allowed."
           ,"SM_LOCATION" : "Location"
           ,"SM_LOCATIONS" : "Locations"
           ,"SM_APPLICATION" : "Application"
           ,"SM_FREQUENCY" : "Interval"
           ,"SM_FREQUENCY_UNIT" : " min(s)"
           ,"SM_SECONDS" : "sec(s)"
           ,"SM_EDIT_PASSWORD" : "Edit Password"
           ,"SM_TEST_OPTIONS" : "Options"
           ,"SM_VERIFY_SSL" : "Verify certificate"
           ,"SM_BYPASS_HEAD" : "Bypass HEAD request"
           ,"SM_REDIRECT_IS_FAIL" : "Redirect is Failure"
           ,"SM_ALERT" : "Alerts"
           ,"SM_NO_ALERT" : "No Alert"
           ,"SM_ONE_LOC_NA" : "Generate Alert and notify when one location is not available"
           ,"SM_ALL_LOC_NA" : "Generate Alert and notify when all location is not available"
           ,"SM_TEST_ADDRESS_LABEL" : "Addresses"
           ,"SM_TEST_FILE_LABEL" : "Select File"
           ,"SM_TEST_FILE_PREVIEW" : "Preview File"
           ,"SM_TEST_FILE_HIDE_PREVIEW" : "Hide File"
           ,"SM_AUTHENTICATION" : "Authentication"
           ,"SM_AUTH_NONE" : "None"
           ,"SM_AUTH_BASIC" : "Basic"
           ,"SM_BODY" : "Body"
           ,"SM_PASSWORD" : "Password"
           ,"SM_USERNAME" : "User Name"
           ,"SM_REQUEST_CONFIG" : "Request Configuration"
           ,"SM_RESPONSE_CONFIG" : "Response Configuration"
           ,"SM_STATUS_CODE" : "Expected Status Code"
           ,"SM_METHOD" : "Method"
           ,"SM_GET" : "GET"
           ,"SM_POST" : "POST"
           ,"SM_MIME" : "MIME"
           ,"SM_QUERY_PARAMETER" : "Query Parameters"
           ,"SM_HEADER_PARAMETERS" : "Header Parameters"
           ,"SM_SERVER_TIME_OUT" : "Request Time Out"
           ,"SM_CONTENT_TYPE_ERROR_MESSAGE" : "Select 'others' from  MIME Type in Request Configurations to include Content-Type in Header Parameters."
           ,"SM_VALUE" : "Value"
           ,"SM_TIME_OUT_UNIT" : "sec(s)"
           ,"SM_STATUS_CODE_MESSAGE" : "Enter valid Http codes like 200, 401, etc."
           ,"SM_STATUS_ERROR_MESSAGE": "Enter valid Http codes like 200, 401, etc."
           ,"SM_VERIFY_CONTENT" : "Verify Content"
           ,"SM_REGULAR_EXPRESSION" : "Regular Expression"
           ,"SM_TEST_REGEX" : "Test Regular Expression"
           ,"SM_TEST_REGEX_LABEL" : "Regex"
           ,"SM_TEST_REGEX_CONTENT" : "Content"
           ,"SM_TEST" : "Test..."
           ,"SM_REGEX_TESTER" : "Test"
           ,"SM_URL_FORMAT_MESSAGE" : "Enter appropriate url"
           ,"SM_TEST_FILE_EXT_FORMAT_MESSAGE" : "Please select a java file to upload."
           ,"SM_TEST_FILE_NAME_FORMAT_MESSAGE" : "Please provide suitable name for the file to upload."
           ,"SM_NAME_ALREADY_EXISTS_SUMMARY": "Duplicate test name."
           ,"SM_NAME_ALREADY_EXISTS_DETAIL": "A test definition already exists with this name.  Please change this one to a unique name."
           ,"SM_FILESIZE_EXCEEDED" : "Filesize should not be more than 10kb."
           ,"SM_FILE_EXTENSION" : "File {0} with extension {1} is not supported."
           ,"SM_FILE_PREVIEW_FAIL" : "select a file to preview"
           ,"SM_TEST_DEL_SUCCESS" : "The selected test has been deleted."
           ,"SM_TEST_DEL_FAILURE" : "Test deletion failed for the selected test."
           ,"SM_TOOL_TITLE_EDIT"  : "Edit Synthetic Monitoring Test"
           ,"SM_URL_MSG" : "URL to end point."
           ,"SM_URL_OVERWRITE_MSG" : "Override of base URL to end point in selenium file."
           ,"REMOVE_SYNTEST_TITLE": "Remove Synthetic Monitoring Test?"
           ,"REMOVE_SYNTEST_BODY": "Do you want to remove synthetic test {0}? Historical data related to this test will not be visible on APM UI."
           ,"NO_SYNTEST_DEFINITIONS": "You have no synthetic monitoring test definitions to display."
           ,"TRY_CREATING_A_SYNTEST": "To create a synthetic monitoring test, click the Create Synthetic Monitoring Test link above."
           ,"SM_TEST_TYPE_MSG": "Full-Page-Load/Ping of the URL or Execution of set of Selenium Script Actions."
           ,"SELECT_MUTLI_LOCS": "Please click inside to select location(s)."
           ,"LOCATION_NAME" : "Location Name"
           ,"IS_TEST_DEPLOYED" : "Deployment Status"
           ,"TEST_STATUS" : "Run Status"
           ,"LAST_DATA_REPORTED" : "Last Run Time"
           ,"LAST_TEST_DEPLOYED" : "Last Deployment Time"
           ,"SHOW_TEST_STATUS_DIALOG_TITLE" : "Test Status"
           ,"STATUS" : "Check Deployment"
           ,"HTTP_STATUS" : "HTTP Status"
           ,"TOTAL_SIZE" : "Total Size"
           ,"REQUESTS" : "Requests"
           ,"SM_NO_DATA" : "No data to display. Click '+' to add a new row."
           ,"IE_LOCAL_DIR_PATH_DISABLED": "For Scripted Actions test creation to work disable browser setting at Tools -> Internet options -> security tab -> press custom level button -> Include Local Path when uploading files to a server."
           ,"SM_INFO": "Warning"
           ,"SM_BLOCK_EDIT_DELETE": "This synthetic test was created to track a dependent Oracle PAAS service and can't be edited or deleted."
           ,"SM_HIDE_AGENT_SCRIPTS": "Hide EUM browser agent calls"
        },
        "alertProperties":
        {
             "SEVERITY_NOW": "Severity Now"
            ,"RULE_NAME": "Rule Name"
            ,"RULE_CONDITION": "Rule Condition"
            ,"EVENT_MESSAGE": "Last Message"
            ,"CREATED": "Created"
            ,"CLEAR": "Cleared"
            ,"INFO": "Info"
            ,"INFORMATIONAL": "Informational"
            ,"WARNING": "Warning"
            ,"CRITICAL": "Critical"
            ,"FATAL": "Fatal"
            ,"ALL": "All"
            ,"SEVERITY": "Severity"
            ,"MESSAGE": "Message"
            ,"UPDATED": "Updated"
            ,"LAST_UPDATED": "Last Updated"
            ,"ALERT_DETAILS": "Alert Details"
            ,"HISTORY": "History"
            ,"ALERT_HISTORY": "Alert History"
            ,"TRIGGERED_BY_ALERT_RULE": "Triggered by alert rule '{0}'"
            ,"ALERTS": "Alerts"
            ,"NEW": "New"
            ,"PREEXISTING": "Preexisting"
            ,"ACTIVE_DURING_PERIOD_CHART_TITLE": "In Time Period"
            ,"SEVERITY_NOW_CHART_TITLE": "Still Open"
            ,"CLOSED_ALERT": "Closed"
            ,"OPEN_ALERTS": "Open"
            ,"SERVICE_LABEL": "Service",
            "CREATE_NEW_RULE_TITLE": "Create a new Alert Rule",
            "CREATE_NEW_RULE_BUTTON": "Create Alert Rule",
            "TOOL_TITLE_CREATE": "Create Alert Rule",
            "TOOL_TITLE_EDIT": "Edit Alert Rule",
            "RULE_NAME_LABEL": "Rule Name",
            "ENTITIES_LABEL": "Entities", // when only supporting single entity type
            "ENTITY_LABEL": "Entity",
            "ENTITY_TYPE_LABEL": "Entity Type",
            "EVALUATION_TYPE_LABEL": "Condition Type",
            "CONDITIONS_LABEL": "Alert Conditions",
            "RULE_NAME_FORMAT_MESSAGE": "Enter alphanumeric or underscore characters starting with a non-numeric character, up to {0} characters.",
            "RULE_DESC_FORMAT_MESSAGE": "Description may contain less than 4000 alphanumeric, space, dot, colon, hyphen or underscore characters.",
            "NUMBER_FORMAT_MESSAGE": "Enter numeric value only",
            "ADD_CONDITION_TOOLTIP": "Add Condition",
            "ADD_CONDITION_BUTTON": "Add Condition",
            "ADD_CONDITION_TITLE": "Add Condition for {0}",
            "METRIC_LABEL": "Metric",
            "OPERATOR_LABEL": "Operator",
            "WARNING_LABEL": "Warning Threshold",
            "CRITICAL_LABEL": "Critical Threshold",
            "DURATION_LABEL": "Time Period",
            "UNIT_LABEL": "Unit",
            "TYPE_LABEL": "Type",
            "GENERATE_ALERT_LABEL": "Number of consecutive minutes that metric should be outside threshold before generating alert:",
            "GENERATE_ANOMALY_ALERT_LABEL": "Number of consecutive minutes that metric should be anomalous before generating alert:",
            "CONDITION_TABLE_SUMMARY": "Table of alert conditions",
            "ERROR_MSG": "Error: {0}",
            "ERROR_MSG_CREATEEMAIL": "Error creating email channel: {0}",
            "ERROR_MSG_CREATEPHONE": "Error creating phone channel: {0}",
            "HTTP_MSG": "{0}: {1}",
            "EMAIL_NOTIFICATION": "Email Notification",
            "EMAIL_NOTIFICATION_INFO": "Send email notification when the alert is first raised, worsen in severity and cleared.  Separate multiple emails by commas.",
            "EMAILS_LABEL": "Emails",
            "EMAIL_PLACE_HOLDER": "Separate multiple emails by commas",
            "MOBILE_NOTIFICATION": "Mobile Notification",
            "MOBILE_NOTIFICATION_INFO": "Mobile notifications will be sent when the alert is first raised, worsens in severity and is closed.  Multiple user names should be separated by commas.",
            "MOBILE_LABEL": "User Names",
            "MOBILE_PLACE_HOLDER": "Separate user names by commas",
            "WORKFLOW_NOTIFICATION": "Workflow Submission",
            "WORKFLOW_NOTIFICATION_INFO": "Submit a workflow when the alert is first raised and worsens in severity.",
            "WORKFLOW_SELECT": "Select a workflow",
            "WORKFLOW_LABEL": "Workflow",
            "ADD_ENTITY_BUTTON": "Add Entities",
            "ADD_ENTITY_TOOLTIP": "Add Entities",
            "BY_APPLICATION_MEMBER": "By Application Member",
            "INDIVIDUALLY" : "Individually",
            "BY_APPLICATION" : "By Application",
            "BY_ENTITIES_TYPE" : "By Entity type",
            "ADVANCED_OPTIONS" : "Advanced",
            "ENTITY_TOOL_INTRO_TYPE": "Choose the type(s) of entities you want to be evaluated for the Alert Rule Conditions.  Use <Click> or <Control><Click> along with \"Add Selected\" to select one or more Entity Types shown in the list, or \"Add All\" to include all types.   When you are finished, click \"Close\" to dismiss the dialog.",
            "ENTITY_TOOL_INTRO_APP": "Choose the Application(s) containing metrics you want to be evaluated for the Alert Rule Conditions.  You may use the filter to narrow the set to find the appropriate applications.    Then use <Click> or <Control><Click> along with \"Add Selected\" to select one or more applications shown in the list, or \"Add All\" to include all applications in the filtered set.   When you are finished, click \"Close\" to dismiss the dialog",
            "ENTITY_TOOL_INTRO_APP_MEMBER": "Choose the Application(s) containing entities you want to be evaluated for the Alert Rule Conditions.  You may use the filter to narrow the set to find the appropriate applications.    Then use <Click> or <Control><Click> along with \"Add Selected\" to select one or more applications shown in the list, or \"Add All\" to include all applications in the filtered set.   When you are finished, click \"Close\" to dismiss the dialog",
            "ENTITY_TOOL_INTRO_INDIVIDUAL": "Choose the individual entities you want to be evaluated for the Alert Rule Conditions.    First choose the Entity Type and then use the filter to narrow the set to find the appropriate entities.  Then use <Click> or <Control><Click> along with \"Add Selected\" to select one or more entities shown in the list, or \"Add All\" to include all entities in the filtered set.   When you are finished, click \"Close\" to dismiss the dialog.",
            "ENTITY_TABLE_SUMMARY": "Table of entities",
            "ENTITY_TYPE_omc_apm_agent_interface": "APM Agent Parent-type",
            "ENTITY_TYPE_omc_apm_dotnet_agent": "APM .NET Agent",
            "ENTITY_TYPE_omc_apm_application": "APM Application",
            "ENTITY_TYPE_omc_apm_ajax_call":"APM Ajax Call",
            "ENTITY_TYPE_omc_apm_page":"APM Page",
            "ENTITY_TYPE_omc_apm_mobile_httpcall2":"APM HTTP Request",
            "ENTITY_TYPE_omc_apm_mobile_method2":"APM View Controller/Activity",
            "ENTITY_TYPE_omc_apm_mobile_app2":"APM Mobile Client",
            "ENTITY_TYPE_omc_apm_server_request":"APM Server Request",
            "ENTITY_TYPE_omc_apm_operation":"APM Operation",
            "ENTITY_TYPE_omc_selenium_test_dep":"APM Scripted Actions/Page Load Test",
            "ENTITY_TYPE_omc_http_ping_test_dep":"APM HTTP Ping Test",
            "ENTITY_TYPE_omc_rest_webservice_test_dep":"APM REST Webservice Test",
            "ENTITY_ALL_omc_apm_agent_interface": "All Agent Parent-type",
            "ENTITY_ALL_omc_apm_dotnet_agent": "All .NET Agents",
            "ENTITY_ALL_omc_apm_application": "All Applications",
            "ENTITY_ALL_omc_apm_ajax_call":"All Ajax Calls",
            "ENTITY_ALL_omc_apm_page":"All Pages",
            "ENTITY_ALL_omc_apm_mobile_httpcall2":"All HTTP Requests",
            "ENTITY_ALL_omc_apm_mobile_method2":"All View Controllers/Activities",
            "ENTITY_ALL_omc_apm_mobile_app2":"All Mobile Clients",
            "ENTITY_ALL_omc_apm_server_request":"All Server Requests",
            "ENTITY_ALL_omc_apm_operation":"All Operations",
            "ENTITY_ALL_omc_selenium_test_dep":"All Scripted Actions/Page Load Tests",
            "ENTITY_ALL_omc_rest_webservice_test_dep":"All APM REST Webservice Test",
            "ENTITY_ALL_omc_http_ping_test_dep":"All HTTP Ping Tests",
            "METRIC_NAME_completedCount_omc_apm_server_request":"Call Count",
            "METRIC_NAME_completedCount_omc_apm_ajax_call":"Call Count",
            "METRIC_NAME_completedCount_omc_apm_page":"View Count",
            "METRIC_NAME_completedCount_omc_apm_mobile_httpcall2":"Call Count",
            "METRIC_NAME_completedCount_omc_apm_mobile_method2":"Call Count",
            "METRIC_NAME_count_omc_apm_mobile_app2":"Crash Count",
            "METRIC_NAME_errorPercentage":"Error Percentage",
            "METRIC_NAME_avgResponseTime":"Average Response Time",
            "METRIC_NAME_perc99ResponseTime":"Percentile-99 Response Time",
            "METRIC_NAME_perc95ResponseTime":"Percentile-95 Response Time",
            "METRIC_NAME_perc75ResponseTime":"Percentile-75 Response Time",
            "METRIC_NAME_perc50ResponseTime":"Percentile-50 Response Time",
            "METRIC_NAME_perc25ResponseTime":"Percentile-25 Response Time",
            "METRIC_NAME_ApdexScore":"Apdex Score",  
            "METRIC_NAME_satisfied":"Satisfied Page Views",
            "METRIC_NAME_tolerating":"Tolerating Page Views",
            "METRIC_NAME_frustrated":"Frustrated Page Views",
            "METRIC_NAME_latestInsertTime":"Latest Insert Time",
            "METRIC_NAME_transactionURL":"Transaction URL",
            "METRIC_NAME_sessionId":"Session Id",
            "METRIC_NAME_syntheticDyeID":"Synthetic Dye Id",
            "METRIC_NAME_unsuccessfulReason":"Unsuccessful Reason",
            "METRIC_NAME_transactionRunId":"Transaction Run Id",
            "METRIC_NAME_totalTxnTime":"Total Transaction Time",
            "METRIC_NAME_totalContentLoadTime":"Total Content Load Time",
            "METRIC_NAME_totalLoadTime":"Total Load Time",
            "METRIC_NAME_totalRequestCount":"Total Request Count",
            "METRIC_NAME_totalWaitTime":"Total Wait Time",
            "METRIC_NAME_noOfPageLoads":"Number of Page Loads",
            "METRIC_NAME_noOfPageClicks":"Number of Page Clicks",
            "METRIC_NAME_totalAjaxRequests":"Total Number of Ajax Requests",
            "METRIC_NAME_totalJSErrors":"Total Number of JS Errors",
            "METRIC_NAME_totalImages":"Total Number of Images",
            "METRIC_NAME_passed":"Test Passed",
            "METRIC_NAME_failed":"Test Failed",
            "METRIC_NAME_error":"Test Error",      
            "METRIC_NAME_connectTime":"Connect Time",
            "METRIC_NAME_firstByteTime":"First Byte Time",
            "METRIC_NAME_redirectTime":"Redirect Time",
            "METRIC_NAME_totalTime":"Total Time",
            "METRIC_NAME_size_download":"Bytes downloaded",
            "METRIC_NAME_transferRate":"Transfer Rate",
            "SELECT_ENTITY_TYPE": "Select an entity type",
            "REMOVE_ENTITY_TYPE": "Remove entity type",
            "REMOVE_CONDITION": "Remove condition",
            "EDIT_CONDITION": "Edit condition",
            "REMOVE_ENTITY_TOOL_INTRO": "Removing entity type will remove all related conditions too."
            ,"REMOVE_ENTITY_TOOL_CONFIRM": "Do you really want to remove entity type \"{0}\"?"
            ,"REMOVE_ENTITY_TOOL_TITLE": "Confirmation"
            ,"ADD_DESCRIPTION": "Add Description"
            ,"EVALUATION_TYPE_Anomaly": "Anomaly"
            ,"EVALUATION_TYPE_SimpleMetricThreshold": "Fixed Metric"
            ,"EVALUATION_TYPE_EarlyWarning": "Early Warning"
            ,"EMPTY_CONDITION_TABLE": "Use Add Condition Button to add more conditions."
            ,"EMPTY_ENTITIES_TABLE": "Use Add Entities Button to add more entities."
            ,"VALIDATE_CRITICAL_THRES_GREATER": "Critial threshold must be greater than warning threshold"
            ,"VALIDATE_CRITICAL_THRES_LESS": "Critial threshold must be less than warning threshold"
            ,"VALIDATE_DURATION_ERROR": "Enter a number between 1 and 15."
            ,"WAITING_DIALOG_TITLE": "Please wait"
            ,"WAITING_DIALOG_TEXT": "Busy fetching data from the server.  Please wait and try again later."
            ,"ACTUAL_VALUE": "Actual Value"
            ,"INBOUND_PREDICTION": "In Bounds Prediction"
            ,"OUTOFBOUND_PREDICTION": "Out of Bounds Prediction"
            ,"TRIGGERED_EVENT": "Triggered Event"
            ,"PREDICTION_RANGE": "Prediction Range"
            ,"EARLY_WARNING_THRESHOLD": "Early Warning Threshold"
            ,"EARLY_WARNING_THRESHOLD_AT": "Early Warning Threshold at {0}"
            ,"EVENT_TRIGGERED_AT": "Event triggered at {0}"
            ,"APPLICATION_LABEL_MEMBER": "Application"
            ,"APPLICATION_LABEL": "APM Application"
            ,"SELECT_APPLICATION": "Select an Application"
            ,"ENTITIES_OF_APPLICATION": "{0}"
            ,"ENTITIES_OF_APPLICATION_MEMBER": "All entities of application {0}"
            ,"ADD_ALL": "Add All"
            ,"ADD_SELECTED": "Add Selected"
            ,"OBJECTS_SELECTED": "{0} objects selected"
            ,"ALERT_TIMESTAMP": "AlertTimestamp"
	},
        "navigationBarProperties":
        {
            "NON_APPLICATION_TITLE": "APM"
            ,"BACK_TO_APM_HOME_TITLE": " APM Home"
            ,"HAMBURGER_MENU_BUTTON_TITLE": "Display navigation bar"
            ,"APPLICATION": "Application"
            ,"BACK_TO_APM_HOME_TITLE_TOOLTIP": "Click to go back to APM Home page"
        },
        "beaconPoolProperties":
        {
            "BEACON_POOL_TITLE_CREATE": "Add Location"
            ,"BEACON_POOL_TITLE_EDIT": "Edit Location"
            ,"BEACON_POOL_SPEC": "Locations Configuration"
            ,"BEACON_POOL_NAME_LABEL": "Name"
            ,"BEACON_POOL_NAME_FORMAT_MESSAGE" : "Enter a valid name upto {0} characters long. First letter can not be a numeric or special character(underscore is allowed). Whitespaces are not allowed."
            ,"AVAILABLE_AGENTS": "Associated Agents"
            ,"NO_ASSOCIATED_AGENTS": "Cloud Agents not selected"
            ,"NO_ASSOCIATED_AGENTS_DETAILS_TEXT": "Location should have at least one associated agent."
            ,"AVAILABLE_AGENTS_HELP_TEXT": "A synthetic test configured at this location will be executed by any one of the agents associated with this location"
            ,"BP_TEST_SUCCESS" : "Location created sucessfully!"
            ,"BP_Location_EDIT_SUCCESS" : "Location properties changed sucessfully!"
            ,"BP_TEST_FAILURE" : "Location creation failed!"
            ,"BP_Location_EDIT_FAILURE" : "Location properties change failed!"
            ,"BP_NAME_ALREADY_EXISTS_SUMMARY": "Duplicate location name."
            ,"BP_NAME_ALREADY_EXISTS_DETAIL": "A Location with this name already exists. Provide a different name."
            ,"SELECT_AGENTS" : "Select Cloud Agents"
            ,"NO_CLOUD_AGENTS" : "No free Cloud Agents available"
            ,"BEACON_POOL_LONGITUDE_LABEL": "Longitude"
            ,"BEACON_POOL_LATITUDE_LABEL": "Latitude"
            ,"BEACON_POOL_CITY_LABEL": "City"
            ,"BEACON_POOL_COUNTRY_LABEL": "Country"
            ,"BEACON_POOL_PROXY_HOST_LABEL": "Proxy Host"
            ,"BEACON_POOL_PROXY_PORT_LABEL": "Proxy Port"
            ,"BEACON_POOL_PROXY_USER_LABEL": "Proxy Username"
            ,"BEACON_POOL_PROXY_PASSWORD": "Proxy Password"
            ,"BEACON_POOL_PROXY_PORT_LABEL_VALIDATION": "Proxy port should be numeric"
            ,"BEACON_POOL_NO_PROXY_LABEL": "No Proxy"
            ,"BEACON_POOL_AUTO_DETECT_PROXY_LABEL": "Auto-detect proxy settings for this network"
            ,"BEACON_POOL_MANUAL_PROXY_CONFIG_LABEL": "Manual proxy configuration"
            ,"BEACON_POOL_AUTO_PROXY_CONFIG_URL_LABEL": "Automatic proxy configuration URL"
            ,"BEACON_POOL_NO_PROXY_FOR_LABEL": "No Proxy for"
            ,"BEACON_POOL_URL": "URL"
            ,"BEACON_POOL_CAPACITY_LABEL": "Capacity"
            ,"BEACON_POOL_CAPACITY_LABEL_HELP_TEXT": "Max number of tests permissible on this location"
            ,"BEACON_POOL_CAPACITY_LABEL_VALIDATION": "Capacity should be numeric"
            ,"BEACON_POOL_VNC_LABEL": "X Server Pool"
            ,"BEACON_POOL_VNC_LABEL_HELP_TEXT": "Specify the x server session range to be used for selenium test execution. It should be in the format 1-10."
            ,"ASSOC_BEACONS": "Associated Agents"
            ,"NO_BEACON_POOL_DEFINITIONS":"You have no locations definitions to display."
            ,"TRY_CREATING_A_BEACON_POOL":"To create a location, click the Add Locations link above."
            ,"BEACON_POOL_FIREFOX_PATH_LABEL": "Firefox Path"
            ,"BEACON_POOL_FIREFOX_PATH_LABEL_HELP_TEXT": "Specify the path of Firefox executable, example /usr/bin/firefox."
            ,"BEACON_POOL_LOCAL_HOST_ALIAS_LABEL": "Local Host Alias"
            ,"BEACON_POOL_LOCAL_HOST_ALIAS_LABEL_HELP_TEXT": "The alias set for 127.0.0,1 in /etc/hosts."
            ,"BEACON_POOL_TITLE_COMMON": "Location Properties"          
            ,"BEACON_POOL_TITLE_ADVANCED": "Advanced Properties"
            ,"BEACON_POOL_TITLE_ADVANCED_HELP_TEXT": "These properties apply to all tests running at this location"
            ,"BEACON_POOL_TITLE_SELENIUM": "Scripted Action Properties"
            ,"BEACON_POOL_TITLE_SELENIUM_HELP_TEXT": "These properties apply to scripted action test type"
            , "REMOVE_BEACON_POOL_TITLE": "Remove Location?"
            , "REMOVE_BEACON_POOL_BODY": "Do you want to remove Location {0}?"
            , "REMOVE_BEACON_POOL_TEST_HELP": "Remove this location."
            , "REMOVE_BEACON_POOL_FAIL": "Can not remove location {0}, as it has test(s) associated with it."
            , "BEACON_POOL_COMPATIBLE_LABEL" : "Compatibility Check"
            ,"ACTION_DECLINED" : "Action Declined"
            , "SHOW_METRIC_DIALOG_TITLE" : "Agent Compatibility Check"
            , "AGENT_VERSION" : "Agent Version"
            , "FIREFOX_VERSION" : "Firefox Version"
            , "XSERVER_UNAVAILABLE_PORTS" : "Unavailable Ports"
            , "METRICS_NOT_AVAILABLE" : "Agent Compatibility metrics not available"
            , "METRICS_LOADING" : "Loading"
            ,"BEACON_POOL_AGENT_NAME": "Agent Name"
            ,"BEACON_POOL_AGENT_VERSION": "Agent Version"
            ,"BEACON_POOL_FIREFOX_VERSION": "Firefox Version"
            ,"BEACON_POOL_PROXY_STATUS": "Proxy Status"
            ,"BEACON_POOL_PROXY_ERROR_MSG": "Proxy Error Message"
            ,"BEACON_POOL_XSERVER_UNAVAILABLE_PORTS" : "X-Server Unavailable Ports"
            ,"BEACON_POOL_XSERVER_UNAVAILABLE_PORTS_MSG" : "X-Server Unavailable Ports Message"
        },
    "browserAgentProperties":
    {
        "OVERVIEW_TEXT_PART1": "In order for APM to report on Pages, Ajax Calls, and Sessions in an application and correlate them with appropriate Server Requests, it requires the inclusion of certain javascript and cookies. This can be done automatically by the APM Agent or can be managed manually."
        ,"OVERVIEW_TEXT_PART2": "For more detailed information, please see the online help for APM, in the \"One-time Setup\" section."
        ,"COLLECTOR_URL_SUBTITLE": "For Reverse Proxy configurations, use the following collector URL to configure APM agents:"
        ,"JAVASCRIPT_TITLE": "Javascript for Agentless End User Monitoring"
        ,"JAVASCRIPT_SUBTITLE": "Copy and insert the script below to all your application pages to allow APM to report on the Pages, Ajax Calls, and Sessions."
        ,"JAVASCRIPT_NOTE": "NOTES:"
        ,"JAVASCRIPT_NOTE_CONTENT1": "Details of adding javascript are specfic to the Application, OS Platform and Application Server Platform."
        ,"JAVASCRIPT_NOTE_CONTENT2": "For Reverse Proxy configurations, replace protocol, host and port information below based on specifics of your Reverse Proxy."
        ,"CONFIGURE_EUM_TITLE": "Configure End User Monitoring Injection Type Property"
        ,"CONFIGURE_EUM_DESCRIPTION_TEXT": "The table below allows you to configure the End User Monitoring (EUM) injection type property for Application Servers with agent versions 1.21 or later. For earlier versions you must manually edit the property file for the Application Server agent(s) directly. For more detailed information, please see the online help for APM, in the \"One-time Setup\" section."
        ,"CONFIGURE_EUM_FILTER_TEXT": "Use the filter to help locate the Application Server(s) you would like to configure, then click on the \"pencil\" icon to edit the setting."
        ,"CONFIGURE_EUM_LIST_HEADER": "The following configuration options are available:"
        ,"CONFIGURE_EUM_OPTION_REFERENCE_RADIO": "Reference - this injects both the reporting javascript and the correlation cookie automatically, using a reference to a central javascript library"
        ,"CONFIGURE_EUM_OPTION_CORRELATION_RADIO": "Correlation - this includes only the correlation cookie, leaving reporting javascript to be manually included by you"
        ,"CONFIGURE_EUM_OPTION_NONE_RADIO": "None - No automatic injection"
        ,"CONFIGURE_EUM_OPTION_FULL_RADIO": "Full - this injects the full reporting javascript and the correlation cookie automatically (not recommended)"
        ,"CONFIGURE_EUM_NOTE": "Appservers with APM Agent versions prior to 1.21 must be configured manually by editing the agent property file."
        ,"CONFIGURE_EUM_APPSERVER_NAME": "Name"
        ,"CONFIGURE_EUM_APPSERVER_HOST_PORT": "AppServer"
        ,"CONFIGURE_EUM_APPSERVER_TYPE": "AppServer Type"
        ,"CONFIGURE_EUM_AGENT_VERSION": "Agent Version"
        ,"CONFIGURE_EUM_INJECTION_TYPE": "Injection Type"
        ,"CONFIGURE_EUM_CONFIGURE": "Configure"
        ,"CONFIGURE_EUM_INVALID_VERESION": "Agent versions prior to 1.21 must be configured manually."
        ,"CONFIGURE_EUM_POPUP_TITLE": "Configure EUM Injection Type"
        ,"CONFIGURE_EUM_BUTTON_TITLE": "Set"
        ,"CONFIGURE_EUM_FOR_APPSERVER": "Selected application server: {0}" 
        ,"CONFIGURE_EUM_CURRENT_SETTING": "Current injection type value: {0}" 
        ,"CONFIGURE_EUM_CHOICE_TITLE": "Choose one of the following configuration options:"
        ,"CONFIGURE_EUM_CONFIRMATION_TITLE": "Setting Submitted"
        ,"CONFIGURE_EUM_CONFIRMATION_DETAIL": "Note: it may take several minutes for this change to be reflected in the configuration table. Refresh the browser to update the table."
        ,"CONFIGURE_EUM_ERROR_TOOLTIP": "Setting injection type to \"{0}\" failed with error: {1}"
        ,"CONFIGURE_EUM_PENDING_TOOLTIP": "Setting injection type to \"{0}\" is still pending - the change is not yet complete."
    },
    "globalContextProperties":
    {
        "CANNOT_NAVIGATE_TO_ENTITY": "APM cannot show entity's details as there was no traffic for that entity in the current time period."
        ,"CANNOT_SHOW_MORE_THAN_ONE_ENTITY": "APM cannot handle more than one entity selection in the global context."
        ,"CANNOT_NAVIGATE_TO_ENITTY_GENERAL": "APM cannot show entity's details."
        ,"CANNOT_SHOW_MORE_THAN_ONE_ENTITY_GOING_GLOBAL_HOME": "APM cannot handle more than one entity selection in the global context. Defaulting to APM Home page"
        ,"CANNOT_SHOW_MORE_THAN_ONE_ENTITY_GOING_APP_HOME": "APM cannot handle more than one entity selection in the global context. Defaulting to {0} Home page"
        ,"CANNOT_NAVIGATE_TO_COMPOSITE_GENERAL": "APM cannot show composite's details."
        ,"NOT_RECOGNIZED_ENTITY": "Entity {0} (with type {1}) is not supported by APM."
        ,"NOT_RECOGNIZED_COMPOSITE": "Composite {0} (with type {1}) is not supported by APM."
        ,"CANNOT_SET_GC_TO_ENTITY": "Global Context could not be set to the selected entity."
        ,"MORE_THAN_ONE_ENTITY_MATCHED": "More than one version of the entity exists in APM in the current time period. Showing one of them."

    }
            
});