'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  PhoneIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
  MapIcon,
} from '@/components/ContactIcons';

const FooterWrapper = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.85rem;
  background: rgba(17, 22, 31, 0.95);
  color: #f5f7fb;
  box-shadow: 0 -16px 35px rgba(0, 0, 0, 0.45);
  z-index: 9;

  @media (min-width: 992px) {
    display: none;
  }
`;

const FooterInner = styled.div`
  display: grid;
  gap: 0.75rem;
`;


const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 4.25rem;
  gap: 0.75rem;
`;

const IconButton = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: background 160ms ease, transform 160ms ease;
  color: inherit;

  &:hover,
  &:focus-visible {
    background: rgba(245, 247, 251, 0.14);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid rgba(245, 247, 251, 0.35);
    outline-offset: 2px;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

export default function MobileNavFooter({
  visible = false,
  phoneHref = 'tel:+78172505665',
  emailHref = 'mailto:info@VKU.group',
  telegramHref = 'https://t.me/VKU',
  whatsappHref = 'https://wa.me/78172505665',
  mapHref = '#map',
  onHeightChange,
}) {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!onHeightChange) {
      return;
    }

    if (!visible) {
      onHeightChange(0);
      return;
    }

    const element = footerRef.current;
    if (!element) {
      return;
    }

    const reportHeight = () => {
      onHeightChange(element.getBoundingClientRect().height);
    };

    reportHeight();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', reportHeight);
      return () => window.removeEventListener('resize', reportHeight);
    }

    const observer = new ResizeObserver(() => reportHeight());
    observer.observe(element);

    return () => observer.disconnect();
  }, [visible, onHeightChange]);

  if (!visible) {
    return null;
  }

  const iconLinks = [
    { key: 'phone', href: phoneHref, label: 'Позвонить', icon: <PhoneIcon /> },
    { key: 'email', href: emailHref, label: 'Написать письмо', icon: <EmailIcon /> },
    { key: 'telegram', href: telegramHref, label: 'Открыть Telegram', icon: <TelegramIcon /> },
    { key: 'whatsapp', href: whatsappHref, label: 'Написать в WhatsApp', icon: <WhatsappIcon /> },
    { key: 'map', href: mapHref, label: 'Показать на карте', icon: <MapIcon /> },
  ];

  return (
    <FooterWrapper ref={footerRef}>
      <FooterInner>
        <IconRow>
          {iconLinks.map(({ key, href, label, icon }) => (
            <IconButton key={key} href={href} aria-label={label}>
              {icon}
            </IconButton>
          ))}
        </IconRow>
      </FooterInner>
    </FooterWrapper>
  );
}
