'use client';

import styled from 'styled-components';

const ProductionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$imageSrc' && prop !== '$active',
})`
  position: relative;
  width: 100%;
  min-height: 44px;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: none;
  color: inherit;
  text-align: left;
  overflow: hidden;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.45);
    outline-offset: 4px;
  }
`;

const ProductionBackground = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$imageSrc' && prop !== '$active',
})`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageSrc }) => `url(${$imageSrc})`};
  background-size: cover;
  background-position: center;
  filter: ${({ $active }) => ($active ? 'brightness(0.8)' : 'brightness(0.65)')};
  transition: filter 200ms ease;
`;

const ProductionOverlay = styled.div`
  position: absolute;
  inset: 0;
`;

const Content = styled.span`
  position: relative;
  display: block;
  height: 100%;
`;

const ProductName = styled.span`
  position: absolute;
  min-height: 22px;
  top: 0px;
  left: 0px;
  background: rgba(21, 25, 31, 0.7);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgb(var(--text));
  padding: 0.25rem 0.6rem;
`;

const ProductPrice = styled.span`
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 4px 12px;
  background: rgba(245, 247, 251, 0.5);
  color: #11161f;
  font-size: 0.8rem;
  font-weight: 600;
`;

export default function MobileNavProductionItem({ label, price, imageSrc, active = false, onClick }) {
  return (
    <ProductionButton type="button" onClick={onClick}>
      <ProductionBackground $imageSrc={imageSrc} $active={active} />
      <ProductionOverlay />
      <Content>
        <ProductName>{label}</ProductName>
        {price ? <ProductPrice>{price}</ProductPrice> : null}
      </Content>
    </ProductionButton>
  );
}
