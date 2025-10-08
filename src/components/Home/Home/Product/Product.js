import React, { useState } from 'react';
import Header from "../Header/header";
import Footer from "../Footer/footer";
import {
  containerStyle,
  bgElement1Style,
  bgElement2Style,
  bgElement3Style,
  mainContainerStyle,
  heroStyle,
  mainTitleStyle,
  subtitleStyle,
  servicesGridStyle,
  getServiceCardStyle,
  cardOverlayStyle,
  cardHeaderStyle,
  getCardIconStyle,
  cardTitleStyle,
  getCardNumberStyle,
  servicesListStyle,
  getServiceItemStyle,
  getServiceItemIconStyle,
  getServiceItemTitleStyle,
  getServiceItemDescStyle,
  ctaSectionStyle,
  ctaCardStyle,
  ctaTitleStyle,
  ctaTextStyle,
  ctaButtonStyle
} from './ProductStyle';

const Product = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const services = [
    {
      title: "Client Solutions",
      icon: "💼",
      gradient: "linear-gradient(135deg, #7c3aed, #ec4899, #ef4444)",
      items: [
        { name: "Manpower Services", icon: "👥", description: "Comprehensive workforce solutions" },
        { name: "Onboard Services", icon: "✅", description: "Seamless integration process" },
        { name: "Payroll Management", icon: "🏆", description: "Efficient payroll processing" }
      ]
    },
    {
      title: "Candidate Development",
      icon: "🎓",
      gradient: "linear-gradient(135deg, #2563eb, #7c3aed, #ec4899)",
      items: [
        { name: "Strategic Placement", icon: "✅", description: "Perfect job matching" },
        { name: "Skill Training", icon: "🏆", description: "Professional development" },
        { name: "Academic Support", icon: "📚", description: "Educational advancement" }
      ]
    }
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @media (max-width: 768px) {
            .main-title {
              font-size: 2.5rem !important;
            }
            .services-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      <Header />
      <div style={containerStyle}>
        <div style={bgElement1Style}></div>
        <div style={bgElement2Style}></div>
        <div style={bgElement3Style}></div>

        <div style={mainContainerStyle}>
          {/* Hero Section */}
          <div style={heroStyle}>
            <h1 className="main-title" style={mainTitleStyle}>Our Services</h1>
            <p style={subtitleStyle}>
              Empowering businesses and careers through innovative solutions and strategic partnerships
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid" style={servicesGridStyle}>
            {services.map((service, serviceIndex) => (
              <div
                key={serviceIndex}
                style={getServiceCardStyle(hoveredCard === serviceIndex)}
                onMouseEnter={() => setHoveredCard(serviceIndex)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={cardOverlayStyle(hoveredCard === serviceIndex, service.gradient)}></div>
                <div style={getCardNumberStyle(hoveredCard === serviceIndex)}>
                  {String(serviceIndex + 1).padStart(2, '0')}
                </div>
                <div style={cardHeaderStyle}>
                  <div style={getCardIconStyle(service.gradient, hoveredCard === serviceIndex)}>
                    {service.icon}
                  </div>
                  <h2 style={cardTitleStyle}>{service.title}</h2>
                </div>
                <div style={servicesListStyle}>
                  {service.items.map((item, itemIndex) => {
                    const itemKey = `${serviceIndex}-${itemIndex}`;
                    const isItemHovered = hoveredItem === itemKey;
                    return (
                      <div
                        key={itemIndex}
                        style={getServiceItemStyle(isItemHovered)}
                        onMouseEnter={() => setHoveredItem(itemKey)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div style={getServiceItemIconStyle(service.gradient, isItemHovered)}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={getServiceItemTitleStyle(isItemHovered)}>
                            {item.name}
                          </h3>
                          <p style={getServiceItemDescStyle(isItemHovered)}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div style={ctaSectionStyle}>
            <div style={ctaCardStyle}>
              <h3 style={ctaTitleStyle}>Ready to Transform Your Business?</h3>
              <p style={ctaTextStyle}>
                Let's discuss how our comprehensive services can drive your success forward
              </p>
              <button
                style={ctaButtonStyle}
                onMouseEnter={e => {
                  e.target.style.background = 'linear-gradient(135deg, #6d28d9, #db2777)';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'linear-gradient(135deg, #7c3aed, #ec4899)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Product;