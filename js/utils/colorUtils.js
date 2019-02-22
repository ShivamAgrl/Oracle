/*
 * Copyright (c) 2018 Oracle and/or its affiliates.
 * All rights reserved. Use is subject to license terms.
 *
 * A singelton class with common functions for color palettes used in charts and other DVT components.
 */

define(['ojs/ojcore',
    'jquery'
],
function(oj, $)
{
    var ColorUtils = (function () 
    {
        var instance;


        function createInstance() {
            var object = new colorUtils();
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

        function colorUtils() 
        { 
            var self = this;
            self.neutralColorHandler;

            self.getNeutralColorHandler = function(oj)
            {
                if (!self.neutralColorHandler)
                {
                    self.neutralColorHandler = new oj.ColorAttributeGroupHandler();
                    self.neutralColorHandler.addMatchRule('1st', '#E6F2F6');
                    self.neutralColorHandler.addMatchRule('2nd', '#B2CAD6');
                    self.neutralColorHandler.addMatchRule('3rd', '#7FA3B7');
                    self.neutralColorHandler.addMatchRule('4th', '#4C7B97');
                    self.neutralColorHandler.addMatchRule('5th', '#195478');
                }
                return self.neutralColorHandler;
            };

            self.errorColorHandler;

            self.getErrorColorHandler = function(oj)
            {
                if (!self.errorColorHandler)
                {
                    self.errorColorHandler = new oj.ColorAttributeGroupHandler();
                    self.errorColorHandler.addMatchRule('1st', '#FDF3F3');
                    self.errorColorHandler.addMatchRule('2nd', '#F0AEAD');
                    self.errorColorHandler.addMatchRule('3rd', '#E4706D');
                    self.errorColorHandler.addMatchRule('4th', '#D83A33');
                    self.errorColorHandler.addMatchRule('5th', '#CC0A00');
                }
                return self.errorColorHandler;
            };

            self.colorPalette;

            self.getColorHandler = function(oj)
            {
                var colorList = self.getPalette(oj);

                return new oj.ColorAttributeGroupHandler(colorList); 
            };

            self.getPalette = function()
            {
                if (!self.colorPalette)
                {    
                    self.colorPalette  = new Object(
                                        {"color0":  "#007dad",
                                         "color1":  "#02dfdb",
                                         "color2":  "#ffb045",
                                         "color3":  "#f767a7",
                                         "color4":  "#00c0ee",
                                         "color5":  "#8b5fc2",
                                         "color6":  "#e3e153"});
                }
                return self.colorPalette;
            };

            self.AltaColorPalette = ["#83CDDE", "#FFB54D", "#E371B2", "#309FDB", "#47BDEF", "#8561C8", "#F7F37B", "#ED813E",
                                                "#13B6CF", "#E85D88"];
            self.getAltaColor = function(index)
            {
                return self.AltaColorPalette[index % 10];
            };
        }                       
    })();

    return ColorUtils;
});   

            


