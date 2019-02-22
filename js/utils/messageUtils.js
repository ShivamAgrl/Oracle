//
// A singleton class that translates strings for pages used as components
// in other applications whose message file does not include APM messages
// 
// 

define(['ojs/ojcore',
    'knockout',
    'jquery'

],
function(oj, ko, $, nls )
{
    var MessageUtils = (function () 
    {
        var instance;

        function createInstance() {
            var object = new messageUtils();
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

        function messageUtils() 
        { 
            var self = this;
 
            self.getTranslatedString = function(propertyName)
            {
                var translatedString;
                if (propertyName.indexOf('.') > 0)
                    {    
                        var tokens = propertyName.split('.');
                        var categoryName = tokens[0];
                        var valueName = tokens[1];
                        var propTypes = nls[categoryName];
                        if (propTypes)
                        {
                            translatedString = propTypes[valueName];
                        }
                    }
                    else
                        translatedString = nls[propertyName];
                    
                if (arguments.length >1)
                {
                    var i=1;
                    while(i<arguments.length) {
                        translatedString=translatedString.replace("{"+(i-1)+"}",arguments[i++]);
                    }
                }
                return translatedString;
            };
            
        };

    })();

    return MessageUtils;
});   
        



