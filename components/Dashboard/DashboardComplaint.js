import React from "react";
import { Paper } from "@mui/material";
import Image from "next/image";
import CarrouselWithoutArrow from "components/Carousel/CarouselWithoutArrows";

const DashboardComplaint = () => {
  const DummyInspectionAparJune = () => {
    return (
      <div>
        <h3 className="text-center pl-2">
          Data Pengaduan bulan May 2023 Departmen IT
        </h3>
        <div className="d-flex justify-content-between mt-2 pl-2 pr-2">
          <div className="d-flex">
            <Image
              src="/icons/home_icons/people_ic.png"
              width={48}
              height={48}
            />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Submitted</p>
            </div>
          </div>
          <div className="d-flex">
            <Image src="/icons/home_icons/box_ic.png" width={48} height={48} />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Outstanding</p>
            </div>
          </div>
          <div className="d-flex">
            <Image
              src="/icons/home_icons/dollar_ic.png"
              width={48}
              height={48}
            />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Resolve</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const DummyInspectionAparJuly = () => {
    return (
      <div>
        <h3 className="text-left pl-2">
          Jumlah Inspeksi Peralatan APAR bulan July 2023
        </h3>
        <div className="d-flex justify-content-between mt-2 pl-2 pr-2">
          <div className="d-flex">
            <Image
              src="/icons/home_icons/chart_ic.png"
              width={48}
              height={48}
            />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Total</p>
            </div>
          </div>
          <div className="d-flex">
            <Image
              src="/icons/home_icons/people_ic.png"
              width={48}
              height={48}
            />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Belum diinspeksi</p>
            </div>
          </div>
          <div className="d-flex">
            <Image src="/icons/home_icons/box_ic.png" width={48} height={48} />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Inspeksi OK</p>
            </div>
          </div>
          <div className="d-flex">
            <Image
              src="/icons/home_icons/dollar_ic.png"
              width={48}
              height={48}
            />
            <div className="ml-1 text-left">
              <p className="text-bold">230</p>
              <p>Inspeksi NOK</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const child = [<DummyInspectionAparJune />, <DummyInspectionAparJuly />];

  return (
    <div>
      <Paper elevation={8}>
        <div>
          <CarrouselWithoutArrow child={child} />
        </div>
      </Paper>
    </div>
  );
};

export default DashboardComplaint;
