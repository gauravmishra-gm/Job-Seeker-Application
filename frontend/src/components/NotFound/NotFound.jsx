import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="Page Not Found">
      <div className="content">
        <img src="/notfound.png" alt="notfound" />
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
