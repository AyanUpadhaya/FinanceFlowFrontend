import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ expenseDataPoints }) => {
  const newDataExpenseData = expenseDataPoints?[...expenseDataPoints]:[];
  const options = {
    theme: "dark2",
    animationEnabled: true,
    exportFileName: "New Year Resolutions",
    exportEnabled: false,
    title: {
      text: "Expenses",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        indexLabelPlacement: "inside",
        dataPoints: newDataExpenseData,
      },
    ],
  };

  return <CanvasJSChart options={options}></CanvasJSChart>;
};

export default PieChart;
