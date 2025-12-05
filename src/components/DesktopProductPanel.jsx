'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PanelRoot = styled.section`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    min-height: 100vh;
    overflow: visible;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 56px 48px 44px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  min-width: 0;
  max-width: min(1100px, calc(100% - 48px));
  align-self: center;
`;

const PanelHeader = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, .65);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 2;
`;

const PanelTitle = styled(Title)`
  flex: 1;

`;

const DescriptionBlock = styled.div`
  display: grid;
  gap: 16px;
`;

const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.65);
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75;
  text-align: justify;
  color: rgba(255, 255, 255, 0.9);
`;

const PanelDivider = styled(Divider)`
  margin-bottom: 16px;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $hasImage }) =>
    $hasImage ? 'clamp(320px, 33vw, 420px) minmax(0, 1fr)' : 'minmax(0, 1fr)'};
  gap: 48px;
  align-items: start;
  min-width: 0;
`;

const ImageFrame = styled.div`
  width: 359px;
  height: 492px;
  border: 8px solid #828ea5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  text-align: left;
`;

const SectionHeading = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  line-height: 1.2;
  color: rgb(var(--clr-sunny));
`;

const SectionDivider = styled(Divider)``;

const Collapsible = styled.div`
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '2000px' : '0')};
  padding-top: ${({ $isOpen, $paddingTop = 0 }) => ($isOpen ? `${$paddingTop}px` : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition:
    max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    padding-top 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.35s ease,
    transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  will-change: max-height, padding-top, opacity, transform;
`;

const Chevron = styled.span`
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: flex-end;
  justify-content: center;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: ${({ $direction }) =>
      $direction === 'down' ? 'rotate(-135deg)' : 'rotate(45deg)'};
  }
`;

const SpecTable = styled.dl`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  padding: 16px 0;
  border-top: 0.4px solid rgba(255, 255, 255, 0.35);

  &:first-of-type {
    border-top: none;
  }
`;

const SpecLabel = styled.dt`
  margin: 0;
  font-size: 1.125rem;
  color: #ffffff;
`;

const SpecValue = styled.dd`
  margin: 0;
  font-size: 1.125rem;
  color: #ffffff;
`;

const HighlightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
`;

export default function DesktopProductPanel({ product }) {
  const [isDescriptionOpen, setDescriptionOpen] = useState(true);
  const [isSpecsOpen, setSpecsOpen] = useState(true);
  const [isHighlightsOpen, setHighlightsOpen] = useState(true);

  useEffect(() => {
    if (!product) {
      return;
    }

    setDescriptionOpen(true);
    setSpecsOpen(true);
    setHighlightsOpen(true);
  }, [product]);

  if (!product) {
    return null;
  }

  const { label, description, heroImageSrc, heroImageAlt, specifications = [], highlights = [] } = product;

  return (
    <PanelRoot>
      <Content>
        <PanelHeader
          type="button"
          onClick={() => setDescriptionOpen((prev) => !prev)}
          aria-expanded={isDescriptionOpen}
        >
          <PanelTitle>{label}</PanelTitle>
          <Chevron aria-hidden="true" $direction={isDescriptionOpen ? 'up' : 'down'} />
        </PanelHeader>
        {description ? (
          <Collapsible
            $isOpen={isDescriptionOpen}
            aria-hidden={!isDescriptionOpen}
          >
            <DescriptionBlock>
              <Description>{description}</Description>
            </DescriptionBlock>
          </Collapsible>
        ) : null}

        <MainGrid $hasImage={Boolean(heroImageSrc)}>
          {heroImageSrc ? (
            <ImageFrame>
              <img src={heroImageSrc} alt={heroImageAlt ?? label} />
            </ImageFrame>
          ) : null}

          <DetailsColumn>
            {specifications.length > 0 ? (
              <Section>
                <SectionHeader
                  type="button"
                  onClick={() => setSpecsOpen((prev) => !prev)}
                  aria-expanded={isSpecsOpen}
                >
                  <SectionHeading>Характеристики</SectionHeading>
                  <Chevron aria-hidden="true" $direction={isSpecsOpen ? 'up' : 'down'} />
                </SectionHeader>
                <SectionDivider />
                <Collapsible
                  $isOpen={isSpecsOpen}
                  $paddingTop={16}
                  aria-hidden={!isSpecsOpen}
                >
                  <SpecTable>
                    {specifications.map((spec, index) => (
                      <SpecRow key={`${spec.label}-${index}`}>
                        <SpecLabel>{spec.label}</SpecLabel>
                        <SpecValue>{spec.value}</SpecValue>
                      </SpecRow>
                    ))}
                  </SpecTable>
                </Collapsible>
              </Section>
            ) : null}

            {highlights.length > 0 ? (
              <Section>
                <SectionHeader
                  type="button"
                  onClick={() => setHighlightsOpen((prev) => !prev)}
                  aria-expanded={isHighlightsOpen}
                >
                  <SectionHeading>Сертификаты</SectionHeading>
                  <Chevron aria-hidden="true" $direction={isHighlightsOpen ? 'up' : 'down'} />
                </SectionHeader>
                <SectionDivider />
                <Collapsible
                  $isOpen={isHighlightsOpen}
                  $paddingTop={16}
                  aria-hidden={!isHighlightsOpen}
                >
                  <HighlightList>
                    {highlights.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </HighlightList>
                </Collapsible>
              </Section>
            ) : null}
          </DetailsColumn>
        </MainGrid>
      </Content>
    </PanelRoot>
  );
}
