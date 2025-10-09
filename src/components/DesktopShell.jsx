'use client';

import { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import DesktopSidebar from '@/components/DesktopSidebar';
import DesktopProductPanel from '@/components/DesktopProductPanel';
import DesktopActions from '@/components/DesktopActions';

export default function DesktopShell({ items = [], children }) {
  const [activeProduction, setActiveProduction] = useState(null);

  const productionItems = useMemo(() => {
    const productsGroup = items.find((item) => item.key === 'products' || item.label === 'Продукция');
    if (!productsGroup || !Array.isArray(productsGroup.children)) {
      return [];
    }
    return productsGroup.children;
  }, [items]);

  const handleProductSelect = useCallback((product) => {
    setActiveProduction(product);
  }, []);

  return (
    <>
      <DesktopRoot>
       {/* <DesktopSidebar items={items} onProductSelect={handleProductSelect} activeProduct={activeProduction} /> */}
       {/* <DesktopMain>
          <DesktopProductPanel product={activeProduction} onProductSelect={handleProductSelect} />
        </DesktopMain> */}
        <DesktopActions product={activeProduction} />
      </DesktopRoot>
      {children}
    </>
  );
}

const DesktopRoot = styled.div`
  display: none;
  @media (min-width: 992px) {
    position: fixed;
    inset: 0;
    display: grid;
    grid-template-columns: 360px 1fr;
    background: url('/images/background-desktop.webp') center / cover no-repeat;
    color: rgb(var(--text));
  }
`;

const DesktopMain = styled.main`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
