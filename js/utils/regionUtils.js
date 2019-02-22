//
// A singleton class with common functions for regions (tiles, charts and series)
// 

define(['ojs/ojcore',
    'knockout',
    'jquery',
    '../utils/mscUtils'
],
function(oj, ko, $, MscUtils)
{
    var RegionUtils = (function () 
    {
        var instance;


        function createInstance() {
            var object = new regionUtils();
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

        function regionUtils() 
        { 
            var self = this;
            
            // Called by commonTabRegion, commonSummaryRegion, and commonSummaryModel to determine whether to show a tile, chart, or series of chart depending on subtype or given function.
            // 
            // showCondition parameter is an object specified in objectType definition at the top of commonSummaryModel with only one of the first 4 following attributes:
            //      showForSubtypes: (optional) array of subtype string(s) for object type to show this region
            //      hideForSubtypes: (optional) array of subtype string(s) for object type to hide this region
            //      ifFunction: (optional) function to call which returns true/false for whether to show/hide the region, respectively
            //      ifNotFunction: (optional) function to call which returns true/false for whether to hide/show the region, respectively
            //      deepestLinkNeeded: (optionally used with ifFunction or ifNotFunction) deepest link of links tree of object type that contains attribute that function needs to check
            //      
            // dataForObjectTypeLink parameter is observable that points to data for the object type's link
            // subtypeAttr parameter is name of attribute of data whose value is subtype
            // dataForDeepestLinkNeeded parameter (optional) is observable that points to data for the deepest link of links tree of object type that contains attribute that function needs to check
            self.showRegion = function(showCondition, dataForObjectTypeLink, subtypeAttr, dataForDeepestLinkNeeded)
            {
                if (showCondition)
                {
                    if (dataForObjectTypeLink && dataForObjectTypeLink())
                    {
                        // object type link data (usually the self link) is now available to check
                        if (showCondition.showForSubtypes || showCondition.hideForSubtypes)
                        {
                            var subType;
                            if (subtypeAttr)
                            {
                                subType = dataForObjectTypeLink()[subtypeAttr];
                                if (subtypeAttr === 'appServerType')
                                {
                                    // for appserver types we need to canonicalize the type
                                    subType = MscUtils.getInstance().getAppserverType(subType);
                                }
                            }

                            if (showCondition.showForSubtypes)
                            {                        
                                // if the default is invisible, only show if subtype is in the showFor list
                                return (showCondition.showForSubtypes.indexOf(subType) >= 0);
                            }
                            else if (showCondition.hideForSubtypes)
                            {
                                // if the default is visible, only show if subtype is not in the hideFor list
                                return (showCondition.hideForSubtypes.indexOf(subType) < 0);
                            }
                        }
                        else if (showCondition.ifFunction)
                        {
                            if (!dataForDeepestLinkNeeded || dataForDeepestLinkNeeded())
                            {
                                // ifFunction just needs object type link data or
                                // wait to call the ifFunction until the data for the deepest link it needs is available to check
                                return showCondition.ifFunction();
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else if (showCondition.ifNotFunction)
                        {
                            if (!dataForDeepestLinkNeeded || dataForDeepestLinkNeeded())
                            {
                                // ifNotFunction just needs object type link data or
                                // wait to call the ifNotFunction until the data for the deepest link it needs is available to check
                                return !showCondition.ifNotFunction();
                            }
                            else
                            {
                                return false;
                            }
                        }
                    }
                    else
                    {
                        return false;   // tile/chart/series is not shown until we have the query data to determine the subtype
                    }
                }
                else
                {
                    return true;    // tile/chart/series is shown by default if showCondition is not specified
                }
            };
        }
    })();

    return RegionUtils;
});   



