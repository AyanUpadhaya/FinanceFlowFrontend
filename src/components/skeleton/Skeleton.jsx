/* eslint-disable react/prop-types */
import "./Skeleton.css";

const Skeleton = ({ classes }) => {
  const classNames = `skeleton ${classes} animate-pulse`;
  return <div className={classNames}></div>;
};

export default Skeleton;
