define(['ojs/ojcore'
       ,'knockout'
       ,'jquery'
       ,'utils/apmConstants'
       ,'ojs/ojdialog'
       ,'ojs/ojpopup'
],
function(oj, ko, $, ApmConstants) 
{
    var ApmHeaderTitleModel = (function()
    {
        var instance;

        function createInstance() {
            var object = new apmHeaderTitleModel();
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

        function apmHeaderTitleModel() 
        { 
            var self = this;

            var SINGLE_FLOW_LONG_KEY = 'singleFlowLongKey';

            self.apmConstants = ApmConstants.getInstance();
           
       
            self.pageHeader = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
            self.idSuffix = ko.observable('');
            self.singleFlowLongKey = ko.observable();
            self.hasCurrentObject = ko.observable(false);
            self.title1 = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
            self.showTitle1Label = ko.observable(false);
            self.title1Label = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
            self.title1ClickFunction = ko.observable(null);
            self.showTitle1Link = ko.observable(false);
            self.entityType = ko.observable();
            self.subtype = ko.observable(null);
            self.showColumn2 = ko.observable(false);
            self.showColumn3 = ko.observable(false);
            self.pageIcon = ko.observable(null);

            self.attr1 = ko.observable('');
            self.attr2 = ko.observable('');
            self.dialogInfoData = ko.observable(null);
            self.requestId = "";
            self.instanceId = "";

            self.initTitles = function(data, idPrefix)
            {
                data.idPrefix = idPrefix;
                data.labelSmWidth = ko.observable(2);
                data.labelMdWidth = ko.observable(2);
                data.labelLgWidth = ko.observable(2);
                data.title2ClickFunction = ko.observable(null);
                data.showTitle2Link = ko.observable(false);
                data.title2 = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title2Label = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title3ClickFunction = ko.observable(null);
                data.showTitle3Link = ko.observable(false);
                data.title3 = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title3Label = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title4ClickFunction = ko.observable(null);
                data.showTitle4Link = ko.observable(false);
                data.title4 = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title4Label = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title5ClickFunction = ko.observable(null);
                data.showTitle5Link = ko.observable(false);
                data.title5 = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.title5Label = ko.observable(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.showTitle2 = ko.observable(false);
                data.showTitle3 = ko.observable(false);
                data.showTitle4 = ko.observable(false);
                data.showTitle5 = ko.observable(false);
                data.showAttrsTitle2 = ko.observable(false);
                data.showAttrsTitle3 = ko.observable(false);
                data.showAttrsTitle4 = ko.observable(false);
                data.showAttrsTitle5 = ko.observable(false);
            };
            self.initTitles(self, '');

            // Called by "pages" to indicate what in the header should be shown
            // Parameter is a set of properties that include:
            // pageIcon:            icon used on detail pages to indicate the type
            // pageHeader:          main title used for the detail page, typically the entity type
            // subtype:             subtype of entity type (what used to be shown as Type for server request and appserver)
            // idSuffix             unique suffix appended to page header element ID in order for tests to indentify the page.
            // title1ClickFunction: anchor click function if secondary page links to another page
            // title1Label:         label for main title, added 5/8/15
            // title1:              identifying name for the detail page
            // labelSmWidth:        label column width between 1 and 12 for small width (as in oj-sm-n). Defaults to 2
            // labelMdWidth:        label column width between 1 and 12 for medium width (as in oj-md-n). Defaults to 2
            // labelLgWidth:        label column width between 1 and 12 for large width (as in oj-lg-n). Defaults to 2
            // title2ClickFunction: anchor click function if secondary page links to another page for 2nd value
            // title2Label:         label for secondary title field
            // title2:              value for secondary title
            // title3ClickFunction: anchor click function if secondary page links to another page for 3rd value
            // title3Label:         label for third title field
            // title3:              value for third title
            // title4ClickFunction: anchor click function if secondary page links to another page for 4th value
            // title4Label:         label for fourth title field
            // title4:              value for fourth title
            // title5ClickFunction: anchor click function if secondary page links to another page for 5th value
            // title5Label:         label for fifth title field
            // title5:              value for fifth title
            // column2:             optional second column with fields:
            //      labelSmWidth:        label column width between 1 and 12 for small width (as in oj-sm-n). Defaults to 2
            //      labelMdWidth:        label column width between 1 and 12 for medium width (as in oj-md-n). Defaults to 2
            //      labelLgWidth:        label column width between 1 and 12 for large width (as in oj-lg-n). Defaults to 2
            //      title2ClickFunction: anchor click function if secondary page links to another page for 2nd value
            //      title2Label:         label for secondary title field
            //      title2:              value for secondary title
            //      title3ClickFunction: anchor click function if secondary page links to another page
            //      title3Label:         label for third title field
            //      title3:              value for third title
            //      title4ClickFunction: anchor click function if secondary page links to another page for 4th value
            //      title4Label:         label for fourth title field
            //      title4:              value for fourth title
            //      title5ClickFunction: anchor click function if secondary page links to another page for 5th value
            //      title5Label:         label for fifth title field
            //      title5:              value for fifth title
            // column3:             optional third column with fields:
            //      labelSmWidth:        label column width between 1 and 12 for small width (as in oj-sm-n). Defaults to 2
            //      labelMdWidth:        label column width between 1 and 12 for medium width (as in oj-md-n). Defaults to 2
            //      labelLgWidth:        label column width between 1 and 12 for large width (as in oj-lg-n). Defaults to 2
            //      title2ClickFunction: anchor click function if secondary page links to another page for 2nd value
            //      title2Label:         label for secondary title field
            //      title2:              value for secondary title
            //      title3ClickFunction: anchor click function if secondary page links to another page
            //      title3Label:         label for third title field
            //      title3:              value for third title
            //      title4ClickFunction: anchor click function if secondary page links to another page for 4th value
            //      title4Label:         label for fourth title field
            //      title4:              value for fourth title
            //      title5ClickFunction: anchor click function if secondary page links to another page for 5th value
            //      title5Label:         label for fifth title field
            //      title5:              value for fifth title
            // showLALink:          URL to Log Analytic 
            // self.showThreadProfiler Link to Thread Profiler
            self.setupApmHeader = function( headerSettings )
            {
                self.pageIcon(null); //this will be set later if there is a value
                var mainTitle;
                if (!headerSettings || !headerSettings.pageHeader)
                    mainTitle = oj.Translations.getTranslatedString('headerProperties.NO_TITLE');
                else
                    mainTitle = headerSettings.pageHeader;



                self.pageHeader(mainTitle);
                if (headerSettings && headerSettings.idSuffix)
                    self.idSuffix(headerSettings.idSuffix);
                // singleFlowLongKey is stored in urlParams so that when chaning time picker, we can
                // keep showing the same execution flow.

                self.hasCurrentObject(headerSettings && headerSettings.title1);

                if (headerSettings && headerSettings.title1) {
                    self.title1(headerSettings.title1);
                }else
                    self.title1(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));

                if (headerSettings && headerSettings.subtype && headerSettings.subtype.length > 0)
                    self.subtype(headerSettings.subtype);
                else
                    self.subtype(null);

                self.entityType(self.pageHeader()+(self.subtype() && self.subtype().length > 0 ? ' - '+self.subtype() : ''));

                self.title1Label(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                if (headerSettings && headerSettings.title1Label)
                    self.title1Label(headerSettings.title1Label);

                if (headerSettings && headerSettings.attr1)
                    self.attr1(headerSettings.attr1);

                if (headerSettings && headerSettings.attr2)
                    self.attr2(headerSettings.attr2);

                if (headerSettings && headerSettings.title1ClickFunction)
                {
                    self.title1ClickFunction = headerSettings.title1ClickFunction;
                    self.showTitle1Link(true);
                }
                else
                    self.showTitle1Link(false);
                
                if (headerSettings && headerSettings.dialogData) {
                    self.dialogInfoData(headerSettings.dialogData);
                }else 
                    self.dialogInfoData(null);

           
                self.showTitle1Label(headerSettings && headerSettings.title1Label && headerSettings.title1Label.length > 0);

                if (headerSettings && headerSettings.title2)
                {
                    self.setTitlesFromSettings(headerSettings, self);
                    if (headerSettings.column2)
                    {
                        var col2 = new Object();
                        self.initTitles(col2, 'col2_');
                        self.setTitlesFromSettings(headerSettings.column2, col2);
                        self.column2 = ko.observable(col2);
                        self.showColumn2(true);
                        if (headerSettings.column3)
                        {
                            var col3 = new Object();
                            self.initTitles(col3, 'col3_');
                            self.setTitlesFromSettings(headerSettings.column3, col3);
                            self.column3 = ko.observable(col3);
                            self.showColumn3(true);
                        }
                        else
                        {
                            self.showColumn3(false);
                        }
                    }
                    else
                    {
                        self.showColumn2(false);
                    }
                }

                if (headerSettings)
                {   
                    self.setApmHeaderIcon ( headerSettings.pageIcon );
                 //   window.apmManager.setShowTimeSelector(!headerSettings.hideTimeSelector);
                }
            };

            self.setTitlesFromSettings = function(settings, data)
            {
                data.showTitle2(false);
                data.title2(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.showTitle3(false);
                data.title3(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.showTitle4(false);
                data.title4(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));
                data.showTitle5(false);
                data.title5(oj.Translations.getTranslatedString('headerProperties.NO_TITLE'));

                if (settings.labelSmWidth)
                    data.labelSmWidth(settings.labelSmWidth);
                else
                    data.labelSmWidth(2);

                if (settings.labelMdWidth)
                    data.labelMdWidth(settings.labelMdWidth);
                else
                    data.labelMdWidth(data.labelSmWidth());

                if (settings.labelLgWidth)
                    data.labelLgWidth(settings.labelLgWidth);
                else
                    data.labelLgWidth(data.labelMdWidth());

                if (settings.title2Label)
                    data.title2Label(settings.title2Label);
                data.title2(settings.title2);
                data.showTitle2(true);

                if (settings.showAttrsTitle2)
                {
                    data.showAttrsTitle2(settings.showAttrsTitle2);
                }
                else
                {
                    data.showAttrsTitle2(false);
                }

                if (settings.showAttrsTitle3)
                {
                    data.showAttrsTitle3(settings.showAttrsTitle3);
                }
                else
                {
                    data.showAttrsTitle3(false);
                }

                if (settings.showAttrsTitle4)
                {
                    data.showAttrsTitle4(settings.showAttrsTitle4);
                }
                else
                {
                    data.showAttrsTitle4(false);
                }

                if (settings.showAttrsTitle5)
                {
                    data.showAttrsTitle5(settings.showAttrsTitle5);
                }
                else
                {
                    data.showAttrsTitle5(false);
                }

                if (settings.title2ClickFunction)
                {
                    data.title2ClickFunction = settings.title2ClickFunction;
                    data.showTitle2Link(true);
                }
                else
                    data.showTitle2Link(false);

                if (settings.title3ClickFunction)
                {
                    data.title3ClickFunction = settings.title3ClickFunction;
                    data.showTitle3Link(true);
                }
                else
                    data.showTitle3Link(false);

                if (settings.title4ClickFunction)
                {
                    data.title4ClickFunction = settings.title4ClickFunction;
                    data.showTitle4Link(true);
                }
                else
                    data.showTitle4Link(false);

                if (settings.title5ClickFunction)
                {
                    data.title5ClickFunction = settings.title5ClickFunction;
                    data.showTitle5Link(true);
                }
                else
                    data.showTitle5Link(false);

                if (settings.title3)
                {
                    data.title3(settings.title3);
                    data.title3Label(settings.title3Label);
                    data.showTitle3(true);
                    if (settings.title4)
                    {
                        data.title4(settings.title4);
                        data.title4Label(settings.title4Label);
                        data.showTitle4(true);
                        if (settings.title5)
                        {
                            data.title5(settings.title5);
                            data.title5Label(settings.title5Label);
                            data.showTitle5(true);
                        }
                    }
                    else
                    {
                        data.showTitle4(false);
                    }
                }
            };

            // Some pages, like Instance Details or Ajax Details, want their own icons
            self.setApmHeaderIcon = function ( pageIcon )
            {
                if (pageIcon)
                {
                    self.pageIcon(pageIcon);
                    //self.pageIconAlt(pageIcon.alt);
                }
                else
                {    
                    self.pageIcon(null);
                    //self.pageIconAlt(null);
                }
            };
        }   
    })();
    
    return ApmHeaderTitleModel;
});
