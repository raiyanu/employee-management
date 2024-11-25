import React from "react";
import Link from "next/link";
import CountsCard from "../admin/DashboardComponents/CountsCard";

export default function Hero() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 max-md:flex-col max-md:gap-4">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Your one place to rule all employee data
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        Take control of your workforce data. Our intuitive solution provides a centralized hub for employee information, enabling you to manage, analyze, and report with ease.
                    </p>
                    <Link
                        href="/add"
                        className="inline-flex items-center justify-center px-2 lg:px-5 py-2 lg:py-3 mr-3 text-base font-medium text-center text-primary-content rounded-lg bg-secondary-foreground hover:bg-secondary-content border-2 border-black dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-800 hover:text-black dark:text-white"
                    >
                        Add Employee
                        <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                    <a
                        href="/employees"
                        className="inline-flex items-center justify-center px-2 lg:px-5 py-2 lg:py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Check the list
                    </a>
                </div>
                <div className="gap-4 mx-auto mt-0 lg:col-span-5 flex flex-wrap items-center justify-center">
                    <CountsCard title="Total Employee" count="140" additionalText={{ featured: "+11%", body: "this month" }} />
                    <CountsCard title="Access from  Anywhere!" count="" additionalText={{ featured: "", body: "" }} />
                    <CountsCard title="Centralize Your Workforce Data" count="" additionalText={{ featured: "", body: "" }} />
                    <CountsCard title="Total Employee" count="140" additionalText={{ featured: "+11%", body: "this month" }} />

                </div>
            </div>
        </section>
    );
}
