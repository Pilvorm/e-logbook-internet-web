import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const BasicSkeleton = () => {
  return (
    <React.Fragment>
      <br />
      <Skeleton height={80} /> 
      <br />
      <Skeleton count={20} />
    </React.Fragment>
  );
};

export default BasicSkeleton;
