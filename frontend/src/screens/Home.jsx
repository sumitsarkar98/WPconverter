import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="home-container px-4 py-10 md:py-10 md:px-20 text-center lg:my-12">
      <h2 className="text-3xl font-bold text-center lg:mt-20 mb-8 text-orange-700 uppercase">
        A fast and simple tool to convert your files, effortlessly!
      </h2>
      <p className="text-2xl text-center mb-8 text-gray-600">
        Convert your files with few clicks. Convert instantly.
        <span className="font-bold text-[1.2rem] underline-offset-4 underline text-orange-500 uppercase">
          "Safe, Secure, and Free!"
        </span>
      </p>

      <div className="navigation mb-4"></div>

      {/* products */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-16">
        <ProductCard
          name="Word to PDF Converter"
          link="/word-to-pdf"
          linkname="Convert Now"
          linkdescription="Convert your files effortlessly."
        />
        <ProductCard
          name="PDF to Word Converter"
          link="/pdf-to-word"
          linkname="Convert Now"
          linkdescription="Convert your files effortlessly."
        />
        <ProductCard
          name="Merge PDF"
          link="/merge-pdf"
          linkname="Merge Now"
          linkdescription="Merge your files effortlessly."
        />
      </div>
    </div>
  );
};

export default Home;
