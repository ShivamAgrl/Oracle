/**
 * Global constants
 */
var UI_CONTEXT_ROOT = '/emsaasui/apmUi';

// URL parameter names
var PARAM_ROOT = 'root';
var PARAM_OJ_ROUTER = 'oj_Router'; // url param named used by ojRouter to store encrypted data
//var PARAM_TAB = 'navTab';
var PARAM_TIME_PERIOD='timePeriod';
var PARAM_SINCE = 'since';
var PARAM_UNTIL = 'until';
var PARAM_TENANT = 'tenant';
var PARAM_LIMIT = 'limit';
var PARAM_COUNT = 'count';
var PARAM_OFFSET = 'offset';
var PARAM_Q = 'q';
var PARAM_ORDERBY = 'orderBy';
var PARAM_GROUPBY = 'groupBy';
var PARAM_LOCALE = 'locale';
var DISPLAY_MODE = 'displayMode';  // displayMode=dashboard, is checked in apmMain.js means we are in EM home page
var PARAM_APP_NAME = 'appName';
var PARAM_APP_MEID = 'appMEID';
var PARAM_RULE_ID = 'ruleId'; //param passed from eventUi for editing an alert rule
var PARAM_SERVICE_TYPE="serviceType";//param passed from eventUi for editing an alert rule
var PARAM_SYNTEST_TYPE = 'synTestType';
var PARAM_ALERTS_SEVERITY = 'severity';
var PARAM_ALERT_ID = 'alertId';
var PARAM_METRIC = 'metric';
var PARAM_THRESHOLD = 'threshold';
var PARAM_ENTITIES = 'entities';
var PARAM_QUERY = 'query';

// These are the 'id' for each object.  When adding, also add to the OBJECT_URL_PARAM_ARRAY which is used for caching filters
var PARAM_REQUEST_ID = 'requestId';
var PARAM_LOGICAL_REQUEST_ID = 'logicalRequestId';
var PARAM_PAGE_ID = 'pageId';
var PARAM_SESSION_ID = 'sessionId';
var PARAM_INSTANCE_ID = 'instanceId';
var PARAM_THREAD_ID="threadId";
var PARAM_AJAX_CALL_ID = 'ajaxCallId';
var PARAM_MOBILE_CLIENT_ID = 'mobileClientId';
var PARAM_MOBILE_REQUEST_ID = 'mobileRequestId';
var PARAM_MOBILE_METHOD_ID = 'mobileMethodId';
var PARAM_APPSERVER_ID = 'appserverId';
var PARAM_APPSERVER_KEY = 'appserverKey';
var PARAM_SYNTEST_ID = 'synTestId';
var PARAM_SYNTRAN_ID = 'synTestTxnRunId';
var PARAM_SYNTESTDEP_ID = 'synTestDepId';
var PARAM_SYN_EDIT_DATA = 'synEditData';
var PARAM_SYNTRAN_STARTTIME = 'synStartTime';
var PARAM_THREADPROFILER_ID = 'threadProfilerId';
var PARAM_CLASS_HISTOGRAM_ID = 'classHistogramId';
var PARAM_JFR_ID = 'jfrId';
var PARAM_THREADPROFILER_NAME = 'threadProfilerName';
var PARAM_THREADPROFILER_SERVERNAME = 'threadProfilerServerName';
var PARAM_DIAGNOSTIC_SNAPSHOTS_TYPE = 'diagnostiSnapshotsType';
var PARAM_DIAGNOSTICS_ID = 'diagnosticsId';
var PARAM_DIAGNOSTICS_STARTTIME = 'diagnosticsStartTime';
var PARAM_APPLICATION_NAME = 'applicationName';
var PARAM_APPLIATION = 'application'; //param for getting application flow/topology data from apmDataServer
var PARAM_APPLICATION_TOOL_TYPE = 'applicationToolType';
var PARAM_APPLICATION_TOOL_APP_NAME = 'applicationToolAppName';
var PARAM_OPERATION_NAME = 'opName';
var PARAM_DEPLOYMENT = 'deployment';
var PARAM_TYPE = 'type';
var OBJECT_URL_PARAM_ARRAY = [PARAM_REQUEST_ID, PARAM_PAGE_ID, PARAM_INSTANCE_ID, PARAM_AJAX_CALL_ID, PARAM_APPSERVER_ID, PARAM_SYNTEST_ID, PARAM_LOGICAL_REQUEST_ID ];

