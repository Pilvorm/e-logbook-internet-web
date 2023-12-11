import React from "react";
import { Paper } from "@mui/material";
import ApexColumnChartsAccident from "src/views/charts/apex/ApexColumnChartsAccident";
import CarrouselWithoutArrow from "components/Carousel/CarouselWithoutArrows";


const DashboardAccident = () => {
  
  const child = [
    <ApexColumnChartsAccident 
      tools="APAR" 
      title="JUMLAH KECELAKAAN SITE PT DANKOS FARMA DEPARTEMENT IT TAHUN 2023"
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

export default DashboardAccident;
