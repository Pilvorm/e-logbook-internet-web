import React from "react";
import { Paper } from "@mui/material";
import ApexColumnChartsAccident from "src/views/charts/apex/ApexColumnChartsAccident";
import CarrouselWithoutArrow from "components/Carousel/CarouselWithoutArrows";
import ApexColumnChartsNearmiss from "src/views/charts/apex/ApexColumnChartsNearmiss";


const DashboardNearmiss = () => {
  
  const child = [
    <ApexColumnChartsNearmiss 
      tools="APAR" 
    />,
  ]

  return (
    <div className="w-100 wrap" >
      <Paper elevation={8}>
        <div className="p-relative">
          <CarrouselWithoutArrow  child={child} />
        </div>
      </Paper>
    </div>
  );
};

export default DashboardNearmiss;