// URL parameter values
var VALUE_PAGE_REQUESTS = "Requests";
var VALUE_PAGE_LOGICAL_REQUESTS = "LogicalRequests";
var VALUE_PAGE_SESSIONS = "Sessions";
var VALUE_PAGE_PAGES = "Pages";
var VALUE_PAGE_MOBILE_CLIENTS = "MobileClients";
var VALUE_PAGE_MOBILE_METHODS = "MobileMethods";
var VALUE_PAGE_MOBILE_REQUESTS = "MobileRequests";
var VALUE_PAGE_MOBILE_CLIENT_REG = "MobileClientReg";
var VALUE_PAGE_SERVERS = "Servers";
var VALUE_THREAD_SERVERS = "Thread Profiler";
var VALUE_PAGE_AJAX_CALLS = "AjaxCalls";
var VALUE_PAGE_HOME = "home";
var VALUE_PAGE_APP_HOME = "applicationHome";
var VALUE_PAGE_APP_PERF = 'applicaitonPerf';
var VALUE_PAGE_APP_ENDUSERS = 'applicationEndUsers';
var VALUE_PAGE_APP_METRICS = 'applicationMetrics';
var GO_TO_ALERTS = "GoToAlerts";
var GO_TO_ALERT_RULES = "GoToAlertRules";
var GO_TO_LOG_ANALYTICS_FOR_APP = "GoToLogAnalForApp";
var VALUE_PAGE_REQUESTDETAIL = "RequestDetail";
var VALUE_PAGE_LOGICALREQUESTDETAIL = "LogicalRequestDetail";
var VALUE_PAGE_INSTANCEDETAIL = "InstanceDetail";
var VALUE_PAGE_THREADDETAIL = "ThreadDetail";
var VALUE_PAGE_SERVERDETAIL = "ServerDetail";
var VALUE_PAGE_PAGEDETAIL = "PageDetail";
var VALUE_PAGE_MOBILE_CLIENTDETAIL = "MobileClientDetail";
var VALUE_PAGE_MOBILE_METHODDETAIL = "MobileMethodDetail";
var VALUE_PAGE_MOBILE_REQUESTDETAIL = "MobileRequestDetail";
var VALUE_PAGE_MOBILE_CLIENT_LINK = "mobileApps"
var VALUE_PAGE_SESSIONDETAIL = "SessionDetail";
var VALUE_PAGE_AJAXDETAIL = "AjaxCallDetail";
var VALUE_PAGE_SYNTESTDETAIL = "SynTestDetail";
var VALUE_PAGE_APPLICATIONS = "Applications";
var VALUE_PAGE_APPLICATION_DEFINITIONS = "ApplicationDefinitions";
var VALUE_PAGE_SYNTESTS = "SynTests";
var VALUE_PAGE_SYNTESTS_ADMIN = "SynTestsAdmin";
var VALUE_PAGE_BEACON_POOL_ADMIN = "BeaconPoolAdmin";
var VALUE_PAGE_BROWSER_AGENT = "BrowserAgent";
var VALUE_PAGE_THREAD_PROFILER = "ThreadProfiler";
var VALUE_PAGE_THREAD_PROFILER_RESULT = "ThreadProfilerResult";
var VALUE_PAGE_THREAD_PROFILER_START = "ThreadProfilerStart";
var VALUE_PAGE_OSS_CREDENTIAL = "OSSCredential";
var VALUE_PAGE_OSS_CREDENTIAL_RESULT = "OSSCredentialResult";
var VALUE_PAGE_DIAGNOSTIC_SNAPSHOTS = "DiagnosticSnapshots";
var VALUE_PAGE_DIAG_JFR = "JavaFlightRecorders";
var VALUE_PAGE_DIAG_HEAP_DUMP = "HeapDump"
var VALUE_PAGE_DIAG_CLASS_HISTOGRAM = "ClassHistogram";
var VALUE_PAGE_CLASS_HISTOGRAM_RESULT = "ClassHistogramResult"
var VALUE_PAGE_JFR_RESULT = "JFRResult"
var VALUE_RULE_TOOL = 'ruleTool';
var VALUE_APPLICATION_TOPOLOGY ="ApplicationTopology";
var VALUE_CONTAINERS = "Containers";
var VALUE_PAGE_SETTINGS = "Settings";
var VALUE_PAGE_IP_MASKING = "IpMasking";
var VALUE_PAGE_APPLICATION_DEFINITION_TOOL = "applicationDefinitionTool";
var VALUE_PAGE_ADMIN = "Administration";
var VALUE_HAR_VIEWER = "HarStatistics";
var VALUE_CREATE_SYNTHETIC_TEST = "SynTestTool";
var PARAM_FILTER_OPTION = "filterSynthteic";

var SERIES_ID_PREFIX = 's_'; //should be used as prefox to all object properties that contains chart series data
//
// Time period values
var VALUE_TIMEPERIOD_LAST15MINUTES  = "LAST_15_MINUTE";
var VALUE_TIMEPERIOD_LAST30MINUTES  = "LAST_30_MINUTE";
var VALUE_TIMEPERIOD_LAST_60MINUTES = "LAST_60_MINUTE";
var VALUE_TIMEPERIOD_LASTHOUR       = "LAST_1_HOUR";
var VALUE_TIMEPERIOD_LAST2HOURS     = "LAST_2_HOUR";
var VALUE_TIMEPERIOD_LAST4HOURS     = "LAST_4_HOUR";
var VALUE_TIMEPERIOD_LAST6HOURS     = "LAST_6_HOUR";
var VALUE_TIMEPERIOD_LAST8HOURS     = "LAST_8_HOUR";
var VALUE_TIMEPERIOD_LAST12HOURS    = "LAST_12_HOUR";
var VALUE_TIMEPERIOD_LAST24HOURS    = "LAST_24_HOUR";
var VALUE_TIMEPERIOD_LASTDAY        = "LAST_1_DAY";
var VALUE_TIMEPERIOD_LAST2DAYS      = "LAST_2_DAY";
var VALUE_TIMEPERIOD_LAST3DAYS      = "LAST_3_DAY";
var VALUE_TIMEPERIOD_LAST4DAYS      = "LAST_4_DAY";
var VALUE_TIMEPERIOD_LAST5DAYS      = "LAST_5_DAY";
var VALUE_TIMEPERIOD_LAST6DAYS      = "LAST_6_DAY";
var VALUE_TIMEPERIOD_LAST7DAYS      = "LAST_7_DAY";
var VALUE_TIMEPERIOD_LASTWEEK       = "LAST_1_WEEK";

//The default time period chagnes once in a while and we need to refer to it in a few places so use this constant
//instead of the actual value of the constant.
var DEFAULT_TIME_PERIOD         =  VALUE_TIMEPERIOD_LAST_60MINUTES;

//Time unit values
var TIME_UNIT_NANOSECONDS = "ns";
var TIME_UNIT_MILLISECONDS = "ms";
var TIME_UNIT_SECONDS = "s";
var TIME_UNIT_MINUTES = "m";
var TIME_UNIT_HOURS = "h";
var TIME_UNIT_DAYS = "d";

