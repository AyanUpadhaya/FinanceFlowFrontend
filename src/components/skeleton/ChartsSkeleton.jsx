import React from 'react'
import Skeleton from "./Skeleton";
import "./Skeleton.css";
const ChartsSkeleton = () => {
  return (
    <div className="py-4 container-fluid">
      <Skeleton classes={"title width-50"}></Skeleton>
      <div className="row gap-0 h-300">
        <div className="col-12 col-md-8 rounded px-3 mb-3 card h-300">
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
          <Skeleton classes={"text width-100"}></Skeleton>
        </div>
        <div className="col-12 col-md-4 rounded px-3 d-flex flex-column justify-content-center align-items-cemter card h-300">
          <div className="mx-auto">
            <Skeleton classes={"chartcircle"}></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartsSkeleton