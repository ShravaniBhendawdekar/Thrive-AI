"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
          Discover. Decide. Thrive.
        </h1>

        {/* Flexbox layout for paragraph and image */}
        <div className="flex flex-col-reverse md:flex-row justify-center items-center mt-10 gap-10 max-w-6xl mx-auto px-4">
          
          {/* Paragraph on the left */}
          <div className="md:w-1/2 text-left">
            <p className="text-muted-foreground text-base md:text-lg">
              Welcome to <strong>ThriveAI</strong>, your AI-powered companion for navigating your career journey with confidence. Whether you’re a student, recent graduate, or professional looking to pivot, our platform provides personalized insights, tools, and guidance to help you thrive in your career.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              {/* <Link href="/dashboard">
                <Button size="lg" className="px-8" variant="outline">
                  Get Started (demo)
                </Button>
              </Link> */}
            </div>
          </div>

          {/* Image on the right */}
          <div className="md:w-1/2 ">
            <div ref={imageRef} >
              <Image
                src={"/b.jpg"}
                width={1280}
                height={720}
                alt="Banner ThriveAI"
                className="rounded-lg shadow-2xl border"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
