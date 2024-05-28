import { useEffect, useState } from 'react';

const useBackgroundColor = () => {

  const [gradient, setGradient] = useState({
    start: 'rgba(255, 255, 255, 0.8)',
    end: 'rgba(0, 0, 255, 0.8)'
  });

  useEffect(() => {
    const updateGradient = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      setGradient({
        start: `rgba(194, 86, 236, ${1 - Math.max(x, y)})`,
        end: `rgba(0, 0, 255, ${Math.max(x, y)})`
      });
    };

    window.addEventListener('mousemove', updateGradient);

    return () => {
      window.removeEventListener('mousemove', updateGradient);
    };
  }, []);

  return {
    background: `linear-gradient(to right, ${gradient.start}, ${gradient.end})`,
    transition: 'background 1s ease'
  };
};

export default useBackgroundColor;
