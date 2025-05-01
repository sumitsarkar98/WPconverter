import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Create a new account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" />I agree
              to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="btn bg-orange-600 text-white w-full mt-2 hover:bg-orange-700"
          >
            Sign Up
          </button>

          {/* Social Login Section */}
          <div className="flex flex-col gap-4 mt-6">
            <button className="btn btn-outline bg-white text-orange-600 border-orange-600 w-full rounded-xl flex items-center justify-center gap-2 hover:bg-orange-100">
              Sign Up with Google
            </button>
            <button className="btn btn-outline bg-white text-blue-600 border-blue-600 w-full rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100">
              Sign Up with Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
