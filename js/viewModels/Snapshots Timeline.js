/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * snpashot module
 */
define(['ojs/ojcore', 
    'knockout',
    'jquery',
    'viewModels/callTree',
    'ojs/ojknockout',
    'ojs/ojtable',
    'ojs/ojrowexpander',
    'ojs/ojbutton',
    'ojs/ojdialog',
    'ojs/ojarraytabledatasource',
    'ojs/ojjsontreedatasource'
], function (oj, ko,$,callTree) {
    /**
     * The view model for the main content view template
     */
    function snapshot() {
        var self = this;
        self.mainModel = new callTree();
        console.log( self.mainModel);
        self.mainModel.snapshotDataCompute();



        //
        // refreshCallStackData();

    }

    return snapshot;
});