// Time/date picker constrains
var MAX_TIME_WINDOW = 7*24*60*60*1000;   // we limit custom window to 7 days

var NANOSECS_PER_MILLISEC = 1000000;
var BYTES_PER_MEGABYTE = 1048576;

// Event type string
var EVENT_GRANULARITY_CHANGED = 'granularityChangedEvent';

// Tier types
var TIER_APP_SERVER = 'APP_SERVER';
var TIER_DATABASE = 'database';
var TIER_EXTERNAL = 'external';

// Limit to display in Top N dashboard regions
var DASHBOARD_LIMIT = 5;

// Standard size for axis labels in charts
var CHART_FONT_SIZE = ".786rem";

// Colors used in charts

var COLOR_PRIMARY =       "#267db3";
var COLOR_SECONDARY =     "#6ddbdb";
var COLOR_ERROR =         "#D83A33";
var COLOR_FLAG =          "#fbce4a";
var COLOR_SUCCESS =        COLOR_PRIMARY;
var COLOR_SPARK =          COLOR_PRIMARY;
var COLOR_MIN_TIME =      COLOR_SECONDARY;
var COLOR_MAX_TIME =      COLOR_SECONDARY;
var COLOR_RANGE =         "#386ddbdb";
var COLOR_BASELINE =      "rgba(175,186,197,0.6)";
var COLOR_ANOMALY =       "#eb7300";

var COLOR_RESPONSE_METER_PLOT_AREA =    "#C8D6E6";
var COLOR_RESPONSE_METER_REF_LINE =     "#285EA6";

var COLOR_STATUS_METER_BORDER =         "#DBDBDB";
var COLOR_STATUS_METER_PLOT_AREA =      "#F2F2F2";

var COLOR_BACKGROUND_LIST_CHART =      "#F2F2F2";
var COLOR_BACKGROUND_ERROR_STACK =     "#F0F0F0";

var COLOR_APP_SERVER =  "#dedf54";//"#00c0ee";
var COLOR_DATABASE =    "#47bdef";//"#8b5fc2";
var COLOR_EXTERNAL =    "#ffb54d";//"#e3e153";


var COLOR_THREAD_STATE_RUNNABLE =  "#267db3";
var COLOR_THREAD_STATE_LOCK =    "#6ddbdb";
var COLOR_THREAD_STATE_DB =    "#47bdef";
var COLOR_THREAD_STATE_NETWORK =    "#ffb54d";
var COLOR_THREAD_STATE_IO =     "#fbce4a";
var COLOR_THREAD_STATE_OTHER =    '#3C4044';

//Alert Details chart color
var COLOR_ALERT_CLOSED_CLEAR = "#b7e1c3";
var COLOR_ALERT_CLOSED_WARNING = "#ffeb99";
var COLOR_ALERT_CLOSED_CRITICAL = "#ffc299";
var COLOR_ALERT_CLOSED_FATAL = "#fbeaea";
 var COLOR_ALERT_OPEN_CLEAR = ALERT_COLOR_CLEAR;
 var COLOR_ALERT_OPEN_WARNING =  ALERT_COLOR_WARNING;   
 var COLOR_ALERT_OPEN_CRITICAL = ALERT_COLOR_CRITICAL;
 var COLOR_ALERT_OPEN_FATAL = ALERT_COLOR_FATAL;
 var COLOR_ALERT_OTHER = "#d992bc";

// Kiki color:
//var COLOR_DIAGRAM_APP_SERVER = "#96d1ce";
//var COLOR_DIAGRAM_DATABASE   = "#a984b8";
//var COLOR_DIAGRAM_EXTERNAL   = "#aed292";

// Maria's color
//var COLOR_DIAGRAM_APP_SERVER = "#47bdef";
//var COLOR_DIAGRAM_DATABASE   = "#ffb54d";
//var COLOR_DIAGRAM_EXTERNAL   = "#e371b2";
// Val's color
var COLOR_DIAGRAM_APP_SERVER = COLOR_APP_SERVER;
var COLOR_DIAGRAM_DATABASE   = COLOR_DATABASE;
var COLOR_DIAGRAM_EXTERNAL   = COLOR_EXTERNAL;
var COLOR_ICON_APP_SERVER = "#ffffff";
var COLOR_ICON_DATABASE   = "#ffffff";
var COLOR_ICON_EXTERNAL   = "#ffffff";

// new color with darker icon color
//var COLOR_DIAGRAM_APP_SERVER = "#ecf1cd";
//var COLOR_DIAGRAM_DATABASE   = "#dcf1ff";
//var COLOR_DIAGRAM_EXTERNAL   = "#f9ddc0";
//var COLOR_ICON_APP_SERVER = "#dedf54";
//var COLOR_ICON_DATABASE   = "#47bdef";
//var COLOR_ICON_EXTERNAL   = "#ffb54d";

var COLOR_DIAGRAM_HOVER = "#e2e3e4";
var COLOR_DIAGRAM_SELECTION  = "#2d1d85";// #267db3";
var COLOR_DIAGRAM_HIGHTLIGHT = '#3C4044';
var COLOR_DIAGRAM_MORELINKS  = "#045FAB";// #878C90";
var COLOR_DIAGRAM_NON_CONTRIBUTER="#145c9e";
var COLOR_DIAGRAM_GRAY       = "#afbac5";
var COLOR_DIAGRAM_WHITE      = "#ffffff";
var COLOR_DIAGRAM_RED        = "#ff0000";
var COLOR_DIAGRAM_ORANGE     = "#ffb54d";
var COLOR_DIAGRAM_YELLOW     = "#dedf54";
var COLOR_DIAGRAM_BLUE       = "#47bdef";
var COLOR_DIAGRAM_PAGE       = '#00b9cd';
var COLOR_DIAGRAM_AJAX       = '#ffb54d';
var COLOR_DIAGRAM_AS         = '#8f4b91';

