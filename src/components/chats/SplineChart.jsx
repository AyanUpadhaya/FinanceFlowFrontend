import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const SplineChart = ({ incomeDataPoints }) => {
  const dataPoints =
    incomeDataPoints.length > 0
      ? incomeDataPoints.map((data) => ({
          x: data.date,
          y: data.amount,
        }))
      : [];

  const options = {
    theme: "dark2",
    animationEnabled: true,
    title: {
      text: "Income",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      gridThickness: 1,
    },

    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };
  return <CanvasJSChart options={options}></CanvasJSChart>;
};

export default SplineChart;
