import React from "react";
import "./Userdashboard.css";
import UILOGO from "../assets/"
const Userdashboard = () => {
  return (
    <div className="dashboard-container">
      {/* LEFT SECTION */}
      <section>
        <div>
          <img src={UILOGO} alt="" />
        </div>
        <div></div>
      </section>

      {/* MIDDLE SECTION */}
      <section></section>

      {/* RIGHT SECTION */}
      <section></section>
    </div>
  );
};

export default Userdashboard;