var UNICODE_APP_SERVER =  "\uf233";
var UNICODE_DB =    "\uf1c0";
var UNICODE_DATABASE =    "SQL";
var UNICODE_EXTERNAL =    "\uf013";
var UNICODE_UNKNOWN  =    "\uf128";
var UNICODE_REQUEST  =    "\uf0e8";
var UNICODE_OPERATION  =  "\uf013";
var UNICODE_MORELINKS =   "\uf141";
var UNICODE_WARNING  =     "\uf071";
var UNICODE_BROWSERCLIENT =  "\uf108";
var UNICODE_MOBILECLIENT = "\uf10b";
var UNICODE_PAGE = "\uf0f6";
var UNICODE_AJAX = "\uf1c9";

var COLOR_FIRST_BYTE =  "#007dad";
var COLOR_DOM_READY =   "#02dfdb";
var COLOR_INTERACTIVE =   "#02dfdb";
var COLOR_PAGE_READY =  "#ffb045";
var COLOR_CALL_RESPONSE =  COLOR_FIRST_BYTE;
var COLOR_CALL_PROCESSING =  COLOR_PAGE_READY;

// Apdex reporting
var COLOR_SATISFIED = "mediumseagreen";
var COLOR_TOLERATING = "gold";
var COLOR_FRUSTRATED = "indianred";

// status colors
var COLOR_STATUS_UP = '#4EAA24';
var COLOR_STATUS_DOWN = '#E73900';
var COLOR_STATUS_ERROR = '# EF8D00'; 
var COLOR_STATUS_UNAVAILABLE = '#F9C000';
var COLOR_STATUS_UNKNOWN = '#6E8598'; 
var COLOR_STATUS_NOT_APPLICABLE = '#AFBAC5'; 

var PALETTE_SHORT = "ShortPalette";

var TILE_BAR_HEIGHT = "18px";
var TABLE_BAR_HEIGHT = "22px";

var APPLICATION_HOME_TILE_HEIGHT = "137";

var CHART_LINE_WIDTH = "2";
var CHART_LINE_WIDTH_WIDE = "3";
var DASHBOARD_CHART_LINE_WIDTH = "1";
var OVERVIEW_CHART_LINE_WIDTH = "3";

var SPARKCHART_MARKER_SIZE_TILE = 5;
var SPARKCHART_MARKER_SIZE_LIST = 5;
var SPARKCHART_MARKER_SIZE_DASHBOARD = 5;
var CHART_MARKER_SIZE = 5;
var CHART_MARKER_SIZE_ANOMALIES = 6;
var CHART_MARKER_SIZE_INSTANCES = 11;
var CHART_MARKER_SIZE_ALERTS = 13;
var DEFAULT_MARKER_SHAPE = 'square';

//mobile constants
var OS_TYPE_IOS = "iOS";
var OS_TYPE_ANDROID = "Android";
var MOBILE_VERSION_UNKNOWN = "UNKNOWN";

// known link names from REST
var VALUE_LINK_SELF = "self";
var VALUE_LINK_TIMESERIES = "timeSeries";
var VALUE_LINK_DATASERIES = 'dataSeries';
var VALUE_LINK_BASELINES = 'baselines';
var VALUE_LINK_INSTANCES = "instances";
var VALUE_LINK_OPERATIONLINKS = "operationLinks";
var VALUE_LINK_SERVER_REQUEST_CALLERS = "serverRequestCallers";
var VALUE_LINK_BROWSERS_CALLERS = "browserCallers";
var VALUE_LINK_RELATED_REQUESTS = "relatedRequests";
var VALUE_LINK_AJAXCALLS = "ajaxCalls";
var VALUE_LINK_PAGES = "pages";
var VALUE_LINK_NEXTPAGE = "nextPage";
var VALUE_LINK_PREVIOUSPAGE = "previousPage";
var VALUE_LINK_REQUEST_SUMMARY = "requestSummary";
var VALUE_LINK_THREAD_POOL_SUMMARY = "threadPoolSummary";
var VALUE_LINK_APPSERVER_DETAILS = "appServerDetails";
var VALUE_LINK_DEPLOYMENT_INFO = "deploymentInfo";
var VALUE_LINK_APPSERVER_INFO = "appserverInfo";
var VALUE_LINK_JVM_INFO = "jvmInfo";
var VALUE_LINK_HOST_INFO = "hostInfo";
var VALUE_LINK_AGENT_INFO = "agentInfo";
var VALUE_LINK_AJAX_SUMMARY = "ajaxSummary";
var VALUE_LINK_SLOWEST_AJAX_CALL = "slowestAjaxCall";
var VALUE_LINK_MOST_ERRORS_AJAX_CALL = "mostErrorsAjaxCall";
var VALUE_LINK_APPLICATION = "application";
var VALUE_MULTIGRAPH_PREFIX = "multiGraph";
var VALUE_ADDR_LINKS = "links";
var VALUE_ADDR_WARNINGS_AND_INFO = "warningsAndInformation";
var VALUE_LINK_MOBILE_RELATED_HTTP_REQUESTS = "mobileHttpCalls";
var VALUE_LINK_MOBILE_HTTP_CALLS_SUMMARY = "mobileHttpCallsSummary";
var VALUE_LINK_SLOWEST_MOBILE_HTTP_CALL = "slowestMobileHttpCall";
var VALUE_LINK_MOST_ERRORS_MOBILE_HTTP_CALL = "mostErrorsMobileHttpCall";
var VALUE_LINK_MOBILE_RELATED_METHODS = "mobileMethods";
var VALUE_LINK_MOBILE_METHODS_SUMMARY = "mobileMethodsSummary";
var VALUE_LINK_SLOWEST_MOBILE_METHOD = "slowestMobileMethod";
var VALUE_LINK_MOST_ERRORS_MOBILE_METHOD = "mostErrorsMobileMethod";
var VALUE_LINK_MOBILE_DEVICE_TIMESERIES = "mobileDeviceTimeSeries";


