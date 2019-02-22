//
// A singleton class with common functions for instance display.
// 

define(['ojs/ojcore',
    'knockout',
    'jquery',
    '../utils/dateTimeUtils',
    '../utils/chartUtils'
],
function(oj, ko, $, DateTimeUtils, ChartUtils)
{
    var InstanceUtils = (function () {
    var instance;
 
    function createInstance() {
        var object = new instanceUtils();
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
    
    function instanceUtils() { 
            var self = this;
            self.dateTimeUtils = DateTimeUtils.getInstance();
            self.chartUtils = ChartUtils.getInstance();
            
            self.instanceSeriesInfo =  [{chartValueAttr: "maxInstances"
                           ,name: oj.Translations.getTranslatedString('chartProperties.MAX_TIME')+' '+
                                  oj.Translations.getTranslatedString('chartProperties.INSTANCE_SUFFIX')
                           ,markerColor: COLOR_MAX_TIME
                           ,markerShape: "triangleUp"}
                          ,{chartValueAttr: "normalInstances"
                           ,name: oj.Translations.getTranslatedString('chartProperties.NORMAL')+' '+
                                  oj.Translations.getTranslatedString('chartProperties.INSTANCE_SUFFIX')
                           ,markerColor: COLOR_PRIMARY
                           ,markerShape: "circle"}
                          ,{chartValueAttr: "minInstances"
                           ,name: oj.Translations.getTranslatedString('chartProperties.MIN_TIME')+' '+
                                  oj.Translations.getTranslatedString('chartProperties.INSTANCE_SUFFIX')
                           ,markerColor: COLOR_MIN_TIME
                           ,markerShape: "triangleDown"}
                          ,{chartValueAttr: "faultInstances"
                           ,name: oj.Translations.getTranslatedString('chartProperties.FAULT')+' '+
                                  oj.Translations.getTranslatedString('chartProperties.INSTANCE_SUFFIX')
                           ,markerColor: COLOR_ERROR
                           ,markerShape: "diamond"}
                          ,{chartValueAttr: "otherInstances"
                           ,name: oj.Translations.getTranslatedString('chartProperties.OTHER_REASON')+' '+
                                  oj.Translations.getTranslatedString('chartProperties.INSTANCE_SUFFIX')
                           ,markerColor: COLOR_SECONDARY
                           ,markerShape: "square"}
                          ,{chartValueAttr: "syntheticInstances"
                           ,name: oj.Translations.getTranslatedString('chartProperties.SYNTHETIC')+' '+
                                  oj.Translations.getTranslatedString('chartProperties.INSTANCE_SUFFIX')
                           ,markerColor: COLOR_SECONDARY
                           ,markerShape: "square"}
                          ];

                    /*
                     * Adds instance series using rest API data to the given chartSeries
                     * @param {type} data   
                     * @param {type} chartSeries
                     * @returns {undefined}
                     */
                    self.addInstanceSeries = function(data, chartSeries, oj, markerSize)
                    {
                        var lastChartSeries = chartSeries()[chartSeries().length-1];
                        for (var si = 0; si < self.instanceSeriesInfo.length; si++)
                        {
                            var seriesInfo = self.instanceSeriesInfo[si];
                            var seriesObj = new Object();
                            seriesObj.name = seriesInfo.name;
                            seriesObj.items = self.chartUtils.makeItems(data[seriesInfo.chartValueAttr]);
                            seriesObj.markerColor = seriesInfo.markerColor;
                            seriesObj.markerShape = seriesInfo.markerShape;
                            seriesObj.markerSize = markerSize;
                            seriesObj.markerDisplayed = "on";
                            seriesObj.lineType = "none";
                            seriesObj.units = TIME_UNIT_MILLISECONDS;
                            if (lastChartSeries.alertSeriesIndex)
                            {
                                lastChartSeries.alertSeriesIndex++;
                                chartSeries.splice(chartSeries().length-1, 0, seriesObj);   // insert before the Alerts series so Alert series stays visible on top of chart
                            }
                            else
                            {
                                chartSeries.push(seriesObj);
                            }
                        }
                    };
                    
                    self.areInstancesShownInTimeRange = function(timeRange)
                    {
                        // instances are only shown if time period is less than 2 days
                        return timeRange <= self.dateTimeUtils.getMillisecondsFromTimePeriodName(VALUE_TIMEPERIOD_LASTDAY) * 2;
                    };
                    
                    self.formatErrorStack = function(unformattedErrorStack)
                    {
                        var formattedErrorStack = new Array();
                        if (unformattedErrorStack === undefined || unformattedErrorStack === null)
                        {
                            formattedErrorStack.push(oj.Translations.getTranslatedString('instanceProperties.NO_STACK_AVAILABLE_FOR_ERROR'));
                        }
                        else
                        {
                            for (var i = 0; i < unformattedErrorStack.length; i++)
                            {
                                var lineAttrs = unformattedErrorStack[i].split(" ");
                                var fileName = lineAttrs[0];
                                var methodName = lineAttrs[1];
                                var className = lineAttrs[2];
                                var lineNumber = lineAttrs[3];
                                var formattedLine;
                                if (fileName === 'Native' && lineNumber === 'Native')
                                {
                                    formattedLine = oj.Translations.getTranslatedString('instanceProperties.ERROR_STACK_LINE_NATIVE',
                                                                                        className, methodName);
                                }
                                else if (fileName === 'Unknown' && lineNumber === '-1')
                                {
                                    formattedLine = oj.Translations.getTranslatedString('instanceProperties.ERROR_STACK_LINE_UNKNOWN',
                                                                                        className, methodName);
                                }
                                else
                                {
                                    formattedLine = oj.Translations.getTranslatedString('instanceProperties.ERROR_STACK_LINE_FORMAT',
                                                                                        className, methodName, fileName, lineNumber);
                                }
                                formattedErrorStack.push(formattedLine);
                            }
                        }
                        return formattedErrorStack.join('\n');
                    };
                }                       
                                                                                    
    })();

    return InstanceUtils;
});   

            

