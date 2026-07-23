import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_START_DATE = new Date(2022, 3);

function getExperienceYears() {
  const currentDate = new Date(Date.now());
  const hasReachedAnniversary =
    currentDate.getMonth() >= EXPERIENCE_START_DATE.getMonth();

  return (
    currentDate.getFullYear() -
    EXPERIENCE_START_DATE.getFullYear() -
    (hasReachedAnniversary ? 0 : 1)
  );
}

export default function Home() {
  let subtitle = useRef(null);
  let title = useRef(null);
  let paragraph = useRef(null);
  const experienceYears = getExperienceYears();

  useEffect(() => {
    const toggleActions = 'play none none';
    gsap.fromTo(
      title,
      { autoAlpha: 0 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: 20,
        ease: 'none',
        scrollTrigger: {
          id: 'title',
          trigger: title,
          start: 'top center',
          toggleActions,
        },
      }
    );
    gsap.fromTo(
      subtitle,
      { autoAlpha: 0 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: -20,
        ease: 'none',
        scrollTrigger: {
          id: 'subtitle',
          trigger: subtitle,
          start: 'top center+=100',
          toggleActions,
        },
      }
    );
    gsap.fromTo(
      paragraph,
      { autoAlpha: 0 },
      {
        duration: 0.5,
        autoAlpha: 1,
        ease: 'none',
        x: -20,
        scrollTrigger: {
          id: 'paragraph',
          trigger: subtitle,
          start: 'top center+=100',
          toggleActions,
        },
      }
    );
  }, []);

  return (
    <div className="about-page" id="about">
      <h1 className="about-title" ref={(e) => (title = e)}>
        About me
      </h1>
      <h3 className="about-subtitle" ref={(e) => (subtitle = e)}>
        I am a Frontend Engineer focused on Angular, frontend architecture,
        Design Systems, and scalable web platforms.
      </h3>
      <p className="about-paragraph" ref={(e) => (paragraph = e)}>
        I am a Frontend Engineer from Brazil with {experienceYears}+ years of
        experience building scalable, accessible, and high-performance web
        applications. My work is focused on Angular, TypeScript, Design Systems,
        microfrontends, frontend architecture, and developer experience. <br />
        Since April 2022, I have worked on enterprise platforms, legacy
        modernization, reusable component ecosystems, CI/CD automation, testing
        strategies, and internal tooling. I also explore AI-assisted engineering
        workflows to improve frontend delivery, standardization, and team
        productivity.
      </p>
    </div>
  );
}
