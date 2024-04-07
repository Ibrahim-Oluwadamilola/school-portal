import React from "react";
import "../styles/data.css";

const Data = () => {
  return (
    <div className="data">
      <div className="data__group">
        <p className="data__group_text">Student name:</p>
        <p>Damilola Ibrahim</p>
      </div>
      <div className="data__group">
        <p className="data__group_text">Class:</p>
        <p>JSS1</p>
      </div>
      <div className="data__group">
        <p className="data__group_text">School fees:</p>
        <p>200,000</p>
      </div>
      <div className="data__group">
        <p className="data__group_text">PTA fees:</p>
        <p>20,000</p>
      </div>
    </div>
  );
};

export default Data;
