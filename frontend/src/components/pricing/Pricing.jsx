import React from "react";
import PriceCard from "./PriceCard";
import "./price.css";
import Faq from "./Faq";

const Pricing = () => {
  return (
    <>
      <section className="price padding">
        <div className="container grid">
          <PriceCard />
        </div>
      </section>
      <Faq />
    </>
  );
};

export default Pricing;
