'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import DesktopSidebar from '@/components/DesktopSidebar';
import DesktopProductPanel from '@/components/DesktopProductPanel';
import DesktopActions from '@/components/DesktopActions';
import DesktopMap from './DesktopMap';

  const  VIEW_MODES = {
    PRODUCTS: 'products',
    MAP: 'map',
    ABOUT: 'about',
  };

export default function DesktopShell({ items = [], children }) {
  const [activeProduction, setActiveProduction] = useState(() => {
    const productsGroup = items.find((item) => item.key === 'products' || item.label === 'Продукция');
    if (!productsGroup || !Array.isArray(productsGroup.children) || productsGroup.children.length === 0) {
      return null;
    }
    return productsGroup.children[0];
  });

  const [viewMode, setViewMode] = useState(VIEW_MODES.PRODUCTS);

  const productionItems = useMemo(() => {
    const productsGroup = items.find((item) => item.key === 'products' || item.label === 'Продукция');
    if (!productsGroup || !Array.isArray(productsGroup.children)) {
      return [];
    }
    return productsGroup.children;
  }, [items]);

  useEffect(() => {
    if (productionItems.length === 0) {
      if (activeProduction !== null) {
        setActiveProduction(null);
      }
      return;
    }

    if (!activeProduction) {
      setActiveProduction(productionItems[0]);
      return;
    }

    const activeKey = activeProduction.key ?? activeProduction.label;
    const existsInList = productionItems.some(
      (product) => (product.key ?? product.label) === activeKey,
    );

    if (!existsInList) {
      setActiveProduction(productionItems[0]);
    }
  }, [productionItems, activeProduction]);

  const handleProductSelect = (product) => {
    setActiveProduction(product);
    setViewMode(VIEW_MODES.PRODUCTS);
  };

const handleSidebarSelect = (itemKey, item) => {
  if (itemKey === VIEW_MODES.MAP) {
    setViewMode(VIEW_MODES.MAP);
    console.log('Switch to MAP view');
    return;
  }

  if (itemKey === VIEW_MODES.PRODUCTS) {
    setViewMode(VIEW_MODES.PRODUCTS);
  }

    if (itemKey === VIEW_MODES.ABOUT) {
    setViewMode(VIEW_MODES.ABOUT);
    console.log('Switch to ABOUT view');
  }

  if (item?.key && item.key !== activeProduction?.key) {
    handleProductSelect(item);
  }
};


  return (
      <DesktopRoot>
        <DesktopSidebar items={items}
                        onItemSelect={handleSidebarSelect}
                        onProductSelect={handleProductSelect} 
                        activeProduct={activeProduction} /> 
        <DesktopMain>
          {viewMode === VIEW_MODES.MAP && <DesktopMap />}
          {viewMode === VIEW_MODES.PRODUCTS && 
          <DesktopProductPanel product={activeProduction} onProductSelect={handleProductSelect} /> 
}
          { children }
        </DesktopMain>
        {viewMode === VIEW_MODES.PRODUCTS &&  
        <DesktopActions product={activeProduction} />
}
      </DesktopRoot>
  );
}

const DesktopRoot = styled.div`
  display: none;
  @media (min-width: 992px) {
    position: relative;
    height: 100vh;
    min-height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: 440px minmax(0, 1fr);
    color: rgb(var(--text));
    overflow: hidden;
  }
`;

const DesktopMain = styled.main`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
`;
