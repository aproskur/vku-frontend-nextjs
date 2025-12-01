'use client';

import styled from 'styled-components';
import DesktopSocialLinks from '@/components/DesktopSocialLinks';

const SidebarRoot = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 440px;
    min-width: 440px;
    min-height: 100vh;
    padding: 48px 40px;
    background: rgba(61, 84, 119, 0.5);
    color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(2px);
    box-sizing: border-box;
  }
`;

const LogoBlock = styled.div`
  display: grid;
  gap: 20px;
  align-items: flex-start;
`;

const LogoImage = styled.img`
  width: 328px;
  height: auto;
`;

const CompanyInfo = styled.div`
  font-size: 1.25rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  overflow-wrap: anywhere;
`;

const NavSection = styled.nav`
  margin-top: 40px;
  display: grid;
  gap: 8px;
  font-size: 1.25rem;
`;

const NavHeading = styled.span`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  cursor: default;
`;

const NavButton = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? 'rgb(var(--clr-sunny))' : 'rgba(255, 255, 255, 0.95)')};
  font: inherit;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  padding: 4px 0;
  line-height: 1.8;
  transition: color 160ms ease, transform 160ms ease;
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    color: rgb(var(--clr-sunny));
    transform: translateX(2px);
  }
`;

const ProductsBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const ProductsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-left: 13px;
  border-left: 1px solid #dddddd;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const ProductButton = styled(NavButton)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  padding: 2px 0;
  max-width: 100%;
  flex-wrap: wrap;
`;

const ProductLabel = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const ProductPrice = styled.span`
  flex: none;
  font-size: 1.1rem;
  font-weight: 300;
  color: rgba(164, 158, 158, 0.8);
  white-space: nowrap;
`;

export default function DesktopSidebar({ items = [], onProductSelect, activeProduct }) {
  if (!items || items.length === 0) {
    return null;
  }

  const productsGroup = items.find((item) => item.key === 'products' || item.label === 'Продукция');

  return (
    <SidebarRoot>
      <LogoBlock>
        <LogoImage src="/images/logo.png" alt="Вологодское карьерное управление" />
        <CompanyInfo>
          г. Вологда, Рыбная, 30
          <br />8 (8172) 50-56-65
          <br />info@VKU.group
        </CompanyInfo>
        <DesktopSocialLinks />
      </LogoBlock>

      <NavSection>
        {items.map((item) => {
          if (item === productsGroup) {
            const productChildren = Array.isArray(item.children) ? item.children : [];
            return (
              <ProductsBlock key={item.key ?? item.label}>
                <NavHeading>{item.label}</NavHeading>
                {productChildren.length > 0 ? (
                  <ProductsGroup>
                    {productChildren.map((product) => (
                      <ProductButton
                        key={product.key ?? product.label}
                        onClick={() => onProductSelect?.(product)}
                        $active={activeProduct?.key === product.key}
                      >
                        <ProductLabel>{product.label}</ProductLabel>
                        {product.price ? <ProductPrice>{product.price}</ProductPrice> : null}
                      </ProductButton>
                    ))}
                  </ProductsGroup>
                ) : null}
              </ProductsBlock>
            );
          }

          return <NavButton key={item.key ?? item.label}>{item.label}</NavButton>;
        })}
      </NavSection>
    </SidebarRoot>
  );
}
