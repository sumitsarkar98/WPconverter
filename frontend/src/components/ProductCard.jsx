import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ name, link, linkname,linkdescription }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg p-6">
      <div className="text-center text-2xl font-semibold mb-4 text-blue-600">
        {name}
      </div>
      <div className="text-center text-gray-600 mb-4">
        {linkdescription}
       
      </div>
      <div className="text-center">
        <Link
          to={link}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {linkname}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
