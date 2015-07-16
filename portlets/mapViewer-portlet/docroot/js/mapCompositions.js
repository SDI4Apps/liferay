var compositionBrowser = {
    catClientURL: "/php/catalogue/libs/cswclient/cswClientRun.php"
};

/**
 * get current user    - to overwrite
 * @function
 */
compositionBrowser.getUser = function(){
    if(getLRUser) return getLRUser();
    return "";
}

/**
 * Init catalogue client composition
 * @function
 */
var initCatClientCompositions = function() {

    var bodyRenderer = function(record, rowIndex, p, store){
        var s = record.data.abstract
        if(!record.data.imgURL) record.data.imgURL = '/php/wmc/resources/imgs/blank.png';
            s = '<div style="padding: 3px; height: 50px; color:#909050; padding-left:60px; background: url('+record.data.imgURL+') 5px 0px no-repeat">' + s + "</div>";

        return s;
    }

    //--- INSPIRE themes store ---
        var xmlRecordDef = Ext.data.Record.create([
        {name: 'name', mapping: '@name'},
        {name: 'label', mapping: '/'}
        ]);

     var themesReader = new Ext.data.XmlReader({
     record: "specifications/value"
         }, xmlRecordDef);

     var themesStore = new Ext.data.Store({
        url: '/php/wmc/xsl/codelists_'+HS.getLang()+'.xml',
        reader: themesReader,
        autoload: true
     });

    compositionBrowser.compositionForm = new Ext.FormPanel({
        layout:'form',
        region: 'north',
        frame: true,
        labelAlign: 'top',
        height: 130,
        title: HS.i18n('Predefined Maps'),
        items:[{
            name: 'theme',
            xtype: 'combo',
            anchor:'100%',
            fieldLabel: HS.i18n('INSPIRE theme'),
            hideParent: true,
            displayField:'label',
            valueField: 'label',
            hiddenName: 'inspireTheme',
            typeAhead: true,
            store: themesStore,
            triggerAction: 'all',
            forceSelection: true,
            editable: false,
            listeners: {'select': compositionRefresh}
        },{
            xtype: 'radiogroup',
            fieldLabel: HS.i18n('Author filtering'),
            listeners: {'change': compositionRefresh},
            items: [
                {boxLabel: HS.i18n('Predefined'), name: 'author', inputValue:'offi', checked: true},
                {boxLabel: HS.i18n('Mine'), name: 'author', inputValue:'mine'},
                {boxLabel: HS.i18n('All'), name: 'author', inputValue:'all'}
            ]
        }]
    });

    var url = compositionBrowser.catClientURL;
    if (url.search("http://") === 0 && OpenLayers.ProxyHost) {
        url = OpenLayers.ProxyHost+escape(url);
    }

    compositionBrowser.compositionClient = new CatClientResult({
        title: OpenLayers.i18n("Map compositions"),
        serviceName: compositionBrowser.serviceName,
        url: url,
        forceLayout:true,
        showPreview: false,
        onRowSelect: showComposition,
        bodyRenderer: bodyRenderer
    });

    var compositionPanel = new Ext.Panel({
        title: OpenLayers.i18n("Maps"),
        forceLayout:true,
        region: 'center',
        layout: 'border',
        id: 'compositionPanel',
        items: [
            compositionBrowser.compositionForm,
            compositionBrowser.compositionClient
        ]
    });

    geoportal.toolsPanel.insert(2, compositionPanel);
    compositionBrowser.compositionForm.on("afterrender", compositionRefresh, this);
};

// query to catalogue
var compositionRefresh = function(){
    if (compositionBrowser.compositionForm.getForm()) {
        var values = compositionBrowser.compositionForm.getForm().getValues();
        if(!values.author) values.author='offi'; // quick hack
        var q = "type='application' AND linkage like '*wmc'";

        if(values.party) {
            q += " AND OrganisationName like '*" + values.party + "*'";
        }

        if(values.inspireTheme && values.inspireTheme.substring(0,3)!='---') {
            q += " AND subject='"+values.inspireTheme+"'";
        }

        if(values.author=='mine') {
            var user = compositionBrowser.getUser();
            if(user){
                q += " AND creator='"+user+"'";
            }
        }

        compositionBrowser.compositionClient.search(q, {sortBy:'title'});
    }
};

// request for stored WMC
var showComposition = function(sm, idx, r){
    Ext.MessageBox.show({
        title: HS.i18n('Create new map')+' ?',
                msg: OpenLayers.i18n("Overwrite current map content with new map composition?"),
                buttons: {"yes":OpenLayers.i18n("Overwrite map"),"no":OpenLayers.i18n("Add to map"),"cancel":true},
        fn: function (b){
            switch(b) {
                case "cancel":
                    return false;
                    break;
                case "yes":
                    geoportal.newContext();
                    geoportal.overwriteLocalMapContext = {
                                            newLayers: true,
                                            oldLayers: true,
                                            extent:false,
                                            title:true,
                                            context:true,
                                            removeLayers: true,
                                            mapProjection: true
                                        };
                    OpenLayers.loadURL(
                        r.data.link,
                        {},
                        {geoportal:geoportal,uuid:r.data.id},  // scope
                        function(r){
                            this.geoportal.parseWMC(r);
                            this.geoportal.wmcManager.setUUID(this.uuid); //TODO spise by melo byt az se uspesne nacte
                        }
                    );
                    break;
                case "no":
                    geoportal.overwriteLocalMapContext = {newLayers:true};
                    OpenLayers.loadURL(
                        r.data.link,
                        {},
                        geoportal,
                        geoportal.parseWMC
                    );
                    break;
            }
        },
        icon: Ext.MessageBox.QUESTION
    });
};

HS.Lang.cze['Predefined Maps']='Předdefinované mapy';
HS.Lang.cze['Show my maps only']='Ukázat pouze moje mapy';
HS.Lang.cze['INSPIRE theme']='Téma INSPIRE';
HS.Lang.cze['Mine']='Moje';
HS.Lang.cze['All']='Vše';
HS.Lang.cze['Predefined']='Výchozí';
HS.Lang.cze['Author filtering']='Výběr podle autora';
HS.Lang.cze['Create new map']='Vytvořit novou mapu';
HS.Lang.cze['wmcConfirmMap']='Stisknutím [Ano] přepíšete existující mapu, stisknutím [Ne] přidáte k existující mapě.';
HS.Lang.eng['wmcConfirmMap']='Press [Yes] to overwrite existing map, [No] to add layers to existing map.';
