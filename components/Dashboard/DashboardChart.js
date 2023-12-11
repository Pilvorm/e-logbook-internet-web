import React from "react";
import { Paper } from "@mui/material";
import CarouselComponent from "components/Carousel";
import ApexColumnCharts from "src/views/charts/apex/ApexColumnCharts";


const DashboardChart = () => {
  
  const child = [<ApexColumnCharts tools="APAR" />, <ApexColumnCharts tools="HYDRANT" />]

  return (
    <div className="w-100 wrap" >
      <Paper elevation={8}>
        <div className="p-relative">
          <CarouselComponent  child={child} />
        </div>
      </Paper>
    </div>
  );
};

export default DashboardChart;
