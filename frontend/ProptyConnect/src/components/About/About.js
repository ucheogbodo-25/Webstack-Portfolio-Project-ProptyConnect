import React from "react";
import Header from "../Header/Header";
import Service from "./Service";
import Footer from "../Footer/Footer";
import SearchBar from "../utils/SearchBar";
import Credibility from "./Credibility";
import Team from "./Team";

function About() {
  return (
    <div className=" About">
      <Header />
      <Service
        label="About Us"
        header="We Offer Premier Properties Tailored to Your Needs"
        text="Utilize our extensive search tool to discover your ideal home anywhere in the world. We facilitate the process of locating the perfect property, connecting you with agents, and finalizing the transaction—all without charging any additional commission for our assistance."
      />

      <SearchBar header="Discover a Property That Suits Your Requirements" />
      <br className=""></br>
      <Credibility header="Why You Should Trust Us" text="We Ensure Timely and High-Quality Delivery" />
      <Team header="Our Team" text="Meet Our Amazing Team" />
      <Footer />
    </div>
  );
}

export default About;
