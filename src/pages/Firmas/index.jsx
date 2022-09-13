import "./Firmas.css";
import { Link } from "react-router-dom";
import { GetSigns } from "../../utils/Api";
import React, { useState, useEffect } from "react";
const Firmas = () => {
    const [signsState, setsignsState] = useState([]);
    //console.log(response.response);
    useEffect(() => {
        const traerData = async () => {
            let response = await GetSigns();
            setsignsState(response.response);
        }
        traerData()
  }, []);
  return (
    <>
      <div className="row container">
        <div className=" col-12">
          <Link to="/"> Volver </Link>
        </div>
        <div className="Text-Style col-12">
          {signsState.map((account) => (
            <div key={`div_${account["id"]}`}>
              <hr />
              <p>
                <b>No. </b>
                {`${account["id"]}`}
              </p>
              <p>
                <b>Wallet</b>
              </p>
              <p>{`${account["wallet"]}`}</p>
              <p>
                <b>Firma</b>
              </p>
              <p>{`${account["sign"]}`}</p>
              <p>
                <b>Fecha de creacion:</b>
              </p>
              <p>{`${account["created_at"]}`}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Firmas;
