// Function for creating first object for each node definition
function createNode(rec) {
    this.v = rec[0];
    this.f = rec[1];
}


// Processes pasted-in text,
//reformats, pushes into array for chart()
function parseData() {

    const formattedData = [];

    const rows = document.querySelector("textarea").value.split("\n");

    rows.forEach(function(employee) {

        let me = employee.split("\t");

        let record = [new createNode(me), me[3], ""];

        formattedData.push(record);
    });

    return formattedData;
}


function drawChart() {

    const myData = parseData();

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
        var chart = new google.visualization.OrgChart(document.querySelector('#chart_div'));

        // Draw the chart
        chart.draw(data, {
            allowHtml: true,
            allowCollapse: true,
            nodeClass: "orgchart-node",
        });
    }

}
