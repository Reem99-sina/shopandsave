import CustomAreaChart from "./custom-line-chart"


const myAreaConfig = {
  series1: {
    label: "Series 1",
    color: "#ef4444",
  },
  series2: {
    label: "Series 2",
    color: "#f97316",
  },
  series3: {
    label: "Series 3",
    color: "#6366f1",
  },
}

const salesGrowthData = [
  { year: "2013", series1: 18, series2: 7, series3: 9 },
  { year: "2014", series1: 19, series2: 17, series3: 4 },
  { year: "2015", series1: 22, series2: 13, series3: 9 },
  { year: "2016", series1: 21, series2: 17, series3: 11 },
  { year: "2017", series1: 32, series2: 25, series3: 15 },
  { year: "2018", series1: 28, series2: 27, series3: 17 },
]

const lineChartData = [
  { month: "Jan", series1: 8 },
  { month: "Feb", series1: 9 },
  { month: "Mar", series1: 16 },
  { month: "Apr", series1: 19 },
  { month: "May", series1: 24 },
  { month: "Jun", series1: 25 },
  { month: "Jul", series1: 19 },
  { month: "Aug", series1: 15 },
  { month: "Sep", series1: 12 },
]

const lineChart2Data = [
  { month: "Jan", purple: 11.5, orange: 8.2 },
  { month: "Feb", purple: 7.8, orange: 9.1 },
  { month: "Mar", purple: 8.5, orange: 10.2 },
  { month: "Apr", purple: 9.2, orange: 8.8 },
  { month: "May", purple: 8.1, orange: 7.9 },
  { month: "Jun", purple: 11.8, orange: 9.5 },
]

const lineChart3Data = [
  { period: "May", purple: 8, orange: 4.9 },
  { period: "June", purple: 7.9, orange: 5.2 },
  { period: "July", purple: 6.7, orange: 9.5 },
  { period: "Aug", purple: 15.5, orange: 12.9 },
  { period: "Sep", purple: 19.4, orange: 16.2 },
  { period: "Oct", purple: 22.5, orange: 18 },
  { period: "6", purple: 26.2, orange: 17.6 },
  { period: "7", purple: 27.5, orange: 15.2 },
  { period: "8", purple: 24.3, orange: 11.3 },
  { period: "9", purple: 19.3, orange: 7.6 },
  { period: "10", purple: 14.9, orange: 5.8 },
  { period: "11", purple: 10.6, orange: 5.8 },
]

const lineChart6Data = [
  { month: "May", purple: 12, orange: 12 },
  { month: "June", purple: 8, orange: 5 },
  { month: "July", purple: 16, orange: 6 },
  { month: "Aug", purple: 19, orange: 8 },
  { month: "Sep", purple: 20, orange: 10 },
  { month: "Oct", purple: 18, orange: 13 },
]

export function C3LineCharts() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <CustomAreaChart
          title="Custom Shape Area Chart"
          config={myAreaConfig}
          data={salesGrowthData}
          xKey="year"
          shape="linear"
        />
        <CustomAreaChart
          title="Line Chart 1"
          config={{
            series1: {
              label: "series1",
              color: "#6366f1",
              fill: true,
            },
          }}
          data={lineChartData}
          xKey="month"
          shape="basis"
        />
        <CustomAreaChart
          title="Line chart 2"
          config={{
            purple: {
              label: "Purple Line",
              color: "#6366f1",
            },
            orange: {
              label: "Orange Line",
              color: "#f97316",
            },
          }}
          data={lineChart2Data}
          xKey="month"
          shape="linear"
        />
        <CustomAreaChart
          title="Line chart 3"
          config={{
            purple: {
              label: "Purple Line",
              color: "#6366f1",
              addLabel: true,
            },
            orange: {
              label: "Orange Line",
              color: "#f97316",
              addLabel: true,
            },
          }}
          data={lineChart3Data}
          xKey="period"
          shape="linear"
        />
        <CustomAreaChart
          title="Line chart 4"
          config={{
            purple: {
              label: "Purple Line",
              color: "#6366f1",
              fill: true,
            },
            orange: {
              label: "Orange Line",
              color: "#f97316",
              fill: true,
            },
          }}
          data={lineChart6Data}
          xKey="month"
          shape="monotone"
        />
        <CustomAreaChart
          title="Line chart 5"
          config={{
            purple: {
              label: "Purple Line",
              color: "#6366f1",
              addLabel: true,
            },
            orange: {
              label: "Orange Line",
              color: "#f97316",
              addLabel: true,
            },
          }}
          data={lineChart3Data}
          xKey="period"
          shape="linear"
        />
        <CustomAreaChart
          title="Line chart 6"
          config={{
            purple: {
              label: "Purple Line",
              color: "#6366f1",
              fill: true,
            },
            orange: {
              label: "Orange Line",
              color: "#f97316",
              fill: true,
            },
          }}
          data={lineChart3Data}
          xKey="period"
          shape="step"
        />
        <CustomAreaChart
          title="Line chart 7"
          config={{
            purple: {
              label: "Purple Line",
              color: "#6366f1",
            },
            orange: {
              label: "Orange Line",
              color: "#f97316",
            },
          }}
          data={lineChart3Data}
          xKey="period"
          shape="step"
        />
      </div>
    </div>
  )
}