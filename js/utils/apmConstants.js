/*
 *  This is the new constants file.  Please start putting new constants here.
 *  We are currently transitioning from the old constants.js to this one by incrementally moving over the constants.
 *  
 *  This is a class that creates a cached instance like we do for our utils. 
 *  When a class refers to a new constant, it must require the apmConstants.js file and instantiate apmConstants via getInstance().
 *  
 *  Constants are put in a logical enumerated object domain which usually eliminates the need for the constant name containing the name of the domain.  
 *  For example, VALUE_TIMEPERIOD_LAST15MINUTES can now be put into an object called timePeriod with attribute LAST15MINUTES.
 *  When a class refers to the constant, it will be self.apmConstants.timePeriod.LAST15MINUTES.
 *  
 */

define([], function()
{
    var ApmConstants = (function () 
    {
        var instance;

        function createInstance() {
            var object = new apmConstants();
            return object;
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };

        function apmConstants() 
        { 
            var self = this;
            
            self.UI_CONTEXT_ROOT = '/emsaasui/apmUi';
            
            // Time/date picker constrains
            self.MAX_TIME_WINDOW = 7*24*60*60*1000;   // we limit custom window to 7 days

            // for scaling large numbers
            self.NANOSECS_PER_MILLISEC = 1000000;
            self.BYTES_PER_MEGABYTE = 1048576;
            
            self.MOBILE_VERSION_UNKNOWN = "UNKNOWN";
            self.MEID_APM_UNKNOWN = 'APM_UNKNOWN';      // gotten for meId when the entity is unknown by APM (e.g. host is unknown for appserver)

            
            // URL parameter names
            self.paramName = {
                 ROOT: 'root'
                ,OJ_ROUTER: 'oj_Router'         // url param named used by ojRouter to store encrypted data
                ,TIME_PERIOD: 'timePeriod'
                ,SINCE: 'since'
                ,UNTIL: 'until'
                ,TENANT: 'tenant'
                ,LIMIT: 'limit'
                ,COUNT: 'count'
                ,OFFSET: 'offset'
                ,Q: 'q'
                ,ORDERBY: 'orderBy'
                ,GROUPBY: 'groupBy'
                ,LOCALE: 'locale'
                ,DISPLAY_MODE: 'displayMode'    // displayMode=dashboard, is checked in apmMain.js means we are in EM home page
                ,APP_NAME: 'appName'
                ,APP_MEID: 'appMEID'
                ,RULE_ID: 'ruleId'              //param passed from eventUi for editing an alert rule
                ,SERVICE_TYPE: 'serviceType'    //param passed from eventUi for editing an alert rule
                ,SYNTEST_TYPE: 'synTestType'
                ,ALERT_SEVERITY: 'severity'
                ,ALERT_ID: 'alertId'
                ,METRIC: 'metric'
                ,THRESHOLD: 'threshold'
                ,ENTITIES: 'entities'
                ,QUERY: 'query'
                ,AGGREGATION_PERIOD: 'aggregationPeriod'

                // These are the 'id' for each object.  When adding, also add to the OBJECT_URL_PARAM_ARRAY which is used for caching filters
                ,REQUEST_ID: 'requestId'
                ,LOGICAL_REQUEST_ID: 'logicalRequestId'
                ,PAGE_ID: 'pageId'
                ,PAGE_UPDATE_ID: 'pageUpdateId'
                ,AJAX_CALL_ID: 'ajaxCallId'
                ,APPSERVER_ID: 'appserverId'
                ,INSTANCE_ID: 'instanceId'
                ,THREAD_ID:'threadId'
                ,SYNTEST_ID: 'synTestId'
                ,SESSION_ID: 'sessionId'
                ,MOBILE_CLIENT_ID: 'mobileClientId'
                ,MOBILE_REQUEST_ID: 'mobileRequestId'
                ,MOBILE_METHOD_ID: 'mobileMethodId'
                ,APPSERVER_KEY: 'appserverKey'
                ,SQL_CALLS_OPERATION: 'sqlCallsOperation'
                ,SYNTRAN_ID: 'synTestTxnRunId'
                ,SYNTESTDEP_ID: 'synTestDepId'
                ,SYNTEST_NAME:'synTestName'
                ,SYNTEST_STATUS:'synTestStatus'
                ,SYNTEST_ERROR:'synTestError'
                ,SYNTEST_LOC: 'synTestLoc'
                ,SYNTEST_MON:'synMonId'
                ,SYN_EDIT_DATA: 'synEditData'
                ,SYNTEST_STARTTIME: 'synStartTime'
                ,THREADPROFILER_ID: 'threadProfilerId'
                ,THREADPROFILER_NAME: 'threadProfilerName'
                ,THREADPROFILER_SERVERNAME: 'threadProfilerServerName'
                ,CLASS_HISTOGRAM_ID: 'classHistogramId'
                ,JFR_ID: 'jfrId'
                ,DIAGNOSTIC_SNAPSHOTS_TYPE: 'diagnostiSnapshotsType'
                ,DIAGNOSTICS_ID: 'diagnosticsId'
                ,DIAGNOSTICS_STARTTIME: 'diagnosticsStartTime'
                ,APPLICATION_NAME: 'applicationName'
                ,APPLICATION: 'application'         //param for getting application flow/topology data from apmDataServer
                ,APPLICATION_TOOL_TYPE: 'applicationToolType'
                ,APPLICATION_TOOL_APP_NAME: 'applicationToolAppName'
                ,SYN_FILTER: 'filterSynthetic'

                // param to tell mobile and browser apart, dataSource=0, browser, dataSource=1, mobile
                ,DATA_SOURCE: "dataSource"

                // param to control spa feature
                ,SPAFeature: "SPAFeature"
                // params to go into page update detail
                ,URL_FULL: "urlFull"
                ,PGUPD_TYPE: "pgupdType"
                ,ATTR1: "attr1"
                ,ATTR2: "attr2"
 	
            };
            
            self.OBJECT_URL_PARAM_ARRAY = [self.paramName.REQUEST_ID 
                                          ,self.paramName.PAGE_ID 
                                          ,self.paramName.INSTANCE_ID 
                                          ,self.paramName.AJAX_CALL_ID 
                                          ,self.paramName.APPSERVER_ID 
                                          ,self.paramName.SYNTEST_ID 
                                          ,self.paramName.LOGICAL_REQUEST_ID
                                          ];
            
            // URL page parameter values.
            self.page = {
                 REQUESTS: "Requests"
                ,LOGICAL_REQUESTS: "LogicalRequests"
                ,SESSIONS: "Sessions"
                ,PAGES: "Pages"
                ,PAGE_UPDATES: "Page Updates"
                ,PAGE_UPDATE_DETAIL: "PageUpdateDetail"
                ,MOBILE_CLIENTS: "MobileClients"
                ,MOBILE_METHODS: "MobileMethods"
                ,MOBILE_REQUESTS: "MobileRequests"
                ,MOBILE_CLIENT_REG: "MobileClientReg"
                ,SERVERS: "Servers"
                ,AJAX_CALLS: "AjaxCalls"
                ,HOME: "home"
                ,APP_HOME: "applicationHome"
                ,GO_TO_ALERTS: "GoToAlerts"
                ,GO_TO_ALERT_RULES: "GoToAlertRules"
                ,GO_TO_LOG_ANALYTICS_FOR_APP: "GoToLogAnalForApp"
                ,REQUEST_DETAIL: "RequestDetail"
                ,LOGICAL_REQUEST_DETAIL: "LogicalRequestDetail"
                ,INSTANCE_DETAIL: "InstanceDetail"
                ,THREAD_DETAIL:"ThreadDetail"
                ,SERVER_DETAIL: "ServerDetail"
                ,PAGE_DETAIL: "PageDetail"
                ,MOBILE_CLIENT_DETAIL: "MobileClientDetail"
                ,MOBILE_METHOD_DETAIL: "MobileMethodDetail"
                ,MOBILE_REQUEST_DETAIL: "MobileRequestDetail"
                ,MOBILE_CLIENT_LINK: "mobileApps"
                ,SESSION_DETAIL: "SessionDetail"
                ,AJAX_DETAIL: "AjaxCallDetail"
                ,APPLICATIONS: "Applications"
                ,APPLICATION_DEFINITIONS: "ApplicationDefinitions"
                ,SYNTESTS: "SynTests"
                ,SYNTEST_DETAIL: "SynTestDetail"
                ,SYNTESTS_ADMIN: "SynTestsAdmin"
                ,BEACON_POOL_ADMIN: "BeaconPoolAdmin"
                ,BROWSER_AGENT: "BrowserAgent"
                ,THREAD_PROFILER: "ThreadProfiler"
                ,THREAD_PROFILER_RESULT: "ThreadProfilerResult"
                ,DATABASE_MODEL: "Database"
                ,THREAD_PROFILER_START: "ThreadProfilerStart"
                ,DIAG_JFR: "JavaFlightRecorders"
                ,DIAG_HEAP_DUMP: "HeapDump"
                ,DIAG_CLASS_HISTOGRAM: "ClassHistogram"
                ,CLASS_HISTOGRAM_RESULT: "ClassHistogramResult"
                ,JFR_RESULT: "JFRResult"
                ,RULE_TOOL: "ruleTool"
                ,APPLICATION_TOPOLOGY: "ApplicationTopology"
                ,CONTAINERS: "Containers"
                ,SETTINGS: "Settings"
                ,PRIVACY_SETTINGS: "PrivacySettings"
                ,APPLICATION_DEFINITION_TOOL: "applicationDefinitionTool"
                ,HAR_VIEWER: "HarStatistics"
                ,CREATE_SYNTHETIC_TEST: "SynTestTool"
            };
            
            // known link names from REST
            self.linkName = {
                 SELF: "self"
                ,TIMESERIES: "timeSeries"
                ,DATASERIES: 'dataSeries'
                ,BASELINES: 'baselines'
                ,INSTANCES: "instances"
                ,OPERATIONLINKS: "operationLinks"
                ,SERVER_REQUEST_CALLERS: "serverRequestCallers"
                ,BROWSERS_CALLERS: "browserCallers"
                ,RELATED_REQUESTS: "relatedRequests"
                ,AJAXCALLS: "ajaxCalls"
                ,PAGES: "pages"
                ,NEXTPAGE: "nextPage"
                ,PREVIOUSPAGE: "previousPage"
                ,REQUEST_SUMMARY: "requestSummary"
                ,THREAD_POOL_SUMMARY: "threadPoolSummary"
                ,APPSERVER_DETAILS: "appServerDetails"
                ,DEPLOYMENT_INFO: "deploymentInfo"
                ,APPSERVER_INFO: "appserverInfo"
                ,JVM_INFO: "jvmInfo"
                ,HOST_INFO: "hostInfo"
                ,AGENT_INFO: "agentInfo"
                ,AJAX_SUMMARY: "ajaxSummary"
                ,SLOWEST_AJAX_CALL: "slowestAjaxCall"
                ,MOST_ERRORS_AJAX_CALL: "mostErrorsAjaxCall"
                ,APPLICATION: "application"
                ,MULTIGRAPH: "multiGraph"
                ,LINKS: "links"
                ,WARNINGS_AND_INFO: "warningsAndInformation"
                ,MOBILE_RELATED_HTTP_REQUESTS: "mobileHttpCalls"
                ,MOBILE_HTTP_CALLS_SUMMARY: "mobileHttpCallsSummary"
                ,SLOWEST_MOBILE_HTTP_CALL: "slowestMobileHttpCall"
                ,MOST_ERRORS_MOBILE_HTTP_CALL: "mostErrorsMobileHttpCall"
                ,MOBILE_RELATED_METHODS: "mobileMethods"
                ,MOBILE_RELATED_PAGES: "mobilePages"
                ,MOBILE_PAGES_SUMMARY: "mobilePagesSummary"
                ,SLOWEST_MOBILE_PAGE : "slowestPage"
                ,MOST_ERRORS_MOBILE_PAGE : "mostErrorsPage"
                ,MOBILE_RELATED_AJAX_CALL : "mobileAjaxCalls"
                ,MOBILE_AJAX_CALLS_SUMMARY : "mobileAjaxCallsSummary"
                ,SLOWEST_MOBILE_AJAX_CALL : "slowestAjaxCall"
                ,MOST_ERRORS_MOBILE_AJAX_CALL : "mostErrorsAjaxCall"
                ,MOBILE_METHODS_SUMMARY: "mobileMethodsSummary"
                ,SLOWEST_MOBILE_METHOD: "slowestMobileMethod"
                ,MOST_ERRORS_MOBILE_METHOD: "mostErrorsMobileMethod"
                ,MOBILE_DEVICE_TIMESERIES: "mobileDeviceTimeSeries"
                ,PAGE_MOBILE_CLIENT_LINK: "mobileApps"
            };
            
            // known REST calls we make (not via links)
            self.rest = {
                API_VERSION: "/api/v1"
               ,APP_SERVERS: "/appservers"
               ,APP_SERVER_DIAGNOSTIC_LIST: "/diagnostic"
               ,APP_SERVER_JFR_CONFIG_NAME: "&configName=oracle.apmaas.agent.deepdive.jfrStatus"
               ,APP_SERVER_HEAP_CONFIG_NAME: "&configName=oracle.apmaas.agent.deepdive.heapDumpSupport"
               ,APP_SERVER_HISTO_CONFIG_NAME: "&configName=oracle.apmaas.agent.deepdive.classHistogramSupport"
               ,APP_SERVER_AGENT: "/appserveragent"
               ,AJAX_CALLS: "/ajaxCalls"
               ,APPLICATIONS: "/applications/summary"
               ,APPLICATION_DEFINITIONS: "/applications"
               ,PAGES: "/pages"
               ,SERVER_REQUESTS: "/requests"
               ,FLOWS: "/flows"
               ,MOBILE_CLIENTS: "/mobileApps"
               ,MOBILE_METHODS: "/mobileMethods"
               ,MOBILE_REQUESTS: "/mobileHttpCalls"
               ,MOBILE_CLIENT_REG_LIST: "/mobileApps/register"
               ,MOBILE_CLIENT_REG_TOOL: "/mobile/registration"
               ,SYN_TEST_HTTP_PING_TEST_DEP: "/synthetic/alertEntities/omc_http_ping_test_dep"
               ,SYN_TEST_SELENIUM_TEST_DEP: "/synthetic/alertEntities/omc_selenium_test_dep"
               ,SYN_TEST_REST_WEBSERVICE_TEST_DEP: "/synthetic/alertEntities/omc_rest_webservice_test_dep"
               ,SYN_TESTS: "/synthetic/tests"
               ,DIAGNOSTICS_JFR_DUMP_JOBS_LIST: "/diagnostic/jfrdumps"
               ,DIAGNOSTICS_JFR_DUMP_ZIP_DOWNLOAD: "/jfr"
               ,DIAGNOSTICS_JFR_DUMP_FINDING_TAB: "/reports/findings/html"
               ,DIAGNOSTICS_HEAP_DUMP_JOBS_LIST: "/diagnostic/heapdumps"
               ,DIAGNOSTICS_CLASS_HISTOGRAM_JOBS_LIST: "/diagnostic/classhistograms"
               ,THREAD_PROFILE_DATA: "/profilers"
               ,THREAD_PROFILER_JOBS: "/profiler/jobs"
               ,CONTAINERS: "/hosts"
               ,INTERNAL: "/internal"
               ,FEATURES: "/others/features"
            };
            
            self.timePeriod = {
                 LAST15MINUTES: "LAST_15_MINUTE"
                ,LAST30MINUTES: "LAST_30_MINUTE"
                ,LAST_60MINUTES: "LAST_60_MINUTE"
                ,LASTHOUR: "LAST_1_HOUR"
                ,LAST2HOURS: "LAST_2_HOUR"
                ,LAST4HOURS: "LAST_4_HOUR"
                ,LAST6HOURS: "LAST_6_HOUR"
                ,LAST8HOURS: "LAST_8_HOUR"
                ,LAST12HOURS: "LAST_12_HOUR"
                ,LAST24HOURS: "LAST_24_HOUR"
                ,LASTDAY: "LAST_1_DAY"
                ,LAST2DAYS: "LAST_2_DAY"
                ,LAST3DAYS: "LAST_3_DAY"
                ,LAST4DAYS: "LAST_4_DAY"
                ,LAST5DAYS: "LAST_5_DAY"
                ,LAST6DAYS: "LAST_6_DAY"
                ,LAST7DAYS: "LAST_7_DAY"
                ,LASTWEEK: "LAST_1_WEEK"
            };
            self.timePeriod.DEFAULT = self.timePeriod.LAST_60MINUTES;

            self.timeUnit = {
                 NANOSECONDS: "ns"
                ,MILLISECONDS: "ms"
                ,SECONDS: "s"
                ,MINUTES: "m"
                ,HOURS: "h"
                ,DAYS: "d"
            };
            
            self.display = {
                
                // Limit to display in Top N dashboard regions
                 DASHBOARD_LIMIT: 5
                    
                // Standard size for axis labels in charts
                ,CHART_FONT_SIZE: ".786rem"
               
                ,TILE_BAR_HEIGHT: "20px"
                ,TABLE_BAR_HEIGHT: "22px"
                ,APPLICATION_HOME_TILE_HEIGHT: "137"
               
                ,CHART_LINE_WIDTH: "1"
                ,CHART_LINE_WIDTH_WIDE: "3"
                ,DASHBOARD_CHART_LINE_WIDTH: "1"
                ,OVERVIEW_CHART_LINE_WIDTH: "1"
                
                ,SPARKCHART_MARKER_SIZE_TILE: 5
                ,SPARKCHART_MARKER_SIZE_LIST: 5
                ,SPARKCHART_MARKER_SIZE_DASHBOARD: 5
                ,CHART_MARKER_SIZE: 5
                ,CHART_MARKER_SIZE_ANOMALIES: 6
                ,CHART_MARKER_SIZE_INSTANCES: 9
                ,CHART_MARKER_SIZE_ALERTS: 13
                ,DEFAULT_MARKER_SHAPE: 'square'
            };
            
            self.unicode = {
                APP_SERVER: "\uf233"
               ,DB: "\uf1c0"
               ,DATABASE: "SQL"
               ,EXTERNAL: "\uf013"
               ,UNKNOWN: "\uf128"
               ,REQUEST: "\uf0e8"
               ,OPERATION: "\uf013"
               ,MORELINKS: "\uf141"
               ,WARNING: "\uf071"
               ,BROWSERCLIENT: "\uf108"
               ,MOBILECLIENT: "\uf10b"
               ,PAGE: "\uf0f6"
               ,AJAX: "\uf1c9"
            };
            
            //Out of box folders for APM defined in savedsearch branch savedsearch-schema/src/main/sql/emaas_savesearch_seed_data_apm.sql
            self.savedSearchFolderId = {
                 REQUESTS: 501
                ,PAGES: 502
                ,INSTANCES: 503
                ,AGENTS:504
                ,APPSERVERS: 505
                ,AJAX: 506
                ,JDBC: 507
                ,BP_AGENTS: "508"
            };
            
            //Name of subfolders that will be created on demand.  Their parent folder will
            // be one of the out of box folders above
            self.savedSearchSubFolderName = {
                 REQUEST_LINKS: "APM_Request_Links"
                ,LOGICAL_REQUESTS: "APM_Logical_Requests"
                ,REQUEST_CALLERS: "APM_Request_Callers"
                ,APP_DEFINITIONS: "APM_Applicaiton_Definitions"
                ,THREADPROFILERS: "APM_Thread_Profilers"
                ,JFR: "APM_JFR"
                ,HEAPDUMP: "APM_Heap_dumps"
                ,CLASSHISTOGRAM: "APM_Class_histograms"
                ,CLASSHISTOGRAMS_INSTANCES: "APM_Class_Histograms_Instances"
                ,APPSERVERSELECTION_DIAG: "APM_Appserver_Selection_Diag"
                ,APPSERVERSELECTION_TP: "APM_Appserver_Selection_TP"
                ,THREADPROFILERS_REQUESTS: "APM_Thread_Profilers_Requests"
                ,THREADPROFILERS_INSTANCES: "APM_Thread_Profilers_Instances"
                ,THREADPROFILERS_THREAD:"APM_Thread_Profilers_Thread"
                ,THREADPROFILERS_STACKS: "APM_Thread_Profilers_Stacks"
                ,SYNTESTS: "APM_Synthetic_Tests"
                ,SYNTEST_SCRIPTED_ACTION_INSTANCES: "APM_Synthetic_Test_Scripted_Action_Instances"
                ,SYNTEST_PAGE_LOAD_INSTANCES: "APM_Synthetic_Test_Page_Load_Instances"
                ,SYNTEST_PING_INSTANCES: "APM_Synthetic_Test_Ping_Instances"
                ,SYNTEST_REST_WEBSERVICES_INSTANCES: "APM_Synthetic_Test_REST_Webservice_Instances"
                ,PAGES_SESSIONS: "APM_Sessions"
                ,PAGE_UPDATES: "APM_Page_Updates"
                ,PAGES_INSTANCES: "APM_Page_Instances"
                ,PAGES_UPDATE_INSTANCES: "APM_Page_Instances"
                ,MOBILE_CLIENTS: "APM_Mobile_Clients"
                ,MOBILE_METHODS: "APM_Mobile_Methods"
                ,MOBILE_REQUESTS: "APM_Mobile_Requests"
                ,MOBILE_REGISTRATIONS: "APM_Mobile_Registrations"
                ,APPSERVER_AGENTS: "APM_Appserver_agents"
                ,LOCATIONS: "APM_Locations"
            };
            
            self.filterCriteriaType = {
                 BOOLEAN: "Boolean"
                ,DATE: "Date"
                ,ENUM: "Enum"
                ,METRIC: "Metric"
                ,STRING: "String"
                ,HAS_ITEM: "HasItem"               
            };
            
            self.filterAttributeName = {
                 APPLICATION_NAME: "applicationName"
            };
            
            // Constant object definitions, used by commonListModel.js.
            self.listType = {
                 REQUEST_LIST: "requestList"
                ,REQUEST_LIST_DASHBOARD: "requestListDashboard"
                ,LOGICAL_REQUEST_LIST: "logicalRequestList"
                ,LOGICAL_REQUEST_REQUEST_LIST: "logicalRequestRequestList"
                ,THREAD_PROFILER_LIST: "threadProfilerList"
                ,DIAG_JFR_LIST: "diagJFRList"
                ,DIAG_HEAP_DUMP_LIST: "diagHeapDumpList"
                ,DIAG_CLASS_HISTOGRAM_LIST: "diagClassHistogramList"
                ,PAGE_LIST: "pageList"
                ,PAGE_LIST_DASHBOARD: "pageListDashboard"
                ,LINKS_LIST: "linkList"
                ,MOBILE_CLIENT_LIST: "mobileClientList"
                ,MOBILE_CLIENT_LIST_DASHBOARD: "mobileClientDashboard"
                ,MOBILE_METHOD_LIST: "mobileMethodList"
                ,MOBILE_METHOD_LIST_DASHBOARD: "mobileMethodDashboard"
                ,MOBILE_REQUEST_LIST: "mobileRequestList"
                ,MOBILE_REQUEST_LIST_DASHBOARD: "mobileRequestDashboard"
                ,MOBILE_CLIENT_REG_LIST: "mobileClientRegList"
                ,SERVER_REQUEST_CALLERS_LIST: "serverRequestCallersList"
                ,AJAX_LIST: "ajaxList"
                ,SQL_LIST: "sqlList"
                ,APPSERVER_LIST: "appserverList"
                ,APPSERVER_LIST_DASHBOARD: "appserverListDashboard"
                ,APPLICATION_LIST: "applicationList"
                ,APPLICATION_DEFINITION_LIST: "applicationDefinitionList"
                ,APPLICATION_CONTAINER_LIST: "applicationContainerList"
                ,SYNTEST_LIST: "synTestList"
                ,SYNTEST_LIST_SCRIPTED_ACTION_INSTANCE: "synTestScriptedActionInstanceList"
                ,SYNTEST_LIST_PAGE_LOAD_INSTANCE: "synTestPageLoadInstanceList"
                ,SYNTEST_LIST_PING_INSTANCE: "synTestPingInstanceList"
                ,SYNTEST_LIST_REST_WEBSERVICE_INSTANCE: "synTestRestWebserviceInstanceList"
                ,SYNTEST_LIST_ADMIN: "synTestAdminList"
                ,BEACON_POOL_LIST_ADMIN: "beaconPoolAdminList"
            };
            
            // Constant object definitions used by commonSummaryModel.js.
            self.summaryType = {
                 REQUEST: "request" 
                ,PAGE: "page"
                ,PAGE_UPDATE: "pageUpdate"
                ,AJAX: "ajax" 
                ,THREAD_PROFILER: "threadProfiler" 
                ,CLASS_HISTOGRAM: "classHistogram" 
                ,JFR: "JFR" 
                ,APPSERVER: "appserver" 
                ,MOBILE_CLIENT: "mobileClient" 
                ,MOBILE_METHOD: "mobileMethod" 
                ,MOBILE_REQUEST: "mobileRequest" 
                ,MOBILE_CLIENT_REG: "mobileClientReg" 
                ,DEFAULT_BREAKDOWN: "defaultBreakdown" 
                ,MOBILE_BREAKDOWN: "mobileBreakdown" 
                ,SYNTEST: "syntest" 
                ,LOGICAL_REQUEST: "logicalRequest" 
            };
            
            // constants for target type used by integrationManager to lookup meid from ODS.
            self.targetType = {
                 APP: 'application'
                ,DB: 'database'
                ,WL: 'WebLogic Server' //this value is from restAPI, appServerType attribute value of an server
                ,IIS: "IIS"
                ,NODEJS: "Node.js"
                ,WEBSPHERE: "Websphere"
                ,HOST: 'host'
            }
            
            // Used in/by fiterViewModel, and passed to REST to indicate sort order.
            self.sortDirection = {
                 ASC: "asc"
                ,DESC: "desc"
            };
            
            // Special token used in filter by application.
            self.appFilter = {
                 WITHIN: 'WITHIN APPLICATION'
                ,FILTERBY: 'FILTER BY'
                ,APPNAME_ILIKE: 'testApplicationName ILIKE'
                ,APPMEID_ILIKE: 'testApplicationId ILIKE'
            };

            // AppServer types
            // Used by commonListModel.js and commonSummaryModel.js to figure out what appServer was return
            // Also by utils.getAppserverType()
            // NOTE: these constants are used as keys to look up what infoRegion, etc., to use so do not change w/o fixing all uses!!!!
            self.appserverType = {
                 UNKNOWN: "defaultValue"
                ,WEBLOGIC: "Weblogic"
                ,TOMCAT: "Tomcat"
                ,JBOSS: "JBoss"
                ,DOTNET: "IIS"
                ,NODEJS: "Node.js"
                ,WEBSPHERE: "Websphere"
                ,RUBY: "Ruby"
                ,JETTY: "Jetty"
            };
            self.APPSERVER_TYPE_ARRAY = [self.appserverType.WEBLOGIC 
                                        ,self.appserverType.TOMCAT 
                                        ,self.appserverType.JBOSS 
                                        ,self.appserverType.DOTNET 
                                        ,self.appserverType.NODEJS 
                                        ,self.appserverType.WEBSPHERE 
                                        ,self.appserverType.RUBY 
                                        ,self.appserverType.JETTY 
                                        ];
            
            //Application constants
            self.appDefinedBy = {
                 PAGES: 'pages'
                ,FLOWSTART: 'flowStart'
                ,MOBILE: 'mobile'
                ,APPSERVER_CLASSIFICATION: 'appserver_classification'
            };
            
            self.appRulePrefix = {
                 PAGES: "FLOWS WITH PAGES MATCHING"
                ,FLOWSTART: "FLOWS WITH FIRST SERVER REQUEST MATCHING"
                ,MOBILE: "FLOWS WITH MOBILE APPS MATCHING"
                ,CLASSIFICATIONS: 'FLOWS WITH FIRST APPSERVER CLASSIFICATION MATCHING'
                ,NEW_APPSERVER_CLASSIFICATION: 'APPSERVER CLASSIFICATION MATCHING'
            };
            
            self.mobileAppGenre = {
                 IOS: "iOS"
                ,ANDROID: "Android"
            };
            
            self.agentConfigStatus = {
                 SUCCESS: 'SUCCESS'
                ,ERROR: 'ERROR'
                ,PENDING: 'PENDING'
            };
            
            // Alert severities returned from Rest.
            self.alertSeverityNum = {
                 CLEAR: 0
                ,INFORMATIONAL: 4
                ,WARNING: 8
                ,CRITICAL: 16
                ,FATAL: 32
            };
            
            // Alert severity images currently used for chart series item source.  This is gotten from emcpevms/event-ui/ui/src/main/webapp/web/@version@/js/tools/util.js or emcms/monitoring-services-ui/src/main/webapp/cms/@version@/js/cmsConstants.js
            /* Here is a note from amanda.olyha@oracle.com:
              
                Services should be using the OMC Alta Icon font for these images - the monitoring service hasn't switched over yet and we are still using image files (tracking jira = EMCMS-7094). 
                All the images files referenced in cmsConstants were from the Icon Repository http://uidata.us.oracle.com/pls/apex/f?p=140:19:14465208990673:::::. 
                We converted them to a string encoding based on these steps https://confluence.oraclecorp.com/confluence/display/EMS/Using+Images+in+UI.

                You can find the latest omc alta font file here:
                    https://confluence.oraclecorp.com/confluence/display/omcux/Icon-font+Files

                Eventually this file should be added to artifactory and then each service can pull it in. EMCPDF-4381 is tracking that effort. But for now, you will need to add the file manually.

                Alert Icons and color specifications can be found here:
                    https://confluence.oraclecorp.com/confluence/display/omcux/Color+Palette#ColorPalette-Severity

                Alta icons the monitoring service plans on using are as follows:
                 - Warning Alert = func_triangleexclaimationmark
                 - Critical/Error Alert =  func_circlex
                 - Fatal Alert =  func_diamondminussign
                 - Info Alert = func_info

                I'd recommend using the font file for images. We are slowly rolling out using this font file in monitoring service (see our cms.iconfont.scss at https://orahub.oraclecorp.com/emaas/emcms/blob/master/monitoring-services-ui/src/main/webapp/cms/@version@/scss/cms.iconfont.scss for a reference of the images we are using so far), but switching over is kinda low on the priority list right now.
                Both the images and the font file is using the same underlying svg, so I don't think there should be a visual difference.             
             */
            self.alertSeverityImage = {
                 CLEAR: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdElEQVQ4jWOInsTOgIb1gXgCEF8G4i9QfAUqpo2uHpnDCcTTgfhf1lKB/4XrRP6XbhYDYxAbJAaU+wvEM6BqUQxgA+I96Qv5/pdtEceLQWqAavdC9cANmEKMZjRDpsEM0AHiP8Ro7D1g+//dt0f/jz+YDzLgD0gvyIB+kP8IaZ50xP3/15/v/oPAw/dnYWEyAWTAZVAgwRRWbJXC0DzzePD/H78/gzXfe3v8f90OVXDAgmIHZMCn0k1iYIUXnq7///H78/99Bx3gmheeSfj/++9PsObrL/f8r96uABYH6QHq/YxiwIN3p8AKv/368H/qUe//Ky/k/v/77w9Y7MLTDf8rt8nADS7dLA4y4CeKF2p2KP2/9foAWMOvP9///wNCEDj5cDGG14rWg71wHSMQQbaAbIOBg3en/i/fIoERLsiBiBGNINtAUbXjRjvOWEGORooTElWSMiwzzYRlpqL1ouCQJjYzIWMDaNa9AcS/0LKzDrp6AJLTGmEsqCrbAAAAAElFTkSuQmCC'
                ,INFORMATIONAL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4ja2TMQ/BQBiGv0nih1joavVz+gtIGEnUhoHE0sTgH7AgZqbWIAi/QhhUKvW9d01T17taNHku7fV739z33h2R7ZJCmekzJ+YZc4znypn61EeBGTFvai4j6uwicnwJ3jGHf7Y7YYqqAcRrqs8j6u3zaSxgtIk1icFYJ749Q0HGBLVytcKgwoTU8/UGgcYAtdBAy8OAWqvfS1eBBlqRNkJSCtKP1gAaaHkIRNJKQWlyyjdwRBuB0SC9Cq1B14PB3djCT4P2FgYHY4i12TUxqE4vphCHMLB026g+hm20cg+SEXmQxn89yt+XCf0ll8mTgcmejZcpTUWEY7tn5sU8RNpyzlLrP2brHQsKI4+qAAAAAElFTkSuQmCC'
                ,WARNING: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRDYwMCIgZD0iTTIzLjgxLDIxLjc4Yy0wLjY5LTEuMzMtOS45OC0xOS45Mi0xMC41OS0yMS4wNGMtMC41NS0xLTEuODctMS4wMi0yLjQyLDBDOS45NiwyLjMsMC43MiwyMC44MiwwLjIzLDIxLjczDQoJQy0wLjM4LDIyLjg2LDAuNCwyNCwxLjQ0LDI0YzAuODEsMCwyMC4wMSwwLDIxLjE4LDBDMjMuNzYsMjQsMjQuMzIsMjIuNzQsMjMuODEsMjEuNzh6IE0xNCwxNmMwLDAuNTUtMC40NSwxLTEsMWgtMg0KCWMtMC41NSwwLTEtMC40NS0xLTFWOGMwLTAuNTUsMC40NS0xLDEtMWgyYzAuNTUsMCwxLDAuNDUsMSwxVjE2eiBNMTIsMjIuMDJjLTEuMTIsMC0yLjAyLTAuOS0yLjAyLTIuMDJjMC0xLjEyLDAuOS0yLjAyLDIuMDItMi4wMg0KCXMyLjAyLDAuOSwyLjAyLDIuMDJDMTQuMDIsMjEuMTIsMTMuMTIsMjIuMDIsMTIsMjIuMDJ6Ii8+DQo8L3N2Zz4NCg=='
                ,CRITICAL: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0U3MzkwMCIgZD0iTTEyLDI0QzUuNCwyNCwwLDE4LjYsMCwxMlM1LjQsMCwxMiwwczEyLDUuNCwxMiwxMlMxOC42LDI0LDEyLDI0eiBNMTguNCw4LjFjMC43LTAuNywwLjctMS45LDAtMi42DQoJYy0wLjctMC43LTEuOS0wLjctMi42LDBMMTIsOS40TDguMSw1LjVjLTAuNy0wLjctMS45LTAuNy0yLjYsMHMtMC43LDEuOSwwLDIuNkw5LjQsMTJsLTMuOSwzLjljLTAuNywwLjctMC43LDEuOSwwLDIuNg0KCWMwLjcsMC43LDEuOSwwLjcsMi42LDBsMy45LTMuOWwzLjksMy45YzAuNywwLjcsMS45LDAuNywyLjYsMGMwLjctMC43LDAuNy0xLjksMC0yLjZMMTQuNiwxMkwxOC40LDguMXoiLz4NCjwvc3ZnPg0K'
                ,FATAL: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzg4MDAwMSIgZD0iTTIzLjYzLDExLjFjMC40OSwwLjQ5LDAuNDksMS4zLDAsMS43OUwxMi44OSwyMy42M2MtMC40OSwwLjQ5LTEuMywwLjQ5LTEuNzksMEwwLjM3LDEyLjg5DQoJYy0wLjQ5LTAuNDktMC40OS0xLjMsMC0xLjc5TDExLjEsMC4zN2MwLjQ5LTAuNDksMS4zLTAuNDksMS43OSwwTDIzLjYzLDExLjF6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNS41LDExaDEyYzAuNTUsMCwxLDAuNDUsMSwxcy0wLjQ1LDEtMSwxaC0xMmMtMC41NSwwLTEtMC40NS0xLTFTNC45NSwxMSw1LjUsMTF6Ii8+DQo8L3N2Zz4NCg=='
            };
            
            // Alert severity values used by eventUI service, alertModel, alertListModel, and alertSeverityTileModel for restricting severity
            self.alertSeverityFilter = {
                 CLEAR: 'clear'
                ,INFORMATIONAL: 'informational'
                ,WARNING: 'warning'
                ,CRITICAL: 'critical'
                ,FATAL: 'fatal'
                ,ALL: 'all'
            };
            
            // Alert statuses returned from Rest.
            self.alertStatusNum = {
                 CLOSED: 0
                ,OPEN: 1
            };
            
            self.threadProfilerState = {
                 RUNNABLE: 'RUNNABLE'
                ,LOCK: 'LOCK'
                ,DB: 'DB'
                ,NETWORK: 'NETWORK'
                ,IO: 'IO'
                ,OTHER: 'OTHER'
            };
            
            self.threadProfilerCategory = {
                 FOREGROUND: 'SR'
                ,BACKGROUND: 'BG'
            };
            
            self.diagnosticSnapshotsType = {
                 THREAD_PROFILER: "THREADPROFILER"
                ,JFR: "JFR"
                ,CLASS_HISTOGRAM: "CLASS HISTOGRAM"
                ,HEAPDUMP: "HEAP DUMP"
            };
            
            self.diagnosticSnapshotStatus = {
                 SCHEDULED: "OK_1"
                ,SUCCESS: "OK_3"
                ,RUNNING: "OK_2"
                ,PREPARED: "OK_4"
                ,AGENTCOMPLETE: "OK_5"
                ,UPLOAD: "OK_6"
                ,JFR_FILE_EXCESS_LIMIT: "OK_7"
                ,JFR_FILE_PWD_SET: "OK_8"       //NOSONAR
                ,JFR_FILE_PWD_IN_ENV: "OK_9"    //NOSONAR
                ,JFR_FILE_PWD_IN_SYS: "OK_10"   //NOSONAR
                ,JFR_FILE_UPLOAD_FAILED: "OK_11"
                ,ERROR: "Error"
                ,ERROR_5000: "Err_5000"
                ,ERROR_5001: "Err_5001"
                ,ERROR_5002: "Err_5002"
                ,ERROR_5003: "Err_5003"
                ,ERROR_5004: "Err_5004"
                ,ERROR_5005: "Err_5005"
                ,ERROR_5500: "Err_5500"
                //Error Case for JFR
                ,ERROR_5100: "Err_5100"
                ,ERROR_5101: "Err_5101"
                ,ERROR_5102: "Err_5102"
                ,ERROR_5103: "Err_5103"
                ,ERROR_5104: "Err_5104"
                ,ERROR_5105: "Err_5105"
                ,ERROR_5106: "Err_5106"
                ,ERROR_5107: "Err_5107"
                ,ERROR_5108: "Err_5108"
                ,ERROR_5109: "Err_5109"
                //Error Case for HEAP DUMP
                ,ERROR_5200: "Err_5200"
                ,ERROR_5201: "Err_5201"
                ,ERROR_5202: "Err_5202"
                ,ERROR_5203: "Err_5203"
                ,ERROR_5204: "Err_5204"
                ,ERROR_5205: "Err_5205"
                //Error Case for HEAP DUMP
                ,ERROR_5300: "Err_5300"
                ,ERROR_5301: "Err_5301"
                ,ERROR_5302: "Err_5302"
                ,ERROR_5303: "Err_5303"
                ,ERROR_5304: "Err_5304"
            };
            
            self.syntestType = {
                 SCRIPTED_ACTIONS: "Scripted Actions"
                ,PAGE_LOAD: "Page Load"
                ,PING: "PING"
                ,REST_WEBSERVICES: "REST Webservice Test"
            };
            
            //unit value returned by ODS.
            self.omcSysStandard = {
                 TIME_MILLISEC: 'OMC_SYS_STANDARD_TIME_MILLISEC'
                ,PERCENT_PERCENT: 'OMC_SYS_STANDARD_PERCENT_PERCENT'
                ,GENERAL_NA: 'OMC_SYS_STANDARD_GENERAL_NA'
            };
            
            // feature names for getting status.
            self.feature = {
                THREAD_PROFILE:"THREAD_PROFILER"
               ,DBSQL_IMPACT_ON_REQ:"DBSQL_IMPACT_ON_REQ"
               ,REQ_SQL_ID_FILTER:"REQ_SQL_ID_FILTER"
               ,REQ_CALLS_OPERATION_FILTER:"REQ_CALLS_OPERATION_FILTER"
               ,DATABASE_OVERVIEW:"DBSQL_OVERVIEW"
               ,EMCC_DRILL_DOWN:"EMCC_DRILL_DOWN"
               ,DB_SQL: "DBSQL"
               ,LSR: "LSR"
               ,JFR: "JFR"
               ,CLASS_HISTOGRAM: "CLASS_HISTOGRAM"
               ,HEAP_DUMP: "HEAP_DUMP"
               ,OFFLINE_DEEPDIVE: "OFFLINE_DEEPDIVE"
                ,THREAD_PROFILER_THREAD_TAB: "THREAD_PROFILER_THREAD_TAB"
               ,SIDE_FILE_SUPPORT: "SIDE_FILE_SUPPORT"
               ,EUM_SPA: "EUM_SPA"
            };
            
            self.filterOperationGenre = {
                 OPERATION_GENRE: "operationGenre"
                ,CALLED_OPERATION_GENRE: "calledOperationGenre"
            };

            self.chartSeriesAnomaly = {
                 HIGH: 'highAnomaly'
                ,LOW: 'lowAnomaly'
            };

            self.chartSeriesCategory = {
                 BASELINE: 'baselineId'
                ,ANOMALY_LEGEND: 'anomalyLegendId'
                ,MAX_MIN_LOAD: 'maxminload'
                ,MAX_MIN_AJAX_LOAD: 'maxminload'
                ,MAX_MIN_RESPONSE_TIME: 'maxminRT'
            };
            
            self.availabilitySummaryStatus = {
                 UP: 'UP'
                ,DOWN: 'DOWN'
                ,OTHER: 'OTHER'
                ,ERROR: 'ERROR'
                ,UNAVAILABLE: 'UNAVAILABLE'
                ,UNKNOWN: 'UNKNOWN'
                ,NOT_APPLICABLE: 'NOT_APPLICABLE'
            };
            self.AVAILABILITY_SUMMARY_STATUS_ARRAY = [self.availabilitySummaryStatus.UP 
                                                     ,self.availabilitySummaryStatus.DOWN
                                                     ,self.availabilitySummaryStatus.OTHER 
                                                     ,self.availabilitySummaryStatus.ERROR
                                                     ,self.availabilitySummaryStatus.UNAVAILABLE
                                                     ,self.availabilitySummaryStatus.UNKNOWN
                                                     ,self.availabilitySummaryStatus.NOT_APPLICABLE];
            
            self.availabilityDetailStatus = {
                 UP: 'UP'
                ,DOWN: 'DOWN'
                ,PENDING_AFTER_ADDITION: 'PENDING_AFTER_ADDITION'
                ,ERROR: 'ERROR'
                ,AGENT_DOWN: 'AGENT_DOWN'
                ,UNREACHABLE: 'UNREACHABLE'
                ,BLACKOUT: 'BLACKOUT'
                ,UNKNOWN: 'UNKNOWN'
                ,NOT_APPLICABLE: "NOT_APPLICABLE"
                ,AVAILABLE: 'AVAILABLE'
                ,AVAILABLE_NEEDS_ATTENTION: 'AVAILABLE_NEEDS_ATTENTION'
                ,BACKUP_IN_PROGRESS: 'BACKUP_IN_PROGRESS'
                ,SCALE_IN_PROGRESS: 'SCALE_IN_PROGRESS'
                ,UNAVAILABLE: 'UNAVAILABLE'
                ,STOPPED: 'STOPPED'
                ,STOPPING: 'STOPPING'
                ,STARTING: 'STARTING'
                ,TERMINATING: 'TERMINATING'
                ,TERMINATED: 'TERMINATED'
                ,PROVISIONING: 'PROVISIONING'
                ,RESTORE_IN_PROGRESS: 'RESTORE_IN_PROGRESS'
                ,FAILED: 'FAILED'                                
            };

            self.color = {
                // Colors used in charts
                 PRIMARY:       "#267db3"
                ,SECONDARY:     "#6ddbdb"
                ,ERROR:         "#D83A33"
                ,FLAG:          "#fbce4a"
                ,RANGE:         "#386ddbdb"
                ,BASELINE:      "rgba(175,186,197,0.6)"
                ,ANOMALY:       "#fbce4a"
                
                ,DISABLED: "#9E9E9E"

                ,RESPONSE_METER_PLOT_AREA:    "#C8D6E6"
                ,RESPONSE_METER_REF_LINE:     "#285EA6"

                ,STATUS_METER_BORDER:         "#DBDBDB"
                ,STATUS_METER_PLOT_AREA:      "#F2F2F2"

                ,BACKGROUND_LIST_CHART:      "#F2F2F2"
                ,BACKGROUND_ERROR_STACK:     "#F0F0F0"

                ,APP_SERVER:  "#dedf54"//"#00c0ee"
                ,DATABASE:    "#47bdef"//"#8b5fc2"
                ,EXTERNAL:    "#ffb54d"//"#e3e153"

                //Changing to the new UX recommended palette
                ,THREAD_STATE_RUNNABLE:  "#267db3" 
                ,THREAD_STATE_LOCK:    "#6ddbdb"   
                ,THREAD_STATE_DB:    "#8561c8" 
                ,THREAD_STATE_NETWORK:    "#e371b2"
                ,THREAD_STATE_IO:     "#47bdef"    
                ,THREAD_STATE_OTHER:    '#a2bf39' 

                //Alert Details chart color
                ,ALERT_CLOSED_CLEAR: "#96be00"
                ,ALERT_CLOSED_WARNING: "#ffd600"
                ,ALERT_CLOSED_CRITICAL: "#ffc299"
                ,ALERT_CLOSED_FATAL: "#fbeaea"
                ,ALERT_OTHER: "#d992bc"

                // Kiki color:
                //,DIAGRAM_APP_SERVER: "#96d1ce"
                //,DIAGRAM_DATABASE: "#a984b8"
                //,DIAGRAM_EXTERNAL: "#aed292"

                // Maria's color
                //,DIAGRAM_APP_SERVER: "#47bdef"
                //,DIAGRAM_DATABASE: "#ffb54d"
                //,DIAGRAM_EXTERNAL: "#e371b2"
                
                ,ICON_APP_SERVER: "#ffffff"
                ,ICON_DATABASE: "#ffffff"
                ,ICON_EXTERNAL: "#ffffff"

                // new color with darker icon color
                //,DIAGRAM_APP_SERVER: "#ecf1cd"
                //,DIAGRAM_DATABASE: "#dcf1ff"
                //,DIAGRAM_EXTERNAL: "#f9ddc0"
                //,ICON_APP_SERVER: "#dedf54"
                //,ICON_DATABASE: "#47bdef"
                //,ICON_EXTERNAL: "#ffb54d"

                ,DIAGRAM_HOVER: "#e2e3e4"
                ,DIAGRAM_SELECTION: "#2d1d85"// #267db3"
                ,DIAGRAM_HIGHTLIGHT: '#3C4044'
                ,DIAGRAM_MORELINKS: "#045FAB"// #878C90"
                ,DIAGRAM_NON_CONTRIBUTER: "#145c9e"
                ,DIAGRAM_GRAY: "#afbac5"
                ,DIAGRAM_WHITE: "#ffffff"
                ,DIAGRAM_RED: "#ff0000"
                ,DIAGRAM_ORANGE: "#ffb54d"
                ,DIAGRAM_YELLOW: "#dedf54"
                ,DIAGRAM_BLUE: "#47bdef"
                ,DIAGRAM_PAGE: '#00b9cd'
                ,DIAGRAM_AJAX: '#ffb54d'
                ,DIAGRAM_AS: '#8f4b91'

                ,FIRST_BYTE:  "#007dad"
                ,DOM_READY:   "#02dfdb"
                ,INTERACTIVE:   "#02dfdb"
                ,PAGE_READY:  "#ffb045"

                // Apdex reporting
                ,SATISFIED: "mediumseagreen"
                ,TOLERATING: "gold"
                ,FRUSTRATED: "indianred"

                // status colors
                ,STATUS_UP: '#4EAA24'
                ,STATUS_DOWN: '#E73900'
                ,STATUS_ERROR: '# EF8D00' 
                ,STATUS_UNAVAILABLE: '#F9C000'
                ,STATUS_UNKNOWN: '#6E8598' 
                ,STATUS_NOT_APPLICABLE: '#AFBAC5' 
                ,STATUS_OTHER: '#F9C000'

                // Alert severity colors
                
                ,ALERT_CLEAR: "#96BE00"
                ,ALERT_INFO: '#0572CE'
                ,ALERT_WARNING: "#FFD600"
                ,ALERT_CRITICAL: "#E73900"
                ,ALERT_FATAL: "#880001"
                ,ALERT_NEW: "#6DDBDB"
                ,ALERT_PREEXISTING: "#267DB3"
            };
            
            self.color.SUCCESS = self.color.PRIMARY;
            self.color.SPARK = self.color.PRIMARY;
            self.color.MIN_TIME = self.color.SECONDARY;
            self.color.MAX_TIME = self.color.SECONDARY;
            
            self.color.ALERT_OPEN_CLEAR = self.color.ALERT_CLEAR;
            self.color.ALERT_OPEN_WARNING = self.color.ALERT_WARNING;   
            self.color.ALERT_OPEN_CRITICAL = self.color.ALERT_CRITICAL;
            self.color.ALERT_OPEN_FATAL = self.color.ALERT_FATAL;
            
            self.color.TREEMAP_BORDER = "#999999";
                            
            // Val's color
            self.color.DIAGRAM_APP_SERVER = self.color.APP_SERVER;
            self.color.DIAGRAM_DATABASE = self.color.DATABASE;
            self.color.DIAGRAM_EXTERNAL = self.color.EXTERNAL;
            
            self.color.CALL_RESPONSE = self.color.FIRST_BYTE;
            self.color.CALL_PROCESSING = self.color.PAGE_READY;
        }                       
                                                                                    
    })();

    return ApmConstants;
});   