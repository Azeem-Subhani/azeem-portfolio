"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderButtons from "@/components/ui/WorkSlideButtons";

// const projects = [
//   {
//     num: "01",
//     category: "frontend",
//     title: "project 1",
//     description:
//       "Lprem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam modi.",
//     stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "Javascript" }],
//     image: "/assets/work/thumb1.png",
//     live: "",
//     github: "",
//   },
//   {
//     num: "02",
//     category: "fullstack",
//     title: "project 2",
//     description:
//       "Lprem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam modi.",
//     stack: [{ name: "Next.js" }, { name: "Tailwind" }, { name: "Node.js" }],
//     image: "/assets/work/thumb2.png",
//     live: "",
//     github: "",
//   },
//   {
//     num: "03",
//     category: "fullstack",
//     title: "project 2",
//     description:
//       "Lprem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam modi.",
//     stack: [{ name: "Angular" }, { name: "Tailwind" }, { name: "Node.js" }],
//     image: "/assets/work/thumb3.png",
//     live: "",
//     github: "",
//   },
// ];

const projects = [
  {
    num: "01",
    category: "fullstack",
    title: "Gaming Global",
    description:
      "A MERN stack-based web gaming application with sensitivity conversion, gamer statistics, social media features, and real-time chat using SOCKET.IO. Includes an admin panel for user management.",
    stack: [
      { name: "React" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "Socket.IO" },
    ],
    image: "/assets/work/gaming-global.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    category: "frontend",
    title: "Woody Shop",
    description:
      "An e-commerce application built with React, Redux, Firebase, and Stripe API. Features include cart functionality and state management with Redux, including local storage persistence.",
    stack: [
      { name: "React" },
      { name: "Redux" },
      { name: "Firebase" },
      { name: "Stripe API" },
    ],
    image: "/assets/work/woody-shop.png",
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "fullstack",
    title: "Real-time Chat Application",
    description:
      "A real-time chat module developed using Node.js with WebSockets, Vanilla JavaScript, Handlebars, and Moment.js.",
    stack: [
      { name: "Node.js" },
      { name: "WebSockets" },
      { name: "JavaScript" },
      { name: "Handlebars" },
      { name: "Moment.js" },
    ],
    image: "/assets/work/chat-application.png",
    live: "",
    github: "",
  },
  {
    num: "04",
    category: "backend",
    title: "Task Manager",
    description:
      "A backend application for user authentication, task management, and email verification using SendGrid services. Built with Node.js, MongoDB, JWT, and Express.js.",
    stack: [
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "JWT" },
      { name: "Express.js" },
      { name: "SendGrid" },
    ],
    image: "/assets/work/gaming-global.png",
    live: "",
    github: "",
  },
  {
    num: "05",
    category: "fullstack",
    title: "Memorial Planning Payment Portal",
    description:
      "A custom payment gateway application using Next.js and AWS services, integrated with Trust Commerce for secure online payment processing (autopayment). Features Lambda functions for automated notifications via AWS SES.",
    stack: [
      { name: "Next.js" },
      { name: "DynamoDB" },
      { name: "AppSync" },
      { name: "AWS Lambda" },
      { name: "AWS SES" },
      { name: "Trust Commerce" },
    ],
    image: "/assets/work/payment-portal.png",
    live: "",
    github: "",
  },
  {
    num: "06",
    category: "fullstack",
    title: "Smart Living Dashboard",
    description:
      "An Angular-based portal using SAM architecture and Firebase for push notifications. Features include an admin panel, emergency alerts, group creation, event scheduling, and audio/video calls.",
    stack: [
      { name: "Angular" },
      { name: "PostgreSQL" },
      { name: "Firebase" },
      { name: "Stripe" },
      { name: "AWS SAM" },
    ],
    image: "/assets/work/smart-living-portal.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProjects] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // Get the current slide index;
    const currentIndex = swiper.activeIndex;

    // update project state based on current slide index;
    setProjects(projects[currentIndex]);
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent">
                {project.num}
              </div>
              {/*  projects category */}
              <h2 className="text-[42px] font-bold leading-none text-white hover:text-accent transition-all duration-500 capitalize">
                {project.title}
              </h2>
              <h2 className="text-[28px] font-bold leading-none text-white hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              {/* project description */}
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-sm text-accent">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                {/* <Link href={project.live}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link> */}
                {/* github project button */}
                {/* <Link href={project.live}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link> */}
              </div>
            </div>
          </div>
          {/* Slider */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center ">
                      {/* overlay */}
                      <div className="absolute top-0 botton-0 w-full h-full z-10"></div>
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt="project image"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* Slider Buttons */}
              <WorkSliderButtons
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-xl"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
