'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import MobileHeader from '@/components/MobileHeader';
import MobileNavMenu from '@/components/MobileNavMenu';

const Background = styled.div`
  position: fixed;
  inset: 0;
  background: url('/images/mobile-background.png') center / cover no-repeat;
  z-index: -1;

  @media (min-width: 992px) {
    display: none;
  }
`;

const Spacer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'height',
})`
  height: ${({ height = 0 }) => `${Math.max(0, height)}px`};
  transition: height 180ms ease;

  @media (min-width: 992px) {
    display: none;
  }
`;

export default function MobileNavigationShell({ items }) {
  const [headerHeight, setHeaderHeight] = useState(80);
  const [menuHeight, setMenuHeight] = useState(0);
  const [isHeaderCondensed, setIsHeaderCondensed] = useState(false);
  const [forceCondensed, setForceCondensed] = useState(false);

  const handleHeaderHeightChange = useCallback((height) => {
    setHeaderHeight((current) => {
      if (!height) return current;
      return Math.abs(current - height) > 1 ? height : current;
    });
  }, []);

  const handleMenuHeightChange = useCallback((height) => {
    setMenuHeight((current) => {
      if (!height) return current;
      return Math.abs(current - height) > 1 ? height : current;
    });
  }, []);

  const spacerHeight = headerHeight + menuHeight;

  const handleProductionPanelToggle = useCallback((isOpen) => {
    setForceCondensed(isOpen);
    setIsHeaderCondensed(isOpen);
  }, []);

  return (
    <>
      <Background aria-hidden="true" />
      <MobileHeader
        onHeightChange={handleHeaderHeightChange}
        onCondensedChange={setIsHeaderCondensed}
        forceCondensed={forceCondensed}
      />
      <MobileNavMenu
        items={items}
        topOffset={headerHeight}
        onHeightChange={handleMenuHeightChange}
        condensed={isHeaderCondensed}
        onProductionPanelToggle={handleProductionPanelToggle}
      />
      <Spacer height={spacerHeight} />
    </>
  );
}
