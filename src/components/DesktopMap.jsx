'use client';

import { useState } from 'react';
import styled from 'styled-components';

// Update this array with your real points + overlays
const HOTSPOTS = [
  {
    id: 'overlay1',
    cx: 472,
    cy: 396,
    r: 20,
    fill: 'rgba(0, 255, 0, 0.5)', // tmp
    overlayHref: '/images/road-1.webp',
  },
  {
    id: 'overlay2',
    cx: 520,
    cy: 539,
    r: 20,
    fill: 'rgba(255, 192, 203, 0.5)', // tmp
    overlayHref: '/images/road-2.webp',
  },
];

export default function DesktopMap() {
  const [activeOverlayId, setActiveOverlayId] = useState(null);

  return (
    <MapSection>
      <MapContainer>
        <MapSvg
          viewBox="0 0 1800 1012"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Base map image (main PNG/WebP from designer) */}
          <image
            href="/images/map-main.webp" // must be under public/images/map-main.webp
            x="0"
            y="0"
            width="1800"
            height="1012"
          />

          {/* Overlays (full-size images that sit on top of the base map) */}
          {HOTSPOTS.map((spot) => (
            <OverlayImage
              key={spot.id}
              href={spot.overlayHref}
              x="0"
              y="0"
              width="1800"
              height="1012"
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
