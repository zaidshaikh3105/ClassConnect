import "../../index.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [];

  return (
    <footer className="footer bg-neutral text-neutral-content p-4 flex flex-col md:flex-row items-center justify-between">
      <aside className="flex items-center"></aside>
      <p className="mt-2 md:mt-0 text-white">Made with 🤍</p>
      <nav className="flex gap-4 mt-2 md:mt-0"></nav>
    </footer>
  );
};

export default Footer;
