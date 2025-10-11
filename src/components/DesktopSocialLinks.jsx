'use client';

import styled from 'styled-components';
import { useId } from 'react';
import { TelegramIcon, WhatsappIcon } from '@/components/ContactIcons';

const SocialRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    display: block;
  }
`;

function VkIcon() {
  const clipId = useId();
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath={`url(#${clipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20ZM11.4 11.4C10 12.8133 10 15.0733 10 19.6V20.4C10 24.92 10 27.18 11.4 28.6C12.8133 30 15.0733 30 19.6 30H20.4C24.92 30 27.18 30 28.6 28.6C30 27.1867 30 24.9267 30 20.4V19.6C30 15.08 30 12.82 28.6 11.4C27.1867 10 24.9267 10 20.4 10H19.6C15.08 10 12.82 10 11.4 11.4Z"
          fill="white"
        />
        <path
          d="M20.64 24.4067C16.08 24.4067 13.48 21.2867 13.3733 16.0867H15.6667C15.74 19.9 17.42 21.5133 18.7533 21.8467V16.0867H20.9067V19.3734C22.22 19.2334 23.6067 17.7334 24.0733 16.08H26.22C26.045 16.9359 25.6953 17.7464 25.1929 18.461C24.6905 19.1757 24.0461 19.779 23.3 20.2333C24.1326 20.6478 24.8679 21.234 25.4574 21.9533C26.047 22.6727 26.4773 23.5089 26.72 24.4067H24.3533C23.8467 22.8267 22.58 21.6 20.9067 21.4334V24.4067H20.64Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const SOCIAL_ITEMS = [
  {
    key: 'telegram',
    href: 'https://t.me/VKU',
    label: 'Открыть Telegram',
    icon: 'telegram',
  },
  {
    key: 'whatsapp',
    href: 'https://wa.me/78172505665',
    label: 'Написать в WhatsApp',
    icon: 'whatsapp',
  },
  {
    key: 'vk',
    href: 'https://vk.com/VKU',
    label: 'Открыть VK',
    icon: 'vk',
  },
];

export default function DesktopSocialLinks() {
  return (
    <SocialRow>
      {SOCIAL_ITEMS.map((item) => {
        const iconElement =
          item.icon === 'telegram' ? (
            <TelegramIcon />
          ) : item.icon === 'whatsapp' ? (
            <WhatsappIcon />
          ) : (
            <VkIcon />
          );

        return (
          <SocialLink key={item.key} href={item.href} aria-label={item.label}>
            <IconWrapper>{iconElement}</IconWrapper>
          </SocialLink>
        );
      })}
    </SocialRow>
  );
}
