(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "service_code",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "service_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "description",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "metadata",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "type",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "group",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "Open311Feed",
        alias: "Data feed from Open311",
        columns: cols
    };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://mobile311-dev.sfgov.org/open311/v2/services.json", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "service_code": feat[i].id,
                "service_code": feat[i].properties.service_code,
                "service_name": feat[i].properties.service_name,
                "description": feat[i].properties.description,
                "metadata": feat[i].properties.metadata,
                "type": feat[i].properties.type,
                "group": feat[i].properties.group,
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Open311 Data";
        tableau.submit();
    });
});
})();