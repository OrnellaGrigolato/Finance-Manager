const Footer = () => {
  const date = new Date();
  return (
    <footer className="w-10/12 mx-auto mt-20">
      <div className="flex justify-between max-sm:flex-col max-sm:gap-12 max-sm:items-center max-sm:text-center">
        <div>
          <h4 className="font-bold mb-3">COMPANY</h4>
          <ul className="flex flex-col gap-3">
            <li>About Us</li>
            <li>Affiliate Program</li>
            <li>Carrers</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">HELP AND SUPPORT</h4>
          <ul className="flex flex-col gap-3">
            <li>Help Center</li>
            <li>Premium Support</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">LEARNING</h4>
          <ul className="flex flex-col gap-3">
            <li>Tutorials</li>
            <li>Manuals</li>
            <li>Learn Hub</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">RESOURCES</h4>
          <ul className="flex flex-col gap-3">
            <li>Third-Party Tools</li>
            <li>Blog</li>
            <li>Community</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">LEGAL</h4>
          <ul className="flex flex-col gap-3">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Fees</li>
          </ul>
        </div>
      </div>
      <div className="mt-20 text-center mb-12">
        <p className="font-[Narrow] font-bold cursor-pointer text-xl">
          <b className="text-[#C525FF] mr-2">$</b>Finance Manager Logo
        </p>
        <p className="mt-3">
          © {date.getFullYear()} Crombie. All rights reserved.
        </p>
        <p className="mt-6">
          Made with ❤️ by Grigolato Ornella, Trossero Agustin and Viscolungo
          Leandro{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
