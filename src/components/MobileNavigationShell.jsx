'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import MobileHeader from '@/components/MobileHeader';
import MobileNavMenu from '@/components/MobileNavMenu';
import MobileNavFooter from '@/components/MobileNavFooter';
import MobileOrderCartIndicator from '@/components/MobileOrderCartIndicator';

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
  const [footerHeight, setFooterHeight] = useState(0);
  const [isProductionPanelOpen, setIsProductionPanelOpen] = useState(false);
  const [menuScrollElement, setMenuScrollElement] = useState(null);

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

  const isFooterVisible = isHeaderCondensed || isProductionPanelOpen;
  const spacerHeight = headerHeight + menuHeight + (isFooterVisible ? footerHeight : 0);

  const handleProductionPanelToggle = useCallback((isOpen) => {
    setForceCondensed(isOpen);
    if (isOpen) {
      setIsHeaderCondensed(true);
    }
    setIsProductionPanelOpen(isOpen);
  }, []);

  return (
    <>
      <Background aria-hidden="true" />
      <MobileHeader
        onHeightChange={handleHeaderHeightChange}
        onCondensedChange={setIsHeaderCondensed}
        forceCondensed={forceCondensed}
        scrollElement={menuScrollElement}
      />
      <MobileNavMenu
        items={items}
        topOffset={headerHeight}
        onHeightChange={handleMenuHeightChange}
        condensed={isHeaderCondensed}
        onProductionPanelToggle={handleProductionPanelToggle}
        footerOffset={isFooterVisible ? footerHeight : 0}
        onScrollContainerChange={setMenuScrollElement}
      />
      <MobileNavFooter
        visible={isFooterVisible}
        onHeightChange={setFooterHeight}
      />
      <MobileOrderCartIndicator bottomOffset={isFooterVisible ? footerHeight : 0} />
      <Spacer height={spacerHeight} />
    </>
  );
}
