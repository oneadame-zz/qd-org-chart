$(function() {
    $("input").on("click", function() {
        chart();
    });
    
    // Function for creating first object for each node definition
    function createNode(rec) {
        this.v = rec[0];
        this.f = rec[1];
    }
    
    // Processes pasted-in text, reformats, pushes into array for chart()
    function parseData() {
        var formattedData = [];
        var rows = $("textarea").val().split("\n");
        $(rows).each(function() {
            var me = this.split("\t");
            var recPropA = new createNode(me);
            var rec = [recPropA, me[3], ''];
            formattedData.push(rec);
        });
        return formattedData;
    }

    function chart() {
        var myData = parseData();

        google.charts.load('current', {
            packages: ["orgchart"]
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Manager');
            data.addColumn('string', 'ToolTip');

            // execute function and return output to addRows
            data.addRows(parseData());
            // Create the chart.
            var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
            // Draw the chart
            chart.draw(data, {
                allowHtml: true,
                allowCollapse: true,
                nodeClass: "orgchart-node",
            });
        }

    }

});
