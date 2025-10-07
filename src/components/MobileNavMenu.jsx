'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MobileNavProductionItem from '@/components/MobileNavProductionItem';
import MobileNavProductionPanel from '@/components/MobileNavProductionPanel';

const MOBILE_LAYER_BG = 'var(--mobile-layer-bg)';
const MOBILE_LAYER_BG_STRONG = 'var(--mobile-layer-bg-strong)';
const MOBILE_LAYER_OVERLAY = 'var(--mobile-layer-overlay)';
const MOBILE_LAYER_BORDER = 'var(--mobile-layer-border)';

const MenuWrapper = styled.nav.withConfig({
  shouldForwardProp: (prop) => !['topOffset', 'condensed', 'footerOffset'].includes(prop),
})`
  ${({ footerOffset = 0 }) => {
    const safeOffset = Number.isFinite(footerOffset) ? Math.max(0, footerOffset) : 0;
    return `padding: 1.25rem 1rem calc(2rem + ${safeOffset}px);`;
  }}
  background: rgba(21, 25, 31, 0.6);
  color: #f5f7fb;
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  ${({ topOffset = 0 }) => {
    const safeOffset = Number.isFinite(topOffset) ? Math.max(0, topOffset) : 0;
    return `
      top: ${safeOffset}px;
      max-height: calc(100vh - ${safeOffset}px);
    `;
  }}
  overflow-y: auto;
  z-index: 9;

  @media (min-width: 992px) {
    display: none;
  }
`;

const MenuList = styled.ul`
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 3px;
  }
`;

const ItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 3px;
  }
`;

const Label = styled.span`
  font-size: 1.25rem;
  line-height: 36px;
`;

const Indicator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  flex: 0 0 16px;
  color:rgb(var(--text-grey));
`;

const SubMenu = styled.ul`
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0 0 0 0.5rem;
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  gap: 0.5rem;
`;

const SubMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: rgba(245, 247, 251, 0.92);
  font-size: 0.95rem;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  width: 100%;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 3px;
  }
`;

const ProductionRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 8px;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  min-width: 28px;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 2px;
  }
`;

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1.25L6 5.75L11 1.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title>Развернуть</title>
    </svg>
  );
}

function LineIcon() {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="11" height="1" fill="currentColor" rx="0.5" />
    </svg>
  );
}

function MenuIndicator({ expanded }) {
  return <Indicator aria-hidden="true">{expanded ? <LineIcon /> : <ArrowIcon />}</Indicator>;
}

