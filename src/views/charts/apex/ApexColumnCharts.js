import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {ssr: false});
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ApexColumnCharts = ({ direction, tools }) => {
  const columnColors = {
    series1: '#edcb46',
    series2: '#24e801',
    bg: '#f8d3ff'
  }

  const options = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: false,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        colors: {
          // backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
          backgroundBarRadius: 10,
        },
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start',
    },
    colors: [columnColors.series1, columnColors.series2],
    stroke: {
      show: true,
      colors: ['transparent'],
      width: 5
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    fill: {
      opacity: 1
    },
    yaxis: {
      opposite: direction === 'rtl'
    },
    
  }

  const series = [
    {
      name: 'Achivement',
      data: [220, 120, 55, 100, 80, 125, 175, 70, 88, 180, 980, 700]
    },
    {
      name: 'Target',
      data: [730, 100, 30, 40, 95, 90, 30, 110, 62, 20, 900, 500]
    },
  ]

  return (
    <Card>
      <div className="align-self-center mt-2 text-center text-[20px]">
        <h2>Peralatan yang dicek vs target 2023</h2>
        <h2>Peralatan: {tools}</h2>
      </div>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
        {/* <div className='d-flex align-items-center mt-md-0 mt-1'>
          <Calendar size={17} />
          <Flatpickr
            options={{
              mode: 'range',
              defaultDate: ['2019-05-01', '2019-05-10']
            }}
            className='form-control flat-picker bg-transparent border-0 shadow-none'
          />
        </div> */}
      </CardHeader>
      <div style={{width: '96%'}}>
        <CardBody>
          <Chart options={options} series={series} type='bar' height={400} />
        </CardBody>
      </div>
    </Card>
  )
}

export default ApexColumnCharts