// known REST call we make (not via links)
var REST_APP_SERVERS = "/appservers";
var REST_APP_SERVER_DIAGNOSTIC_LIST = "/diagnostic";
var REST_APP_SERVER_JFR_CONFIG_NAME = "&configName=oracle.apmaas.agent.deepdive.jfrStatus";
var REST_APP_SERVER_HEAP_CONFIG_NAME = "&configName=oracle.apmaas.agent.deepdive.heapDumpSupport";
var REST_APP_SERVER_HISTO_CONFIG_NAME = "&configName=oracle.apmaas.agent.deepdive.classHistogramSupport";
var REST_APP_SERVER_AGENT = "/appserveragent";
var REST_AJAX_CALLS = "/ajaxCalls";
var REST_APPLICATIONS = "/applications/summary";
var REST_APPLICATION_DEFINITIONS = "/applications";
var REST_PAGES = "/pages";
var REST_SERVER_REQUESTS = "/requests";
var REST_FLOWS = "/flows";
var REST_MOBILE_CLIENTS = "/mobileApps";
var REST_MOBILE_METHODS = "/mobileMethods";
var REST_MOBILE_REQUESTS = "/mobileHttpCalls";
var REST_MOBILE_CLIENT_REG_LIST = "/mobileApps/register";
var REST_MOBILE_CLIENT_REG_TOOL = "/mobile/registration";
var REST_SYN_TEST_HTTP_PING_TEST_DEP = "/synthetic/alertEntities/omc_http_ping_test_dep";
var REST_SYN_TEST_SELENIUM_TEST_DEP = "/synthetic/alertEntities/omc_selenium_test_dep";
var REST_SYN_TEST_REST_WEBSERVICE_TEST_DEP = "/synthetic/alertEntities/omc_rest_webservice_test_dep";
var REST_SYN_TESTS = "/synthetic/tests";
var REST_DIAGNOSTICS_JFR_DUMP_JOBS_LIST = "/diagnostic/jfrdumps";
var REST_DIAGNOSTICS_JFR_DUMP_ZIP_DOWNLOAD = "/jfr";
var REST_DIAGNOSTICS_JFR_DUMP_FINDING_TAB = "/reports/findings/html";
var REST_DIAGNOSTICS_HEAP_DUMP_JOBS_LIST = "/diagnostic/heapdumps";
var REST_DIAGNOSTICS_CLASS_HISTOGRAM_JOBS_LIST = "/diagnostic/classhistograms";
var REST_THREAD_PROFILE_DATA = "/profilers";
var REST_THREAD_PROFILER_JOBS = "/profiler/jobs";
var REST_CONTAINERS = "/hosts";
var REST_INTERNAL = "/internal"
var REST_FEATURES = "/others/features";

//Out of box folders for APM defined in savedsearch branch savedsearch-schema/src/main/sql/emaas_savesearch_seed_data_apm.sql
var SS_FOLDER_REQUESTS = 501;
var SS_FOLDER_PAGES = 502;
var SS_FOLDER_INSTANCES = 503;
var SS_FOLDER_AGENTS =504;
var SS_FOLDER_APPSERVERS= 505;
var SS_FOLDER_AJAX = 506;
var SS_FOLDER_JDBC = 507;
var BP_FOLDER_AGENTS = "508";

//Name of subfolders that will be created on demand.  Their parent folder will
// be one of the out of fox folders above
var SS_FOLDER_REQUEST_LINKS = "APM_Request_Links";
var SS_FOLDER_LOGICAL_REQUESTS = "APM_Logical_Requests";
var SS_FOLDER_REQUEST_CALLERS = "APM_Request_Callers";
var SS_FOLDER_APP_DEFINITIONS = "APM_Applicaiton_Definitions";
var SS_FOLDER_THREADPROFILERS = "APM_Thread_Profilers";
var SS_FOLDER_JFR = "APM_JFR";
var SS_FOLDER_HEAPDUMP = "APM_Heap_dumps";
var SS_FOLDER_CLASSHISTOGRAM = "APM_Class_histograms";
var SS_FOLDER_CLASSHISTOGRAMS_INSTANCES = "APM_Class_Histograms_Instances";
var SS_FOLDER_APPSERVERSELECTION_DIAG = "APM_Appserver_Selection_Diag";
var SS_FOLDER_APPSERVERSELECTION_TP = "APM_Appserver_Selection_TP";
var SS_FOLDER_THREADPROFILERS_REQUESTS = "APM_Thread_Profilers_Requests";
var SS_FOLDER_THREADPROFILERS_INSTANCES = "APM_Thread_Profilers_Instances";
var SS_FOLDER_THREADPROFILERS_THREAD = "APM_Thread_Profilers_Thread";
var SS_FOLDER_THREADPROFILERS_STACKS = "APM_Thread_Profilers_Stacks";
var SS_FOLDER_SYNTESTS = "APM_Synthetic_Tests";
var SS_FOLDER_SYNTEST_SCRIPTED_ACTION_INSTANCES = "APM_Synthetic_Test_Scripted_Action_Instances";
var SS_FOLDER_SYNTEST_PAGE_LOAD_INSTANCES = "APM_Synthetic_Test_Page_Load_Instances";
var SS_FOLDER_SYNTEST_PING_INSTANCES = "APM_Synthetic_Test_Ping_Instances";
var SS_FOLDER_SYNTEST_REST_WEBSERVICES_INSTANCES = "APM_Synthetic_Test_REST_Webservice_Instances";
var SS_FOLDER_PAGES_SESSIONS = "APM_Sessions";
var SS_FOLDER_PAGES_INSTANCES = "APM_Page_Instances";
var SS_FOLDER_MOBILE_CLIENTS = "APM_Mobile_Clients";
var SS_FOLDER_MOBILE_METHODS = "APM_Mobile_Methods";
var SS_FOLDER_MOBILE_REQUESTS = "APM_Mobile_Requests";
var SS_FOLDER_MOBILE_REGISTRATIONS = "APM_Mobile_Registrations";
var SS_FOLDER_APPSERVER_AGENTS = "APM_Appserver_agents";
var BP_FOLDER_LOCATIONS = "APM_Locations";
var FILTER_CRITERIA_TYPE_BOOLEAN = "Boolean";
var FILTER_CRITERIA_TYPE_DATE = "Date";
var FILTER_CRITERIA_TYPE_ENUM = "Enum";
var FILTER_CRITERIA_TYPE_METRIC = "Metric";
var FILTER_CRITERIA_TYPE_STRING = "String";
var FILTER_CRITERIA_TYPE_HAS_ITEM = "HasItem";

