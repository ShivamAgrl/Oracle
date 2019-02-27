//
// A singleton class that for miscellenous utilities
// 

define(['ojs/ojcore',
    'knockout',
    'jquery',
    'utils/apmConstants'
    ],
function(oj, ko, $,  ApmConstants)
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
            self.apmConstants = ApmConstants.getInstance();
          
             self.getAppserverType = function( appServerTypeFromJson )
            {
                for ( var i = 0; i < self.apmConstants.APPSERVER_TYPE_ARRAY.length; i++ )
                {
                    var appServerType = self.apmConstants.APPSERVER_TYPE_ARRAY[i];
                    if ( appServerTypeFromJson.toLowerCase().indexOf(appServerType.toLowerCase()) !== -1 )
                        return appServerType;
                }

                // didn't match anything
                return self.apmConstants.appserverType.UNKNOWN;
            };
            
            // Called when getting a list of objects, and didn't get any object
            // to check if there are any agents installed, so that can give the user
            // most appropriate message why they are not seeing any data
            // NOTE: the call is done synchronously.  The call is small and fast and the
            // 'no data' situation is waiting to display and we do not want to flash one
            // message just to replace it with another
       
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
            
            self.apmUiLog = function (message, consoleOnly) 
            {
                console.log(message);
                if (!consoleOnly) {
                    //log using ojLogger, during LRG run, log message will be send to server
                    //and stored in /var/opt/ORCLemaas/logs/dashboardsService/dashboardsApiService.log
                    oj.Logger.warn(message);
                }
            };
            
        };
                                                                                    
    })();

    return MscUtils;
});   
        



