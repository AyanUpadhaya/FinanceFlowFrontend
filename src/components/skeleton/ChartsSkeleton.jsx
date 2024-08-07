import React from 'react'
import Skeleton from "./Skeleton";
import "./Skeleton.css";
const ChartsSkeleton = () => {
  return (
    <div className="py-4 container-fluid">
      <Skeleton classes={"title width-50"}></Skeleton>
      <div className="row gap-0">
        <div className="col-12 col-md-8 rounded px-3 mb-3 card">
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
        </div>
        <div className="col-12 col-md-4 rounded px-3 card">
          <Skeleton classes={"chartcircle"}></Skeleton>
        </div>
      </div>
    </div>
  );
}

export default ChartsSkeleton