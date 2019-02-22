//
// A singleton class with common functions for charts
// 

define(['ojs/ojcore',
    'knockout',
    'jquery',
    '../utils/mscUtils',
    '../utils/dateTimeUtils'
],
function(oj, ko, $, MscUtils, DateTimeUtils)
{
    var ChartUtils = (function () 
    {
        var instance;


        function createInstance() {
            var object = new chartUtils();
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

        function chartUtils() 
        { 
            var self = this;
            self.dateTimeUtils = DateTimeUtils.getInstance();

            self.tooltipLabelStyle = 'style="color:#737373; padding-top:0px; padding-bottom:0px; padding-left:2px; padding-right:2px; text-align:right;"';
            self.tooltipValueStyle = 'style="color:#333333; padding-top:0px; padding-bottom:0px; padding-left:2px; padding-right:2px; text-align:left;"';

            // create a tooltip from tooltip(dataContext) method dataContext with other series in chart
            self.chartTooltip = function(dataContext, units) 
            {
                var multipleSeries = dataContext.component().ojChart('option', 'series');
                var groups = dataContext.component().ojChart('option', 'groups');
                var bucketDurationInMilliseconds = groups[1] - groups[0];
                var groupIndex = (dataContext.group - groups[0]) / bucketDurationInMilliseconds;   // determine time slice that was hovered over
                var isReversed = dataContext.component().ojChart('option', 'stack') === 'on';
    
                var htmlRows = self.makeMultipleSeriesTooltip(multipleSeries, groupIndex, isReversed, units);
                if (htmlRows.length > 0)
                {
                    htmlRows += self.makeTooltipDateTimeHtml(dataContext.x, bucketDurationInMilliseconds);
                }
                return self.makeTooltipDiv(htmlRows);
            };

            // create a tooltip from tooltip(dataContext) method dataContext for the single hovered series
            // this is used for the service request instance
            self.instanceTooltip = function(dataContext, units) 
            {
                var htmlRows = self.makeSeriesTooltipHtml(dataContext.series, dataContext.value, units, dataContext.id, dataContext.series.valueIsInteger);
                if (htmlRows.length > 0)
                {
                    htmlRows += self.makeTooltipDateTimeHtml(dataContext.x, null, self.isInstance(dataContext.id));
                }
                return self.makeTooltipDiv(htmlRows);
            };
            
            // create a tooltip from tooltip(dataContext) method dataContext for the single hovered series
            // this is used for the mobile geo charts
            self.geoTooltip = function(dataContext, units, nameTitle) 
            {
                var htmlRows = self.makeSeriesTooltipHtml(dataContext.series, dataContext.value, units, dataContext.seriesData.valueIsInteger);
                if (htmlRows.length > 0)
                {
                    htmlRows += self.makeTooltipLabelValueHtml(nameTitle, dataContext.group);
                }
                return self.makeTooltipDiv(htmlRows);
            };
            
            // create an alert tooltip from tooltip(dataContext) method dataContext for the single hovered series
            self.alertTooltip = function(dataContext) 
            {
                var alertData = dataContext.data.alertMetricData;
                var htmlRows = self.makeTooltipLabelValueHtml(oj.Translations.getTranslatedString('alertProperties.SEVERITY_NOW'), 
                                                              oj.Translations.getTranslatedString('alertProperties.'+alertData.severity));
                htmlRows += self.makeTooltipLabelValueHtml(oj.Translations.getTranslatedString('alertProperties.MESSAGE'), alertData.message);
                htmlRows += self.makeTooltipDateTimeHtml(dataContext.x);
                return self.makeTooltipDiv(htmlRows);
            };
            
            // create an HTML row of the tooltip for a single series
            self.makeSeriesTooltipHtml = function(seriesName, value, units, valueIsInteger)
            {
                if (valueIsInteger === undefined)
                {
                    valueIsInteger = false;
                }
                
                var valueDisplay;
                var unitsDisplay = "";
                if (isNaN(value))
                {
                    valueDisplay = value;
                }
                else if (units)
                {
                    if (units === TIME_UNIT_MILLISECONDS || units === TIME_UNIT_NANOSECONDS || units === TIME_UNIT_SECONDS ||
                        units === TIME_UNIT_MINUTES || units === TIME_UNIT_HOURS || units === TIME_UNIT_DAYS)
                    {
                        valueDisplay = self.dateTimeUtils.displayTime(value, units);
                    }
                    else
                    {
                        valueDisplay = self.dateTimeUtils.displayNumber(value, (valueIsInteger ? 0 : 2));
                        unitsDisplay = (units === '%' || units.substring(0,1) === '/' ? '' : ' ') + units;
                    }
                }
                else
                {
                    valueDisplay = self.dateTimeUtils.displayNumber(value, (valueIsInteger ? 0 : 2));
                }

                return self.makeTooltipLabelValueHtml(seriesName, valueDisplay+unitsDisplay);
            };

            // Iterate through all the chart's series to create a tool tip showing all series' values
            self.makeMultipleSeriesTooltip = function(multipleSeries, groupIndex, isReversed, units)
            {
                var htmlRows = "";
                for (var si = (isReversed ? multipleSeries.length-1: 0); (isReversed ? si >= 0 : si < multipleSeries.length); (isReversed ? si-- : si++))
                {
                    var series = multipleSeries[si];
                    var seriesUnits = (series.units !== undefined ? series.units : units); //This is used here because some series may reset the value of units to empty string, thus causing problem for next series
                    if (series.name !== undefined && series.name !== null && series.name.length > 0 && !series.hideInTooltip)
                    {
                        // only display series if its name is displayed in legend
                        var value = null;
                        var item = series.items[groupIndex];
                        if (item !== null && item !== undefined)
                        {
                            //Check for anomaly series first
                            var anomaly = series.anomaly;
                            if (anomaly === HIGH_ANOMALY_SERIES)
                            {    
                                if (series.highAnomalyData)
                                    value = oj.Translations.getTranslatedString('baselineProperties.ABOVE_BASELINE_COUNT', series.highAnomalyData[groupIndex]);
                                else
                                    value = oj.Translations.getTranslatedString('baselineProperties.ABOVE_BASELINE');
                                seriesUnits = '';
                            }
                            else if (anomaly === LOW_ANOMALY_SERIES)
                            {
                                if (series.lowAnomalyData)
                                    value = oj.Translations.getTranslatedString('baselineProperties.BELOW_BASELINE_COUNT', series.lowAnomalyData[groupIndex]);
                                else
                                    value = oj.Translations.getTranslatedString('baselineProperties.BELOW_BASELINE');
                                seriesUnits = '';
                            }
                            else if (!item.alertMetricData)
                            {
                                if (MscUtils.getInstance().isObject(item)) // either the value is a simple number or an item object
                                {
                                    // If it's an object, its value is the y attribute.
                                    // We will not display instances in the multiple series tooltip
                                    // An id may be provided which may be for the instance URL
                                    if (!self.isInstance(item.id))    // do not display instances in all series
                                    {
                                        if (item.low !== undefined && item.high !== undefined
                                            && item.low !== null && item.high !== null)
                                        {
                                                //we have a range value 
                                                value = self.dateTimeUtils.displayTime(item.low, seriesUnits) + ' - ' + self.dateTimeUtils.displayTime(item.high, seriesUnits);
                                                seriesUnits = '';
                                        }
                                        else
                                            value = item.y;
                                    }
                                }
                                else
                                {
                                    value = item;
                                }
                            }

                            if (value !== null && series.scale !== undefined && series.scale > 0 && series.scale !== 1)
                            {
                                value = value / series.scale;
                            }
                        }
                        
                        if (value !== undefined && value !== null)
                        {
                            htmlRows += self.makeSeriesTooltipHtml(series.name, value, seriesUnits, (series.valueIsInteger !== undefined ? series.valueIsInteger : (seriesUnits === '' || seriesUnits === undefined)));
                        }
                    }
                }

                return htmlRows;
            };
            
            self.makeTooltipLabelValueHtml = function(label, value)
            {
                return  '<tr>\n' +
                            '<td ' + self.tooltipLabelStyle + ' nowrap valign="top">\n' +
                                label + '\n' +
                            '</td>\n' +
                            '<td ' + self.tooltipValueStyle + '>\n' + 
                                value + '\n' +
                            '</td>\n' +
                        '</tr>\n';
            };
            
            // showMilliseconds = true if you want the milliseconds displayed as fraction of seconds (optional)
            self.makeTooltipDateTimeHtml = function(timeInMilliseconds, bucketDurationInMilliseconds, showMilliseconds)
            {
                var htmlRows = self.makeTooltipLabelValueHtml(oj.Translations.getTranslatedString('generalProperties.TOOLTIP_DATE'),
                                                              self.tooltipDate(timeInMilliseconds));
                htmlRows += self.makeTooltipLabelValueHtml(oj.Translations.getTranslatedString('generalProperties.TOOLTIP_TIME'),
                                                           self.tooltipTime(timeInMilliseconds, bucketDurationInMilliseconds, showMilliseconds));
                return htmlRows;                                                 
            };
            
            self.makeTooltipDiv = function(htmlRows)
            {
                if (htmlRows !== null && htmlRows.length > 0)
                {
                    var tooltip = document.createElement('div');
                    $(tooltip).html(
                        '<span style="visibility: inherit;">\n' +
                            '<table style="border-collapse:separate; border-spacing:2px; max-width: 300px;">\n' +
                                '<tbody>\n' +
                                    htmlRows +
                                '</tbody>\n' +
                            '</table>\n' +
                        '</span>\n');
                    return tooltip;
                }
                else
                {
                    return null;
                }
            };
            
            self.getValuesFromAttributeNameOrFunction = function(chartData, attributeNameOrFunction)
            {
                var parensIndex = attributeNameOrFunction.indexOf("()");
                var values;
                if (parensIndex > 0)
                {
                    values = chartData[attributeNameOrFunction.substring(0,parensIndex)]();
                }
                else
                {
                    values = chartData[attributeNameOrFunction];
                }
                return values;
            };
            
            self.tooltipDate = function(timeInMilliseconds)
            {
                return self.dateTimeUtils.getDateString(new Date(timeInMilliseconds));
            };
            
            // showMilliseconds = true if you want the milliseconds displayed as fraction of seconds (optional)
            // bucketDurationInMilliseconds (optional)
            self.tooltipTime = function(timeInMilliseconds, bucketDurationInMilliseconds, showMilliseconds)
            {
                var isoDate = oj.IntlConverterUtils.dateToLocalIso(new Date(timeInMilliseconds));
                if (showMilliseconds)
                {
                    // So, this is for an instance data point whose x time value does not coincide with group
                    // so display the time with milliseconds
                    return self.dateTimeUtils.displayTimeWithMilliseconds(isoDate, oj);
                }
                else
                {
                    var timeDisplayed = self.dateTimeUtils.getTimeString(new Date(timeInMilliseconds));
                    if (bucketDurationInMilliseconds)
                    {
                        var timeInMillisecondsEnd = Math.min(timeInMilliseconds + bucketDurationInMilliseconds, getSinceUntil().until);
                        timeDisplayed += " - " + self.dateTimeUtils.getTimeString(new Date(timeInMillisecondsEnd));
                    }
                    return timeDisplayed;
                }
            };
            
            self.makeItems = function(values, timestampDates, valueScale)
            {
                var items = new Array();
                if (values)
                {
                    if (valueScale === undefined)
                    {
                        valueScale = 1;
                    }

                    for (var i = 0; i < values.length; i++)
                    {
                        var value = values[i];
                        var item = new Object();
                        if (timestampDates)
                        {
                            // values
                            item.x = timestampDates[i];
                            if (value === null)
                            {
                                item.y = value;
                            }
                            else if (MscUtils.getInstance().isObject(value))
                            {
                                // range value
                                item.high = value.high;
                                item.low = value.low;
                                item.id = value.id;
                            }
                            else
                            {
                                item.y = value / valueScale;
                            }
                        }
                        else
                        {
                            // instances duration values
                            item.x = new Date(value.startTime);
                            if (value.duration !== null)
                                item.y = value.duration / valueScale;
                            else
                                item.y = value.duration;
                            // put self link to instance for when data point is clicked in chart and calls drillDetail()
                            item.id = getLinkHrefByName(value, VALUE_LINK_SELF);  // self link for instance used in drillDetail method
                            item.drilling = 'on';
                        }

                        items.push(item);
                    }
                }
                return items;
            };
            
            self.isInstance = function(id)
            {
                // If there is an id, it is the instance ID to go to if the instance is clicked in the chart.
                return (id !== null && id !== undefined && id.length > 0);
            };
        }                       
    })();

    return ChartUtils;
});   

            
