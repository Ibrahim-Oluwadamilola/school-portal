import { useState } from "react";
import DataTable from "../../../components/DataTable";
import userData from "../../../utils/userData";

import "../../../styles/history.css";

const History = () => {
  const [indx, setIndx] = useState(0);

  const divisions = [
    { id: 1, title: "Junior Secondary" },
    { id: 2, title: "Senior Secondary" },
  ];

  const classObj = {
    1: ["JSS1", "JSS2", "JSS3"],
    2: ["SSS1", "SS2", "SSS3"],
  };

  const displayClass = (id) => {
    setIndx(id);
  };

  return (
    <div className="history">
      <h1 className="history__heading">Payment History</h1>

      <div className="history__list">
        {divisions.map(({ title, id }) => (
          <div key={id} className="history__list__group">
            <div className="history__list__group__item">
              <span className="circle" />
              <p onClick={() => displayClass(id)}>{title}</p>
            </div>

            {indx == id &&
              classObj[id]?.map((el, id) => (
                <div key={id} className="data-group">
                  <p className="">{el}</p>
                  <DataTable data={userData} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
