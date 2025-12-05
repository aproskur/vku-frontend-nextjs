'use client';

import { useState } from 'react';
import styled from 'styled-components';

// Update this array with your real points + overlays
const HOTSPOTS = [
  {
    id: 'overlay1',
    cx: 1110,
    cy: 441,
    r: 20,
    fill: 'rgba(0, 0, 0, 0)',
    overlayHref: '/images/roads-yurochkino.webp',
  },
  {
    id: 'overlay2',
    cx: 520,
    cy: 539,
    r: 20,
    fill: 'rgba(0, 0, 0, 0)',
    overlayHref: '/images/road-2.webp',
  },
];

export default function DesktopMap() {
  const [activeOverlayId, setActiveOverlayId] = useState(null);

  return (
    <MapSection>
      <MapContainer>
        <MapSvg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid meet"
            onMouseMove={(e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) * 1920) / width;
    const y = ((e.clientY - top) * 1080) / height;
    console.log(Math.round(x), Math.round(y));
  }}
        >
          {/* Base map image (main PNG/WebP from designer) */}
          <image
            href="/images/map-desktop.webp" // must be under public/images/map-main.webp
            x="0"
            y="0"
            width="1920"
            height="1080"
          />

          {/* Overlays (full-size images that sit on top of the base map) */}
          {HOTSPOTS.map((spot) => (
            <OverlayImage
              key={spot.id}
              href={spot.overlayHref}
              x="0"
              y="0"
              width="1920"
              height="1080"
              $visible={activeOverlayId === spot.id}
            />
          ))}

          {/* Hotspot circles that control which overlay is shown */}
          {HOTSPOTS.map((spot) => (
            <circle
              key={`${spot.id}-circle`}
              cx={spot.cx}
              cy={spot.cy}
              r={spot.r}
              fill={spot.fill}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setActiveOverlayId(spot.id)}
              onMouseLeave={() =>
                setActiveOverlayId((current) =>
                  current === spot.id ? null : current
                )
              }
            />
          ))}
        </MapSvg>
      </MapContainer>
    </MapSection>
  );
}

/* ---- styled-components ---- */

const MapSection = styled.section`
  position: fixed;
  inset: 0;           /* full viewport: top/right/bottom/left 0 */
  z-index: 0;         /* background layer */
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1024px) {
    display: none;    /* desktop-only */
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MapSvg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

// overlay images inside the SVG, visibility controlled by state
const OverlayImage = styled.image`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 150ms ease-out;
  pointer-events: none;
`;
