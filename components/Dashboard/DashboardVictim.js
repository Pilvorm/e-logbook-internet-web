import React from "react";
import { Paper } from "@mui/material";
import ApexColumnChartsAccident from "src/views/charts/apex/ApexColumnChartsAccident";
import CarrouselWithoutArrow from "components/Carousel/CarouselWithoutArrows";


const DashboardVictim = () => {
  
  const child = [
    <ApexColumnChartsAccident 
      tools="APAR" 
      title={`JUMLAH KORBAN SITE PT DANKOS FARMA DEPARTEMENT IT TAHUN ${new Date().getFullYear()}`}
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

export default DashboardVictim;
