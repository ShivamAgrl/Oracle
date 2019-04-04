define(['ojs/ojcore',
        'knockout',
        'jquery',
        'utils/dateTimeUtils',
        'viewModels/apmHeaderTitle',
        'utils/instanceUtils',
        'utils/apmConstants',
        'utils/colorUtils',
        'utils/mscUtils',
        'ojs/ojtable',
        'ojs/ojdialog',
        'ojs/ojrowexpander',
        'ojs/ojarraytabledatasource',
        'ojs/ojflattenedtreetabledatasource',
        'ojs/ojflattenedtreedatagriddatasource',
        'ojs/ojpagingtabledatasource',
        'ojs/ojjsontreedatasource',
        'ojs/ojgauge',
        'ojs/ojbutton',
        'ojs/ojcomponentcore',
        'ojs/ojpagingcontrol',
         'ojs/ojdialog'
    ],
    function(oj, ko, $, DateTimeUtils, apmHeaderTitle, InstanceUtils, apmConstants, ColorUtils, MscUtils)  {

        function callTree()
        {

            var self = this;
            var tempData;
            var TREE_OPERATION_NAME_PREFIX = 'tree_operationName_';
            var data;

            self.colorUtils = ColorUtils.getInstance();  //used by LA Messages Tile
            self.mscUtils = MscUtils.getInstance();
            self.apmHeaderTitle = apmHeaderTitle.getInstance();
            self.apmConstants = apmConstants.getInstance();
            self.snapshotTimeData=ko.observable();
            self.rowData = window.g_activeReportXmlData;


            self.dateTimeUtils = DateTimeUtils.getInstance();
            self.instanceUtils = InstanceUtils.getInstance();
            self.showFinding = ko.observable(false);
            self.externalDeploymentInfo = ko.observable('');
            self.disableEMCCButton = ko.observable(false);
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

            self.NUM_ITEMS_PER_PAGE = 25;
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
                {id: 'operationName', HeaderText: oj.Translations.getTranslatedString('instanceProperties.NAME'), shown: true, widthWeight: 60, field: 'operationName', headerTemplate: 'tree_hdr_name_tmpl', template: 'tree_name_tmpl', style: 'min-width: 200px;'},
                {id: 'sqlId', HeaderText: oj.Translations.getTranslatedString('instanceProperties.SQL_ID'), shown: true, widthWeight: 0, field: 'sqlId', headerTemplate: 'tree_hdr_sqlId_tmpl', template: 'sqlId_tmpl'},
                {id: 'hasSnapshot', HeaderText: oj.Translations.getTranslatedString('instanceProperties.SNAPSHOT'), shown: true, widthWeight: 0, field: 'hasSnapshot', headerTemplate: 'tree_hdr_showSnapshot_tmpl', template: 'showSnapshot_tmpl'},
                {id: 'componentType', HeaderText: oj.Translations.getTranslatedString('instanceProperties.COMPONENT_TYPE'), shown: true, widthWeight: 0, field: 'componentType', headerTemplate: 'tree_hdr_compType_tmpl', template: 'componentType_tmpl'},
                {id: 'tier', HeaderText: oj.Translations.getTranslatedString('instanceProperties.TIER'), shown: true, widthWeight: 0,field: 'tier', headerTemplate: 'tree_hdr_tier_tmpl', template: 'tier_tmpl'},
                {id: 'startTime', HeaderText: oj.Translations.getTranslatedString('instanceProperties.CALL_START_TIME'), shown: true, widthWeight: 10, field: 'startTime', headerTemplate: 'tree_hdr_start_time_tmpl', template: 'startTime_tmpl', style: 'white-space: normal; overflow: visible;'},
                {id: 'linkResponseTime', HeaderText: oj.Translations.getTranslatedString('instanceProperties.RESPONSE_TIME'), shown: true, widthWeight: 10, field: 'linkResponseTime', headerTemplate: 'tree_hdr_response_time_tmpl', template: 'response_time_tmpl'},
                {id: 'selfTime', HeaderText: oj.Translations.getTranslatedString('instanceProperties.SELF_TIME'), shown: true, widthWeight: 10, field: 'selfTime', headerTemplate: 'tree_hdr_selfTime_tmpl', template: 'selfTime_pct_tmpl', style: 'min-width: 70px;'},
                {id: 'latency', HeaderText: oj.Translations.getTranslatedString('instanceProperties.LATENCY'), shown: true, widthWeight: 10, field: 'latency', headerTemplate: 'tree_hdr_latency_tmpl', template: 'latency_pct_tmpl'},
                {id: 'hadFault', HeaderText: oj.Translations.getTranslatedString('instanceProperties.ERROR'), shown: true, widthWeight: 0, field: 'hadFault', headerTemplate: 'tree_hdr_error_tmpl', template: 'error_tmpl', style: 'text-align: center;'},
                {id: 'callType', HeaderText: oj.Translations.getTranslatedString('instanceProperties.CALL_TYPE'), shown: true, widthWeight: 0, field: 'callType', headerTemplate: 'tree_hdr_callType_tmpl', template: 'callType_tmpl', style: 'text-align: center; min-width: 65px;'}
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
            self.getDataString=function(linkData)
            {

                var trimData = tempData.split("Fxtmodel");
                for( i = 0 ; i < trimData.length ; i ++)
                {
                    if(trimData[i].indexOf(linkData) != -1 )
                    {
                        var jsonData = trimData[i];
                    }
                }
                var  jsonString;
                if( jsonData.indexOf("<!--") != -1)
                    jsonString =  jsonData.substring(jsonData.indexOf(linkData) + linkData.length + 1 , jsonData.indexOf("<!--"));

                if( jsonData.indexOf(" -->") != -1)
                    jsonString =  jsonData.substring(jsonData.indexOf(linkData) +  linkData.length + 1 , jsonData.indexOf(" -->"));

                jsonString = JSON.parse(jsonString);
                return jsonString;
            };

            self.flatTableColumns = [
                {id: 'startTime', HeaderText: oj.Translations.getTranslatedString('instanceProperties.CALL_START_TIME'), shown: true, widthWeight: 10,field: 'startTime', headerRenderer: self.call_start_time_hdr_func, template: 'startTime_tmpl', style: 'white-space: normal; overflow: visible;', sortable: 'enabled', sortProperty: 'startTime'},
                {id: 'calledByOpName', HeaderText: oj.Translations.getTranslatedString('instanceProperties.CALLER'), shown: true, widthWeight: 30,field: 'calledByOpName', headerRenderer: self.caller_hdr_func, template: 'caller_tmpl', style: 'white-space: normal; word-break: break-all; min-width: 150px;', sortable: 'enabled', sortProperty: 'calledByOpName'},
                {id: 'operationName', HeaderText: oj.Translations.getTranslatedString('instanceProperties.CALLEE'), shown: true, widthWeight: 30, field: 'operationName', headerRenderer: self.callee_hdr_func, template: 'callee_tmpl', style: 'white-space: normal; word-break: break-all; min-width: 150px;', sortable: 'enabled', sortProperty: 'operationName'},
                {id: 'sqlId', HeaderText: oj.Translations.getTranslatedString('instanceProperties.SQL_ID'), shown: true, widthWeight: 0,field: 'sqlId', headerRenderer: self.sql_id_hdr_func, template: 'sqlId_tmpl', sortable: 'enabled', sortProperty: 'sqlId'},
                {id: 'hasSnapshot', HeaderText: oj.Translations.getTranslatedString('instanceProperties.SNAPSHOT'), shown: true, widthWeight: 0,field: 'hasSnapshot', headerRenderer: self.show_snapshot_hdr_func, template: 'showSnapshot_tmpl', sortable: 'enabled', sortProperty: 'hasSnapshot'},
                {id: 'componentType', HeaderText: oj.Translations.getTranslatedString('instanceProperties.COMPONENT_TYPE'), shown: true, widthWeight: 0, field: 'componentType', headerRenderer: self.component_type_hdr_func, template: 'componentType_tmpl', sortable: 'enabled', sortProperty: 'componentType'},
                {id: 'tier', HeaderText: oj.Translations.getTranslatedString('instanceProperties.TIER'), shown: true, widthWeight: 0, field: 'tier', headerRenderer: self.tier_hdr_func, template: 'tier_tmpl', sortable: 'enabled', sortProperty: 'tier'},
                {id: 'linkResponseTime', HeaderText: oj.Translations.getTranslatedString('instanceProperties.RESPONSE_TIME'), shown: true, widthWeight: 10,field: 'linkResponseTime', headerRenderer: self.response_time_hdr_func, template: 'response_time_tmpl', sortable: 'enabled', sortProperty: 'linkResponseTime'},
                {id: 'selfTime', HeaderText: oj.Translations.getTranslatedString('instanceProperties.SELF_TIME'), shown: true, widthWeight: 10, field: 'selfTime', headerRenderer: self.self_time_hdr_func, template: 'selfTime_pct_tmpl', style: 'min-width: 70px;', sortable: 'enabled', sortProperty: 'selfTime'},
                {id: 'latency', HeaderText: oj.Translations.getTranslatedString('instanceProperties.LATENCY'), shown: true, widthWeight: 10,field: 'latency', headerRenderer: self.latency_hdr_func, template: 'latency_pct_tmpl', sortable: 'enabled', sortProperty: 'latency'},
                {id: 'hadFault', HeaderText: oj.Translations.getTranslatedString('instanceProperties.ERROR'), shown: true, widthWeight: 0, field: 'hadFault', headerRenderer: self.error_hdr_func, template: 'error_tmpl', style: 'text-align: center;', sortable: 'enabled', sortProperty: 'hadFault'},
                {id: 'callType', HeaderText: oj.Translations.getTranslatedString('instanceProperties.CALL_TYPE'), shown: true, widthWeight: 0,field: 'callType', headerRenderer: self.call_type_hdr_func, template: 'callType_tmpl', style: 'text-align: center; min-width: 90px;', sortable: 'enabled', sortProperty: 'callType'}
            ];
            self.menuIdForFlatTable = 'apm_calltree_flattable_menu';

            self.displayAppserver = function(hostName, appServerInfo)
            {
                if (appServerInfo.appServerSslPort === undefined || appServerInfo.appServerSslPort === null) {
                    if (appServerInfo.appServerPort && appServerInfo.appServerPort !== -1 && appServerInfo.appServerPort !== 0)
                        return hostName + ":" + appServerInfo.appServerPort;
                    else if (appServerInfo.appServerPortsList && (appServerInfo.appServerPortsList.length > 0))
                    {
                        //in case of tomcat with AJP port only, there is no http nor https port defined
                        var tokens = appServerInfo.appServerPortsList.split(',');
                        if (tokens.length > 0)
                        {
                            var tokens2 = tokens[0].split(':');
                            if (tokens2.length > 1)
                                return hostName + ":" + tokens2[1].trim(); // just use the port
                            else if (tokens2.length > 0)
                                return hostName + ":" + tokens[0].trim(); //use the whole token 
                        }
                    }
                    return hostName;
                }
                
                else if (appServerInfo.appServerPort === 0 && appServerInfo.appServerSslPort === 0)
                    return hostName;
                
                else
                {
                    var useSSLPort = appServerInfo.appServerSslPort !== null && appServerInfo.appServerSslPort !== 0;
                    return hostName + ":" + (useSSLPort ? appServerInfo.appServerSslPort : appServerInfo.appServerPort);
                }
            };
            //
            // Get instance details for a given parameters:
            self.getDetail = function()
            {
                 tempData = window.g_activeReportXmlData;
                 if(tempData.length == 0 )
                 {
                     window.location.reload();
                 }
                self.externalDeploymentInfo("");
                self.LAMessagesErrorMsg("");
                self.LAMessagesCharts(new Array());
                self.LAMessagesMaxCount(0);
                self.allDataGotten(false);

                var sa = tempData.split("Fxtmodel");
                    for( i = 0 ; i < sa.length ; i++)
                    {
                        if(sa[i].indexOf("rootOperationMetadata") != -1)
                        {
                            var as = sa[i];
                        }
                    }
                   data =  as.substring(as.indexOf("json}") + 5 , as.indexOf("<!--"));
                   data = JSON.parse(data);

                    self.noData(!data);
                    if (!data)
                    {
                        self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
                            
                    }
                     else
                    {
                        if(data.rootOperation.sqlSummary)
                        {
                            var finding = [];
                            var input = data.rootOperation.sqlSummary,count=0;
                           for( i=0 ;i<data.rootOperation.sqlSummary.length;i++)
                            {
                                var str = String(input[i].operationName);
                                if(str.includes('[') && input[i].totalCount>20)
                                {
                                    self.showallfinding.push({
                                        operationName:str.substring(str.lastIndexOf("[")+1, str.lastIndexOf("]")),
                                        totalCount:input[i].totalCount,
                                        averageResponseTime:input[i].avgResponseTime,
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
                        data.startTimeDate = self.dateTimeUtils.displayDateTimeWithMilliseconds(data.startTime, oj);
                        data.endTimeDate = self.dateTimeUtils.displayDateTimeWithMilliseconds(data.endTime, oj);
                        self.instanceData(data);

                        // put root in an array so it is displayed in tree table
                        var rootRoot = new Array();
                        rootRoot.push(data.rootOperation);
                        self.flatTable = new Array();


                        var appServerType = self.mscUtils.getAppserverType(data.rootOperationMetadata.appServerInfo.appServerType);
                        if (appServerType === self.apmConstants.appserverType.NODEJS)
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
                            ,tierColor: self.apmConstants.color.APP_SERVER
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
                            ,tierColor: self.apmConstants.color.DATABASE
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
                            ,tierColor: self.apmConstants.color.EXTERNAL
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
                        if (data.rootOperationMetadata.appServerInfo.appServerType === self.apmConstants.targetType.NODEJS)
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
                                        viewLogTargetInfos.push({type:self.apmConstants.targetType.DB, value: dbUrl});
                                    }
                                }
                            }
                        }

                        self.getTileDetails=function(){

                            var arrayString= ["sr_alerts_tile-container","instDet_response_tile-container","instDet_calls_tile-container","instDet_errors_tile-container"];
                            var tile;
                            var tileData=[];

                            for (var i=0;i<4;i++)
                            {
                                tile = self.rowData.split("<!--Tile" + [i+1] + " "+"data !-->");
                                tileData[i+1] = "<" + tile[1].substring(tile[1].indexOf("<div")+1);
                                document.getElementById(arrayString[i]).innerHTML = tileData[i+1];
                            }

                        };
                         self.getTileDetails();

                           self.apmHeaderTitle.setupApmHeader ({ pageIcon:  { colorClass: 'request-type', shapeClass: 'fa-sitemap fa-rotate-270 request-type-adj', outlineClass: 'fa-circle-thin', alt: oj.Translations.getTranslatedString('headerProperties.INSTANCE_DETAIL_ALT') }
                            ,pageHeader: oj.Translations.getTranslatedString('headerProperties.INSTANCE')
                            ,subtype: firstLinkType
                            ,idSuffix: 'Server_Request_Instance'
                            ,labelMdWidth: 3
                            ,title1: data.requestTypeName
                            ,title1Label: ''
                            ,title2: data.startTimeDate
                            ,title2Label: oj.Translations.getTranslatedString('instanceProperties.START_TIME')
                            ,title3: data.endTimeDate
                            ,title3Label: oj.Translations.getTranslatedString('instanceProperties.END_TIME')
                            ,hideTimeSelector: true
                            ,column2: {labelMdWidth: 3
                                ,title2: data.instanceSummary.isAbridged ? oj.Translations.getTranslatedString('generalProperties.YES') + ' ' + oj.Translations.getTranslatedString('instanceProperties.SHOWING_N_OF_M_LINKS', self.numLinks(), data.instanceSummary.linkCount)
                                    : oj.Translations.getTranslatedString('generalProperties.NO') + ' ' + oj.Translations.getTranslatedString('instanceProperties.SHOWING_ALL_M_LINKS', data.instanceSummary.linkCount)
                                ,title2Label: oj.Translations.getTranslatedString('instanceProperties.ABRIDGED')
                                ,title3: self.displayAppserver(data.rootOperationMetadata.hostInfo.hostName, data.rootOperationMetadata.appServerInfo)
                                ,title3Label: oj.Translations.getTranslatedString('headerProperties.APP_SERVER')
                                ,title4: data.instanceSummary.ecid ? data.instanceSummary.ecid : oj.Translations.getTranslatedString('generalProperties.NONE')
                                ,title4Label: oj.Translations.getTranslatedString('instanceProperties.ECID')
                            }
                        });

                        var snapshotDetail="_snapshotDetail.json"
                        var snapshotData =  self.getDataString(snapshotDetail);

                        self.snapshotTimeData(snapshotData);
                        if (snapshotData)
                        {
                            self.snapshotDialogTitle(snapshotData.aggregatedStack[0].attr.methodName);
                            self.stackData = snapshotData.aggregatedStack;
                            fillStackProbeMapAndIds(snapshotData.aggregatedStack);
                            self.stackTreeTableDatasource(null);
                            var jsonTreeDS1 = new oj.JsonTreeDataSource(snapshotData.aggregatedStack);
                            var flatTreeDS1 = new oj.FlattenedTreeDataSource(jsonTreeDS1, []);
                            self.treeTableDS1 = new oj.FlattenedTreeTableDataSource(flatTreeDS1);
                            self.stackTreeTableDatasource(self.treeTableDS1);
                            self.frequency(snapshotData.frequency + " " + oj.Translations.getTranslatedString('generalProperties.MS'));
                            self.totalSnapshots(snapshotData.totalSnapshots);
                            var snapshotVisible=self.totalSnapshots() >= 1;
                            self.isSnapshotVisible(snapshotVisible);

                            if (snapshotData.instanceThreadCount < 1)
                            {
                                self.instanceThreadCount(oj.Translations.getTranslatedString('generalProperties.NONE'));
                            }
                            else
                            {
                                self.instanceThreadCount(snapshotData.instanceThreadCount);
                            }

                            if (!snapshotData.firstSnapshotTimeStamp)
                            {
                                self.firstSnapshotTimeStamp(oj.Translations.getTranslatedString('generalProperties.NONE'));
                            }
                            else
                            {
                                self.firstSnapshotTimeStamp(self.dateTimeUtils.displayDateTimeWithMilliseconds(snapshotData.firstSnapshotTimeStamp, oj));
                            }

                            self.gcOverhead(snapshotData.gcOverhead + " " + oj.Translations.getTranslatedString('generalProperties.MS'));

                            self.instanceCpu(self.dateTimeUtils.displayTime(snapshotData.instanceCpu, self.apmConstants.timeUnit.MILLISECONDS));
                            self.instanceCpuPercent(oj.Translations.getTranslatedString('instanceProperties.OPEN_BRACKET')+self.dateTimeUtils.displayNumber((snapshotData.instanceCpu/Math.max(snapshotData.totalResponseTime,0.01))*100)
                                + oj.Translations.getTranslatedString('instanceProperties.PERCENTAGE') + oj.Translations.getTranslatedString('instanceProperties.CLOSE_BRACKET'));
                            self.instanceMemory(self.dateTimeUtils.adjustMemory(snapshotData.instanceMemory,2) +" "+ self.dateTimeUtils.adjustedMemoryUnit(snapshotData.instanceMemory));
                            self.instanceMemoryRate(oj.Translations.getTranslatedString('instanceProperties.OPEN_BRACKET')+self.dateTimeUtils.displayNumber((self.dateTimeUtils.adjustMemory(snapshotData.instanceMemory,2)/Math.max(snapshotData.totalResponseTime,0.01))*1000)
                                +' ' + self.dateTimeUtils.adjustedMemoryUnit(snapshotData.instanceMemory) +oj.Translations.getTranslatedString('instanceProperties.SLASH') + oj.Translations.getTranslatedString('instanceProperties.SECONDS') + oj.Translations.getTranslatedString('instanceProperties.CLOSE_BRACKET'));
                            self.blockTime(snapshotData.instanceBlockTime + " " + oj.Translations.getTranslatedString('generalProperties.MS'));

                            var threadPieList = new Array();
                            var runnableValue = 0.00;
                            var lockValue = 0.00;
                            var totalOtherValue = 0.00;
                            var dbWaitingValue = 0.00;
                            var networkWaitingValue = 0.00;
                            var ioWaitingValue = 0.00;

                            if (snapshotData.totalSnapshots > 0)
                            {
                                runnableValue = self.dateTimeUtils.displayNumber((snapshotData.threadStateMap.RUNNABLE === undefined ? 0.00 : snapshotData.threadStateMap.RUNNABLE),2);
                                lockValue = self.dateTimeUtils.displayNumber((snapshotData.threadStateMap.LOCK === undefined ? 0.00 : snapshotData.threadStateMap.LOCK),2);
                                totalOtherValue = self.dateTimeUtils.displayNumber((snapshotData.threadStateMap.OTHER === undefined ? 0.00 : snapshotData.threadStateMap.OTHER),2);
                                dbWaitingValue = self.dateTimeUtils.displayNumber((snapshotData.threadStateMap.DB === undefined ? 0.00 : snapshotData.threadStateMap.DB),2);
                                networkWaitingValue = self.dateTimeUtils.displayNumber((snapshotData.threadStateMap.NETWORK === undefined ? 0.00 : snapshotData.threadStateMap.NETWORK),2);
                                ioWaitingValue = self.dateTimeUtils.displayNumber((snapshotData.threadStateMap.IO === undefined ? 0.00 : snapshotData.threadStateMap.IO),2);
                            }
                            if(lockValue != 0.00)
                            {
                                threadPieList.push({name: oj.Translations.getTranslatedString('instanceProperties.THREAD_STATE_LOCK'), color: self.apmConstants.color.THREAD_STATE_LOCK, borderColor: self.apmConstants.color.THREAD_STATE_LOCK, items: [lockValue]});
                            }
                            if(dbWaitingValue != 0.00)
                            {
                                threadPieList.push({name: oj.Translations.getTranslatedString('instanceProperties.THREAD_STATE_DB'), color: self.apmConstants.color.THREAD_STATE_DB, borderColor: self.apmConstants.color.THREAD_STATE_DB, items: [dbWaitingValue]});
                            }
                            if(networkWaitingValue != 0.00)
                            {
                                threadPieList.push({name: oj.Translations.getTranslatedString('instanceProperties.THREAD_STATE_NETWORK'), color: self.apmConstants.color.THREAD_STATE_NETWORK, borderColor: self.apmConstants.color.THREAD_STATE_NETWORK, items: [networkWaitingValue]});
                            }
                            if(ioWaitingValue != 0.00)
                            {
                                threadPieList.push({name: oj.Translations.getTranslatedString('instanceProperties.THREAD_STATE_IO'), color: self.apmConstants.color.THREAD_STATE_IO, borderColor: self.apmConstants.color.THREAD_STATE_IO, items: [ioWaitingValue]});
                            }
                            if(runnableValue != 0.00)
                            {
                                threadPieList.push({name: oj.Translations.getTranslatedString('instanceProperties.THREAD_STATE_RUNNABLE'),  color: self.apmConstants.color.THREAD_STATE_RUNNABLE, borderColor: self.apmConstants.color.THREAD_STATE_RUNNABLE, items: [runnableValue]});
                            }
                            if(totalOtherValue != 0.00)
                            {
                                threadPieList.push({name: oj.Translations.getTranslatedString('instanceProperties.THREAD_STATE_OTHER'),  color: self.apmConstants.color.THREAD_STATE_OTHER, borderColor: self.apmConstants.color.THREAD_STATE_OTHER, items: [totalOtherValue]});
                            }
                            self.threadPieCharts(threadPieList);

                        }
                        setTimeout(self.loadTable, 1);

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

            self.openFindingDialog = function()
            {

                $("#findingDialog").ojDialog({title: oj.Translations.getTranslatedString('Findings')});
                $('#findingDialog').ojDialog('open');

            };

            self.snapshotDataCompute = function()
            {

                self.chart={series: []};
                var chart1={series: []};
                var jString= "_snapshots.json";

                 var snapshots = self.getDataString(jString);
                    if (!snapshots)
                    {
                        self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
                    }
                    else {

                        var refObjValue = [];
                        var minX=0;
                        var maxX=0;
                        var processed=false;
                        self.snapshotItems = snapshots;
                        if (snapshots.items)
                        {
                            snapshots.items=snapshots.items.reverse();
                            self.totalSnapshots(snapshots.items.length);

                            for(var i=0;i<snapshots.items.length;i++)

                            {
                                processed=false;


                                for( var j=0;j<chart1.series.length;j++)
                                {
                                    if(snapshots.items[i].callerOperationName == chart1.series[j].name)
                                    {
                                        chart1.series[j].items.push( {y: j, x: snapshots.items[i].snapshotTimeStamp,id:""+snapshots.items[i].threadId+"id"+i, markerDisplayed:'on', markerShape: 'circle',markerSize:20,
                                            shortDesc : 'Thread Id : '+ snapshots.items[i].threadId+ '\nThread State : '+snapshots.items[i].threadState + ' \nSnapshot Timestamp : '+self.dateTimeUtils.displayDateTimeWithMilliseconds(snapshots.items[i].snapshotTimeStamp, oj),
                                            color: self.getColorForThreadState(snapshots.items[i].threadState),drilling: 'on'} );
                                        chart1.series[j].items.push( {y: j, x: snapshots.items[i].callerStartTime, shortDesc: '',id:'lineStartId'+i,drilling: 'off'} );
                                        chart1.series[j].items.push( {y: j, x: snapshots.items[i].callerEndTime, shortDesc: '',id:'lineEndId'+i,drilling: 'off'} );
                                        processed=true;
                                    }
                                }

                                if(!processed) {
                                    chart1.series.push({
                                        id: snapshots.items[i].callerOperationName+" id"+i,
                                        name: snapshots.items[i].callerOperationName,
                                        items: [],
                                        lineStyle:'solid',
                                        displayInLegend: 'off',
                                        color:' #ED813E'
                                    });
                                    chart1.series[j].items.push( {y: j, x: snapshots.items[i].snapshotTimeStamp,id:""+snapshots.items[i].threadId+"id"+i, markerDisplayed:'on', markerShape: 'circle',markerSize:20,
                                        shortDesc: 'Thread Id : '+ snapshots.items[i].threadId+ '\nThread State : '+snapshots.items[i].threadState + ' \nSnapshot Timestamp : '+self.dateTimeUtils.displayDateTimeWithMilliseconds(snapshots.items[i].snapshotTimeStamp, oj),
                                        color: self.getColorForThreadState(snapshots.items[i].threadState), drilling: 'on'} );

                                    chart1.series[j].items.push( {y: j, x: snapshots.items[i].callerStartTime, shortDesc: '', id:'lineStartId'+i,drilling: 'off'} );
                                    chart1.series[j].items.push( {y: j, x: snapshots.items[i].callerEndTime, shortDesc: '',id:'lineEndId'+i,drilling: 'off'} );
                                }

                                if(minX ==0) {
                                    minX = snapshots.items[i].snapshotTimeStamp;
                                }

                                if(snapshots.items[i].snapshotTimeStamp<minX)
                                {
                                    minX=snapshots.items[i].snapshotTimeStamp;
                                }
                                if(snapshots.items[i].snapshotTimeStamp>maxX)
                                {
                                    maxX=snapshots.items[i].snapshotTimeStamp;
                                }

                            }
                        }
                        for( var j=0;j<chart1.series.length;j++)
                        {
                            refObjValue.push({type: 'line', color: 'rgba(196,206,215,1)', value: j});
                        }

                        probeNames = {format: function(value) {
                                if(chart1.series[value])
                                    return chart1.series[value].name;
                                return "";
                            }}



                        chart1.xAxis = {min: minX-2000, max: maxX+2000, viewportMin: minX-2000, viewportMax: maxX+2000, axisLine: {lineWidth: 2}};
                        chart1.yAxis = {min: 0, max: chart1.series.length, step:1,majorTick: {rendered: 'off'}, tickLabel: {converter: probeNames, scaling :'none', rendered: 'on'},referenceObjects: refObjValue};

                        chart1.drillFunction=function(singleSnapshotData) {

                            var threadId=arguments[1].id.slice(0,arguments[1].id.indexOf('id'));
                            var xValue=arguments[1].data.x;
                            var snapshotLink = "_snapshotDetail_" + threadId + "_" + xValue + ".json";

                            var snapshotDetailData =  self.getDataString(snapshotLink);

                                $("#snapshotDetailDialog").ojDialog("open");
                                if (!snapshotDetailData)
                                {
                                    self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));
                                }
                                else {

                                    var option = [];

                                    rootRoot = new Array();
                                    for (var i=0;i<snapshotDetailData.children.length;i++)
                                        rootRoot.push(snapshotDetailData.children[i]);

                                    self.snapshotDetailTreeTableDatasource(null);


                                    var jsonTreeDS1 = new oj.JsonTreeDataSource(rootRoot);
                                    var flatTreeDS1 = new oj.FlattenedTreeDataSource(jsonTreeDS1);
                                    var snapshotTreeTableDS1 = new oj.FlattenedTreeTableDataSource(flatTreeDS1);
                                    self.snapshotDetailTreeTableDatasource(snapshotTreeTableDS1);

                                }

                            self.snapshotDetailDialogTitle(arguments[1].seriesData.name);
                        };


                        chart1.legendSections={sections: [], position: 'end' };

                        chart1.legendSections.sections.push( {title: 'Thread States',items:[]});

                        chart1.legendSections.sections[0].items.push( {text: "RUNNABLE", color: "#83CDDE", markerShape: "square"} );
                        chart1.legendSections.sections[0].items.push( {text: "LOCK", color: "#FFB54D", markerShape: "square"});
                        chart1.legendSections.sections[0].items.push( {text: "DB", color: "#E371B2", markerShape: "square"});
                        chart1.legendSections.sections[0].items.push( {text: "NETWORK", color: "#309FDB", markerShape: "square"});
                        chart1.legendSections.sections[0].items.push( {text: "IO", color: "#47BDEF", markerShape: "square"});
                        chart1.legendSections.sections[0].items.push( {text: "OTHER", color: "#8561C8", markerShape: "square"});
                        chart1.legendSections.sections[0].items.push( {text: "RESPONSE TIME", color: "#ED813E", symbolType: "line", lineStyle: "solid"});


                        self.chart=chart1;
                        self.chart.xAxis=chart1.xAxis;
                        self.chart.legendSections=chart1.legendSections;
                        self.chart.drillFunction=chart1.drillFunction;
                        self.chart.yAxis=chart1.yAxis;
                        self.chart.series=chart1.series;
                        return self.chart;
                    }


                self.chart=chart1;
                self.chart.xAxis=chart1.xAxis;
                self.chart.yAxis=chart1.yAxis;
                self.chart.drillFunction=chart1.drillFunction;
                self.chart.legendSections=chart1.legendSections;
                self.chart.series=chart1.series;
                return self.chart;
            }




            // this method is used to filter the stack data according to probe
            //when data == null; it resets the treeModel to its original value
            self.refreshSelfCallStackData = function(data)
            {
                var selfSnapshotsData;
                var oldData=data;
                var startTime=data.selfStartTime;
                var threadId=data.threadId;
                var threadIdLink='_selfSnapshots_'+threadId+'_'+startTime + ".json";

               var selfSnapshots= self.getDataString(threadIdLink);

                //   selfSnapshots =  as.substring(as.indexOf(threadIdLink) +  threadIdLink.length + 1 , as.indexOf("<!--"));
                    

                // Made null because data from earlier selection is made visible
                self.selfTreeTableDS1=null;
                self.selfStackTreeTableDatasource(null);
                self.snapshotDialogTitle(data.operationName + ' ' + oj.Translations.getTranslatedString('callStackProperties.SNAPSHOTS'));
                self.selfCallee=null;
                self.emptyTextValue(oj.Translations.getTranslatedString('headerProperties.NO_DATA'));

                
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

               // self.stackTreeTableDatasource(null);

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
            self.showError = function(data)
            {
                // Get error info for this particular call if we don't already have it
                self.errorDialogTitle(oj.Translations.getTranslatedString('instanceProperties.ERROR_DETAILS_DIALOG_TITLE_INSTANCE_SUMMARY', data.operationName));
               
                if (data.errorDetailsId !== undefined && data.errorDetailsId !== null)
                {
                 
                    var errorDetailsLink = '_errorDetails_'+encodeURIComponent(data.errorDetailsId);
                     var errorDetailsData = self.getDataString(errorDetailsLink + ".json");
                    if (errorDetailsData && errorDetailsData.errorDetails.length > 0)
                        {
                            var errorDetails = errorDetailsData.errorDetails[0];
                            errorDetails.formattedErrorStack = self.instanceUtils.formatErrorStack(errorDetails.errorStack);
                            self.errorDetails(errorDetails);
                        }
                        else
                        {
                            self.errorDetails(null);
                        }
                        $('#apm_error_popup').ojDialog('open');
                }
                else
                {
                    self.errorDetails(null);
                    $('#apm_error_popup').ojDialog('open');
                }
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
  
            window.setTimeout(myfunction, 5000);
            function myfunction()
            {
                self.getDetail();
                self.snapshotDataCompute
                self.loadTable();
            }
            
        };

        return callTree;
    }
);