var FILTER_ATTR_APPLICATION = "applicationName";

// Constant object definitions, used by commonListModel.js
var REQUEST_LIST_OBJECT_TYPE                = "requestList";
var LOGICAL_REQUEST_LIST_OBJECT_TYPE        = "logicalRequestList";
var LOGICAL_REQUEST_REQUEST_LIST_OBJECT_TYPE= "logicalRequestRequestList";
var REQUEST_LIST_DASHBOARD_OBJECT_TYPE      = "requestListDashboard";
var THREAD_PROFILER_LIST_OBJECT_TYPE        = "threadProfilerList";
var DIAG_JFR_LIST_OBJECT_TYPE               = "diagJFRList";
var DIAG_HEAP_DUMP_LIST_OBJECT_TYPE         = "diagHeapDumpList";
var DIAG_CLASS_HISTOGRAM_LIST_OBJECT_TYPE   = "diagClassHistogramList";
var PAGE_LIST_OBJECT_TYPE                   = "pageList";
var PAGE_LIST_DASHBOARD_OBJECT_TYPE         = "pageListDashboard";
var LINKS_LIST_OBJECT_TYPE                  = "linkList";
var MOBILE_CLIENT_LIST_OBJECT_TYPE           = "mobileClientList";
var MOBILE_CLIENT_LIST_DASHBOARD_OBJECT_TYPE = "mobileClientDashboard";
var MOBILE_METHOD_LIST_OBJECT_TYPE           = "mobileMethodList";
var MOBILE_METHOD_LIST_DASHBOARD_OBJECT_TYPE = "mobileMethodDashboard";
var MOBILE_REQUEST_LIST_OBJECT_TYPE           = "mobileRequestList";
var MOBILE_REQUEST_LIST_DASHBOARD_OBJECT_TYPE = "mobileRequestDashboard";
var MOBILE_CLIENT_REG_LIST_OBJECT_TYPE      = "mobileClientRegList";
var SERVER_REQUEST_CALLERS_LIST_OBJECT_TYPE = "serverRequestCallersList";
var AJAX_LIST_OBJECT_TYPE                   = "ajaxList";
var SQL_LIST_OBJECT_TYPE                    = "sqlList";
var APPSERVER_LIST_OBJECT_TYPE              = "appserverList";
var APPSERVER_LIST_DASHBOARD_OBJECT_TYPE    = "appserverListDashboard";
var APPLICATION_LIST_OBJECT_TYPE            = "applicationList";
var APPLICATION_DEFINITION_LIST_OBJECT_TYPE = "applicationDefinitionList";
var APPLICATION_CONTAINER_LIST_OBJECT_TYPE  = "applicationContainerList";

var SYNTEST_LIST_OBJECT_TYPE                = "synTestList";
var SYNTEST_LIST_SCRIPTED_ACTION_INSTANCE_OBJECT_TYPE = "synTestScriptedActionInstanceList";
var SYNTEST_LIST_PAGE_LOAD_INSTANCE_OBJECT_TYPE = "synTestPageLoadInstanceList";
var SYNTEST_LIST_PING_INSTANCE_OBJECT_TYPE  = "synTestPingInstanceList";
var SYNTEST_LIST_REST_WEBSERVICE_INSTANCE_OBJECT_TYPE  = "synTestRestWebserviceInstanceList";
var SYNTEST_LIST_ADMIN_OBJECT_TYPE = "synTestAdminList";
var BEACON_POOL_LIST_ADMIN_OBJECT_TYPE      = "beaconPoolAdminList";

// Constant object definitions used by commonSummaryModel.js
var REQUEST_OBJECT_TYPE                     = "request";
var PAGE_OBJECT_TYPE                        = "page";
var AJAX_OBJECT_TYPE                        = "ajax";
var THREAD_PROFILER_OBJECT_TYPE             = "threadProfiler";
var CLASS_HISTOGRAM_OBJECT_TYPE             = "classHistogram";
var JFR_OBJECT_TYPE                         = "JFR";
var APPSERVER_OBJECT_TYPE                   = "appserver";
var MOBILE_CLIENT_OBJECT_TYPE               = "mobileClient";
var MOBILE_METHOD_OBJECT_TYPE               = "mobileMethod";
var MOBILE_REQUEST_OBJECT_TYPE              = "mobileRequest";
var MOBILE_CLIENT_REG_OBJECT_TYPE           = "mobileClientReg";
var DEFAULT_BREAKDOWN_TYPE                  = "defaultBreakdown";
var MOBILE_BREAKDOWN_TYPE                   = "mobileBreakdown";
var SYNTEST_OBJECT_TYPE                     = "syntest";
var LOGICAL_REQUEST_OBJECT_TYPE             = "logicalRequest";

