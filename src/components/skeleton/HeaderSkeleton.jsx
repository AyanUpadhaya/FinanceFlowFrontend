import Skeleton from "./Skeleton";
import "./Skeleton.css"
const HeaderSkeleton = () => {
  return (
    <div className="px-2 pt-5 d-flex justify-content-between align-items-center">
      <div>
        <Skeleton classes={"heading"}></Skeleton>
      </div>
      <div className="d-flex gap-2">
        <Skeleton classes={"button"}></Skeleton>
        <Skeleton classes={"button"}></Skeleton>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
