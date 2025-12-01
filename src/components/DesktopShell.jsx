'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import DesktopSidebar from '@/components/DesktopSidebar';
import DesktopProductPanel from '@/components/DesktopProductPanel';
import DesktopActions from '@/components/DesktopActions';

export default function DesktopShell({ items = [], children }) {
  const [activeProduction, setActiveProduction] = useState(() => {
    const productsGroup = items.find((item) => item.key === 'products' || item.label === 'Продукция');
    if (!productsGroup || !Array.isArray(productsGroup.children) || productsGroup.children.length === 0) {
      return null;
    }
    return productsGroup.children[0];
  });

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

  const handleProductSelect = useCallback((product) => {
    setActiveProduction(product);
  }, []);

  return (
      <DesktopRoot>
        <DesktopSidebar items={items} onProductSelect={handleProductSelect} activeProduct={activeProduction} /> 
          <DesktopMain>
            <DesktopProductPanel product={activeProduction} 
                                  onProductSelect={handleProductSelect} /> 
            { children }
          </DesktopMain> 
        <DesktopActions product={activeProduction} />
      </DesktopRoot>
  );
}

const DesktopRoot = styled.div`
  display: none;
  @media (min-width: 992px) {
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: 440px minmax(0, 1fr);
    color: rgb(var(--text));
  }
`;

const DesktopMain = styled.main`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;
