import React, { useState } from 'react';
import './homePage.css';

import security from '../../picture/security.png';
import navigation from '../../picture/navigation.png';
import invoice from '../../picture/invoice.png';

const HomePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const slideContent = [
    {
      title: 'Easy invoice creation and management',
      description: 'Easily create and manage your invoices with our intuitive tools.',
      image: invoice,
    },
    {
      title: 'Real-time updates and notifications',
      description: 'Stay informed with real-time updates and notifications.',
      image: navigation,
    },
    {
      title: 'Secure data storage and backup',
      description: 'Your data is secure with our state-of-the-art storage solutions.',
      image: security,
    },
  ];

  return (
    <div className="homepageContent">
      <h1 className="centeredTitle">Welcome to Nest Bank</h1>
      <div className="intro">
        <p className="description">
          Pay Sprint is your ultimate invoicing solution, designed to make managing your finances easier and more efficient. Our app is continuously evolving, bringing you the best tools to streamline your invoicing process.
        </p>
      </div>
      <div className="hoverDescription">
        <h2>{slideContent[hoveredIndex].title}</h2>
        <p>{slideContent[hoveredIndex].description}</p>
      </div>
      <div className="imageContainer">
        {slideContent.map((slide, index) => (
          <div
            key={index}
            className="imageBox"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <img src={slide.image} alt={slide.title} className="slideImage" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
