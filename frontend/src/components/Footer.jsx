import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/pdf-to-word" className="link link-hover">
            Pdf to Word converter
          </Link>
          <Link to="/word-to-pdf" className="link link-hover">
            Word to Pdf converter
          </Link>
          <Link to="/merge-pdf" className="link link-hover">
            Merge Pdfs
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">About</h6>
          <Link to="/about-us" className="link link-hover">
            About us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
          <Link to="/subscriptions" className="link link-hover">
            Subscriptions
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms-of-use" className="link link-hover">
            Terms of use
          </Link>
          <Link to="/privacy-policy" className="link link-hover">
            &copy; 2025 WPconverter. All rights reserved.
          </Link>
          <Link to="/cookie-policy" className="link link-hover">
            Cookie policy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
