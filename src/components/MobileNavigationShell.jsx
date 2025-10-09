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

const HeaderSpacer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'height',
})`
  height: ${({ height = 0 }) => `${Math.max(0, height)}px`};
  display: ${({ height = 0 }) => (height > 0 ? 'block' : 'none')};

  @media (min-width: 992px) {
    display: none;
  }
`;

export default function MobileNavigationShell({ items }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isHeaderCondensed, setIsHeaderCondensed] = useState(false);
  const [forceCondensed, setForceCondensed] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isProductionPanelOpen, setIsProductionPanelOpen] = useState(false);

  const isFooterVisible = isHeaderCondensed || isProductionPanelOpen;
  const spacerHeight = isHeaderCondensed ? headerHeight : 0;

  const handleHeaderHeightChange = useCallback((height) => {
    setHeaderHeight((current) => {
      if (!height) return current;
      return Math.abs(current - height) > 1 ? height : current;
    });
  }, []);

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
        scrollThreshold={{ enter: 96, exit: 32 }}
      />
      <HeaderSpacer height={spacerHeight} />
      <MobileNavMenu
        items={items}
        onProductionPanelToggle={handleProductionPanelToggle}
        footerOffset={isFooterVisible ? footerHeight : 0}
        defaultExpandedKey={"products"}
      />
      <MobileNavFooter
        visible={isFooterVisible}
        onHeightChange={setFooterHeight}
      />
      <MobileOrderCartIndicator bottomOffset={isFooterVisible ? footerHeight : 0} />
    </>
  );
}