// constans for target type used by integrationManager to lookup meid from ODS
var TARGET_TYPE_APP = 'application';
var TARGET_TYPE_DB = 'database';
var TARGET_TYPE_WL = 'WebLogic Server'; //this value is from restAPI, appServerType attribute value of an server
var TARGET_TYPE_IIS = "IIS";
var TARGET_TYPE_NODEJS = "Node.js";
var TARGET_TYPE_WEBSPHERE = "Websphere";
var TARGET_TYPE_HOST = 'host';

// Used in/by fiterViewModel, and passed to REST to indicate sort order
var SORT_ASC    = "asc";
var SORT_DESC   = "desc";

// Special token used in filter by application
var APP_FILTER_WITHIN = 'WITHIN APPLICATION';
var APP_FILTER_FILTERBY = 'FILTER BY';
var APP_FILTER_APPNAME_ILIKE = 'testApplicationName ILIKE';
var APP_FILTER_APPMEID_ILIKE = 'testApplicationId ILIKE';

//Application constants
var DEFINED_BY_PAGES = 'pages';
var DEFINED_BY_FLOWSTART = 'flowStart';
var DEFINED_BY_MOBILE = 'mobile';
var DEFINED_BY_APPSERVER_CLASSIFICATION = 'appserver_classification';
var PAGES_QUERY_PREFIX = "FLOWS WITH PAGES MATCHING";
var FLOWSTART_QUERY_PREFIX = "FLOWS WITH FIRST SERVER REQUEST MATCHING";
var MOBILE_QUERY_PREFIX = "FLOWS WITH MOBILE APPS MATCHING";
var CLASSIFICATIONS_QUERY_PREFIX = 'FLOWS WITH FIRST APPSERVER CLASSIFICATION MATCHING';


// AppServer types
// Used by commonListModel.js and commonSummaryModel.js to figure out what appServer was return
// Also by utils.getAppserverType()
// NOTE: these constants are used as keys to look up what infoRegion, etc., to use so do not change w/o fixing all uses!!!!
var APPSERVER_TYPE_UNKNOWN = "defaultValue";
var APPSERVER_TYPE_WEBLOGIC = "Weblogic";
var APPSERVER_TYPE_TOMCAT = "Tomcat";
var APPSERVER_TYPE_JBOSS = "JBoss";
var APPSERVER_TYPE_DOTNET = "IIS";
var APPSERVER_TYPE_NODEJS = "Node.js";
var APPSERVER_TYPE_WEBSPHERE = "Websphere";
var APPSERVER_TYPE_RUBY = "Ruby";
var APPSERVER_TYPE_JETTY = "Jetty";
var APPSERVER_TYPE_ARRAY = [ APPSERVER_TYPE_WEBLOGIC, APPSERVER_TYPE_TOMCAT, APPSERVER_TYPE_JBOSS, APPSERVER_TYPE_DOTNET, APPSERVER_TYPE_NODEJS, APPSERVER_TYPE_WEBSPHERE, APPSERVER_TYPE_RUBY, APPSERVER_TYPE_JETTY ];

// Constants used in baseline and anomaly support
var HIGH_ANOMALY_SERIES = 'highAnomaly';
var LOW_ANOMALY_SERIES = 'lowAnomaly';
var BASELINE_ID = 'baselineId';
var ANOMALY_LEGEND_ID = 'anomalyLegendId';
var MAX_MIN_LOAD_ID = 'maxminload';
var MAX_MIN_AJAX_LOAD_ID = 'maxminload';
var MAX_MIN_RESPONSE_TIME_ID = 'maxminRT';

// Agent configuration status values
var AGENT_CONFIG_STATUS_SUCCESS = 'SUCCESS';
var AGENT_CONFIG_STATUS_ERROR = 'ERROR';
var AGENT_CONFIG_STATUS_PENDING = 'PENDING';

// Alert severities
var ALERT_SEVERITY_CLEAR = 0;
var ALERT_SEVERITY_INFORMATIONAL = 4;
var ALERT_SEVERITY_WARNING = 8;
var ALERT_SEVERITY_CRITICAL = 16;
var ALERT_SEVERITY_FATAL = 32;

// Alert severity values used by alertModel, alertListModel, and alertSeverityTileModel for restricting severity
var ALERT_SEVERITY_FILTER_CLEAR = 'clear';
var ALERT_SEVERITY_FILTER_INFORMATIONAL = 'informational';
var ALERT_SEVERITY_FILTER_WARNING = 'warning';
var ALERT_SEVERITY_FILTER_CRITICAL = 'critical';
var ALERT_SEVERITY_FILTER_FATAL = 'fatal';
var ALERT_SEVERITY_FILTER_ALL = 'all';

// Alert severity colors

var COLOR_DISABLED = "#9E9E9E";
var ALERT_COLOR_CLEAR = "#96BE00";
var ALERT_COLOR_INFO = '#0572CE';
var ALERT_COLOR_WARNING = "#FFD600";
var ALERT_COLOR_CRITICAL = "#E73900";
var ALERT_COLOR_FATAL = "#880001";
var ALERT_COLOR_NEW = "#6DDBDB";
var ALERT_COLOR_PREEXISTING = "#267DB3";

// Availability colors
var AVAILABILITY_COLOR_UP = "#4EAA24";
var AVAILABILITY_COLOR_DOWN = "#E73900";
var AVAILABILITY_COLOR_ERROR = "#EF8D00";
var AVAILABILITY_COLOR_UNAVAILABLE = "#F9C000";
var AVAILABILITY_COLOR_UNKNOWN = "#6E8598";
var AVAILABILITY_COLOR_NOT_APPLICABLE = "#AFBAC5";

// Thread State

