'use client';

import styled from 'styled-components';
import { useOrder } from '@/context/OrderContext';

const PanelRoot = styled.section`
  display: none;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 60px 80px;
    height: 100vh;
    overflow-y: auto;
    color: rgba(255, 255, 255, 0.92);
  }
`;

const Placeholder = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.65);
  }
`;

const HeroImage = styled.img`
  width: 100%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  max-height: 420px;
  object-fit: cover;
`;

const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 2.75rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
`;

const Section = styled.section`
  margin-top: 32px;
`;

const SectionHeading = styled.h2`
  margin: 0 0 16px;
  font-size: 1.25rem;
  color: rgb(var(--clr-sunny));
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const SpecList = styled.dl`
  display: grid;
  gap: 12px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);

  dt {
    font-weight: 600;
  }

  dd {
    margin: 0;
  }
`;

const HighlightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
`;

const ButtonStack = styled.div`
  position: sticky;
  top: 40px;
  margin-left: auto;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export default function DesktopProductPanel({ product }) {
  const { addItem } = useOrder();

  
  if (!product) {
    return (
      <Placeholder>
       
      </Placeholder>
    );
  }

  const { label, description, heroImageSrc, heroImageAlt, specifications = [], highlights = [] } = product;

  return (
    <PanelRoot>
      <div>
        {heroImageSrc ? (
          <HeroImage src={heroImageSrc} alt={heroImageAlt ?? label} />
        ) : null}
      </div>
      <div>
        <Title>{label}</Title>
        {description ? <Description>{description}</Description> : null}

        {specifications.length > 0 ? (
          <Section>
            <SectionHeading>Характеристики</SectionHeading>
            <SpecList>
              {specifications.map((spec) => (
                <div key={`${spec.label}-${spec.value}`}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </SpecList>
          </Section>
        ) : null}

        {highlights.length > 0 ? (
          <Section>
            <SectionHeading>Сертификаты</SectionHeading>
            <HighlightList>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </HighlightList>
          </Section>
        ) : null}
      </div>
    </PanelRoot>
  );
}
