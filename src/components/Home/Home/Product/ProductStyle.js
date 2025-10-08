export const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f1f5f9 0%, #f3e8ff 50%, #fdf2f8 100%)',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Inter', sans-serif"
};

export const bgElement1Style = {
  position: 'absolute',
  top: '-10rem',
  right: '-10rem',
  width: '20rem',
  height: '20rem',
  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
  borderRadius: '50%',
  opacity: 0.2,
  animation: 'pulse 4s ease-in-out infinite'
};

export const bgElement2Style = {
  position: 'absolute',
  bottom: '-10rem',
  left: '-12rem',
  width: '24rem',
  height: '24rem',
  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
  borderRadius: '50%',
  opacity: 0.15,
  animation: 'pulse 4s ease-in-out infinite 1s'
};

export const bgElement3Style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '16rem',
  height: '16rem',
  background: 'linear-gradient(90deg, #f472b6, #a855f7)',
  borderRadius: '50%',
  opacity: 0.1,
  animation: 'rotate 20s linear infinite'
};

export const mainContainerStyle = {
  position: 'relative',
  zIndex: 10,
  padding: '4rem 1rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

export const heroStyle = {
  textAlign: 'center',
  marginBottom: '4rem'
};

export const mainTitleStyle = {
  fontSize: '4rem',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #7c3aed, #ec4899, #ef4444)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '1.5rem',
  letterSpacing: '-0.02em'
};

export const subtitleStyle = {
  fontSize: '1.25rem',
  color: '#6b7280',
  maxWidth: '32rem',
  margin: '0 auto',
  lineHeight: 1.6
};

export const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: '2rem',
  marginBottom: '4rem'
};

export const getServiceCardStyle = (isHovered) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(16px)',
  borderRadius: '1.5rem',
  padding: '2rem',
  boxShadow: isHovered 
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
    : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  cursor: 'pointer'
});

export const cardOverlayStyle = (isHovered, gradient) => ({
  position: 'absolute',
  inset: 0,
  background: gradient,
  opacity: isHovered ? 0.05 : 0,
  transition: 'opacity 0.5s',
  borderRadius: '1.5rem',
  pointerEvents: 'none'
});

export const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '2rem',
  position: 'relative',
  zIndex: 2
};

export const getCardIconStyle = (gradient, isHovered) => ({
  padding: '0.75rem',
  borderRadius: '1rem',
  background: gradient,
  color: 'white',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const cardTitleStyle = {
  fontSize: '1.875rem',
  fontWeight: 700,
  color: '#1f2937',
  margin: 0
};

export const getCardNumberStyle = (isHovered) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem',
  fontWeight: 700,
  color: '#6b7280',
  transition: 'transform 0.3s',
  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
});

export const servicesListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'relative',
  zIndex: 2
};

export const getServiceItemStyle = (isHovered) => ({
  padding: '1rem',
  borderRadius: '1rem',
  background: 'linear-gradient(135deg, #ffffff, #f9fafb)',
  border: isHovered ? '1px solid #a855f7' : '1px solid #e5e7eb',
  boxShadow: isHovered 
    ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  transform: isHovered ? 'scale(1.02)' : 'scale(1)'
});

export const getServiceItemIconStyle = (gradient, isHovered) => ({
  padding: '0.5rem',
  borderRadius: '0.75rem',
  background: gradient,
  color: 'white',
  transition: 'transform 0.2s',
  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const getServiceItemTitleStyle = (isHovered) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: isHovered ? '#7c3aed' : '#374151',
  marginBottom: '0.25rem',
  transition: 'color 0.3s',
  margin: 0
});

export const getServiceItemDescStyle = (isHovered) => ({
  fontSize: '0.875rem',
  color: isHovered ? '#374151' : '#6b7280',
  transition: 'color 0.3s',
  margin: 0
});

export const ctaSectionStyle = {
  textAlign: 'center',
  marginTop: '4rem'
};

export const ctaCardStyle = {
  display: 'inline-block',
  padding: '2rem',
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(16px)',
  borderRadius: '1.5rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
};

export const ctaTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#1f2937',
  marginBottom: '1rem'
};

export const ctaTextStyle = {
  color: '#6b7280',
  marginBottom: '1.5rem',
  maxWidth: '28rem',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export const ctaButtonStyle = {
  padding: '1rem 2rem',
  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
  color: 'white',
  border: 'none',
  borderRadius: '1rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s'
};