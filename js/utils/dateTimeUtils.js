//
// A singleton class that formats dates and times. Requires oj so that functions can 
// retrieve translated strings.
// 

define(['ojs/ojcore',
    'knockout',
    'jquery',
    'ojs/ojvalidation',
    '../utils/messageUtils'

],
function(oj, ko, $, MessageUtils)
{
    var DateTimeUtils = (function ()
    {
        var instance;

        function createInstance() {
            var object = new dateTimeUtils();
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

        function dateTimeUtils()
        {
            var self = this;
            self.displayTime = function(value, units)
            {
                if (units === TIME_UNIT_NANOSECONDS)
                {
                    if (value > 1000000)
                    {
                        value = value / 1000000;
                        units = TIME_UNIT_MILLISECONDS;
                       return self.displayTime(value, units);
                    }
                }
                else if (units === TIME_UNIT_MILLISECONDS)
                {
                    if (value > 1000)
                    {
                        value = value / 1000;
                        units = TIME_UNIT_SECONDS;
                        return self.displayTime(value, units);
                    }
                }
                else if (units === TIME_UNIT_SECONDS)
                {
                    if (value > 60)
                    {
                        value = value / 60;
                        units = TIME_UNIT_MINUTES;
                        return self.displayTime(value, units);
                    }
                }
                else if (units === TIME_UNIT_MINUTES)
                {
                    if (value > 60)
                    {
                        value = value / 60;
                        units = TIME_UNIT_HOURS;
                        return self.displayTime(value, units);
                    }
                }
                else if (units === TIME_UNIT_HOURS)
                {
                    if (value > 60)
                    {
                        value = value / 60;
                        units = TIME_UNIT_DAYS;
                        return self.displayTime(value, units);
                    }
                }

                return self.displayTimeValue(value, units);
            };

            self.adjustMemory = function(value,decimalPlaces)
            {

                if (value > 1024) {
                    value = value / 1024;
                }

                return self.displayNumber(value, decimalPlaces);
            };

            self.adjustedMemoryUnit = function(value)
            {
                var unit="MB";

                if (value > 1024) {
                    value = value / 1024;
                    unit = "GB";
                }

                return unit;
            };

            // This is called by dashboardRegion.html to get a time to display based on currently selected field in the
            // sort combobox.  It was doing an eval in html, but it seems that sometimes the sortField in that eval ends up
            // being an array not a string, so once in a while it was erroring out.  ap-9250 and ap-9243
            // there is also getSortFieldDisplayNumber()
            self.getSortFieldDisplayTime = function ( data, sortField, units )
            {
                var sortFieldData;

                if ( sortField instanceof String )
                    sortFieldData = sortField;
                else
                    sortFieldData = sortField[0];

                return self.displayTime ( data[sortFieldData], units );
            };

            self.displayTimeValue = function(value, units)
            {
                return self.displayNumber(value, 2, units);
            };

            self.getUnitDisplay = function (value, units)
            {
                if (units === TIME_UNIT_MILLISECONDS)
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.MS_WITH_VALUE', value);
                else if (units === TIME_UNIT_NANOSECONDS)
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.NS_WITH_VALUE', value);
                else if (units === TIME_UNIT_SECONDS)
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.SECONDS_WITH_VALUE', value);
                else if (units === TIME_UNIT_MINUTES)
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.MINUTES_WITH_VALUE', value);
                else if (units === TIME_UNIT_HOURS)
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.HOURS_WITH_VALUE', value);
                else if (units === TIME_UNIT_DAYS)
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.DAYS_WITH_VALUE', value);
                else
                    return value+units;
            };

            self.displayTimeHover = function(value, units, displayTimeValue)
            {
                var lessThanOneHover = self.displayNumberHover(value);
                if (lessThanOneHover !== '')
                    return lessThanOneHover;

                var timeHover = self.getUnitDisplay(self.displayNumber(value), units);
                if (!displayTimeValue)
                    displayTimeValue = self.displayTime(value, units);
                if (timeHover !== displayTimeValue)
                {
                    return timeHover;
                }
                else
                {
                    return '';
                }
            };

            self.getTimeValueOnly = function(displayTime)
            {
                return displayTime.substring(0, displayTime.indexOf(' '));
            };

            self.getTimeUnitsOnly = function(displayTime)
            {
                return displayTime.substring(displayTime.indexOf(' ')+1);
            };

            // Defines the supported time periods, corresponding milliseconds for each
            // Also define aggregation periods (used by chartUtils.js) for each period
            // for overview charts (smaller aggregation=more buckets) and spark charts (bigger aggregation=less buckets)
            //
            // NOTE: it is imperative that the small chart granularity (aggregation period)
            // is divisible by the big/overview chart granularity in order for time alignment
            // to work for all charts and aggregated scalar numbers.
            //
            // NOTE: it is imperative that the following array is sorted from smalletst time period to largest
            // getTimePeriodNameFromSnappedTimeRange() depends on it.
            self.timePeriodInfo = [
                         {name: VALUE_TIMEPERIOD_LAST15MINUTES, msecs: 15*60*1000, overview: 1, spark: 1}
                        ,{name: VALUE_TIMEPERIOD_LAST30MINUTES, msecs: 30*60*1000, overview: 1, spark: 3}
                        ,{name: VALUE_TIMEPERIOD_LAST_60MINUTES, msecs: 60*60*1000, overview: 1, spark: 5}
                        ,{name: VALUE_TIMEPERIOD_LASTHOUR, msecs: 60*60*1000, overview: 1, spark: 5}
                        ,{name: VALUE_TIMEPERIOD_LAST2HOURS, msecs: 2*60*60*1000, overview: 2, spark: 10}
                        ,{name: VALUE_TIMEPERIOD_LAST4HOURS, msecs: 4*60*60*1000, overview: 4, spark: 20}
                        ,{name: VALUE_TIMEPERIOD_LAST6HOURS, msecs: 6*60*60*1000, overview: 6, spark: 30}
                        ,{name: VALUE_TIMEPERIOD_LAST8HOURS, msecs: 8*60*60*1000, overview: 8, spark: 30}
                        ,{name: VALUE_TIMEPERIOD_LAST12HOURS, msecs: 12*60*60*1000, overview: 15, spark: 60}
                        ,{name: VALUE_TIMEPERIOD_LAST24HOURS, msecs: 24*60*60*1000, overview: 15, spark: 120}
                        ,{name: VALUE_TIMEPERIOD_LASTDAY, msecs: 24*60*60*1000, overview: 15, spark: 120}
                        ,{name: VALUE_TIMEPERIOD_LAST2DAYS, msecs: 2*24*60*60*1000, overview: 30, spark: 240}
                        ,{name: VALUE_TIMEPERIOD_LAST3DAYS, msecs: 3*24*60*60*1000, overview: 45, spark: 360}
                        ,{name: VALUE_TIMEPERIOD_LAST4DAYS, msecs: 4*24*60*60*1000, overview: 60, spark: 480}
                        ,{name: VALUE_TIMEPERIOD_LAST5DAYS, msecs: 5*24*60*60*1000, overview: 60, spark: 600}
                        ,{name: VALUE_TIMEPERIOD_LAST6DAYS, msecs: 6*24*60*60*1000, overview: 60, spark: 720}
                        ,{name: VALUE_TIMEPERIOD_LAST7DAYS, msecs: 7*24*60*60*1000, overview: 60, spark: 720}
                        ,{name: VALUE_TIMEPERIOD_LASTWEEK, msecs: 7*24*60*60*1000, overview: 60, spark: 720}
                      ];

            // Build 2 hashmaps, one by name and one by milliseconds
            self.timePeriodInfoByNameMap = new Object();
            self.timePeriodInfoByMilliMap = new Object();
            for (var i = 0; i < self.timePeriodInfo.length; i++)
            {
                var tpi = self.timePeriodInfo[i];
                self.timePeriodInfoByNameMap[tpi.name] = tpi;
                self.timePeriodInfoByMilliMap[tpi.msecs] = tpi;
            }

            self.getMillisecondsFromTimePeriodName = function(timePeriodName)
            {
                var mapObject =self.timePeriodInfoByNameMap[timePeriodName];
                if (mapObject)
                    return mapObject.msecs;
                else
                {
                    var startEndObj = window.apmManager.crossRefUtils.getStartEndTimeFromTimePeriod(timePeriodName);
                    if (startEndObj)
                        return startEndObj.end - startEndObj.start;
                    else
                        return null;
                }
            };

            self.getTimePeriodNameFromMillseconds = function(msecs)
            {
                var mapObject = self.timePeriodInfoByMilliMap[msecs];
                if (mapObject)
                    return mapObject.name;
                else
                    return null;
            };

            // Given milliseconds, find the string-constant for the range.  Because of snapping of the time, the milliseconds will
            // not exactely correspond to 1hr or 15min, that's why the >= expressions
            self.getTimePeriodNameFromSnappedTimeRange = function(timeRange)
            {
                for (var i = self.timePeriodInfo.length-1; i >= 0; i--)
                {
                    var tpi = self.timePeriodInfo[i];
                    if (timeRange >= self.getMillisecondsFromTimePeriodName(tpi.name))
                    {
                        return tpi.name;
                    }
                }

                return self.timePeriodInfo[0].name;
            };

            self.getChartGranularityFromTimeRange = function(timeRange, forOverview)
            {
                var timePeriodName = self.getTimePeriodNameFromSnappedTimeRange(timeRange); // convert from milliseconds to string constant

                if ( forOverview )
                    return self.timePeriodInfoByNameMap[timePeriodName].overview;
                else
                    return self.timePeriodInfoByNameMap[timePeriodName].spark;
            };

            self.dateTimeConverterFactory;
            self.hourDateTimeConverter;
            self.dayDateTimeConverter;
            self.weekDateTimeConverter;

            self.getDateTimeConverter = function(timeRange)
            {
                if (!self.dateTimeConverterFactory)
                    self.dateTimeConverterFactory = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME);

                if (timeRange > self.getMillisecondsFromTimePeriodName(VALUE_TIMEPERIOD_LASTDAY)*2)
                {
                    if (!self.weekDateTimeConverter)
                    {
                         self.weekDateTimeConverter = self.dateTimeConverterFactory.createConverter({month: 'numeric', day: 'numeric'});
                    }
                    return self.weekDateTimeConverter;
                }
                else if (timeRange >= self.getMillisecondsFromTimePeriodName(VALUE_TIMEPERIOD_LASTDAY))
                {
                    if (!self.dayDateTimeConverter)
                    {
                        self.dayDateTimeConverter = self.dateTimeConverterFactory.createConverter({hour: 'numeric', minute: 'numeric', ampm: 'true'});
                    }
                    return self.dayDateTimeConverter;
                }
                else    // timePeriod = last hour
                {
                    if (!self.hourDateTimeConverter)
                    {
                        self.hourDateTimeConverter = self.dateTimeConverterFactory.createConverter({hour: 'numeric', minute: 'numeric', ampm: 'true'});
                    }
                    return self.hourDateTimeConverter;
                }
            };

            /**
            *
            * @param {type} isoDate    ISO date
            * @returns formatted date and time with milliseconds
            */
            self.displayTimeWithMilliseconds = function(isoDate)
            {
                // TODO:  this is still not quite localized because it specifies 12-hour time,
                // so when milliseconds are fully-supported by Jet we will switch over.
                var timeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
                                                    .createConverter({pattern: 'h:mm:ss.SSS a'});
                return timeConverter.format(isoDate);
            };

            self.displayDateTime = function(isoDate)
            {
                try
                {
                    var converterFactory = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME);
                    var converter = converterFactory.createConverter({formatType: 'datetime', dateFormat: 'medium', timeFormat: 'short'});
                    var localIso = oj.IntlConverterUtils.dateToLocalIso(new Date(isoDate));
                    return converter.format(localIso);
                }
                catch (err)
                {
                    return isoDate;
                }
            };

            /**
            *
            * @param {type} isoDate    ISO date
            * @returns formatted date and time with milliseconds
            */
            self.displayDateTimeWithMilliseconds = function(isoDate)
            {
                var dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
                                                    .createConverter({formatType: 'date', dateFormat: 'medium'});
                return dateConverter.format(isoDate) + " " + self.displayTimeWithMilliseconds(isoDate, oj);
            };

           /**
            *
            * @param {type} isoDate    ISO date
            * @returns formatted date and time with milliseconds
            */
            self.displayTimeWithoutMilliseconds = function(isoDate)
            {
                // TODO:  this is still not quite localized because it specifies 12-hour time,
                // so when milliseconds are fully-supported by Jet we will switch over.
                var timeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
                                                    .createConverter({pattern: 'h:mm:ss a'});
                return timeConverter.format(isoDate);
            };

            // // this converter is for date and time
            // self.dateTimeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
            //         .createConverter({formatType: 'datetime', dateFormat: 'medium', timeFormat: 'short'});
            //
            // // this converter is for time only
            // self.timeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
            //         .createConverter({formatType: 'time', timeFormat: 'short'});
            //
            // // this converter is for date only
            // self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
            //         .createConverter({formatType: 'date', dateFormat: 'medium'});

            // Display the time range differently depending on what sinceDate and untilDate are
            self.getTimeRangeString = function( sinceDate, untilDate )
            {
                var theString;

                // sinceDate and untilDate are both same date, we show: {yesterday, today, or mm/dd/yy} hh:mm - hh:mm
                if ( self.areDatesSame ( sinceDate, untilDate ))
                {
                     theString = self.getDateString(sinceDate) + self.getTimeString(sinceDate) + " - " +  self.getTimeString(untilDate);
                }
                // sinceDate and untilDate are not the same, we show: {yesterday, today, or mm/dd/yy} hh:mm - {yesterday, today, or mm/dd/yy} hh:mm
                else
                {
                    theString = self.getDateTimeString(sinceDate) + " - " + self.getDateTimeString(untilDate);
                }

                return theString;
            };

            // Display the date with 'Today' or 'Yesterday' instead of date if they apply along with time
            self.getDateTimeString = function (date)
            {
                return self.getDateString(date) + self.getTimeString(date);
            };

            // Display the date with 'Today' or 'Yesterday' instead of date if they apply
            self.getDateString = function (date)
            {
                var theString;
                var today = new Date();
                var yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (self.areDatesSame(today, date))              // date is today, we show: Today hh:mm:ss
                {
                    theString = MessageUtils.getInstance().getTranslatedString('timeSelectorProperties.TODAY');
                }
                else if (self.areDatesSame(yesterday, date))     // date is yesterday, we show: Yesterday hh:mm:ss
                {
                    theString = MessageUtils.getInstance().getTranslatedString('timeSelectorProperties.YESTERDAY');
                }
                else                                        // date is neither, we show: mm/dd/yy hh:mm:ss
                {
                    theString = self.dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(date)) + " ";
                }
                return theString;
            };

            self.areDatesSame = function(date1, date2)
            {
                return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
            };

            self.getTimeString = function(date)
            {
                return self.timeConverter.format(oj.IntlConverterUtils.dateToLocalIso(date));
            };

            // standard way to display numbers (rounded to some number of decimal places or <1 for fraction)
            // if decimal places is not specified or is null, the default number of decimal places is used (2)
            // units is optional
            // if decimal places is explicitly specified, do not display "<1" for fraction
            self.displayNumber = function(number, decimalPlaces, displayUnits)
            {
                var displayedNumber;
                if (number === null || isNaN(number))
                {
                    return MessageUtils.getInstance().getTranslatedString('generalProperties.NONE');
                }

                if ((decimalPlaces === undefined || decimalPlaces === null) && number > 0 && number < 1)
                {
                    displayedNumber = "<1";
                }
                else
                {
                    if (decimalPlaces === undefined || decimalPlaces === null)
                    {
                        decimalPlaces = 2;
                    }

                    // rounded to at most 2 decimal places and thousands separator added for readability
                    //var num = new Number(number.toFixed(decimalPlaces));
                    //return num.toLocaleString({}, {minimumFractionDigits: decimalPlaces});

                    var options = { style: 'decimal', minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces };
                    displayedNumber = oj.Validation.converterFactory( "number" ).createConverter( options ).format( number );

                }

                if (displayUnits)
                {
                    return self.getUnitDisplay(displayedNumber, displayUnits);
                }

                return displayedNumber;
            };

            // This is called by dashboardRegion.html to get a number to display based on currently selected field in the
            // sort combobox.  It was doing an eval in html, but it seems that sometimes the sortField in that eval ends up
            // being an array not a string, so once in a while it was erroring out.  ap-9250 and ap-9243
            // there is also getSortFieldDisplayTime()
            self.getSortFieldDisplayNumber = function ( data, sortField, decimalPlaces, displayUnits )
            {
                var sortFieldData;

                if ( sortField instanceof String )
                    sortFieldData = sortField;
                else
                    sortFieldData = sortField[0];

                return self.displayNumber ( data[sortFieldData], decimalPlaces, displayUnits );
            };

            self.displayNumberInShortDesc = function(number, decimalPlaces)
            {
                var rounded = self.displayNumber(number, decimalPlaces);
                if (rounded.substring(0,1) === '<')
                {
                    rounded = "&lt;"+rounded.substring(1);
                }
                return rounded;
            };

            // when displaying <1 for data value, return actual number for hover, no hover for other numbers
            self.displayNumberHover = function(number)
            {
               if (isNaN(number))
                   return number;

               if (number > 0 && number < 1)
               {
                   return number;
               }
               else
               {
                   return '';
               }
            };

            self.displayBytes = function(bytes, decimalPlaces)
            {
                // SI standard (https://en.wikipedia.org/wiki/Binary_prefix)
                //
                var units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
                var base  = 1000;

                if ( bytes <= 0 )
                {
                    return "0 " + units[0];
                }

                var idx = Math.floor(Math.log(bytes)/Math.log(base));
                return self.displayNumber((bytes / Math.pow(base, idx)), decimalPlaces) + " " + units[idx];
            };

            self.displayDataRate = function(Bps, decimalPlaces)
            {
                // Just adds per second
                //
                return self.displayBytes(Bps, decimalPlaces) + "/s";
            };

            // if since/until are specified on the url, check if they are valid against our restrictions
            // can be called either by passing since/until, or it will use urlParams
            // return: false - not valid
            // return: true - ok/valid
            self.validateTimePeriod = function (since, until )
            {
                if ( since === null || since === undefined )
                    return false;
                if ( until === null || until === undefined )
                    return false;

                var logMsg = null;

                if (since !== undefined && until !== undefined)
                {
                    // check that since is before until so cannot be larger than until, and that they are not equal (AP-19327)
                    if ( since > until || since === until)
                    {
                        logMsg = "time ignored: since > until";
                        return false;
                    }

                    // check if either since or until outside of maxTimeBack
                    // If the previous time range in any part falls outside of the maxTimeBack, then we do not
                    // bother calling for data, the UI will show no-previous-period-data
                    var timeMaxBack = new Date().getTime() - window.apmManager.getMaxTimeBack();
                    if ( since <= timeMaxBack || until <= timeMaxBack )
                    {
                        logMsg = "time ignored: since || until <= timeMaxBack";
                        return false;
                    }

                    // checkk if time-window specified is larger than MAX_TIME_WINDOW + fudge
                    // the 'fudge' accounts for snapping of time, so if the user chose MAX_TIME_WINDOW in the timepicker, they'll
                    // end up with snapped time which is larger than MAX_TIME_WINDOW and could have been bookmarked, so we do not want to
                    // give errors for something we produced.
                    // todo: 'fudge' needs to be determined, for now doing 24hours
                    if ( until - since > MAX_TIME_WINDOW + 24*60*60*1000 )
                    {
                        logMsg = "time ignored: since - until > MAX_TIME_WINDOW";
                        return false;
                    }
                }

                return true;
            };

        }

    })();

    return DateTimeUtils;
});











