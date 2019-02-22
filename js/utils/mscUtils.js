//
// A singleton class that for miscellenous utilities
// 

define(['ojs/ojcore',
    'knockout',
    'jquery'
],
function(oj, ko, $)
{
    var MscUtils = (function () 
    {
        var instance;

        function createInstance() {
            var object = new mscUtils();
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

        function mscUtils() 
        { 
            var self = this;
            
            // Called when getting a list of objects, and didn't get any object
            // to check if there are any agents installed, so that can give the user
            // most appropriate message why they are not seeing any data
            // NOTE: the call is done synchronously.  The call is small and fast and the
            // 'no data' situation is waiting to display and we do not want to flash one
            // message just to replace it with another
            self.checkAgents = function()
            {
                //check if there is any real agents
                var agentLink = REST_API_URL+REST_API_VERSION+'/agents?limit=5';
                var gotAgents = false; // assume no agents

                window.apmManager.ajaxUtil.ajaxGetWithRetry( agentLink, function(data)
                {
                    // check to see if we got any agents
                    if (data.items && data.items.length > 0)
                    {                 
                        // Got some, return true.
                        gotAgents = true;   
                    }
                    
                }, window.apmManager.ajaxUtilSyncAjaxOptions)// NOTE: we are doing this one sync, since list is waiting
                // getting agents failed
                // The ajax REST request failed
                .fail (function (jqXHR, textStatus, errorThrown)
                {
                    // Set the error 
                    window.apmManager.errorManager.setRestError(jqXHR.url, jqXHR, textStatus, errorThrown );
                    return false;
                })
                // .done executes when request is done, but NOT when .fail
                .done (function (data, textStatus, jqXHR)
                {
                    // we are here, call succeeded, clear any errors associated with this url
                    window.apmManager.errorManager.clearRestError(jqXHR.url);
                });
                
                return gotAgents;
            };
            
            /**
            * Creates unique element id within the document.
            */
            self.uniqueID = {
              counter:0,
              get:function(prefix) {
                    if(!prefix) {
                            prefix = "uid";
                    }
                    var id =  prefix+""+self.uniqueID.counter++;
                    if(jQuery("#"+id).length === 0)
                        return id;
                    else
                        return self.uniqueID.get();
                } 
            };
           
            // REST returns appServerType, however the appServerType string can vary, it can be "Weblogic" vs. "WebLogic Server", etc.,
            // Also, the less-precise matchup is because in theory the server type, as returned by the real agent, could also change.
            // So, we look for 'contains' all in lowercase to match up.
            // So here we iterate on the APPSERVER_TYPE_ARRAY to find what type it is
            // Used by commonListModel.js and commonSummaryModel.js
            self.getAppserverType = function( appServerTypeFromJson )
            {
                for ( var i = 0; i < APPSERVER_TYPE_ARRAY.length; i++ )
                {
                    var appServerType = APPSERVER_TYPE_ARRAY[i];
                    if ( appServerTypeFromJson.toLowerCase().indexOf(appServerType.toLowerCase()) !== -1 )
                        return appServerType;
                }

                // didn't match anything
                return APPSERVER_TYPE_UNKNOWN;
            };
            
            self.showLoadingIndicator = function()
            {
                $("#loading").show();
            };

            self.hideLoadingIndicator = function()
            {
                $("#loading").hide();
            };

            self.isObject = function(x) 
            {
                return Object.prototype.toString.call(x) === '[object Object]';
            };

            self.isFunction = function(x) 
            {
                return Object.prototype.toString.call(x) === '[object Function]';
            };
            
            self.truncateLongName = function(longname, max_length)
            {
                if (!max_length)
                    max_length = 40;
                if (longname && (longname.length > max_length))
                {
                    return longname.substring(0, max_length/2)+"..."+longname.substring(longname.length-max_length/2);
                }
                return longname;
            };
            
            self.formatContextString = function( attr1, attr2, page )
            {
                /**
                 * <span data-bind="text: attr1 + ' &#187; ' + page + ' &#187; ' + attr2,
                 */
                var retval = "";
                var NA = oj.Translations.getTranslatedString('generalProperties.NOT_APPLICABLE');
                //var SEP = ' » ';
                var SEP = ' \273 ';

                if (attr2 !== NA) retval = attr2;
                if (retval !== "") retval = page + SEP + retval;
                else if (page !== NA) retval = page;
                if (retval !== "") retval = attr1 + SEP + retval;
                else retval = attr1;

                return retval;
            };
            
            //this function is here because it is used in a few different pages
            self.showAppserverDetail = function(data)
            {
                //Depending on where this is called the data object may not be the currentObject but its parent instead
                var displayedObject;
                if (data.currentObject)
                    displayedObject = data.currentObject;
                else
                    displayedObject = data;

                var appserverLink = getLinkHrefByName(displayedObject, VALUE_LINK_APPSERVER_DETAILS);
                if (appserverLink === null)
                    appserverLink = getLinkHrefByName(displayedObject, VALUE_LINK_SELF);    // for request appserver tile link
                window.apmManager.navigatorManager.navigateToPage([ {name: PARAM_INSTANCE_ID}], [{name: PARAM_APPSERVER_ID, value: appserverLink}], VALUE_PAGE_SERVERDETAIL);
            }
        };
                                                                                    
    })();

    return MscUtils;
});   
        



