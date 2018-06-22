$(function() {
    $("input").on("click", function() {
        chart();
    });

    function createNode(rec) {
        this.v = rec[0];
        this.f = rec[1];
        //  this.title = rec[2];
        //  this.pid   = rec[3];
    }

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

            emp1 = [{
                v: '0001',
                f: 'John Doe<br>Title'
            }, '', ''];

            // For each orgchart box, provide the name, manager, and tooltip to show.
            data.addRows(parseData());
            // Create the chart.
            var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
            // Draw the chart, setting the allowHtml option to true for the tooltips.
            chart.draw(data, {
                allowHtml: true,
                allowCollapse: true,
                nodeClass: "orgchart-node",
            });
        }

    }

});
