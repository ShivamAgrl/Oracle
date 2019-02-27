/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
 var g_activeReportXmlData = "";
requirejs.config({
    // Path mappings for the logical module names
    paths: 
    //injector:mainReleasePaths
    {
        'knockout': 'libs/knockout/knockout-3.4.2',
        'jquery': 'libs/jquery/jquery-3.3.1.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1.min',
        'ojs': 'libs/oj/v5.1.0/min',
        'ojL10n': 'libs/oj/v5.1.0/ojL10n',
        'ojtranslations': 'libs/oj/v5.1.0/resources',
        'signals': 'libs/js-signals/signals.min',
        'text': 'libs/require/text',
        'promise': 'libs/es6-promise/es6-promise.min',
        'hammerjs': 'libs/hammer/hammer-2.0.8.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
        'customElements': 'libs/webcomponents/custom-elements.min'
    }
    //endinjector
    ,
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        }
    },
    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                'ojtranslations/nls/ojtranslations': 'resources/nls/main'
            }
        }
    }
});


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore',
    'jquery',
    'app',
    'knockout',
    'text!../html/collapse.html',
    'text!../html/timePercentageWidget.html',
    'text!../html/tableContextMenuRegion.html',
    'text!../html/requestSelfSnapshotRegionModel.html',
    'ojs/ojknockout',
    'ojs/ojchart',
    'ojs/ojbutton',
    'ojs/ojtoolbar',
    'ojs/ojmenu',
    'ojs/ojselectcombobox',
    'ojs/ojcollapsible',
    'ojs/ojtabs',
    'ojs/ojmodule',
    'ojs/ojrouter',
    'ojs/ojbutton',
    'ojs/ojconveyorbelt'
    ],

        function(oj, $, app, ko,collapse,timePercentageWidget,tableContextMenuRegion,requestSelfSnapshotRegionModel) // this callback gets executed when all required modules are loaded
        {
            // Retrieve the parent router from the parameters
            var self=this;
			//var g_activeReportXmlData = "";
			
function emxActiveReportMessageReceived(event)
{
    console.log("+++++ Message received::emxActiveReportMessageReceived!!! :: g_emMode: ");
    console.log(event);
	if(typeof event.data != "object")
	{
		if(event.data.indexOf("Fxtmodel") != -1)
		{
			console.log("+++++ Message received::emxActiveReportMessageReceived!!! in main");
			g_activeReportXmlData = event.data;
		}
	}
	
        //  Framework (either JET or omc) is posting other messages with event.data set to an object {id: 1, message: "oj-setImmeidate"}. 
        //  This will override the value of g_activeReportXmlData with the active report xml. Hence put additional checks
        //  window.DBCSPERF_APP_MODE = "ACTIVE_REPORT" always in active report mode and hence will not suffice
        // if (event.data && (event.data.indexOf("<report") !== -1)) {  //DOES'NT work, since event.data may not be a string always.
}

if (typeof window.addEventListener !== 'undefined')
{
    console.log("+++++ activeReportInit.js: window.addEventListener: ");
    window.addEventListener("message", emxActiveReportMessageReceived, false);
} else if (typeof window.attachEvent !== 'undefined')
{
    console.log("+++++ activeReportInit.js: window.attachEvent: ");
    window.attachEvent("onmessage", emxActiveReportMessageReceived);
}
            oj.koStringTemplateEngine.install();
            ko.templates['collapse']= collapse;
            ko.templates['timePercentageWidget']= timePercentageWidget;
            ko.templates['tableContextMenuRegion']= tableContextMenuRegion;
            ko.templates['requestSelfSnapshotRegionModel']= requestSelfSnapshotRegionModel;

          oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

            // Retrieve the router static instance and configure the states

            var router = oj.Router.rootInstance;
            router.configure(
                {
                    'calltree':  { label: 'CallTree',     value: {
                            path: 'callTree',
                            iconClass:'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
                        }, isDefault: true },
                    'Snapshot': { label: 'Snapshot', value: {
                            path: 'snapshot',
                            iconClass:'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'}}

                });
            var viewModel =
                {
                    router: router
                };
   oj.Router.sync().then(function()
                {
                    ko.applyBindings(viewModel, document.getElementById('routing-container'));
                });
           var viewModel2 =
                {
                   
                };



            $(document).ready(function() {
   ko.applyBindings(viewModel2, document.getElementById('headerdata'));
        });

        }
);


