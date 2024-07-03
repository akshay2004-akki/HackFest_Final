import React, { useEffect, useRef } from 'react';
// import './CircularProgress.css';

function CircularProgress({ percentage }) {
  const radius = 100; // Increased radius for a larger circle
  const stroke = 14; // Increased stroke width
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const circleRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
    }
  }, []);

  return (
    <svg height={radius * 2} width={radius * 2}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4caf50', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#81c784', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        ref={circleRef}
        stroke="url(#gradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        strokeLinecap="round"
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="2em" // Increased font size for percentage
        fill="#4caf50"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
}

export default CircularProgress;
