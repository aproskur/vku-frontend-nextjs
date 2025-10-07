'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useOrder } from '@/context/OrderContext';

const CartLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== '$bottomOffset',
})`
  position: fixed;
  right: 1rem;
  bottom: ${({ $bottomOffset = 0 }) => {
    const safeOffset = Number.isFinite($bottomOffset) ? Math.max(0, $bottomOffset) : 0;
    return `calc(${safeOffset}px + 1rem + env(safe-area-inset-bottom, 0))`;
  }};
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #f7a707;
  display: grid;
  place-items: center;
  box-shadow: 0 14px 25px rgba(0, 0, 0, 0.35);
  z-index: 12;
  color: inherit;
  text-decoration: none;

  @media (min-width: 992px) {
    display: none;
  }
`;

const CartInner = styled.span`
  position: relative;
  width: 63px;
  height: 63px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CartIcon = styled.span`
  position: absolute;
  width: 38.96px;
  height: 40.5px;
  background: url('/images/cart-w.png') center / contain no-repeat;
`;

const CartQuantity = styled.span`
  position: absolute;
  top: 20px;
  left: 25px;
  right: 22px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2b2a29;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
  pointer-events: none;
`;

export default function MobileOrderCartIndicator({ bottomOffset = 0 }) {
  const { totalQuantity } = useOrder();
  const shouldShow = totalQuantity > 0;
  const quantityLabel = useMemo(() => {
    if (totalQuantity > 99) {
      return '99+';
    }
    return String(totalQuantity);
  }, [totalQuantity]);

  if (!shouldShow) {
    return null;
  }

  return (
    <CartLink href="/order" aria-label="Перейти к заказу" $bottomOffset={bottomOffset}>
      <CartInner>
        <CartIcon aria-hidden="true" />
        <CartQuantity aria-hidden="true">{quantityLabel}</CartQuantity>
      </CartInner>
    </CartLink>
  );
}
