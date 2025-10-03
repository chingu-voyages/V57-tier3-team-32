import { Card, CardContent } from "./ui/Card";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const developers = [
    {
      name: "Acto",
      github: "https://github.com/acto-acto",
      linkedIn: "https://www.linkedin.com/in/thankgod-obobo-66ba28271",
    },
    { name: "Nadeem", github: "https://github.com/707" },
    { name: "Snowbytes", github: "https://github.com/snowbytes" },
    {
      name: "Devim",
      github: "https://github.com/devimalka",
      linkedIn: "https://linkedin.com/in/oshada-kularathne/",
    },
    {
      name: "BettyC",
      github: "https://github.com/BettyC2002",
      linkedIn: "https://www.linkedin.com/in/bethrand-patience-131544333",
    },
    { name: "theDevGuy578", github: "https://github.com/LMgit91" },
    { name: "Alexander", github: "https://github.com/reckless" },
  ];
  return (
    <footer className="w-full  top-0  bg-white  border-slate-200 p-3 pt-8">
      <Card className="rounded-2xl  border-0 outline outline-gray-200 ">
        <CardContent className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <div className=" flex w-full items-center">
            <div className="flex flex-wrap justify-center gap-4 mx-auto">
              {developers.map((dev) => (
                <div
                  key={dev.github}
                  className="flex items-center space-x-2 rounded-lg px-4 "
                >
                  <span className="font-medium text-sm">{dev.name}</span>
                  <a
                    href={dev.github}
                    target="_blank"
                    className="hover:text-primary transition-colors"
                  >
                    <FaGithub />
                  </a>
                  {dev.linkedIn && (
                    <a href={dev.linkedIn} target="_blank" className="">
                      <FaLinkedin className="h-4 w-4 text-[#4a90e2]" />
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              <span className="mt-3"> Tier 3 Team 32 Repository</span>
              <a
                href="https://github.com/chingu-voyages/V57-tier3-team-32"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto"
              >
                <FaGithub className="h-12 w-12 text-black hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
