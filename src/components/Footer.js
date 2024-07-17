import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-700 w-full h-[72]">
      <section className="text-[#fff] w-11/12 m-auto flex md:justify-between md:flex-row flex-col md:py-6 py-5 md:gap-y-0 gap-y-3">
        <p className="text-muted">© 2024 All Rights Reserved</p>
        <div className="flex md:justify-between space-x-4 child:my-3 child:md:my-0">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/spacestcom"
          >
            <FaFacebook size={24} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/spacest_com"
          >
            <FaInstagram size={24} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/company/roomless"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
