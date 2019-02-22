//
// A model for a particular Request Type.  Id of the request type is required.
//
//********************************************************************************
// 05Jun14  -   GrantC: created this file.
//********************************************************************************

define(['ojs/ojcore',
        'knockout',
        'jquery',
        '../utils/dateTimeUtils',
        '../utils/regionUtils',
        '../utils/instanceUtils',
        '../utils/colorUtils',
        '../utils/mscUtils',
        'ojs/ojtable',
        'ojs/ojdialog',
        'ojs/ojrowexpander',
        'ojs/ojarraytabledatasource',
        'ojs/ojflattenedtreetabledatasource',
        'ojs/ojflattenedtreedatagriddatasource',
        'ojs/ojpagingtabledatasource',
        'ojs/ojjsontreedatasource'
    ],
    function(oj, ko, $, DateTimeUtils, RegionUtils, InstanceUtils, ColorUtils, MscUtils)  {

        function callTree()
        {
            var self = this;
            var data = window.g_activeReportXmlData;
            var TREE_OPERATION_NAME_PREFIX = 'tree_operationName_';

            self.colorUtils = ColorUtils.getInstance();  //used by LA Messages Tile
            self.mscUtils = MscUtils.getInstance();




            self.dateTimeUtils = DateTimeUtils.getInstance();
            self.regionUtils = RegionUtils.getInstance();
            self.instanceUtils = InstanceUtils.getInstance();
            self.showFinding = ko.observable(false);
            self.showallfinding = ko.observableArray([]);
            self.datasource = ko.observable(new oj.ArrayTableDataSource([]));

            self.tilesInfo = {tiles: [{regionName: "requestInstanceLAMessagesTileRegion", regionData: self}
                    ,{regionName: "requestInstanceResponseTileRegion", regionData: self}
                    ,{regionName: "requestInstanceCallsTileRegion", regionData: self}
                    ,{regionName: "requestInstanceErrorsTileRegion", regionData: self}
                ]
                ,tilesSmallMargin: 5
                ,tilesMediumMargin: 5
                ,tilesLargeMargin: 5
                ,tilesXLargeMargin: 5
                ,tilesXXLargeMargin: 5
            };
            self.LAMessagesErrorMsg = ko.observable("");
            self.LAMessagesCharts = ko.observable(new Array());
            self.LAMessagesMaxCount = ko.observable(0);
            self.allDataGotten = ko.observable(false);

            self.NUM_ITEMS_PER_PAGE = 50;
            self.MAX_NUM_CALLS_TO_EXPAND_ALL = 50;
            self.MAX_NUM_KIDS_FOR_ROOT_TO_EXPAND = 50;
            self.logTimeAddOn = 300000; //5 minutes

            self.noData = ko.observable(false);
            self.noDataText = oj.Translations.getTranslatedString('headerProperties.NO_DATA');
            self.noDataSuggestionText = ko.observable("");
            self.modelId = "RequestInstanceDetailRegionModel";


            self.stackTreeTableDatasource = ko.observable();
            self.selfStackTreeTableDatasource = ko.observable();
            self.snapshotDetailTreeTableDatasource = ko.observable();
            self.snapshotDialogTitle = ko.observable();
            self.snapshotDetailDialogTitle = ko.observable();
            self.snapshotItems= null;
            self.probeData = null;
            self.selfProbeData = null;
            self.stackData = null;

            self.instanceSummary = ko.observable();
            self.blockTime = ko.observable();
            self.pieSeriesValue = ko.observableArray();
            self.threadPieCharts= ko.observable();
            self.instanceCpu = ko.observable() ;
            self.instanceCpuPercent = ko.observable() ;
            self.instanceMemory = ko.observable() ;
            self.instanceMemoryRate = ko.observable() ;
            self.pieGroupsValue = ko.observableArray();
            self.totalSnapshots = ko.observable() ;
            self.instanceThreadCount = ko.observable() ;
            self.firstSnapshotTimeStamp = ko.observable() ;
            self.frequency = ko.observable() ;
            self.totalSnapshots = ko.observable() ;
            self.gcOverhead = ko.observable() ;
            self.caller = null;
            self.callee = null;
            self.selfCallee = null;
            //have to define this variable to show "Show Caller" button in call stack popup
            //if we don't define it as observable then some how knockout is not showing the popup
            self.topLevelProbe = ko.observable();
            self.stackProbeMap = new Object();
            self.isJvmServer = ko.observable(true);

            self.chart  = ko.observable();
            self.treeTableViewable = ko.observable(true);
            self.flatTableViewable = ko.observable(false);

            self.instanceData = ko.observable();
            self.treeTableDatasource = ko.observable();
            self.flatTableDatasource = ko.observable();
            self.emptyTextValue = ko.observable(oj.Translations.getTranslatedString('headerProperties.LOADING'));
            self.finishTableIndex = ko.observable();
            self.numLinks = ko.observable();

            self.errorDialogTitle = ko.observable();
            self.errorDetails = ko.observable(null);

            self.isSnapshotVisible = ko.observable(true);
            self.tierCharts = ko.observable();
            self.infoPopupDataSource = ko.observableArray();

            self.treeTableColumns = [
                {id: 'operationName', title: oj.Translations.getTranslatedString('instanceProperties.NAME'), shown: true, widthWeight: 60, column: {field: 'operationName', headerTemplate: 'tree_hdr_name_tmpl', template: 'tree_name_tmpl', style: 'min-width: 200px;'}},
                {id: 'sqlId', title: oj.Translations.getTranslatedString('instanceProperties.SQL_ID'), shown: true, widthWeight: 0, column: {field: 'sqlId', headerTemplate: 'tree_hdr_sqlId_tmpl', template: 'sqlId_tmpl'}},
                {id: 'hasSnapshot', title: oj.Translations.getTranslatedString('instanceProperties.SNAPSHOT'), shown: true, widthWeight: 0, column: {field: 'hasSnapshot', headerTemplate: 'tree_hdr_showSnapshot_tmpl', template: 'showSnapshot_tmpl'}},
                {id: 'componentType', title: oj.Translations.getTranslatedString('instanceProperties.COMPONENT_TYPE'), shown: true, widthWeight: 0, column: {field: 'componentType', headerTemplate: 'tree_hdr_compType_tmpl', template: 'componentType_tmpl'}},
                {id: 'tier', title: oj.Translations.getTranslatedString('instanceProperties.TIER'), shown: true, widthWeight: 0, column: {field: 'tier', headerTemplate: 'tree_hdr_tier_tmpl', template: 'tier_tmpl'}},
                {id: 'startTime', title: oj.Translations.getTranslatedString('instanceProperties.CALL_START_TIME'), shown: true, widthWeight: 10, column: {field: 'startTime', headerTemplate: 'tree_hdr_start_time_tmpl', template: 'startTime_tmpl', style: 'white-space: normal; overflow: visible;'}},
                {id: 'linkResponseTime', title: oj.Translations.getTranslatedString('instanceProperties.RESPONSE_TIME'), shown: true, widthWeight: 10, column: {field: 'linkResponseTime', headerTemplate: 'tree_hdr_response_time_tmpl', template: 'response_time_tmpl'}},
                {id: 'selfTime', title: oj.Translations.getTranslatedString('instanceProperties.SELF_TIME'), shown: true, widthWeight: 10, column: {field: 'selfTime', headerTemplate: 'tree_hdr_selfTime_tmpl', template: 'selfTime_pct_tmpl', style: 'min-width: 70px;'}},
                {id: 'latency', title: oj.Translations.getTranslatedString('instanceProperties.LATENCY'), shown: true, widthWeight: 10, column: {field: 'latency', headerTemplate: 'tree_hdr_latency_tmpl', template: 'latency_pct_tmpl'}},
                {id: 'hadFault', title: oj.Translations.getTranslatedString('instanceProperties.ERROR'), shown: true, widthWeight: 0, column: {field: 'hadFault', headerTemplate: 'tree_hdr_error_tmpl', template: 'error_tmpl', style: 'text-align: center;'}},
                {id: 'callType', title: oj.Translations.getTranslatedString('instanceProperties.CALL_TYPE'), shown: true, widthWeight: 0, column: {field: 'callType', headerTemplate: 'tree_hdr_callType_tmpl', template: 'callType_tmpl', style: 'text-align: center; min-width: 65px;'}}
            ];
            self.menuIdForTreeTable = 'apm_calltree_treetable_menu';


            // header renderer functions for flat call table

            self.call_start_time_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.CALL_START_TIME'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_CALL_START_TIME'));
                });
            };

            self.caller_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.CALLER'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_CALLER'));
                });
            };

            self.callee_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.CALLEE'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_CALLEE'));
                });
            };

            self.sql_id_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.SQL_ID'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_SQL_ID'));
                });
            };

            self.show_snapshot_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_SNAPSHOT'));
                });
            };

            self.component_type_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.COMPONENT_TYPE'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_COMPONENT_TYPE'));
                });
            };

            self.tier_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.TIER'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_TIER'));
                });
            };

            self.response_time_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.RESPONSE_TIME_MS'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_RESPONSE_TIME'));
                });
            };

            self.self_time_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.SELF_TIME_MS'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_SELF_TIME'));
                });
            };

            self.latency_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.LATENCY_MS'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_LATENCY'));
                });
            };

            self.error_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.ERROR'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_ERROR'));
                });
            };

            self.call_type_hdr_func = function(context)
            {
                context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
                {
                    var headerTextDiv = $(document.createElement('div'));
                    headerTextDiv.text(oj.Translations.getTranslatedString('instanceProperties.CALL_TYPE'));
                    headerContentDiv.append(headerTextDiv);
                    headerContentDiv.attr('title', oj.Translations.getTranslatedString('tooltipProperties.INSTANCE_LINK_CALL_TYPE'));
                });
            };

            self.flatTableColumnsInfo = [
                {id: 'startTime', title: oj.Translations.getTranslatedString('instanceProperties.CALL_START_TIME'), shown: true, widthWeight: 10, column: {field: 'startTime', headerRenderer: self.call_start_time_hdr_func, template: 'startTime_tmpl', style: 'white-space: normal; overflow: visible;', sortable: 'enabled', sortProperty: 'startTime'}},
                {id: 'calledByOpName', title: oj.Translations.getTranslatedString('instanceProperties.CALLER'), shown: true, widthWeight: 30, column: {field: 'calledByOpName', headerRenderer: self.caller_hdr_func, template: 'caller_tmpl', style: 'white-space: normal; word-break: break-all; min-width: 150px;', sortable: 'enabled', sortProperty: 'calledByOpName'}},
                {id: 'operationName', title: oj.Translations.getTranslatedString('instanceProperties.CALLEE'), shown: true, widthWeight: 30, column: {field: 'operationName', headerRenderer: self.callee_hdr_func, template: 'callee_tmpl', style: 'white-space: normal; word-break: break-all; min-width: 150px;', sortable: 'enabled', sortProperty: 'operationName'}},
                {id: 'sqlId', title: oj.Translations.getTranslatedString('instanceProperties.SQL_ID'), shown: true, widthWeight: 0, column: {field: 'sqlId', headerRenderer: self.sql_id_hdr_func, template: 'sqlId_tmpl', sortable: 'enabled', sortProperty: 'sqlId'}},
                {id: 'hasSnapshot', title: oj.Translations.getTranslatedString('instanceProperties.SNAPSHOT'), shown: true, widthWeight: 0, column: {field: 'hasSnapshot', headerRenderer: self.show_snapshot_hdr_func, template: 'showSnapshot_tmpl', sortable: 'enabled', sortProperty: 'hasSnapshot'}},
                {id: 'componentType', title: oj.Translations.getTranslatedString('instanceProperties.COMPONENT_TYPE'), shown: true, widthWeight: 0, column: {field: 'componentType', headerRenderer: self.component_type_hdr_func, template: 'componentType_tmpl', sortable: 'enabled', sortProperty: 'componentType'}},
                {id: 'tier', title: oj.Translations.getTranslatedString('instanceProperties.TIER'), shown: true, widthWeight: 0, column: {field: 'tier', headerRenderer: self.tier_hdr_func, template: 'tier_tmpl', sortable: 'enabled', sortProperty: 'tier'}},
                {id: 'linkResponseTime', title: oj.Translations.getTranslatedString('instanceProperties.RESPONSE_TIME'), shown: true, widthWeight: 10, column: {field: 'linkResponseTime', headerRenderer: self.response_time_hdr_func, template: 'response_time_tmpl', sortable: 'enabled', sortProperty: 'linkResponseTime'}},
                {id: 'selfTime', title: oj.Translations.getTranslatedString('instanceProperties.SELF_TIME'), shown: true, widthWeight: 10, column: {field: 'selfTime', headerRenderer: self.self_time_hdr_func, template: 'selfTime_pct_tmpl', style: 'min-width: 70px;', sortable: 'enabled', sortProperty: 'selfTime'}},
                {id: 'latency', title: oj.Translations.getTranslatedString('instanceProperties.LATENCY'), shown: true, widthWeight: 10, column: {field: 'latency', headerRenderer: self.latency_hdr_func, template: 'latency_pct_tmpl', sortable: 'enabled', sortProperty: 'latency'}},
                {id: 'hadFault', title: oj.Translations.getTranslatedString('instanceProperties.ERROR'), shown: true, widthWeight: 0, column: {field: 'hadFault', headerRenderer: self.error_hdr_func, template: 'error_tmpl', style: 'text-align: center;', sortable: 'enabled', sortProperty: 'hadFault'}},
                {id: 'callType', title: oj.Translations.getTranslatedString('instanceProperties.CALL_TYPE'), shown: true, widthWeight: 0, column: {field: 'callType', headerRenderer: self.call_type_hdr_func, template: 'callType_tmpl', style: 'text-align: center; min-width: 90px;', sortable: 'enabled', sortProperty: 'callType'}}
            ];
            self.menuIdForFlatTable = 'apm_calltree_flattable_menu';


            //
            // Get instance details for a given parameters:
            self.getDetail = function()
            {
                self.LAMessagesErrorMsg("");
                self.LAMessagesCharts(new Array());
                self.LAMessagesMaxCount(0);
                self.allDataGotten(false);


                 var data='{"links":[{"rel":"self","href":"api\\/v1\\/requests\\/D55BB894FF2F186A95430200A3D33FD9271E6952\\/instances\\/5621D3C05269B6964FF9321D7AF4A63013CD459E?includeDownstream=true"},{"rel":"related","href":"api\\/v1\\/requests\\/D55BB894FF2F186A95430200A3D33FD9271E6952\\/instances\\/5621D3C05269B6964FF9321D7AF4A63013CD459E\\/relatedInstances"}],"warningsAndInformation":[{"detail":null,"errorType":"INFO","message":"query key: c083a8e8-bbbf-48ea-b840-77222fb5306c"}],"instanceSummary":{"formattedStartTime":"2018-04-11T20:32:41.470Z","formattedEndTime":"2018-04-11T20:32:41.759Z","durantionRank":0,"durationNumbering":0,"faultRank":0,"faultOrder":0,"bucketCount":0,"faultNumbering":0,"bucketNumber":0,"links":[],"instanceId":"5621D3C05269B6964FF9321D7AF4A63013CD459E","globalInstanceId":"5621D3C05269B6964FF9321D7AF4A63013CD459E","startTime":1523478761470,"endTime":1523478761759,"duration":289,"isEndedInFault":false,"failureCount":0,"appServerTime":213,"databaseTime":32,"externalTime":4,"sampleReason":"MIN_TIME","linkCount":70,"isAbridged":false,"instanceCpu":0,"instanceMemory":0,"totalSnapshots":0,"isEndFaultDetailAvailable":false,"ecid":null},"agentInfo":{"links":[{"rel":"self","href":"api\\/v1\\/agents\\/EFE79FD50AB832231840F16AD99D884B02A37133?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/agents\\/EFE79FD50AB832231840F16AD99D884B02A37133"}],"id":1002,"longKey":"EFE79FD50AB832231840F16AD99D884B02A37133","agentName":"testhost_capmsuisanityapm.us.oracle.com:8003 - APM Java AS Agent","agentVersion":"1.0","hostName":"TODO: no longer available","serverVendor":"TBD: do we need this?  no longer in model","osName":"TODO: no longer available","osVersion":"TODO: no longer available"},"rootOperationMetadata":{"hostInfo":{"versionId":27000,"versionLongKey":"C70C42C59F4369A78F18593277490B80F51CD4EE","hostName":"testhost_capmsuisanityapm.us.oracle.com","hostArchitecture":"amd64","agentVersionId":1002,"agentVersionLongKey":"EFE79FD50AB832231840F16AD99D884B02A37133","meId":"A6D31DB60CBDF87DC47000886FED70B2","osContainerType":null,"osContainerId":null,"links":[{"rel":"self","href":"api\\/v1\\/hostinfo\\/C70C42C59F4369A78F18593277490B80F51CD4EE?includeDownstream=true"},{"rel":"agentInfo","href":"api\\/v1\\/agents\\/EFE79FD50AB832231840F16AD99D884B02A37133"}],"hostOsName":"Linux","hostOsVersion":"2.6.39-400.211.1.el6uek.x86_64","hostProcessorCount":4},"jvmInfo":{"versionId":26000,"versionLongKey":"ED746B24D8FD98BE3C8CE25DB716BC11567E0074","hostVersionId":27000,"hostVersionLongKey":"C70C42C59F4369A78F18593277490B80F51CD4EE","links":[{"rel":"self","href":"api\\/v1\\/jvminfo\\/ED746B24D8FD98BE3C8CE25DB716BC11567E0074?includeDownstream=true"},{"rel":"hostInfo","href":"api\\/v1\\/hostinfo\\/C70C42C59F4369A78F18593277490B80F51CD4EE"}],"jvmName":"Java HotSpot(TM) 64-Bit Server VM","jvmVendor":"Oracle Corporation","jvmVersion":"1.7.0_51-b13","jvmSpecName":"Java Virtual Machine Specification","jvmSpecVendor":"Oracle Corporation","jvmSpecVersion":"1.7"},"appServerInfo":{"versionId":29000,"versionLongKey":"E064C325FBE3A9D672A89279B589543E5C16BEFB","appServerType":"WebLogic Server","jvmVersionId":26000,"jvmVersionLongKey":"ED746B24D8FD98BE3C8CE25DB716BC11567E0074","meId":"9ACCB79F5D0A7AAB9C7B4E8473F88030","classifications":null,"associationHints":null,"tags":null,"links":[{"rel":"self","href":"api\\/v1\\/appserverinfo\\/E064C325FBE3A9D672A89279B589543E5C16BEFB?includeDownstream=true"},{"rel":"jvmInfo","href":"api\\/v1\\/jvminfo\\/ED746B24D8FD98BE3C8CE25DB716BC11567E0074"}],"appServerName":"agent1\\/AdminServer","appServerVersion":"12.1.3.0.0","appServerAdminHost":"10.252.36.156","appServerAdminPort":8001,"appServerPath":"\\/scratch\\/capmsuisanityapm\\/WL_1213\\/user_projects\\/domains\\/agent1","appServerMacAddresses":"eth0: 00-21-f6-ed-1a-4d","appServerPort":8001,"appServerSslPort":8003,"appServerPortsList":null,"appServerListenAddresses":"10.252.36.156,127.0.0.1,localhost.localdomain,testhost_capmsuisanityapm.us.oracle.com"},"deploymentInfo":{"links":[{"rel":"self","href":"api\\/v1\\/deployments\\/F380A1187A317D2C1BCB3FE73AE4AA83D88134BC?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/deployments\\/F380A1187A317D2C1BCB3FE73AE4AA83D88134BC"},{"rel":"agentInfo","href":"api\\/v1\\/agents\\/EFE79FD50AB832231840F16AD99D884B02A37133"},{"rel":"appserverInfo","href":"api\\/v1\\/appserverinfo\\/E064C325FBE3A9D672A89279B589543E5C16BEFB"}],"id":42014,"longKey":"F380A1187A317D2C1BCB3FE73AE4AA83D88134BC","deploymentName":"OOWSampleClient","deploymentType":"WAR","deploymentInfo":"\\/OOWSample","agentId":1002,"agentLongKey":"EFE79FD50AB832231840F16AD99D884B02A37133","appserverVersionId":29000,"appserverVersionLongKey":"E064C325FBE3A9D672A89279B589543E5C16BEFB"},"agentInfo":{"links":[{"rel":"self","href":"api\\/v1\\/agents\\/EFE79FD50AB832231840F16AD99D884B02A37133?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/agents\\/EFE79FD50AB832231840F16AD99D884B02A37133"}],"id":1002,"longKey":"EFE79FD50AB832231840F16AD99D884B02A37133","agentName":"testhost_capmsuisanityapm.us.oracle.com:8003 - APM Java AS Agent","agentVersion":"1.0","hostName":"TODO: no longer available","serverVendor":"TBD: do we need this?  no longer in model","osName":"TODO: no longer available","osVersion":"TODO: no longer available"}},"operationMetadata":[{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/D55BB894FF2F186A95430200A3D33FD9271E6952?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/D55BB894FF2F186A95430200A3D33FD9271E6952"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/F380A1187A317D2C1BCB3FE73AE4AA83D88134BC"}],"operationName":"\\/OOWSample\\/checkout","operationGenre":"SERVLET","deploymentId":42014,"deploymentLongKey":"F380A1187A317D2C1BCB3FE73AE4AA83D88134BC","id":8005,"longKey":"D55BB894FF2F186A95430200A3D33FD9271E6952","meId":"1Vu4lP8vGGqVQwIAo9M\\/2SceaVI="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/9CC96A6A42C319F42BB9F2B8391A775C0F4B58BB?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/9CC96A6A42C319F42BB9F2B8391A775C0F4B58BB"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E"}],"operationName":"ConfCenterService.getMethodInfo_GET","operationGenre":"JAXRS","deploymentId":24001,"deploymentLongKey":"C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E","id":37006,"longKey":"9CC96A6A42C319F42BB9F2B8391A775C0F4B58BB","meId":"nMlqakLDGfQrufK4ORp3XA9LWLs="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/F5B294CDF83D59F6B011204E714EED80F019A0F8?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/F5B294CDF83D59F6B011204E714EED80F019A0F8"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":24001,"deploymentLongKey":"C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E","id":36000,"longKey":"F5B294CDF83D59F6B011204E714EED80F019A0F8","meId":"9bKUzfg9WfawESBOcU7tgPAZoPg=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/F04AB9E18BD4E116923D79D9304DC4987C253777?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/F04AB9E18BD4E116923D79D9304DC4987C253777"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executePrepStmt[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.retrytimes,b.dbissuerate from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":24001,"deploymentLongKey":"C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E","id":37007,"longKey":"F04AB9E18BD4E116923D79D9304DC4987C253777","meId":"8Eq54YvU4RaSPXnZME3EmHwlN3c=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/E88F57C7E4B471AA34680E61AD4216442DF875A6?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/E88F57C7E4B471AA34680E61AD4216442DF875A6"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":24001,"deploymentLongKey":"C405DC8BC18E46A6DC8AFC5D78DC64E590EB270E","id":35000,"longKey":"E88F57C7E4B471AA34680E61AD4216442DF875A6","meId":"6I9Xx+S0cao0aA5hrUIWRC34daY=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/E5014AE878FE19D69AC986AECAB7E114CFB88A01?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/E5014AE878FE19D69AC986AECAB7E114CFB88A01"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"OrderService.submit","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":63002,"longKey":"E5014AE878FE19D69AC986AECAB7E114CFB88A01","meId":"5QFK6Hj+GdaayYauyrfhFM+4igE="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/B6027BF8A1482FB4733A053835716AF2ADFA4EC9?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/B6027BF8A1482FB4733A053835716AF2ADFA4EC9"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":47005,"longKey":"B6027BF8A1482FB4733A053835716AF2ADFA4EC9","meId":"tgJ7+KFIL7RzOgU4NXFq8q36Tsk=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/C29118088F2232BE24704605DB96FC9199F2876A?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/C29118088F2232BE24704605DB96FC9199F2876A"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.dbissuerate,b.retrytimes from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":44004,"longKey":"C29118088F2232BE24704605DB96FC9199F2876A","meId":"wpEYCI8iMr4kcEYF25b8kZnyh2o=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/D370051EEF16EBBADDBFC8E66ACF22DC32F554B5?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/D370051EEF16EBBADDBFC8E66ACF22DC32F554B5"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":25006,"longKey":"D370051EEF16EBBADDBFC8E66ACF22DC32F554B5","meId":"03AFHu8W67rdv8jmas8i3DL1VLU=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/8C7AFE37C95CF270485E9C9295895CB657AD9979?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/8C7AFE37C95CF270485E9C9295895CB657AD9979"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executePrepStmt[select url from oow_sample_service_info where name=?]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":42015,"longKey":"8C7AFE37C95CF270485E9C9295895CB657AD9979","meId":"jHr+N8lc8nBIXpySlYlctletmXk=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/3541D9CF9C72DEA88E4D4EA4432F864C30140284?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/3541D9CF9C72DEA88E4D4EA4432F864C30140284"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"OrderService.getOrderId","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":36004,"longKey":"3541D9CF9C72DEA88E4D4EA4432F864C30140284","meId":"NUHZz5xy3qiOTU6kQy+GTDAUAoQ="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/787DA6BF4CEBADFAF039CAD07277240853CF9A8B?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/787DA6BF4CEBADFAF039CAD07277240853CF9A8B"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[select seq_oow_sample_order_id.nextval orderid from dual]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":57015,"longKey":"787DA6BF4CEBADFAF039CAD07277240853CF9A8B","meId":"eH2mv0zrrfrwOcrQcnckCFPPmos=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/B373D582F6E1408F71C440A899068162641ACDE4?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/B373D582F6E1408F71C440A899068162641ACDE4"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"OrderService.submitWithId","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":63001,"longKey":"B373D582F6E1408F71C440A899068162641ACDE4","meId":"s3PVgvbhQI9xxEComQaBYmQazeQ="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/0A69885CC9986E663CF84CCE953439F93B303EB7?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/0A69885CC9986E663CF84CCE953439F93B303EB7"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executePrepStmt[begin insert into oow_sample_order(orderid,creditcard,creditcardnum,customername,customeremail,customeraddress,country,grandtotal)values(?,?,?,?,?,?,?,?)returning orderid into ?;end;]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":57008,"longKey":"0A69885CC9986E663CF84CCE953439F93B303EB7","meId":"CmmIXMmYbmY8+EzOlTQ5+TswPrc=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/7BF6E8971D31426A38F7A7D95014131E24C58E19?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/7BF6E8971D31426A38F7A7D95014131E24C58E19"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/D644F9CB20B0D38086058700FBD5C4A682D7003D"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executePrepStmt[insert into oow_sample_order_item(orderid,description,partnumber,price,qty)values(?,?,?,?,?)]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":43003,"deploymentLongKey":"D644F9CB20B0D38086058700FBD5C4A682D7003D","id":57016,"longKey":"7BF6E8971D31426A38F7A7D95014131E24C58E19","meId":"e\\/bolx0xQmo496fZUBQTHiTFjhk=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/D6DCA727615D6830831BB8E2793EEFD5C94F1455?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/D6DCA727615D6830831BB8E2793EEFD5C94F1455"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"CreditService.checkCredit","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":36005,"longKey":"D6DCA727615D6830831BB8E2793EEFD5C94F1455","meId":"1tynJ2FdaDCDG7jieT7v1clPFFU="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/B45B83C7CDF8D67800BA63182F9765C2AAD6C2A0?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/B45B83C7CDF8D67800BA63182F9765C2AAD6C2A0"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/644E4005B921EDF313C5EBA50B778ABE321A9DF1"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":58001,"deploymentLongKey":"644E4005B921EDF313C5EBA50B778ABE321A9DF1","id":57020,"longKey":"B45B83C7CDF8D67800BA63182F9765C2AAD6C2A0","meId":"tFuDx8341ngAumMYL5dlwqrWwqA=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/222EA3B617FB283D30D071620E2FA7EA64F914D8?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/222EA3B617FB283D30D071620E2FA7EA64F914D8"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/644E4005B921EDF313C5EBA50B778ABE321A9DF1"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.dbissuerate,b.retrytimes from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":58001,"deploymentLongKey":"644E4005B921EDF313C5EBA50B778ABE321A9DF1","id":57010,"longKey":"222EA3B617FB283D30D071620E2FA7EA64F914D8","meId":"Ii6jthf7KD0w0HFiDi+n6mT5FNg=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/E835D3F69B4AFC4D3B1FFFB0A0FE64A39DD0A9ED?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/E835D3F69B4AFC4D3B1FFFB0A0FE64A39DD0A9ED"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/644E4005B921EDF313C5EBA50B778ABE321A9DF1"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":58001,"deploymentLongKey":"644E4005B921EDF313C5EBA50B778ABE321A9DF1","id":57026,"longKey":"E835D3F69B4AFC4D3B1FFFB0A0FE64A39DD0A9ED","meId":"6DXT9ptK\\/E07H\\/+woP5ko53Qqe0=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/0BC856E266DD6343AB6D481BC13B03D0B4BD3A84?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/0BC856E266DD6343AB6D481BC13B03D0B4BD3A84"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/644E4005B921EDF313C5EBA50B778ABE321A9DF1"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[update oow_sample_order set iscreditchecked=?,lastupdatetime=systimestamp where orderid=?]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":58001,"deploymentLongKey":"644E4005B921EDF313C5EBA50B778ABE321A9DF1","id":57009,"longKey":"0BC856E266DD6343AB6D481BC13B03D0B4BD3A84","meId":"C8hW4mbdY0OrbUgbwTsD0LS9OoQ=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/1FF74400AA51ADE332058F89EE6CEF97AB05F3CD?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/1FF74400AA51ADE332058F89EE6CEF97AB05F3CD"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"RestaurantService.checkAvailability","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":36003,"longKey":"1FF74400AA51ADE332058F89EE6CEF97AB05F3CD","meId":"H\\/dEAKpRreMyBY+J7mzvl6sF880="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/8DDA4C8292DC8AD8B71FE5F4A0C6C9D36CFE0410?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/8DDA4C8292DC8AD8B71FE5F4A0C6C9D36CFE0410"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/86863CDAC2555E079EAB95818C107DC8FCD4B5EE"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":62001,"deploymentLongKey":"86863CDAC2555E079EAB95818C107DC8FCD4B5EE","id":57018,"longKey":"8DDA4C8292DC8AD8B71FE5F4A0C6C9D36CFE0410","meId":"jdpMgpLciti3H+X0oMbJ02z+BBA=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/B9582268F9415598ABA5565D00EDE7EB6127D237?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/B9582268F9415598ABA5565D00EDE7EB6127D237"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/86863CDAC2555E079EAB95818C107DC8FCD4B5EE"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.dbissuerate,b.retrytimes from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":62001,"deploymentLongKey":"86863CDAC2555E079EAB95818C107DC8FCD4B5EE","id":57021,"longKey":"B9582268F9415598ABA5565D00EDE7EB6127D237","meId":"uVgiaPlBVZirpVZdAO3n62En0jc=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/5BC74364E5B7D8EF672118235DCC5B47F8D8C411?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/5BC74364E5B7D8EF672118235DCC5B47F8D8C411"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/86863CDAC2555E079EAB95818C107DC8FCD4B5EE"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":62001,"deploymentLongKey":"86863CDAC2555E079EAB95818C107DC8FCD4B5EE","id":57013,"longKey":"5BC74364E5B7D8EF672118235DCC5B47F8D8C411","meId":"W8dDZOW32O9nIRgjXcxbR\\/jYxBE=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/DC08AB39796EE86637FA5078BC28A2A6B47C4398?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/DC08AB39796EE86637FA5078BC28A2A6B47C4398"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/86863CDAC2555E079EAB95818C107DC8FCD4B5EE"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[update oow_sample_order set isrestaurantavail=?,lastupdatetime=systimestamp where orderid=?]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":62001,"deploymentLongKey":"86863CDAC2555E079EAB95818C107DC8FCD4B5EE","id":57024,"longKey":"DC08AB39796EE86637FA5078BC28A2A6B47C4398","meId":"3AirOXlu6GY3+lB4vCiiprR8Q5g=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/1E5B5A36C51EC76C42DCD0D928095432B238C256?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/1E5B5A36C51EC76C42DCD0D928095432B238C256"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"RestaurantService.placeOrder","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":36002,"longKey":"1E5B5A36C51EC76C42DCD0D928095432B238C256","meId":"HltaNsUex2xC3NDZKAlUMrI4wlY="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/36BB92B5A2B2532CB2532D0F63168DB704882923?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/36BB92B5A2B2532CB2532D0F63168DB704882923"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/86863CDAC2555E079EAB95818C107DC8FCD4B5EE"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executePrepStmt[select url from oow_sample_service_info where name=?]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":62001,"deploymentLongKey":"86863CDAC2555E079EAB95818C107DC8FCD4B5EE","id":57011,"longKey":"36BB92B5A2B2532CB2532D0F63168DB704882923","meId":"NruStaKyUyyyUy0PYxaNtwSIKSM=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/CA98EB2F8FFBD1749ACB60C8DADC388BA912C25E?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/CA98EB2F8FFBD1749ACB60C8DADC388BA912C25E"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"DeliveryService.deliver","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":59000,"longKey":"CA98EB2F8FFBD1749ACB60C8DADC388BA912C25E","meId":"ypjrL4\\/70XSay2DI2tw4i6kSwl4="},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/AEDA7F9649DEC7FAFE95AE8CFB2FF27879CD59AE?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/AEDA7F9649DEC7FAFE95AE8CFB2FF27879CD59AE"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/7A4B82288E92385724D4CD2D5BD7579ADF93C4F2"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":60001,"deploymentLongKey":"7A4B82288E92385724D4CD2D5BD7579ADF93C4F2","id":57019,"longKey":"AEDA7F9649DEC7FAFE95AE8CFB2FF27879CD59AE","meId":"rtp\\/lknex\\/r+la6M+y\\/yeHnNWa4=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/40921F687F0593770BED576583490681AF98E352?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/40921F687F0593770BED576583490681AF98E352"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/7A4B82288E92385724D4CD2D5BD7579ADF93C4F2"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.dbissuerate,b.retrytimes from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":60001,"deploymentLongKey":"7A4B82288E92385724D4CD2D5BD7579ADF93C4F2","id":57012,"longKey":"40921F687F0593770BED576583490681AF98E352","meId":"QJIfaH8Fk3cL7Vdlg0kGga+Y41I=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/CD4175C66B0B8B9C69CD6E4CA24583C771118B96?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/CD4175C66B0B8B9C69CD6E4CA24583C771118B96"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/7A4B82288E92385724D4CD2D5BD7579ADF93C4F2"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":60001,"deploymentLongKey":"7A4B82288E92385724D4CD2D5BD7579ADF93C4F2","id":57022,"longKey":"CD4175C66B0B8B9C69CD6E4CA24583C771118B96","meId":"zUF1xmsLi5xpzW5MokWDx3ERi5Y=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/DACEB40A7295E5627DA9F5F06E25E6430BEE29D3?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/DACEB40A7295E5627DA9F5F06E25E6430BEE29D3"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/7A4B82288E92385724D4CD2D5BD7579ADF93C4F2"},{"rel":"databaseInfo","href":"api\\/v1\\/databaseinfo\\/3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"}],"operationName":"executeQuery[update oow_sample_order set isdelivery=?,lastupdatetime=systimestamp where orderid=?]jdbc:oracle:thin:@slcah280:1521:orcl","operationGenre":"JDBC","deploymentId":60001,"deploymentLongKey":"7A4B82288E92385724D4CD2D5BD7579ADF93C4F2","id":57023,"longKey":"DACEB40A7295E5627DA9F5F06E25E6430BEE29D3","meId":"2s60CnKV5WJ9qfXwbiXmQwvuKdM=","dbConnectionLongKey":"3271D695CC9ED5FB42F2C7D6BCBB83A370AFEBBC"},{"links":[{"rel":"self","href":"api\\/v1\\/operations\\/EC5E016F7F25A294B09C84BDC17A6836BB63EAE6?includeDownstream=true"},{"rel":"longKeyLink","href":"api\\/v1\\/operations\\/EC5E016F7F25A294B09C84BDC17A6836BB63EAE6"},{"rel":"deploymentInfo","href":"api\\/v1\\/deployments\\/AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B"}],"operationName":"OrderService.deliveryComplete","operationGenre":"JAXWS","deploymentId":24004,"deploymentLongKey":"AFC193CDF4314A9F6B2A25ED4A6A65CDC49DDC9B","id":57027,"longKey":"EC5E016F7F25A294B09C84BDC17A6836BB63EAE6","meId":"7F4Bb38lopSwnIS9wXpoNrtj6uY="}],"requestTypeName":"\\/OOWSample\\/checkout","isEndedInFault":false,"faultCount":0,"startTime":1523478761470,"endTime":1523478761759,"formattedStartTime":"2018-04-11T20:32:41.470Z","formattedEndTime":"2018-04-11T20:32:41.759Z","responseTime":289,"rootOperation":{"formattedStartTime":"2018-04-11T20:32:41.470Z","formattedEndTime":"2018-04-11T20:32:41.759Z","startTime":1523478761470,"endTime":1523478761759,"operationResponseTime":289,"linkResponseTime":289,"latency":0,"selfTime":5,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.475Z","formattedEndTime":"2018-04-11T20:32:41.481Z","startTime":1523478761475,"endTime":1523478761481,"operationResponseTime":6,"linkResponseTime":9,"latency":3,"selfTime":5,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.476Z","formattedEndTime":"2018-04-11T20:32:41.476Z","startTime":1523478761476,"endTime":1523478761476,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":2,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.477Z","formattedEndTime":"2018-04-11T20:32:41.478Z","startTime":1523478761477,"endTime":1523478761478,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":3,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.480Z","formattedEndTime":"2018-04-11T20:32:41.480Z","startTime":1523478761480,"endTime":1523478761480,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":4,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":1,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.488Z","formattedEndTime":"2018-04-11T20:32:41.757Z","startTime":1523478761488,"endTime":1523478761757,"operationResponseTime":269,"linkResponseTime":275,"latency":6,"selfTime":58,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.490Z","formattedEndTime":"2018-04-11T20:32:41.491Z","startTime":1523478761490,"endTime":1523478761491,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.491Z","formattedEndTime":"2018-04-11T20:32:41.492Z","startTime":1523478761491,"endTime":1523478761492,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":7,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.494Z","formattedEndTime":"2018-04-11T20:32:41.494Z","startTime":1523478761494,"endTime":1523478761494,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.495Z","formattedEndTime":"2018-04-11T20:32:41.495Z","startTime":1523478761495,"endTime":1523478761495,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.496Z","formattedEndTime":"2018-04-11T20:32:41.496Z","startTime":1523478761496,"endTime":1523478761496,"operationResponseTime":0,"linkResponseTime":1,"latency":1,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":9,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.497Z","formattedEndTime":"2018-04-11T20:32:41.497Z","startTime":1523478761497,"endTime":1523478761497,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.526Z","formattedEndTime":"2018-04-11T20:32:41.534Z","startTime":1523478761526,"endTime":1523478761534,"operationResponseTime":8,"linkResponseTime":12,"latency":4,"selfTime":6,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.527Z","formattedEndTime":"2018-04-11T20:32:41.527Z","startTime":1523478761527,"endTime":1523478761527,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.528Z","formattedEndTime":"2018-04-11T20:32:41.529Z","startTime":1523478761528,"endTime":1523478761529,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":7,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.531Z","formattedEndTime":"2018-04-11T20:32:41.531Z","startTime":1523478761531,"endTime":1523478761531,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.532Z","formattedEndTime":"2018-04-11T20:32:41.532Z","startTime":1523478761532,"endTime":1523478761532,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.532Z","formattedEndTime":"2018-04-11T20:32:41.533Z","startTime":1523478761532,"endTime":1523478761533,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":11,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.533Z","formattedEndTime":"2018-04-11T20:32:41.533Z","startTime":1523478761533,"endTime":1523478761533,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":10,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.537Z","formattedEndTime":"2018-04-11T20:32:41.537Z","startTime":1523478761537,"endTime":1523478761537,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.538Z","formattedEndTime":"2018-04-11T20:32:41.539Z","startTime":1523478761538,"endTime":1523478761539,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":9,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.539Z","formattedEndTime":"2018-04-11T20:32:41.539Z","startTime":1523478761539,"endTime":1523478761539,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.565Z","formattedEndTime":"2018-04-11T20:32:41.755Z","startTime":1523478761565,"endTime":1523478761755,"operationResponseTime":190,"linkResponseTime":195,"latency":5,"selfTime":71,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.567Z","formattedEndTime":"2018-04-11T20:32:41.568Z","startTime":1523478761567,"endTime":1523478761568,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.568Z","formattedEndTime":"2018-04-11T20:32:41.569Z","startTime":1523478761568,"endTime":1523478761569,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":7,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.571Z","formattedEndTime":"2018-04-11T20:32:41.571Z","startTime":1523478761571,"endTime":1523478761571,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.572Z","formattedEndTime":"2018-04-11T20:32:41.572Z","startTime":1523478761572,"endTime":1523478761572,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.573Z","formattedEndTime":"2018-04-11T20:32:41.575Z","startTime":1523478761573,"endTime":1523478761575,"operationResponseTime":2,"linkResponseTime":2,"latency":0,"selfTime":2,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":13,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.575Z","formattedEndTime":"2018-04-11T20:32:41.576Z","startTime":1523478761575,"endTime":1523478761576,"operationResponseTime":1,"linkResponseTime":2,"latency":1,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":14,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.578Z","formattedEndTime":"2018-04-11T20:32:41.579Z","startTime":1523478761578,"endTime":1523478761579,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.580Z","formattedEndTime":"2018-04-11T20:32:41.580Z","startTime":1523478761580,"endTime":1523478761580,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.580Z","formattedEndTime":"2018-04-11T20:32:41.581Z","startTime":1523478761580,"endTime":1523478761581,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":9,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.581Z","formattedEndTime":"2018-04-11T20:32:41.582Z","startTime":1523478761581,"endTime":1523478761582,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.604Z","formattedEndTime":"2018-04-11T20:32:41.616Z","startTime":1523478761604,"endTime":1523478761616,"operationResponseTime":12,"linkResponseTime":15,"latency":3,"selfTime":6,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.607Z","formattedEndTime":"2018-04-11T20:32:41.607Z","startTime":1523478761607,"endTime":1523478761607,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":16,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.607Z","formattedEndTime":"2018-04-11T20:32:41.608Z","startTime":1523478761607,"endTime":1523478761608,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":17,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.610Z","formattedEndTime":"2018-04-11T20:32:41.611Z","startTime":1523478761610,"endTime":1523478761611,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":18,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.611Z","formattedEndTime":"2018-04-11T20:32:41.612Z","startTime":1523478761611,"endTime":1523478761612,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":16,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.612Z","formattedEndTime":"2018-04-11T20:32:41.615Z","startTime":1523478761612,"endTime":1523478761615,"operationResponseTime":3,"linkResponseTime":3,"latency":0,"selfTime":3,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":19,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.615Z","formattedEndTime":"2018-04-11T20:32:41.615Z","startTime":1523478761615,"endTime":1523478761615,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":18,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":15,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.618Z","formattedEndTime":"2018-04-11T20:32:41.618Z","startTime":1523478761618,"endTime":1523478761618,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.619Z","formattedEndTime":"2018-04-11T20:32:41.619Z","startTime":1523478761619,"endTime":1523478761619,"operationResponseTime":0,"linkResponseTime":1,"latency":1,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":9,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.620Z","formattedEndTime":"2018-04-11T20:32:41.620Z","startTime":1523478761620,"endTime":1523478761620,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.643Z","formattedEndTime":"2018-04-11T20:32:41.655Z","startTime":1523478761643,"endTime":1523478761655,"operationResponseTime":12,"linkResponseTime":16,"latency":4,"selfTime":9,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.646Z","formattedEndTime":"2018-04-11T20:32:41.646Z","startTime":1523478761646,"endTime":1523478761646,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":21,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.647Z","formattedEndTime":"2018-04-11T20:32:41.648Z","startTime":1523478761647,"endTime":1523478761648,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":22,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.650Z","formattedEndTime":"2018-04-11T20:32:41.650Z","startTime":1523478761650,"endTime":1523478761650,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":23,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.651Z","formattedEndTime":"2018-04-11T20:32:41.651Z","startTime":1523478761651,"endTime":1523478761651,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":21,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.652Z","formattedEndTime":"2018-04-11T20:32:41.654Z","startTime":1523478761652,"endTime":1523478761654,"operationResponseTime":2,"linkResponseTime":2,"latency":0,"selfTime":2,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":24,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.654Z","formattedEndTime":"2018-04-11T20:32:41.654Z","startTime":1523478761654,"endTime":1523478761654,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":23,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":20,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.657Z","formattedEndTime":"2018-04-11T20:32:41.657Z","startTime":1523478761657,"endTime":1523478761657,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":6,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.658Z","formattedEndTime":"2018-04-11T20:32:41.658Z","startTime":1523478761658,"endTime":1523478761658,"operationResponseTime":0,"linkResponseTime":1,"latency":1,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":9,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.659Z","formattedEndTime":"2018-04-11T20:32:41.659Z","startTime":1523478761659,"endTime":1523478761659,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":8,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.680Z","formattedEndTime":"2018-04-11T20:32:41.753Z","startTime":1523478761680,"endTime":1523478761753,"operationResponseTime":73,"linkResponseTime":77,"latency":4,"selfTime":49,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.682Z","formattedEndTime":"2018-04-11T20:32:41.682Z","startTime":1523478761682,"endTime":1523478761682,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":21,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.683Z","formattedEndTime":"2018-04-11T20:32:41.684Z","startTime":1523478761683,"endTime":1523478761684,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":22,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.686Z","formattedEndTime":"2018-04-11T20:32:41.686Z","startTime":1523478761686,"endTime":1523478761686,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":23,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.687Z","formattedEndTime":"2018-04-11T20:32:41.687Z","startTime":1523478761687,"endTime":1523478761687,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":21,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.687Z","formattedEndTime":"2018-04-11T20:32:41.688Z","startTime":1523478761687,"endTime":1523478761688,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":26,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.688Z","formattedEndTime":"2018-04-11T20:32:41.689Z","startTime":1523478761688,"endTime":1523478761689,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":23,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.710Z","formattedEndTime":"2018-04-11T20:32:41.720Z","startTime":1523478761710,"endTime":1523478761720,"operationResponseTime":10,"linkResponseTime":15,"latency":5,"selfTime":4,"hadFault":false,"callType":"SYNC","children":[{"formattedStartTime":"2018-04-11T20:32:41.712Z","formattedEndTime":"2018-04-11T20:32:41.712Z","startTime":1523478761712,"endTime":1523478761712,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":28,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.712Z","formattedEndTime":"2018-04-11T20:32:41.714Z","startTime":1523478761712,"endTime":1523478761714,"operationResponseTime":2,"linkResponseTime":2,"latency":0,"selfTime":2,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":29,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.716Z","formattedEndTime":"2018-04-11T20:32:41.716Z","startTime":1523478761716,"endTime":1523478761716,"operationResponseTime":0,"linkResponseTime":1,"latency":1,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":30,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.717Z","formattedEndTime":"2018-04-11T20:32:41.717Z","startTime":1523478761717,"endTime":1523478761717,"operationResponseTime":0,"linkResponseTime":1,"latency":1,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":28,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.717Z","formattedEndTime":"2018-04-11T20:32:41.719Z","startTime":1523478761717,"endTime":1523478761719,"operationResponseTime":2,"linkResponseTime":2,"latency":0,"selfTime":2,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":31,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.720Z","formattedEndTime":"2018-04-11T20:32:41.720Z","startTime":1523478761720,"endTime":1523478761720,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":30,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":27,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.723Z","formattedEndTime":"2018-04-11T20:32:41.723Z","startTime":1523478761723,"endTime":1523478761723,"operationResponseTime":0,"linkResponseTime":0,"latency":0,"selfTime":0,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":21,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.723Z","formattedEndTime":"2018-04-11T20:32:41.724Z","startTime":1523478761723,"endTime":1523478761724,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":26,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.724Z","formattedEndTime":"2018-04-11T20:32:41.725Z","startTime":1523478761724,"endTime":1523478761725,"operationResponseTime":1,"linkResponseTime":1,"latency":0,"selfTime":1,"hadFault":false,"callType":"SYNC","children":[],"operationIndex":23,"tier":"DATABASE","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]},{"formattedStartTime":"2018-04-11T20:32:41.748Z","formattedEndTime":"2018-04-11T20:32:41.752Z","startTime":1523478761748,"endTime":1523478761752,"operationResponseTime":4,"linkResponseTime":4,"latency":0,"selfTime":4,"hadFault":false,"callType":"ASYNC","children":[],"operationIndex":32,"tier":"EXTERNAL","calledInstanceId":"E6A427EE1C7315B6AA5099932E7FA2697974D92A","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":25,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":12,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":5,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[]}],"operationIndex":0,"tier":"APPSERVER","threadId":0,"numSelfSnapshots":0,"instanceSqlSummary":[{"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":20,"totalResponseTime":3,"links":[],"averageResponseTime":0},{"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":20,"totalResponseTime":5,"links":[],"averageResponseTime":0},{"operationName":"executePrepStmt[select url from oow_sample_service_info where name=?]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":7,"totalResponseTime":4,"links":[],"averageResponseTime":1},{"operationName":"executeQuery[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.dbissuerate,b.retrytimes from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":7,"totalResponseTime":8,"links":[],"averageResponseTime":1},{"operationName":"executeQuery[update oow_sample_order set isdelivery=?,lastupdatetime=systimestamp where orderid=?]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":2,"links":[],"averageResponseTime":2},{"operationName":"executePrepStmt[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.retrytimes,b.dbissuerate from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":1,"links":[],"averageResponseTime":1},{"operationName":"executeQuery[select seq_oow_sample_order_id.nextval orderid from dual]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":1,"links":[],"averageResponseTime":1},{"operationName":"executePrepStmt[insert into oow_sample_order_item(orderid,description,partnumber,price,qty)values(?,?,?,?,?)]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":1,"links":[],"averageResponseTime":1},{"operationName":"executeQuery[update oow_sample_order set iscreditchecked=?,lastupdatetime=systimestamp where orderid=?]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":3,"links":[],"averageResponseTime":3},{"operationName":"executePrepStmt[begin insert into oow_sample_order(orderid,creditcard,creditcardnum,customername,customeremail,customeraddress,country,grandtotal)values(?,?,?,?,?,?,?,?)returning orderid into ?;end;]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":2,"links":[],"averageResponseTime":2},{"operationName":"executeQuery[update oow_sample_order set isrestaurantavail=?,lastupdatetime=systimestamp where orderid=?]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":1,"totalResponseTime":2,"links":[],"averageResponseTime":2}]},"instanceSqlSummary":[{"operationName":"createConnection@jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":20,"totalResponseTime":3,"links":[],"averageResponseTime":0},{"operationName":"closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":20,"totalResponseTime":5,"links":[],"averageResponseTime":0},{"operationName":"executePrepStmt[select url from oow_sample_service_info where name=?]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":7,"totalResponseTime":4,"links":[],"averageResponseTime":1},{"operationName":"executeQuery[select a.name servicename,b.methodname,b.appdelayrate,b.maxappdelaytime,b.appfailurerate,b.dbissuerate,b.retrytimes from oow_sample_service_info a inner join oow_sample_method_info b on a.id=b.serviceid]jdbc:oracle:thin:@slcah280:1521:orcl","totalCount":7,"totalResponseTime":8,"links":[],"averageResponseTime":1}]}';

                  data = JSON.parse(data);





                    self.noData(!data);
                    if (!data)
                    {
                        self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
                        self.getRequestTypeData(); //this will setup the requesttype info in the header
                    }
                    else
                    {
                        if(data.rootOperation.instanceSqlSummary)
                        {
                            var finding = [];
                            var input = data.rootOperation.instanceSqlSummary,count=0;
                            for( i=0 ;i<data.rootOperation.instanceSqlSummary.length;i++)
                            {
                                var str = String(input[i].operationName);
                                if(str.includes('[') && input[i].totalCount>20)
                                {
                                    self.showallfinding.push({
                                        operationName:str.substring(str.lastIndexOf("[")+1, str.lastIndexOf("]")),
                                        totalCount:input[i].totalCount,
                                        averageResponseTime:input[i].averageResponseTime,
                                        totalResponseTime :input[i].totalResponseTime
                                    });
                                    count++;
                                }
                            }
                            if( count !=0)
                            {
                                self.showFinding(true);
                            }
                            self.datasource(new oj.ArrayTableDataSource(self.showallfinding, {idAttribute: 'operationName'}));
                        }

                        self.instanceData(data);

                        // put root in an array so it is displayed in tree table
                        var rootRoot = new Array();
                        rootRoot.push(data.rootOperation);
                        self.flatTable = new Array();


                        var appServerType = MscUtils.getInstance().getAppserverType(data.rootOperationMetadata.appServerInfo.appServerType);
                        if (appServerType === APPSERVER_TYPE_NODEJS )
                        {
                            self.isJvmServer(false);
                        }

                        massageTree(data.rootOperation, oj.Translations.getTranslatedString('instanceProperties.INSTANCE_START'), data.operationMetadata, self.flatTable);
                        self.numLinks(self.flatTable.length);

                        self.appserverCallCount = 0;
                        self.databaseCallCount = 0;
                        self.externalCallCount = 0;
                        self.appserverErrorCount = 0;
                        self.databaseErrorCount = 0;
                        self.externalErrorCount = 0;
                        for (var i = 0; i < self.flatTable.length; i++)
                        {
                            var row = self.flatTable[i];
                            if (row.tier==='APPSERVER' || row.tier.toLowerCase()==='application')
                            {
                                if (i > 0)
                                {
                                    self.appserverCallCount++;
                                }
                                if (row.hadFault)
                                {
                                    self.appserverErrorCount++;
                                }
                            }
                            else if (row.tier.toLowerCase()==='database')
                            {
                                if (i > 0)
                                {
                                    self.databaseCallCount++;
                                }
                                if (row.hadFault)
                                {
                                    self.databaseErrorCount++;
                                }
                            }
                            else if (row.tier.toLowerCase()==='external')
                            {
                                if (i > 0)
                                {
                                    self.externalCallCount++;
                                }
                                if (row.hadFault)
                                {
                                    self.externalErrorCount++;
                                }
                            }
                        }

                        self.maxCount = Math.max(data.instanceSummary.linkCount, data.instanceSummary.failureCount);

                        self.maxResponsePct = 0;
                        var tierList = new Array();
                        var denominator = Math.max(data.instanceSummary.appServerTime+data.instanceSummary.databaseTime+data.instanceSummary.externalTime,0.01);
                        var name = oj.Translations.getTranslatedString('tierProperties.APP_SERVER');
                        var responsePct = data.instanceSummary.appServerTime / denominator * 100;
                        if (responsePct > self.maxResponsePct)
                        {
                            self.maxResponsePct = responsePct;
                        }
                        var responsePctDisplay = self.dateTimeUtils.displayNumber(responsePct)+'%';
                        tierList.push({label: name
                            ,tierColor: COLOR_APP_SERVER
                            ,responsePct: responsePct
                            ,responsePctDisplay: responsePctDisplay
                            ,responsePctToolTip: name+': '+responsePctDisplay
                            ,callCount: self.appserverCallCount
                            ,callCountDisplay: self.dateTimeUtils.displayNumber(self.appserverCallCount,0)
                            ,errorCount: self.appserverErrorCount
                            ,errorCountDisplay: self.dateTimeUtils.displayNumber(self.appserverErrorCount,0)});
                        name = oj.Translations.getTranslatedString('tierProperties.DATABASE');
                        responsePct = data.instanceSummary.databaseTime / denominator * 100;
                        if (responsePct > self.maxResponsePct)
                        {
                            self.maxResponsePct = responsePct;
                        }
                        responsePctDisplay = self.dateTimeUtils.displayNumber(responsePct)+'%';
                        tierList.push({label: name
                            ,tierColor: COLOR_DATABASE
                            ,responsePct: responsePct
                            ,responsePctDisplay: responsePctDisplay
                            ,responsePctToolTip: name+': '+responsePctDisplay
                            ,callCount: self.databaseCallCount
                            ,callCountDisplay: self.dateTimeUtils.displayNumber(self.databaseCallCount,0)
                            ,errorCount: self.databaseErrorCount
                            ,errorCountDisplay: self.dateTimeUtils.displayNumber(self.databaseErrorCount,0)});
                        name = oj.Translations.getTranslatedString('tierProperties.EXTERNAL');
                        responsePct = data.instanceSummary.externalTime / denominator * 100;
                        if (responsePct > self.maxResponsePct)
                        {
                            self.maxResponsePct = responsePct;
                        }
                        responsePctDisplay = self.dateTimeUtils.displayNumber(responsePct)+'%';
                        tierList.push({label: name
                            ,tierColor: COLOR_EXTERNAL
                            ,responsePct: responsePct
                            ,responsePctDisplay: responsePctDisplay
                            ,responsePctToolTip: name+': '+responsePctDisplay
                            ,callCount: self.externalCallCount
                            ,callCountDisplay: self.dateTimeUtils.displayNumber(self.externalCallCount,0)
                            ,errorCount: self.externalErrorCount
                            ,errorCountDisplay: self.dateTimeUtils.displayNumber(self.externalErrorCount,0)});
                        self.tierCharts(tierList);

                        var options = {columns: ['operationName', 'calledByOpName', 'startTime', 'componentType', 'tier', 'selfTime', 'operationResponseTime', 'hadFault', 'operationType']};
                        if (self.numLinks() <= self.MAX_NUM_CALLS_TO_EXPAND_ALL)
                        {
                            options.expanded = 'all';
                        }
                        else if (data.rootOperation.children.length <= self.MAX_NUM_KIDS_FOR_ROOT_TO_EXPAND)
                        {
                            options.expanded = ['nodeId0'];
                        }

                        var jsonTreeDS = new oj.JsonTreeDataSource(rootRoot);
                        var flatTreeDS = new oj.FlattenedTreeDataSource(jsonTreeDS, options);
                        self.treeTableDS = new oj.FlattenedTreeTableDataSource(flatTreeDS);
                        self.treeTableDatasource(null);

                        self.flatTableDS = new oj.ArrayTableDataSource(self.flatTable, {idAttribute: 'startTime'});
                        self.pagingDatasource = new oj.PagingTableDataSource(self.flatTableDS);
                        //get the firstLink's type
                        var firstLinkType = '';
                        var firstLink = data.operationMetadata[0];
                        if (firstLink)
                            firstLinkType = firstLink.operationGenre;



                        var path = data.rootOperationMetadata.appServerInfo.appServerPath;
                        if (data.rootOperationMetadata.appServerInfo.appServerType === TARGET_TYPE_NODEJS)
                            path = data.rootOperationMetadata.appServerInfo.appServerName; // for Node.js, the real path is saved in appServerName
                        var viewLogTargetInfos = [{type: data.rootOperationMetadata.appServerInfo.appServerType,
                            value: data.rootOperationMetadata.hostInfo.hostName,
                            port: data.rootOperationMetadata.appServerInfo.appServerPort,
                            sslport: data.rootOperationMetadata.appServerInfo.appServerSslPort,
                            portslist: data.rootOperationMetadata.appServerInfo.appServerPortsList,
                            path: path}];

                        // find all database info
                        for (var i = 0; i < data.operationMetadata.length; i++) {
                            var oneLink = data.operationMetadata[i];
                            if (oneLink && oneLink.operationGenre === 'JDBC')
                            {
                                if (oneLink.operationName)
                                {
                                    // sample: "closeConnection@jdbc:oracle:thin:@slcah280:1521:orcl"
                                    var index = oneLink.operationName.indexOf('@');
                                    if (index > 0)
                                    {
                                        var dbUrl = oneLink.operationName.substring(index+1);
                                        viewLogTargetInfos.push({type:TARGET_TYPE_DB, value: dbUrl});
                                    }
                                }
                            }
                        }

                        //Remove snapshot tab if it is not a Java Server.
                        /* Below condition has no effect. Seeking help.
                        var appServerType = MscUtils.getInstance().getAppserverType(data.rootOperationMetadata.appServerInfo.appServerType);
                        if (appServerType === APPSERVER_TYPE_NODEJS || appServerType === APPSERVER_TYPE_DOTNET)
                        {
                            self.subtabrouter.states.pop();
                        }
                        */
                    }



            };


            //This method finds the probeName in the aggregated stack tree
            self.findProbeNode = function(obj, probeName)
            {
                if (obj.attr.methodName === probeName && obj.attr.isProbe)
                {
                    return obj;
                }

                if(obj.hasOwnProperty("children"))
                {
                    var children = obj["children"];
                    for (var i = 0; i < children.length; i++)
                    {
                        var node = self.findProbeNode(children[i], probeName);
                        if(node)
                            return node;
                    }
                }
                return null;
            };

            //This method fills stacjProbeMap which is then used to show the camera icon for the operations
            // in the call tree; which have thread stack snapshot available for them
            function fillStackProbeMapAndIds(aggregatedStack)
            {
                aggregatedStack[0].attr.id = "s1";
                fillStackProbeMap(aggregatedStack[0]);
            };

            //This method fills stacjProbeMap which is then used to show the camera icon for the operations
            // in the call tree; which have thread stack snapshot available for them
            function fillStackProbeMap(stackFrame)
            {
                if (stackFrame.attr.isProbe)
                {
                    self.stackProbeMap[stackFrame.attr.methodName] = true;
                }

                if (stackFrame.hasOwnProperty("children"))
                {
                    var children = stackFrame["children"];
                    for (var i = 0; i < children.length; i++)
                    {
                        children[i].attr.id = stackFrame.attr.id + ":" + i;
                        fillStackProbeMap(children[i]);
                    }
                }
            };

            // this method is used to filter the stack data according to probe
            //when data == null; it resets the treeModel to its original value
            self.refreshSelfCallStackData = function(data){
                var selfSnapshotsData;

                var oldData=data;

                var startTime=data.selfStartTime;
                var threadId=data.threadId;
                var threadIdLink=instanceLink+'/selfSnapshots/'+threadId+'/'+startTime;

                // Made null because data from earlier selection is made visible
                self.selfTreeTableDS1=null;
                self.selfStackTreeTableDatasource(null);
                self.snapshotDialogTitle(data.operationName + ' ' + oj.Translations.getTranslatedString('callStackProperties.SNAPSHOTS'));
                self.selfCallee=null;
                self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));

                window.apmManager.ajaxUtil.ajaxGetWithRetry( threadIdLink, function(selfSnapshots)
                {
                    $('#apm_snapshot_popup').ojDialog('open');
                    self.noData(!selfSnapshots);
                    if (!selfSnapshots)
                    {
                        self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
                    }
                    else {
                        selfSnapshotsData=selfSnapshots;
                        if(selfSnapshotsData) {
                            var rootRoot = selfSnapshots;
                            var option = [];
                            if (oldData != null) {
                                self.selfProbeData = oldData;
                                self.snapshotDialogTitle(oldData.operationName + ' ' + oj.Translations.getTranslatedString('callStackProperties.SNAPSHOTS'));
                                //set callee
                                self.selfCallee = selfSnapshots.aggregatedStack[0]; //self.findProbeNode(data.aggregatedStack[0], oldData.operationName);

                                rootRoot = new Array();
                                rootRoot.push(self.selfCallee);

                                // in popup we show callee expanded
                                option = {'expanded': [self.selfCallee.attr.id]};
                            }
                            self.selfStackTreeTableDatasource(null);


                            var jsonTreeDS1 = new oj.JsonTreeDataSource(rootRoot);
                            var flatTreeDS1 = new oj.FlattenedTreeDataSource(jsonTreeDS1, option);
                            self.selfTreeTableDS1 = new oj.FlattenedTreeTableDataSource(flatTreeDS1);
                            self.selfStackTreeTableDatasource(self.selfTreeTableDS1);

                        }
                    }
                },window.apmManager.ajaxUtilAjaxOptions )
                    .fail (function (jqXHR, textStatus, errorThrown)
                    {
                        // Set the error
                        window.apmManager.errorManager.setRestError(jqXHR.url, jqXHR, textStatus, errorThrown );
                        self.setNoData(); // if we have error, then for sure there is no data
                        self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
                    })
                    // .done executes when request is done, but NOT when .fail
                    .done (function (data, textStatus, jqXHR)
                    {
                        // we are here, call succeeded, clear any errors associated with this url
                        window.apmManager.errorManager.clearRestError(jqXHR.url);
                    });

                self.selfStackTreeTableDatasource(null);

            };



            self.getColorForThreadState = function(threadState)
            {
                if(threadState == "RUNNABLE")
                    return '#83CDDE';
                if (threadState == "LOCK" || threadState == "TIMED_WAITING")
                    return '#FFB54D';
                if(threadState == "DB")
                    return '#E371B2';
                if (threadState == "NETWORK")
                    return '#309FDB';
                if (threadState == "OTHER")
                    return '#8561C8';
                if (threadState == "IO")
                    return '#47BDEF';


            };

            // this method is used to filter the stack data according to probe
            //when data == null; it resets the treeModel to its original value
            self.refreshCallStackData = function(data)
            {
                if(self.stackData)
                {
                    var rootRoot = self.stackData;
                    var option = [];
                    if (data !== null)
                    {
                        self.probeData = data;
                        self.snapshotDialogTitle(data.operationName + ' ' + oj.Translations.getTranslatedString('callStackProperties.SNAPSHOTS'));
                        //set callee
                        self.callee = self.findProbeNode(self.stackData[0], data.operationName);
                        //set caller
                        self.caller = self.findProbeNode(self.stackData[0], data.calledByOpName);
                        self.topLevelProbe(self.caller);
                        rootRoot = new Array();
                        rootRoot.push(self.callee);

                        // in popup we show callee expanded
                        option = {'expanded': [self.callee.attr.id]};
                    }
                    self.stackTreeTableDatasource(null);


                    var jsonTreeDS1 = new oj.JsonTreeDataSource(rootRoot);
                    var flatTreeDS1 = new oj.FlattenedTreeDataSource(jsonTreeDS1, option);
                    self.treeTableDS1 = new oj.FlattenedTreeTableDataSource(flatTreeDS1);
                    self.stackTreeTableDatasource(self.treeTableDS1);
                }
            };

            self.showStack = function(data)
            {
                self.refreshSelfCallStackData(data);
                $( "#callerButton" ).ojButton( "option", "label", oj.Translations.getTranslatedString('callStackProperties.SHOW_CALLER'));
            };
            self.openFindingDialog = function() {
                $("#findingDialog").ojDialog({title: oj.Translations.getTranslatedString('Findings')});
                $('#findingDialog').ojDialog('open');
            };



            //this mehtod alternately sets the root of the tree as caller and callee to show and hide caller
            self.showCaller = function()
            {
                // getter
                var label = $( "#callerButton" ).ojButton( "option", "label" );

                // setter
                var newLabel = label === oj.Translations.getTranslatedString('callStackProperties.SHOW_CALLER') ?
                    oj.Translations.getTranslatedString('callStackProperties.HIDE_CALLER') : oj.Translations.getTranslatedString('callStackProperties.SHOW_CALLER');
                $( "#callerButton" ).ojButton( "option", "label", newLabel );

                // in popup we show and caller and callee expanded
                var option = {'expanded': [self.caller.attr.id]};
                //generate node ids as s1:1:1:.... etc and push all the nodes in path to callee to expand list
                var nodesToexpand = (self.callee.attr.id).split(":");
                var ids = '';
                for(var i = 0; i < nodesToexpand.length ; i++){
                    ids =  ids === '' ? (ids + nodesToexpand[i]) : (ids + ":" + nodesToexpand[i]);
                    option.expanded.push(ids);
                }

                self.stackTreeTableDatasource(null);

                var rootRoot = new Array();
                if(label === oj.Translations.getTranslatedString('callStackProperties.SHOW_CALLER'))
                    rootRoot.push(self.caller);
                else
                    rootRoot.push(self.callee);

                var jsonTreeDS1 = new oj.JsonTreeDataSource(rootRoot);
                var flatTreeDS1 = new oj.FlattenedTreeDataSource(jsonTreeDS1, option);
                self.treeTableDS1 = new oj.FlattenedTreeTableDataSource(flatTreeDS1);
                self.stackTreeTableDatasource(self.treeTableDS1);
            };

            self.gotoCalledOperation = function(data)
            {
                window.apmManager.navigatorManager.navigateToPage ( [], [{name: PARAM_INSTANCE_ID, value: REST_API_URL+'/'+data.calledOperationLink.href}],
                    VALUE_PAGE_INSTANCEDETAIL );
            };

            self.gotoRequestDetail = function(data)
            {
                window.apmManager.navigatorManager.navigateToPage([], [{name: PARAM_REQUEST_ID, value: self.requestLink}], VALUE_PAGE_REQUESTDETAIL);
            };

            self.loadTable = function()
            {
                self.hideAllChartsInCallTree();   // Initially don't show charts in call tree
                if (self.treeTableViewable())
                {
                    if (self.treeTableDS !== undefined && self.treeTableDatasource() === null)
                    {
                        self.treeTableDatasource(self.treeTableDS);
                    }
                }
                else if (self.flatTableViewable())
                {
                    if (self.flatTable !== undefined && self.flatTableDatasource() === null)
                    {
                        if (self.numLinks() > self.NUM_ITEMS_PER_PAGE)
                        {
                            self.flatTableDatasource(self.pagingDatasource);
                        }
                        else
                        {
                            self.flatTableDatasource(self.flatTableDS);
                        }
                    }
                }

                self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
            };

            // Called when there is noData and/or error.
            // Didn't get data, maybe an error too.  Make sure header doesn't show anything.


            // at each node of tree, create "attr" object and put attributes of node in it to make tree table data sources happy.
            // also create a flat table of nodes.
            function massageTree(node, calledByOpName, operationMetadata, flatTable)
            {
                var attr = new Object();
                var opMD = operationMetadata[node.operationIndex];
                if (opMD !== null)
                {
                    attr.operationName = opMD.operationName;
                    attr.componentType = opMD.operationGenre;
                    attr.hasSnapshot =self.isJvmServer() && ( (node.numSelfSnapshots) ? (node.numSelfSnapshots > 0) : false);


                }
                else
                {
                    // instance was logged before operation data could be set up
                    attr.operationName = '?';
                    attr.componentType = '?';
                    attr.hasSnapshot = false;
                }
                attr.calledOperationLink = node.calledOperationLink ? node.calledOperationLink : null;
                attr.calledByOpName = calledByOpName;
                attr.tier = node.tier;
                attr.threadId=node.threadId;
                attr.callType = node.callType;
                attr.selfTime = node.selfTime;
                attr.selfStartTime=node.startTime;
                attr.numSelfSnapshots=node.numSelfSnapshots;
                attr.startTime = node.startTime;
                attr.operationResponseTime = node.operationResponseTime;
                attr.linkResponseTime = node.linkResponseTime;
                attr.latency = node.latency;
                attr.hadFault = node.hadFault;
                attr.errorDetailsId = node.errorDetailsId;
                attr.rowIndex = flatTable.length;
                attr.sqlId = ko.observable(node.sqlId);
                attr.displayCharts = ko.observable(false);
                attr.fieldsJson = node.fieldsJson;
                // for testing:
                // attr.fieldsJson = '{"General":{"Request URL":"http://localhost:9001/simpleServlet/unmonitoredExCall","Request Method":"PUT","Status Code":"200"},"Request Headers":{"Host":"localhost:9001","Connection":"keep-alive","Content-Length":"0","Cache-Control":"no-cache","Origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36","Postman-Token":"f092cc34-c13e-9058-3c18-ec8cf9548883","Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Accept-Language":"en-US,en;q=0.8"},"Response Headers":{ "Content-Type: ":"[]","Access-Control-Expose-Headers":"X-ORACLE-APMCS-REQUEST-ID"}}';
                node.attr = attr;
                node.id = 'nodeId'+attr.rowIndex;
                flatTable.push(attr);

                for (var i = 0; i < node.children.length; i++)
                {
                    massageTree(node.children[i], attr.operationName, operationMetadata, flatTable);
                }
            };

            self.showFieldsJsonTable = function(data, fieldsJsonData, popupId, buttonId)
            {
                var groupArray = new Array();
                var jsonObj = JSON.parse(fieldsJsonData);
                for (var group in jsonObj) {
                    var valuesArray = new Array();
                    if( jsonObj.hasOwnProperty(group) )
                    {
                        var pair = jsonObj[group];
                        for (var p in pair)
                        {
                            if(pair.hasOwnProperty(p))
                            {
                                valuesArray.push({name: p, value: pair[p]});
                            }
                        }
                    }
                    var tableDS = new oj.ArrayTableDataSource(valuesArray, {idAttribute: 'name'});
                    groupArray.push({name: group, value: tableDS});
                }
                self.infoPopupDataSource(groupArray);
                $('#' + popupId).ojDialog('open');
            };


            self.viewValueChange = function(selectedItem)
            {
                if (selectedItem.originalEvent && selectedItem.originalEvent.type === "change")
                {
                    self.emptyTextValue = ko.observable(oj.Translations.getTranslatedString('headerProperties.LOADING'));
                    var val = $('#instDetViewBS').ojButtonset("option", "checked");
                    self.flatTableViewable(val === 'tableView');
                    self.treeTableViewable(val === 'treeView');
                    self.treeTableDatasource(null);
                    self.flatTableDatasource(null);
                    setTimeout(self.loadTable, 1);
                    return true;
                }
            };

            self.expandHandler = function(event, ui)
            {
                self.hideAllChartsInCallTree();
            };

            self.hideAllChartsInCallTree = function()
            {
                for (var i = 0; i < self.flatTable.length; i++)
                {
                    self.flatTable[i].displayCharts(false);
                }
            };

            self.readyHandler = function()
            {
                if (self.flatTable && !self.flatTable[0].displayCharts())
                {
                    self.flatTable[0].displayCharts(true);
                    setTimeout(function(){self.showChartsInCallTreeAt(1);}, 50);
                }
            };

            self.showChartsInCallTreeAt = function(lineNum)
            {
                if (lineNum < self.flatTable.length)
                {
                    self.flatTable[lineNum].displayCharts(true);
                    setTimeout(function(){self.showChartsInCallTreeAt(lineNum+1);}, 10);
                }
            };

            self.timePercentageTooltip = function(time, timePercentage)
            {
                return oj.Translations.getTranslatedString('instanceProperties.PERCENT_OF_RESPONSE_TIME_METER_TOOLTIP',
                    self.dateTimeUtils.displayNumber(time,0),
                    self.dateTimeUtils.displayNumber(timePercentage));
            };

            self.openSQLDBPerf = function(data)
            {
                if (data.sqlId())
                {
                    var atIndex = data.operationName.indexOf('@');
                    if (atIndex > 0)
                    {
                        var connectionString = data.operationName.substring(atIndex+1);
                        var entityMEIDs = null;
                        var querydata = {url: connectionString };
                        window.apmManager.ajaxUtil.ajaxWithRetry(window.apmManager.integrationManager.MONITORING_API_URL+'/v1/lookupSystem',
                            {
                                type: "POST",
                                data: JSON.stringify(querydata),
                                dataType: 'json',
                                async: false,
                                contentType: 'application/json; charset=utf-8',
                                success: function(result)
                                {
                                    if (result && result.length > 0)
                                    {
                                        for (var i = 0; i < result.length; i++)
                                        {
                                            var oneEntity = result[i];
                                            var meId = oneEntity.meId;
                                            if (meId)
                                            {
                                                if (entityMEIDs === null)
                                                {
                                                    entityMEIDs = meId;
                                                }
                                                else if (entityMEIDs.indexOf(meId) < 0)
                                                {
                                                    entityMEIDs = entityMEIDs + ',' + meId;
                                                }
                                            }
                                        }
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown)
                                {
                                    window.apmManager.errorManager.setRestError(jqXHR.url, jqXHR, textStatus, errorThrown );
                                }
                            });

                        if (entityMEIDs)
                        {
                            var GLOBAL_MINS_IN_MS = 30*60*1000;
                            var startTime = data.startTime - GLOBAL_MINS_IN_MS; // 30 minutes before start time
                            var endTime = data.startTime + data.linkResponseTime + GLOBAL_MINS_IN_MS;   // 30 minutes after end time
                            var VIEWPORT_MINS_IN_MS = 3*60*1000;
                            var viewportStartTime = data.startTime - VIEWPORT_MINS_IN_MS; // 3 minutes before start time
                            var viewportEndTime = data.startTime + data.linkResponseTime + VIEWPORT_MINS_IN_MS;   // 3 minutes after end time
                            var ITAN_DBCSPERF_URL = window.apmManager.integrationManager.getItanDbcsPerfUrl();
                            var url = window.apmManager.crossRefUtils.getLinkForServiceMEIds(null, entityMEIDs, null, startTime, endTime,
                                ITAN_DBCSPERF_URL+'/performance-hub/html/performance-hub.html')
                                + '&perfHub_selTab=sqlMon'
                                + '&sql_id='+data.sqlId()
                                + '&viewportstarttime='+viewportStartTime
                                + '&viewportendtime='+viewportEndTime;
                            window.open(url,'_blank');  // open new tab
                        }
                        else
                        {
                            $("#errorViewingSQL_popup").ojDialog("open");
                        }
                    }
                }
            };

            self.refresh = function()
            {
                window.apmManager.setApmHeaderIcon ( window.apmManager.pageIcons.requestDetail );
                window.apmManager.integrationManager.updateViewLogLink(oj.Translations.getTranslatedString('headerProperties.VIEW_RELATED_LOG'), null);

                //getDetail() will get the request object and setup currentObject again
                self.getDetail();
            };


            self.getDetail();
        };

        return callTree;
    }
);