export default function MobileNavMenu({
  items,
  onItemSelect,
  topOffset = 0,
  onHeightChange,
  condensed = false,
  onProductionPanelToggle,
  footerOffset = 0,
}) {
  const menuRef = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedLeafKey, setSelectedLeafKey] = useState(null);
  const [activeProduction, setActiveProduction] = useState(null);
  const [activeProductionKey, setActiveProductionKey] = useState(null);
  const productionRefs = useRef(new Map());
  const activePanelRef = useRef(null);

  const handleToggle = (itemKey) => {
    const isSame = expandedItem === itemKey;

    if (!isSame) {
      setActiveProduction(null);
      setActiveProductionKey(null);
      if (typeof onProductionPanelToggle === 'function') {
        onProductionPanelToggle(false);
      }
      setExpandedItem(itemKey);
    } else {
      setActiveProduction(null);
      setActiveProductionKey(null);
      if (typeof onProductionPanelToggle === 'function') {
        onProductionPanelToggle(false);
      }
      setExpandedItem(null);
    }

    setSelectedLeafKey(null);
  };

  const handleSelect = (event, item) => {
    if (item && !item.parentKey) {
      setExpandedItem(null);
    }

    if (item) {
      const derivedKey = item.key ?? item.label;

      if (item.variant === 'production') {
        if (activeProductionKey === derivedKey) {
          setActiveProduction(null);
          setActiveProductionKey(null);
          setSelectedLeafKey(null);
          if (typeof onProductionPanelToggle === 'function') {
            onProductionPanelToggle(false);
          }
        } else {
          setActiveProduction(item);
          setActiveProductionKey(derivedKey ?? null);
          if (derivedKey) {
            setSelectedLeafKey(derivedKey);
          }
          if (typeof onProductionPanelToggle === 'function') {
            onProductionPanelToggle(true);
          }
        }
      } else {
        if (derivedKey) {
          setSelectedLeafKey(derivedKey);
        }
        setActiveProduction(null);
        setActiveProductionKey(null);
        if (typeof onProductionPanelToggle === 'function') {
          onProductionPanelToggle(false);
        }
      }
    }

    if (onItemSelect) {
      onItemSelect(event, item);
    }
  };

  const handleCloseProduction = () => {
    setActiveProduction(null);
    setActiveProductionKey(null);
    setSelectedLeafKey(null);
    if (typeof onProductionPanelToggle === 'function') {
      onProductionPanelToggle(false);
    }
  };

  const registerProductionRef = useCallback(
    (key) => (node) => {
      if (!productionRefs.current) return;
      if (!node) {
        productionRefs.current.delete(key);
      } else {
        productionRefs.current.set(key, node);
      }
    },
    [],
  );

  const setActivePanelNode = useCallback((node) => {
    activePanelRef.current = node;
  }, []);

  const reportHeight = useCallback(() => {
    if (!onHeightChange || !menuRef.current) return;
    onHeightChange(menuRef.current.getBoundingClientRect().height);
  }, [onHeightChange]);

  useEffect(() => {
    reportHeight();
  }, [reportHeight, expandedItem, items, topOffset]);

  useEffect(() => {
    if (!onHeightChange || typeof ResizeObserver === 'undefined') return;
    const element = menuRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => reportHeight());
    observer.observe(element);

    return () => observer.disconnect();
  }, [onHeightChange, reportHeight]);

  useEffect(() => {
    if (!activeProductionKey) {
      return;
    }

    const menu = menuRef.current;
    const panelNode = activePanelRef.current;
    const fallbackTarget = productionRefs.current.get(activeProductionKey);
    const target = panelNode?.querySelector('[data-production-panel-header]') ?? panelNode ?? fallbackTarget;

    if (!menu || !target) {
      return;
    }

    const menuRect = menu.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = targetRect.top - menuRect.top;

    menu.scrollTo({
      top: menu.scrollTop + offset - 16,
      behavior: 'smooth',
    });
  }, [activeProductionKey, activeProduction]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <MenuWrapper
      ref={menuRef}
      aria-label="Мобильное меню"
      topOffset={topOffset}
      condensed={condensed}
      footerOffset={footerOffset}
    >
      <MenuList>
        {items.map(({ key, label, href, children = [] }) => {
          const itemKey = key ?? label;
          const hasChildren = children.length > 0;
          const isExpanded = expandedItem === itemKey;

          return (
            <li key={itemKey}>
              {hasChildren ? (
                <ToggleButton
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`submenu-${itemKey}`}
                  onClick={() => handleToggle(itemKey)}
                >
                  <ItemRow>
                    <MenuIndicator expanded={isExpanded} />
                    <Label>{label}</Label>
                  </ItemRow>
                </ToggleButton>
              ) : (
                <ItemButton
                  type="button"
                  onClick={(event) => handleSelect(event, { key, label, href })}
                >
                  <ItemRow>
                    <MenuIndicator expanded={selectedLeafKey === itemKey} />
                    <Label>{label}</Label>
                  </ItemRow>
                </ItemButton>
              )}

              {hasChildren && (
                <SubMenu id={`submenu-${itemKey}`} $open={isExpanded}>
                  {children.map((child) => {
                    const childKey = child.key ?? child.label;
                    const isProduction = child.variant === 'production';
                    const isActive = selectedLeafKey === childKey;
                    const isPanelOpen = activeProductionKey === childKey && activeProduction;

                    return (
                      <li key={childKey} ref={isProduction ? registerProductionRef(childKey) : undefined}>
                        {isProduction ? (
                          <>
                            <ProductionRow>
                              <IconButton
                                type="button"
                                aria-label={isActive ? 'Скрыть товар' : 'Показать товар'}
                                onClick={(event) =>
                                  handleSelect(event, { ...child, parentKey: itemKey })
                                }
                              >
                                <MenuIndicator expanded={isActive} />
                              </IconButton>
                              <MobileNavProductionItem
                                label={child.label}
                                price={child.price}
                                imageSrc={child.imageSrc}
                                active={isActive}
                                onClick={(event) =>
                                  handleSelect(event, { ...child, parentKey: itemKey })
                                }
                              />
                            </ProductionRow>
                            {isPanelOpen ? (
                              <ProductionPanelHolder ref={setActivePanelNode}>
                                <MobileNavProductionPanel
                                  product={activeProduction}
                                  onClose={handleCloseProduction}
                                />
                              </ProductionPanelHolder>
                            ) : null}
                          </>
                        ) : (
                          <SubMenuButton
                            type="button"
                            onClick={(event) => handleSelect(event, { ...child, parentKey: itemKey })}
                          >
                            <MenuIndicator expanded={isActive} />
                            <span>{child.label}</span>
                          </SubMenuButton>
                        )}
                      </li>
                    );
                  })}
                </SubMenu>
              )}
            </li>
          );
        })}
      </MenuList>
    </MenuWrapper>
  );
}

const ProductionPanelHolder = styled.div`
  margin-top: 0.75rem;
`;
