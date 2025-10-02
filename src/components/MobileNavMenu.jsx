'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const MenuWrapper = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'topOffset' && prop !== 'condensed',
})`
  padding: 1.25rem 1rem 2rem;
  background: rgba(21, 25, 31, ${({ condensed }) => (condensed ? 0.92 : 0.7)});
  backdrop-filter: blur(${({ condensed }) => (condensed ? '6px' : '3px')});
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
  font-size: 1rem;
  letter-spacing: 0.02em;
`;

const Indicator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
`;

const SubMenu = styled.ul`
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0 0 0 1.75rem;
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
}) {
  const menuRef = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedLeafKey, setSelectedLeafKey] = useState(null);

  const handleToggle = (itemKey) => {
    setExpandedItem((current) => (current === itemKey ? null : itemKey));
    setSelectedLeafKey(null);
  };

  const handleSelect = (event, item) => {
    if (item && !item.parentKey) {
      setExpandedItem(null);
    }

    if (item) {
      const derivedKey = item.key ?? item.label;
      if (derivedKey) {
        setSelectedLeafKey(derivedKey);
      }
    }

    if (onItemSelect) {
      onItemSelect(event, item);
    }
  };

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

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <MenuWrapper
      ref={menuRef}
      aria-label="Мобильное меню"
      topOffset={topOffset}
      condensed={condensed}
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
                    return (
                      <li key={childKey}>
                        <SubMenuButton
                          type="button"
                          onClick={(event) => handleSelect(event, { ...child, parentKey: itemKey })}
                        >
                          <MenuIndicator expanded={selectedLeafKey === childKey} />
                          <span>{child.label}</span>
                        </SubMenuButton>
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
