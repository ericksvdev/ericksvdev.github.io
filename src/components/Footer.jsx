import React from 'react';

export default function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();

  return <footer className="footer">&#169; Erick Silva {currentYear}</footer>;
}
