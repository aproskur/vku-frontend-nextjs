'use client';

import styled from 'styled-components';
import { useState, useCallback, useMemo } from 'react';
import { useOrder } from '@/context/OrderContext';

export default function MobileNavProductionPanel({ product, onClose }) {
  if (!product) {
    return null;
  }

  const { addItem, getItemQuantity } = useOrder();

  const {
    label,
    price,
    heroImageSrc,
    heroImageAlt,
    description,
    specifications = [],
    highlights = [],
    ctaLabel,
    ctaHref,
  } = product;

  const [sectionStates, setSectionStates] = useState(() => ({
    specifications: false,
    highlights: false,
    description: false,
  }));

  const currentQuantity = useMemo(() => getItemQuantity(product), [getItemQuantity, product]);

  const handleCtaClick = useCallback(
    (event) => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      addItem(product, 1);
    },
    [addItem, product],
  );

  const toggleSection = (key) => {
    setSectionStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Panel role="dialog" aria-labelledby="mobile-production-heading">
      <PanelHeader data-production-panel-header>
        <BackButton type="button" onClick={onClose} aria-label="Вернуться к списку">
          <BackIcon aria-hidden="true" />
        </BackButton>
        <HeaderText>
          <Heading id="mobile-production-heading">{label}</Heading>
        </HeaderText>
      </PanelHeader>

      <PanelBody>
        {heroImageSrc ? (
          <HeroImageWrapper>
            <HeroImage src={heroImageSrc} alt={heroImageAlt ?? label} />
          </HeroImageWrapper>
        ) : null}

        {specifications.length > 0 ? (
          <Section>
            <SectionTitle
              type="button"
              onClick={() => toggleSection('specifications')}
              $expanded={sectionStates.specifications}
            >
              <span>Характеристики</span>
              <SectionIndicator aria-hidden="true" $expanded={sectionStates.specifications} />
            </SectionTitle>
            <Collapsible $expanded={sectionStates.specifications}>
              <SpecList>
                {specifications.map((spec) => (
                  <SpecListItem key={`${spec.label}-${spec.value}`}>
                    <span>{spec.label}</span>
                    <span>{spec.value}</span>
                  </SpecListItem>
                ))}
              </SpecList>
            </Collapsible>
          </Section>
        ) : null}

        {highlights.length > 0 ? (
          <Section>
            <SectionTitle
              type="button"
              onClick={() => toggleSection('highlights')}
              $expanded={sectionStates.highlights}
            >
              <span>Сертификаты</span>
              <SectionIndicator aria-hidden="true" $expanded={sectionStates.highlights} />
            </SectionTitle>
            <Collapsible $expanded={sectionStates.highlights}>
              <HighlightList>
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </HighlightList>
            </Collapsible>
          </Section>
        ) : null}

        {description ? (
          <Section>
            <SectionTitle
              type="button"
              onClick={() => toggleSection('description')}
              $expanded={sectionStates.description}
            >
              <span>Описание</span>
              <SectionIndicator aria-hidden="true" $expanded={sectionStates.description} />
            </SectionTitle>
            <Collapsible $expanded={sectionStates.description}>
              <SectionCopy>{description}</SectionCopy>
            </Collapsible>
          </Section>
        ) : null}

        {ctaLabel ? (
          <CtaBar>
            <CtaButton type="button" onClick={handleCtaClick}>
              {ctaLabel}
            </CtaButton>
            {price ? <CtaPrice>{price}</CtaPrice> : null}
         {/*  {currentQuantity > 0 ? (
              <QuantityBadge role="status">В заказе: {currentQuantity}</QuantityBadge>
            ) : null} */}
          </CtaBar>
        ) : null}
      </PanelBody>
    </Panel>
  );
}

const Panel = styled.section`
  overflow: hidden;
  display: grid;
  position: relative;
`;

const PanelHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const BackButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: inherit;
  color: #808080;
`;

const BackIcon = styled.span`
  position: relative;
  width: 18px;
  height: 1px;
  content: '-';
  position: absolute;
  left: 10;
  width: 10px;
  height: 2px;
  background: currentColor;
  transform-origin: left center;

`;

const HeaderText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #f5f7fb;
  line-height: 36px;
`;

const PanelBody = styled.div`
  display: grid;
  gap: 1.25rem;
  padding: 1rem;
`;

const HeroImageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const HeroImage = styled.img`
  max-width: 328px;
  max-height: 450px;
  display: block;
  border: 3px solid rgba(var(--text-grey), 0.5);
`; 

const Section = styled.section`
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const SectionTitle = styled.button`
  width: 100%;
  margin: 0;
  padding: 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: rgb(var(--clr-sunny));
  background: none;
  border: none;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid rgba(245, 247, 251, 0.35);
    outline-offset: 4px;
  }
`;

const SectionIndicator = styled.span`
  position: relative;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    transition: transform 180ms ease, opacity 180ms ease;
  }

  &::before {
    width: 12px;
    height: 2px;
    border-radius: 999px;
    background: rgb(var(--text-grey));
    transform-origin: center;
    transform: ${({ $expanded }) => ($expanded ? 'scaleX(1)' : 'scaleX(0.2)')};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  }

  &::after {
    width: 8px;
    height: 8px;
    border-right: 2px solid rgb(var(--text-grey));
    border-bottom: 2px solid rgb(var(--text-grey));
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform: ${({ $expanded }) =>
      $expanded
        ? 'translate(-50%, -50%) rotate(-45deg) scale(0.6)'
        : 'translate(-50%, -50%) rotate(45deg) scale(1)'};
    opacity: ${({ $expanded }) => ($expanded ? 0 : 1)};
  }
`;

const Collapsible = styled.div`
  overflow: hidden;
  transition: max-height 220ms ease;
  max-height: ${({ $expanded }) => ($expanded ? '1000px' : '0')};
`;

const SpecList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const SpecListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0rem;
  font-size: 1rem;
  line-height: 24px;
  border-bottom: 1px solid rgba(128,128,128, 0.5);
`;

const HighlightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(245, 247, 251, 0.85);
`;

const SectionCopy = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 24px;
  color: rgba(245, 247, 251, 0.82);
`;

const CtaBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CtaButton = styled.button`
  flex: 1;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  background: rgb(var(--clr-sunny));
  color: rgb(var(--clr-dark-blue));
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid rgba(17, 22, 31, 0.4);
    outline-offset: 2px;
  }
`;

const CtaPrice = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
`;

const QuantityBadge = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(245, 247, 251, 0.85);
`;
