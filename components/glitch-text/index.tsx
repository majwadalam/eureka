const GlitchText = ({ children } : {
    children: React.ReactNode;
}) => (
  <span className="relative inline-block">
    <span className="absolute top-0 left-0 -ml-1 text-red-500 opacity-70 animate-glitch1">{children}</span>
    <span className="absolute top-0 left-0 -ml-1 text-blue-500 opacity-70 animate-glitch2">{children}</span>
    <span className="relative">{children}</span>
  </span>
);

export default GlitchText;