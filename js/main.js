/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
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
    'knockout',
    './viewModels/apmHeaderTitle',
    'text!../html/timePercentageWidget.html',
    'text!./views/apmHeaderTitle.html',
    'text!../html/requestSelfSnapshotRegionModel.html',
    'text!../html/requestInstanceErrorDetailsRegion.html',
    'ojs/ojknockout',
    'ojs/ojchart',
    'ojs/ojbutton',
    'ojs/ojtoolbar',
    'ojs/ojmenu',
    'ojs/ojselectcombobox',
    'ojs/ojconveyorbelt',
    'ojs/ojcollapsible',
    'ojs/ojtabs',
    'ojs/ojmodule',
    'ojs/ojrouter',
    'ojs/ojbutton',
    'ojs/ojconveyorbelt'
    ],

        function(oj, $, ko,ApmHeaderTitle ,timePercentageWidget, apmHeaderTitle, requestSelfSnapshotRegionModel, requestInstanceErrorDetailsRegion) // this callback gets executed when all required modules are loaded
        {
            // Retrieve the parent router from the parameters
            var self=this;
            self.ApmHeaderTitle =  ApmHeaderTitle.getInstance(); 
            oj.koStringTemplateEngine.install();
            ko.templates['timePercentageWidget']= timePercentageWidget;
            ko.templates['requestSelfSnapshotRegionModel']= requestSelfSnapshotRegionModel;
            ko.templates['requestInstanceErrorDetailsRegion']= requestInstanceErrorDetailsRegion;
            ko.templates['apmHeaderTitle']= apmHeaderTitle;
            var router = oj.Router.rootInstance;
            router.configure(
                {
                    'calltree':  { label:oj.Translations.getTranslatedString('instanceProperties.CALL_TREE'),  isDefault: true ,
                        value: {
                            path: 'callTree',
                            iconClass:"fa-list-alt"
                               }},
                    'Snapshot': { label:  oj.Translations.getTranslatedString('callStackProperties.SNAPSHOTS_TIMELINE'),
                        isDefault: false ,
                        value: {
                            label: oj.Translations.getTranslatedString('callStackProperties.SNAPSHOTS_TIMELINE'),
                            path : 'SnapshotTimeline',
                            iconClass:"fa fa-camera"}}
                                });  
             oj.Router.sync().then(function()
                {
                    ko.applyBindings({ router: router});
                });
        }
);


