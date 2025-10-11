'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MobileNavProductionItem from '@/components/MobileNavProductionItem';
import MobileNavProductionPanel from '@/components/MobileNavProductionPanel';


const MenuWrapper = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'footerOffset',
})`
  ${({ footerOffset = 0 }) => {
    const safeOffset = Number.isFinite(footerOffset) ? Math.max(0, footerOffset) : 0;
    return `
      min-height: 100vh;
      padding: 1.25rem 1rem calc(2rem + ${safeOffset}px);
    `;
  }}
  background: rgba(21, 25, 31, 0.6);
  color: #f5f7fb;
  width: 100%;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 1;

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

const MenuItem = styled.li`
  scroll-margin-top: 120px;
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

const SubMenuItem = styled.li`
  scroll-margin-top: 120px;
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
  onProductionPanelToggle,
  footerOffset = 0,
  defaultExpandedKey,
}) {
  const [expandedItem, setExpandedItem] = useState(() => defaultExpandedKey ?? null);
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

  useEffect(() => {
    if (!activeProductionKey || !activeProduction || typeof window === 'undefined') {
      return undefined;
    }

    const resolveTarget = () => {
      const panelNode = activePanelRef.current;
      const fallbackTarget = productionRefs.current.get(activeProductionKey);
      return (
        panelNode?.querySelector('[data-production-panel-header]') ??
        panelNode ??
        fallbackTarget ??
        null
      );
    };

    const scrollToTarget = (behavior = 'smooth', headerOverride) => {
      const targetNode = resolveTarget();

      if (!targetNode) {
        return;
      }

      const headerNode = document.querySelector('[data-mobile-header]');
      const rawOffset =
        typeof headerOverride === 'number'
          ? headerOverride
          : headerNode?.getBoundingClientRect().height ?? 0;

      const headerOffset = Number.isFinite(rawOffset) ? Math.max(0, rawOffset) : 0;
      const targetTop = targetNode.getBoundingClientRect().top + window.scrollY;
      const scrollTop = Math.max(0, targetTop - headerOffset - 16);

      window.scrollTo({ top: scrollTop, behavior });
    };

    let cancelled = false;
    let rafId = window.requestAnimationFrame(() => {
      if (!cancelled) {
        scrollToTarget('smooth');
      }
    });

    let resizeObserver;
    let fallbackTimeoutId;
    const headerNode = document.querySelector('[data-mobile-header]');

    if (headerNode && typeof ResizeObserver !== 'undefined') {
      // Re-run alignment when the mobile header resizes (condenses) so the panel heading stays visible.
      resizeObserver = new ResizeObserver((entries) => {
        if (cancelled) {
          return;
        }

        const nextHeight = entries?.[0]?.contentRect?.height;
        scrollToTarget('auto', nextHeight);
      });

      resizeObserver.observe(headerNode);
    } else {
      fallbackTimeoutId = window.setTimeout(() => {
        if (!cancelled) {
          scrollToTarget('auto');
        }
      }, 220);
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      if (fallbackTimeoutId) {
        window.clearTimeout(fallbackTimeoutId);
      }
    };
  }, [activeProductionKey, activeProduction]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <MenuWrapper
      aria-label="Мобильное меню"
      footerOffset={footerOffset}
    >
      <MenuList>
        {items.map(({ key, label, href, children = [] }) => {
          const itemKey = key ?? label;
          const hasChildren = children.length > 0;
          const isExpanded = expandedItem === itemKey;

          return (
            <MenuItem key={itemKey}>
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
                      <SubMenuItem
                        key={childKey}
                        ref={isProduction ? registerProductionRef(childKey) : undefined}
                      >
                        {isProduction ? (
                          isPanelOpen ? (
                            <ProductionPanelHolder
                              id={`production-panel-${childKey}`}
                              ref={setActivePanelNode}
                            >
                              <MobileNavProductionPanel
                                product={activeProduction}
                                onClose={handleCloseProduction}
                              />
                            </ProductionPanelHolder>
                          ) : (
                            <ProductionRow>
                              <IconButton
                                type="button"
                                aria-label={isActive ? 'Скрыть товар' : 'Показать товар'}
                                aria-expanded={isPanelOpen}
                                aria-controls={`production-panel-${childKey}`}
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
                          )
                        ) : (
                          <SubMenuButton
                            type="button"
                            onClick={(event) => handleSelect(event, { ...child, parentKey: itemKey })}
                          >
                            <MenuIndicator expanded={isActive} />
                            <span>{child.label}</span>
                          </SubMenuButton>
                        )}
                      </SubMenuItem>
                    );
                  })}
                </SubMenu>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </MenuWrapper>
  );
}

const ProductionPanelHolder = styled.div`
  margin-top: 0.75rem;
`;
