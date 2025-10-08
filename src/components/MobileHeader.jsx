'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {
  PhoneIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
  MapIcon,
} from '@/components/ContactIcons';

const MOBILE_LAYER_BG = 'var(--mobile-layer-bg)';
const MOBILE_LAYER_BG_STRONG = 'var(--mobile-layer-bg-strong)';
const MOBILE_LAYER_OVERLAY = 'var(--mobile-layer-overlay)';

const Header = styled.header.withConfig({
  shouldForwardProp: (prop) => prop !== 'condensed',
})`
  position: fixed;
  inset: 0 auto auto 0;
  width: 100%;
  background: ${({ condensed }) => (condensed ? MOBILE_LAYER_BG_STRONG : MOBILE_LAYER_BG)};
  padding: ${({ condensed }) => (condensed ? '0.5rem 0.9rem' : '1rem 1.25rem 1.25rem')};
  box-shadow: ${({ condensed }) => (condensed ? '0 10px 25px rgba(0, 0, 0, 0.25)' : 'none')};
  z-index: 10;
  transition: background 180ms ease, padding 180ms ease, box-shadow 180ms ease;
  color: #f5f7fb;

  @media (min-width: 992px) {
    display: none;
  }
`;

const WideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const LogoLarge = styled.img`
  width: 76.03px;
  height: auto;
`;

const CompanyNameWide = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  white-space: pre-line;
`;

const ContactRow = styled.div`
  display: flex;
  font-weight: 400;
  flex-direction: column;
  gap: 0.5rem 1.5rem;
  font-size: 1.25rem;
  color: rgb(var(--text-grey));
`;

const ContactItem = styled.span`
  white-space: nowrap;
`;

const IconRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`;

const IconButton = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: background 160ms ease, transform 160ms ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 2px;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

const CondensedBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const CondensedBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoSmall = styled.img`
  width: 124px;
  height: auto;
`;

const CondensedName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: inherit;
`;

const CondensedRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-left: auto;
`;

const PhoneText = styled.div`
  font-weight: 400;
  color: inherit;
  white-space: nowrap;
  letter-spacing: 1.5x;

  span:first-child {
    font-size: 12px;
  }

  span:nth-child(2) {
    font-size: 16px;
  }
`;



const Burger = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  background: none;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  &::before,
  &::after,
  span {
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    height: 2px;
    background: currentColor;
    transition: transform 180ms ease;
  }

  &::before {
    top: 15px;
  }

  span {
    top: 21px;
  }

  &::after {
    top: 27px;
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 2px;
  }
`;

const BurgerInner = () => <span aria-hidden="true" />;

function getScrollTop(target) {
  if (!target) {
    return 0;
  }

  if (target === window) {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  return target.scrollTop ?? 0;
}

function useScrollTrigger(threshold = 40, scrollElement) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const target = scrollElement ?? window;

    if (!target) {
      return undefined;
    }

    const handleScroll = () => {
      setIsPastThreshold(getScrollTop(target) > threshold);
    };

    handleScroll();

    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [scrollElement, threshold]);

  return isPastThreshold;
}

export default function MobileHeader({
  logoSymbolSrc = '/images/logo.png',
  condensedLogoSrc = '/images/logo-mob.png',
  companyName = 'Вологодское карьерное управление',
  address = 'г. Вологда, Рыбная, 30',
  phoneDisplay = '8 (8172) 50-56-65',
  phoneHref = 'tel:+78172505665',
  emailDisplay = 'info@VKU.group',
  emailHref = 'mailto:info@VKU.group',
  telegramHref = 'https://t.me/VKU',
  whatsappHref = 'https://wa.me/78172505665',
  mapHref = '#map',
  scrollThreshold = 40,
  condensedCompanyName = 'ВКУ',
  onHeightChange,
  onCondensedChange,
  forceCondensed = false,
  scrollElement,
}) {
  const scrollCondensed = useScrollTrigger(scrollThreshold, scrollElement);
  const condensed = forceCondensed || scrollCondensed;
  const headerRef = useRef(null);

  const notifyHeight = useCallback(() => {
    if (!onHeightChange || !headerRef.current) return;
    onHeightChange(headerRef.current.getBoundingClientRect().height);
  }, [onHeightChange]);

  useEffect(() => {
    notifyHeight();
  }, [condensed, notifyHeight]);

  useEffect(() => {
    if (onCondensedChange) {
      onCondensedChange(condensed);
    }
  }, [condensed, onCondensedChange]);

  useEffect(() => {
    if (!onHeightChange || typeof window === 'undefined') return;
    const element = headerRef.current;
    if (!element) return;

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => notifyHeight());
      resizeObserver.observe(element);
    } else {
      const handleResize = () => notifyHeight();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, [onHeightChange, notifyHeight]);

  const iconLinks = [
    { key: 'phone', href: phoneHref, label: 'Позвонить', icon: <PhoneIcon /> },
    { key: 'email', href: emailHref, label: 'Написать письмо', icon: <EmailIcon /> },
    { key: 'telegram', href: telegramHref, label: 'Открыть Telegram', icon: <TelegramIcon /> },
    { key: 'whatsapp', href: whatsappHref, label: 'Написать в WhatsApp', icon: <WhatsappIcon /> },
    { key: 'map', href: mapHref, label: 'Показать на карте', icon: <MapIcon /> },
  ];

  const companyNameStacked = companyName.replace(/\s+/g, '\n');

  return (
    <Header ref={headerRef} condensed={condensed}>
      {condensed ? (
        <CondensedBar>
          <CondensedBrand>
            <LogoSmall src={condensedLogoSrc} alt="логотип компании ВКУ" />
          </CondensedBrand>
          <CondensedRight>
            <PhoneText><span>8(8172)</span><span>50-56-65</span></PhoneText>
          </CondensedRight>
        </CondensedBar>
      ) : (
        <WideContent>
          <BrandRow>
            <LogoLarge src={logoSymbolSrc} alt="логотип компании ВКУ" />
            <CompanyNameWide>{companyNameStacked}</CompanyNameWide>
          </BrandRow>
          <ContactRow>
            <ContactItem>{address}</ContactItem>
            <ContactItem>
              <a href={phoneHref} style={{ color: 'inherit' }}>
                {phoneDisplay}
              </a>
            </ContactItem>
            <ContactItem>
              <a href={emailHref} style={{ color: 'inherit' }}>
                {emailDisplay}
              </a>
            </ContactItem>
          </ContactRow>
          <IconRow>
            {iconLinks.map(({ key, href, label, icon }) => (
              <IconButton key={key} href={href} aria-label={label}>
                {icon}
              </IconButton>
            ))}
          </IconRow>
        </WideContent>
      )}
    </Header>
  );
}