var THREAD_PROFILER_STATE_RUNNABLE = 'RUNNABLE';
var THREAD_PROFILER_STATE_LOCK     = 'LOCK';
var THREAD_PROFILER_STATE_DB       = 'DB';
var THREAD_PROFILER_STATE_NETWORK  = 'NETWORK';
var THREAD_PROFILER_STATE_IO       = 'IO';
var THREAD_PROFILER_STATE_OTHER    = 'OTHER';

// Foreground and Backgroud
var THREAD_PROFILER_CATEGORY_FOREGROUND = 'SR';
var THREAD_PROFILER_CATEGORY_BACKGROUND = 'BG';

// Diagnostic Snapshots Type
var DIAG_SNAPSHOTS_TYPE_THREAD_PROFILER = "THREADPROFILER";
var DIAG_SNAPSHOTS_TYPE_JFR = "JFR";
var DIAG_SNAPSHOTS_TYPE_CLASS_HISTOGRAM = "CLASS HISTOGRAM";
var DIAG_SNAPSHOTS_TYPE_HEAPDUMP = "HEAP DUMP";

//  Diagnostics Snapshot Status
var DIAGNOSTICS_TYPE_SCHEDULED    = "OK_1";
var DIAGNOSTICS_TYPE_SUCCESS      = "OK_3";
var DIAGNOSTICS_TYPE_RUNNING      = "OK_2";
var DIAGNOSTICS_TYPE_PREPARED     = "OK_4";
var DIAGNOSTICS_TYPE_AGENTCOMPLETE= "OK_5";
var DIAGNOSTICS_TYPE_UPLOAD       = "OK_6";
var JFR_FILE_EXCESS_LIMIT         = "OK_7";
var JFR_FILE_PASSWORD_SET         = "OK_8";
var JFR_FILE_PASSWORD_IN_ENV      = "OK_9";
var JFR_FILE_PASSWORD_IN_SYS      = "OK_10";
var JFR_FILE_UPLOAD_FAILED        = "OK_11";
var DIAGNOSTICS_TYPE_ERROR        = "Error";
var DIAGNOSTICS_TYPE_ERROR_5000   = "Err_5000";
var DIAGNOSTICS_TYPE_ERROR_5001   = "Err_5001";
var DIAGNOSTICS_TYPE_ERROR_5002   = "Err_5002";
var DIAGNOSTICS_TYPE_ERROR_5003   = "Err_5003";
var DIAGNOSTICS_TYPE_ERROR_5004   = "Err_5004";
var DIAGNOSTICS_TYPE_ERROR_5005   = "Err_5005";
//Error Case for JFR
var DIAGNOSTICS_TYPE_ERROR_5100   = "Err_5100";
var DIAGNOSTICS_TYPE_ERROR_5101   = "Err_5101";
var DIAGNOSTICS_TYPE_ERROR_5102   = "Err_5102";
var DIAGNOSTICS_TYPE_ERROR_5103   = "Err_5103";
var DIAGNOSTICS_TYPE_ERROR_5104   = "Err_5104";
var DIAGNOSTICS_TYPE_ERROR_5105   = "Err_5105";
var DIAGNOSTICS_TYPE_ERROR_5106   = "Err_5106";
var DIAGNOSTICS_TYPE_ERROR_5107   = "Err_5107";
var DIAGNOSTICS_TYPE_ERROR_5108   = "Err_5108";
var DIAGNOSTICS_TYPE_ERROR_5109   = "Err_5109";
//Error Case for HEAP DUMP
var DIAGNOSTICS_TYPE_ERROR_5200   = "Err_5200";
var DIAGNOSTICS_TYPE_ERROR_5201   = "Err_5201";
var DIAGNOSTICS_TYPE_ERROR_5202   = "Err_5202";
var DIAGNOSTICS_TYPE_ERROR_5203   = "Err_5203";
var DIAGNOSTICS_TYPE_ERROR_5204   = "Err_5204";
var DIAGNOSTICS_TYPE_ERROR_5205   = "Err_5205";
//Error Case for HEAP DUMP
var DIAGNOSTICS_TYPE_ERROR_5300   = "Err_5300";
var DIAGNOSTICS_TYPE_ERROR_5301   = "Err_5301";
var DIAGNOSTICS_TYPE_ERROR_5302   = "Err_5302";
var DIAGNOSTICS_TYPE_ERROR_5303   = "Err_5303";
var DIAGNOSTICS_TYPE_ERROR_5304   = "Err_5304";

// Synthetic Test Types
//
var SYNTEST_TYPE_SCRIPTED_ACTIONS = "Scripted Actions";
var SYNTEST_TYPE_PAGE_LOAD = "Page Load";
var SYNTEST_TYPE_PING = "PING";
var SYNTEST_TYPE_REST_WEBSERVICES = "REST Webservice Test";

//alert synthetic status
var ALERT_STATUS_CLOSED = 0;
var ALERT_STATUS_OPEN = 1 ;


//unit value returned by ODS
var OMC_SYS_STANDARD_TIME_MILLISEC = 'OMC_SYS_STANDARD_TIME_MILLISEC';
var OMC_SYS_STANDARD_PERCENT_PERCENT = 'OMC_SYS_STANDARD_PERCENT_PERCENT';

// feature names for getting status
var FEATURE_LSR = "LSR";
var FEATURE_THREAD_PROFILER = "THREAD_PROFILER";

var MEID_APM_UNKNOWN = 'APM_UNKNOWN';      // gotten for meId when the entity is unknown by APM (e.g. host is unknown for appserver)

// cached key
// add the key for caching operation genres
var OPERATION_GENRE_CACHE_KEY = "operationGenre";

// attributeName for operation genres
var ATTRIBUTE_OPERATION_GENRE = "operationGenre";
var ATTRIBUTE_CALLED_OPERATION_GENRE = "calledOperationGenre";
