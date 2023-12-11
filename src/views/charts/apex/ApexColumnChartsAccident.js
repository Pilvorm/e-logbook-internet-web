import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {ssr: false});
import { Card, CardHeader, CardBody } from 'reactstrap';
import Select from "react-select";

const ApexColumnChartsAccident = ({ direction, tools, title }) => {
  const columnColors = {
    series1: '#6750a3',
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
  ]

  return (
    <Card>
      <div className="align-self-center mt-2 text-center text-[20px]">
      </div>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
      </CardHeader>
      <div style={{width: '100%'}}>
        <CardBody className="d-flex">
          <div style={{width: '80%'}}>
            <h2>{title}</h2>
            <Chart options={options} series={series} type='bar' height={400} />
          </div>
          <div style={{width: '15%', marginLeft: 10}}>
            <p>Filter Departement</p>
            <Select
              classNamePrefix="select"
              placeholder="QA"
              options={[{label: 'QA'}]}
            ></Select>
          </div>
        </CardBody>
      </div>
    </Card>
  )
}

export default ApexColumnChartsAccident
