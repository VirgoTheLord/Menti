import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PublicIcon from "@mui/icons-material/Public";

const footerLinks = {
  Features: [
    { label: "Overview", href: "#" },
    { label: "AI Menti builder", href: "#" },
    { label: "Live polling", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "How to", href: "#" },
    { label: "Work", href: "#" },
  ],
  Details: [
    { label: "Legal", href: "#" },
    { label: "Policies", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
  "About us": [
    { label: "Press info", href: "#" },
    { label: "The team", href: "#" },
    { label: "Jobs", href: "#" },
  ],
};

const socialLinks = [
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "#",
    color: "#1877f3",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "#",
    color: "#0a66c2",
  },
  {
    icon: YouTubeIcon,
    label: "YouTube",
    href: "#",
    color: "#ff0000",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "#",
    color: "#e1306c",
  },
  {
    icon: TwitterIcon,
    label: "Twitter",
    href: "#",
    color: "#1da1f2",
  },
];

const Footer = () => {
  return (
    <footer className="bg-blue-200 text-black py-12 px-4 md:px-12 font-raleway">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="space-y-6 col-span-1">
          <div className="text-3xl font-black font-barlow-condensed text-blue-950">
            MentiMeter<span className="text-blue-400"> Clone</span>
          </div>
          <div className="flex gap-3 mt-2">
            {socialLinks.map(({ icon: Icon, label, href, color }) => (
              <a
                href={href}
                key={label}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full transition-colors flex items-center justify-center"
                style={{
                  color: "#222",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = color)}
                onMouseOut={(e) => (e.currentTarget.style.color = "#222")}
              >
                <Icon style={{ fontSize: 28 }} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 mt-4">
            <PublicIcon style={{ fontSize: 20 }} />
            <span>Choose your language</span>
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-semibold text-blue-950 underline underline-offset-4 mb-4 font-raleway">
              {heading}
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              {links.map(({ label, href }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className="hover:text-blue-500 transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-blue-300 mt-12 pt-4 text-xs text-blue-700 text-center">
        &copy; {new Date().getFullYear()} MentiMeter Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
