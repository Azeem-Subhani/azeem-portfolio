"use client";
import { FaNodeJs, FaReact, FaJs, FaCss3, FaHtml5 } from "react-icons/fa";
import {
  SiExpress,
  SiNextdotjs,
  SiNestjs,
  SiTailwindcss,
  SiAwsamplify,
  SiMysql,
  SiMongodb,
  SiMongoose,
  SiSvelte,
  SiAwslambda,
  SiAmazonec2,
  SiElasticsearch,
  SiAmazondynamodb,
  SiAmazoncognito,
  SiFirebase,
  SiAngular,
  SiTypescript,
  SiReactivex,
  SiNgrx,
  SiTypeorm,
  SiRedux,
  SiReduxsaga,
  SiRecoil,
  SiMobx,
  SiReactquery,
  SiServerless,
  SiAmazoncloudwatch,
  SiAwssecretsmanager,
  SiAmazons3,
  SiGraphql,
  SiSupabase,
  SiPostgresql,
} from "react-icons/si";

const about = {
  title: "About Me",
  description:
    "I'm a versatile Full Stack JavaScript Developer with 3 years of experience in building robust web applications. I excel at crafting elegant digital experiences using a wide range of programming languages and cutting-edge technologies.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Azeem Subhani",
    },
    {
      fieldName: "Phone",
      fieldValue: "+92 320 4406148",
    },
    {
      fieldName: "Email",
      fieldValue: "azeemsubhani@proton.me",
    },
    {
      fieldName: "Experience",
      fieldValue: "3 Years",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Urdu",
    },
  ],
};

const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description:
    "I have a diverse background in full-stack development, with experience in various technologies and frameworks.",
  items: [
    {
      company: "Cinnova Technologies",
      position: "Software Engineer",
      duration: "June 2023 - Present",
    },
    {
      company: "Techverx",
      position: "Associate Software Engineer",
      duration: "July 2022 - June 2023",
    },
    {
      company: "Nestosh",
      position: "Associate Backend Engineer",
      duration: "January 2022 - June 2022",
    },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description:
    "I have a strong educational background in computer science, complemented by continuous learning and certifications.",
  items: [
    {
      institution: "COMSATS University Islamabad, Lahore Campus",
      degree: "Bachelor of Science in Computer Science",
      duration: "Graduated: January 2022",
    },
    {
      institution: "Test Dome",
      degree: "Javascript & Node Developer",
      duration: "2022",
    },
    {
      institution: "Online Course",
      degree: "Web Developer Bootcamp 2021",
      duration: "2021",
    },
    // You can add any relevant certifications or courses here
  ],
};

// const education = {
//   icon: "/assets/resume/cap.svg",
//   title: "My Education",
//   description:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus commodi ipsa quas architecto in, doloremque quam, quos voluptate voluptatem, molestias ea.",
//   items: [
//     {
//       institution: "Comsats University",
//       degree: "Bachelor of Science in Computer Science",
//       duration: "2022 - Present",
//     },
//     {
//       institution: "Test Dome",
//       degree: "Javascript & Node Developer",
//       duration: "2022 - Present",
//     },
//     {
//       institution: "Online Course",
//       degree: "Web Developer Bootcamp 2022",
//       duration: "2022",
//     },
//   ],
// };

const skills = {
  icon: "",
  title: "My Skills",
  description:
    "I have expertise in a wide range of technologies, focusing on full-stack JavaScript development and cloud services.",
  items: [
    {
      icon: <FaHtml5 />,
      name: "HTML",
    },
    {
      icon: <FaCss3 />,
      name: "CSS",
    },
    {
      icon: <SiTailwindcss />,
      name: "TailwindCSS",
    },
    {
      icon: <FaJs />,
      name: "JavaScript",
    },
    {
      icon: <SiTypescript />,
      name: "TypeScript",
    },
    {
      icon: <FaReact />,
      name: "React",
    },
    {
      icon: <SiAngular />,
      name: "Angular",
    },
    {
      icon: <SiNextdotjs />,
      name: "Angular",
    },
    {
      icon: <SiSvelte />,
      name: "Svelte",
    },
    {
      icon: <SiReactivex />,
      name: "RxJs",
    },
    {
      icon: <SiNgrx />,
      name: "Ngxs",
    },
    {
      icon: <SiRedux />,
      name: "Redux",
    },
    {
      icon: <SiReduxsaga />,
      name: "Redux Sega",
    },
    {
      icon: <SiRecoil />,
      name: "Recoil",
    },
    {
      icon: <SiMobx />,
      name: "Mobx",
    },
    {
      icon: <SiReactquery />,
      name: "Tanstack Route/Query",
    },
    {
      icon: <FaNodeJs />,
      name: "NodeJs",
    },
    {
      icon: <SiNestjs />,
      name: "Nest JS",
    },
    {
      icon: <SiServerless />,
      name: "Serverless",
    },
    {
      icon: <SiGraphql />,
      name: "GraphQL",
    },
    {
      icon: <SiExpress />,
      name: "Tanstack Route/Query",
    },
    {
      icon: <SiAwsamplify />,
      name: "Amplify",
    },
    {
      icon: <SiAwslambda />,
      name: "Lambda",
    },
    {
      icon: <SiAmazonec2 />,
      name: "EC2",
    },
    {
      icon: <SiElasticsearch />,
      name: "Elastic Search",
    },
    {
      icon: <SiAmazoncognito />,
      name: "Cognito",
    },
    {
      icon: <SiAmazoncloudwatch />,
      name: "Cloud Watch",
    },
    {
      icon: <SiAwssecretsmanager />,
      name: "Secret Managet",
    },
    {
      icon: <SiAmazons3 />,
      name: "S3 Bucket",
    },
    {
      icon: <SiAmazons3 />,
      name: "S3 Bucket",
    },
    {
      icon: <SiFirebase />,
      name: "Firebase",
    },
    {
      icon: <SiSupabase />,
      name: "Supabase",
    },
    {
      icon: <SiMongoose />,
      name: "Mongoose",
    },
    {
      icon: <SiTypeorm />,
      name: "TypeORM",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
    },
    {
      icon: <SiAmazondynamodb />,
      name: "DynamoDB",
    },
    {
      icon: <SiMysql />,
      name: "MySQL",
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@radix-ui/react-tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh]  flex items-center justify-center py-12 xl:py-8"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* Content */}
          <div className="min-h-[70vh] w-full">
            {/* Experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[450px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[200px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] lg:grid-cols-5 xl:gap-[30px]">
                  {skills.items.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* About */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60 text-base">{item.fieldName}</span>
                        <span className="text-lg">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
