"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Frontend Development",
    href: "/",
    description:
      "I specialize in building responsive and interactive web applications using React, Next.js, and Angular. My expertise includes state management with React Query and MobX, styling with Tailwind CSS and Material UI, and creating seamless user experiences.",
  },
  {
    num: "02",
    title: "Fullstack Javascript Development",
    href: "/",
    description:
      "As a full stack developer, I bridge frontend and backend technologies. I leverage my skills in Node.js, Express, and NestJS to create comprehensive web solutions. My experience includes working with both SQL and NoSQL databases, ensuring robust and scalable applications.",
  },
  {
    num: "03",
    title: "Backend Development",
    href: "/",
    description:
      "I design and implement robust server-side applications using Node.js, Express, and NestJS. My expertise includes RESTful API development, GraphQL integration, and working with databases like MongoDB and PostgreSQL. I focus on creating efficient, secure, and scalable backend systems.",
  },
  {
    num: "04",
    title: "Cloud & DevOps",
    href: "/",
    description:
      "I have extensive experience with AWS services, including Cognito, Lambda, DynamoDB, and S3. I implement CI/CD pipelines, manage cloud infrastructures, and ensure optimal application performance and security in cloud environments. My skills extend to serverless architecture and microservices.",
  },
];

const Services = () => {
  return (
    <>
      <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap=[60px]"
          >
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col justify-center gap-6 group m-4"
                >
                  {/* top */}
                  <div className="w-full flex justify-between items-center">
                    <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                      {service.num}
                    </div>
                    <Link href={service.href} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                      <BsArrowDownRight className="text-primary text-3xl" />
                    </Link>
                  </div>
                  {/* title */}
                  <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.title}</h2>
                  {/* Description */}
                  <p className="text-white/60">{service.description}</p>
                  {/* border */}
                  <div className="border-b border-white/20 w-full"></div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
