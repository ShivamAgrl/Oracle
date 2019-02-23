/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
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
    'app',
    'knockout',
        'text!../html/collapse.html',
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
    ],

        function(oj, $, app, ko,collapse) // this callback gets executed when all required modules are loaded
        {
            // Retrieve the parent router from the parameters
            var self=this;
            oj.koStringTemplateEngine.install();
            ko.templates['collapse']= collapse;

            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

            // Retrieve the router static instance and configure the states

            var router = oj.Router.rootInstance;
            router.configure(
                {
                    'preface':  { label: 'Calltree',     value: {
                            path: 'callTree',
                            iconClass:'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
                        }, isDefault: true },
                    'chapter2': { label: 'Snapshot', value: {
                            path: 'snapshot',
                            iconClass:'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'}},

                });
            var viewModel =
                {
                    router: router
                };



            function FooterViewModel() {
                var self = this;

                var aboutOracle = 'http://www.oracle.com/us/corporate/index.html#menu-about';
                var contactUs = 'http://www.oracle.com/us/corporate/contact/index.html';
                var legalNotices = 'http://www.oracle.com/us/legal/index.html';
                var termsOfUse = 'http://www.oracle.com/us/legal/terms/index.html';
                var privacyRights = 'http://www.oracle.com/us/legal/privacy/index.html';

                self.ojVersion = ko.observable('v' + oj.version + ', rev: ' + oj.revision);

                self.footerLinks = ko.observableArray([
                    new FooterNavModel('About Oracle', 'aboutOracle', aboutOracle),
                    new FooterNavModel('Contact Us', 'contactUs', contactUs),
                    new FooterNavModel('Legal Notices', 'legalNotices', legalNotices),
                    new FooterNavModel('Terms Of Use', 'termsOfUse', termsOfUse),
                    new FooterNavModel('Your Privacy Rights', 'yourPrivacyRights', privacyRights)
                ]);

            }

            function FooterNavModel(name, id, linkTarget) {

                this.name = name;
                this.linkId = id;
                this.linkTarget = linkTarget;
            }


            function HeaderViewModel() {
                var self = this;

                //
                // Dropdown menu states
                //
                self.selectedMenuItem = ko.observable("(None selected yet)");

                self.menuItemSelect = function(event, ui) {
                    switch (ui.item.attr("id")) {
                        case "open":
                            this.selectedMenuItem(ui.item.children("a").text());
                            break;
                        default:
                            // this.selectedMenuItem(ui.item.children("a").text());
                    }
                };

                // Data for application name
                 var appName = {
                    "id": "qs",
                    "name": "JET QuickStart Component Interaction"
                };

                //
                // Toolbar buttons
                //
                var toolbarData = {
                    // user name in toolbar
                    "userName": "john.hancock@oracle.com",
                    "toolbar_buttons": [
                        {
                            "label": "toolbar_button1",
                            "iconClass": "demo-palette-icon-24",
                            "url": "#"
                        },
                        {
                            "label": "toolbar_button2",
                            "iconClass": "demo-gear-icon-16",
                            "url": "#"
                        }
                    ],
                    // Data for global nav dropdown menu embedded in toolbar.
                    "global_nav_dropdown_items": [
                        {"label": "preferences",
                            "url": "#"
                        },
                        {"label": "help",
                            "url": "#"
                        },
                        {"label": "about",
                            "url": "#"
                        },
                        {"label": "sign out",
                            "url": "#"
                        }
                    ]
                }

                self.appId = appName.id;
                self.appName = appName.name;

                self.userName = ko.observable(toolbarData.userName);
                self.toolbarButtons = toolbarData.toolbar_buttons;
                self.globalNavItems = toolbarData.global_nav_dropdown_items;

            }


            $(document).ready(function() {

               ko.applyBindings(new HeaderViewModel(),document.getElementById('headerWrapper'));
                   
                oj.Router.sync().then(function()
                {
                    ko.applyBindings(viewModel, document.getElementById('routing-container'));
                });
   ko.applyBindings(document.getElementById('headerdata'));
        });

        }
);


