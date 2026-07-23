import React, { useEffect, useRef } from "react";
import { Parallax } from "react-parallax";
import { Button } from "@material-ui/core";
import gsap from "gsap";

export default function Header() {
  let title = useRef(null);

  let imgHeight = window.matchMedia(
    "(max-width: 1024px) and (max-height: 1366px)",
  ).matches
    ? 60
    : 85;

  imgHeight = window.matchMedia("(max-width: 768px) and (max-height: 1024px)")
    .matches
    ? 45
    : imgHeight;

  const imageSize = `${imgHeight}vh`;

  useEffect(() => {
    gsap.to(title, { duration: 0.7, opacity: 1, y: -20, ease: "sine.inOut" });
    gsap.fromTo(
      ".profile-pic",
      { opacity: 0, width: imageSize },
      { delay: 1, duration: 1, opacity: 1, width: imageSize, ease: "sine" },
    );
    gsap.fromTo(
      ".background",
      { opacity: 0 },
      { delay: 0.5, duration: 0.5, opacity: 1, y: -20, ease: "sine" },
    );
    gsap.fromTo(
      ".cv-btn",
      { opacity: 0 },
      { delay: 1.5, duration: 0.2, opacity: 1, y: -20, ease: "sine" },
    );
  }, []);

  return (
    <main className="main-page" id="home">
      <Parallax
        strength={800}
        className="background"
        renderLayer={(percentage) => (
          <div
            style={{
              height: percentage * window.innerHeight - 10,
              backgroundColor: "#7CA9C1",
            }}
          />
        )}
        style={{
          backgroundColor: "#7CA9C1",
          position: "absolute",
          minHeight: "90vh",
          width: "76vw",
          zIndex: -1,
          right: 0,
        }}
      />
      <div className="main-content">
        <h1 className="title" ref={(el) => (title = el)}>
          Hello,
          <br />
          I&apos;m Erick
          <br /> Silva
        </h1>
        <a href="/files/erick-silva-cv.pdf" download>
          <Button className="cv-btn">Download CV</Button>
        </a>
      </div>
      <div
        className="profile-pic"
        style={{
          aspectRatio: "1 / 1",
          height: imageSize,
          transform: "scaleX(-1)",
          marginRight: "7vw",
        }}
      >
        <img src="/images/profile-picture.png" alt="Erick Silva" />
      </div>
    </main>
  );
}
