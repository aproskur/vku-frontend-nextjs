'use client';

import styled from 'styled-components';
import {
  PhoneIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
  MapIcon,
  ChatIcon,
} from '@/components/ContactIcons';

const SidebarRoot = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    padding: 48px 40px;
    background: rgba(var(--clr-dark-blue), 0.6);
    color: rgb(var(--text));
    height: 100vh;
    overflow-y: auto;
    min-width: 391px;
  }
`;

const LogoBlock = styled.div`
  display: grid;
  gap: 16px;
`;

const LogoImage = styled.img`
  width: 328px;
  height: auto;
`;

const CompanyInfo = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
`;

const IconRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const IconButton = styled.a`
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: background 180ms ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NavSection = styled.nav`
  margin-top: 48px;
  display: grid;
  gap: 8px;
  font-size: 1.05rem;
`;

const NavHeading = styled.span`
  font-size: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.65);
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? 'rgb(var(--clr-sunny))' : 'rgba(255, 255, 255, 0.9)')};
  font: inherit;
  text-align: left;
  cursor: pointer;
  padding: 8px 0;
  transition: color 160ms ease;

  &:hover,
  &:focus-visible {
    color: rgb(var(--clr-sunny));
  }
`;

export default function DesktopSidebar({ items = [], onProductSelect, activeProduct }) {
  if (!items || items.length === 0) {
    return null;
  }

  const productsGroup = items.find((item) => item.key === 'products' || item.label === 'Продукция');
  const staticItems = items.filter((item) => item !== productsGroup);

  return (
    <SidebarRoot>
      <LogoBlock>
        <LogoImage src="/images/logo.png" alt="Вологодское карьерное управление" />
        <CompanyInfo>
          г. Вологда, Рыбная, 30
          <br />8 (8172) 50-56-65
          <br />info@VKU.group
        </CompanyInfo>
        <IconRow>
          <IconButton href="tel:+78172505665" aria-label="Позвонить">
            <PhoneIcon />
          </IconButton>
          <IconButton href="mailto:info@VKU.group" aria-label="Написать письмо">
            <EmailIcon />
          </IconButton>
          <IconButton href="https://t.me/VKU" aria-label="Открыть Telegram">
            <TelegramIcon />
          </IconButton>
          <IconButton href="https://wa.me/78172505665" aria-label="Написать в WhatsApp">
            <WhatsappIcon />
          </IconButton>
          <IconButton href="#map" aria-label="Показать на карте">
            <MapIcon />
          </IconButton>
          <IconButton href="#contact" aria-label="Написать сообщение">
            <ChatIcon />
          </IconButton>
        </IconRow>
      </LogoBlock>

      <NavSection>
        {staticItems.map((item) => (
          <NavButton key={item.key ?? item.label}>{item.label}</NavButton>
        ))}
      </NavSection>

      {productsGroup ? (
        <NavSection>
          <NavHeading>{productsGroup.label}</NavHeading>
          {productsGroup.children?.map((product) => (
            <NavButton
              key={product.key ?? product.label}
              onClick={() => onProductSelect?.(product)}
              $active={activeProduct?.key === product.key}
            >
              {product.label}{product.price ? ` ${product.price}` : ''}
            </NavButton>
          ))}
        </NavSection>
      ) : null}
    </SidebarRoot>
  );
}
