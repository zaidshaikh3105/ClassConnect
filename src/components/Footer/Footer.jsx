import "../../index.css";

// Import your custom icons
import LinkedInIcon from "/linkedin.svg";
import GitHubIcon from "/github.svg";
import EmailIcon from "/gmail.svg";
import PortfolioIcon from "/portfolio.svg";

const Footer = () => {
  const socialIcons = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/zaids31/",
      icon: LinkedInIcon,
    },
    {
      name: "GitHub",
      url: "https://github.com/zaidshaikh3105",
      icon: GitHubIcon,
    },
    {
      name: "Email",
      url: "mailto:zaidshaikh740@gmail.com",
      icon: EmailIcon,
    },
    {
      name: "Portfolio",
      url: "https://zaid-shaikh.netlify.app/",
      icon: PortfolioIcon,
    },
  ];

  return (
    <footer className="footer bg-neutral text-neutral-content p-3 flex flex-col md:flex-row items-center justify-between">
      <p className="text-white">Made with 🤍</p>
      <nav className="flex gap-4 mt-2 md:mt-0">
        {socialIcons.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <img src={social.icon} alt={social.name} className="h-6 w-6" />
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
