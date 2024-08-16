import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-700 w-full h-[64px] md:h-[72px]">
      <section className="text-[#fff] w-11/12 m-auto flex justify-between md:py-6 py-5 md:gap-y-0 gap-y-3">
        <p className="text-muted">© 2024 All Rights Reserved</p>
        <div className="flex md:justify-between space-x-4 child:my-3 child:md:my-0">
          <a
            target="_blank"
            aria-label="Facebook"
            rel="noreferrer"
            href="https://www.facebook.com/profile.php?id=61563792045280"
          >
            <FaFacebook size={24} />
          </a>
          <a
            target="_blank"
            aria-label="Instagram"
            rel="noreferrer"
            href="https://www.facebook.com/profile.php?id=61563792045280"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
