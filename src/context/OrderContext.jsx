'use client';

import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const OrderContext = createContext(null);

function resolveKey(target, fallbackProduct) {
  if (typeof target === 'string') {
    return target;
  }

  if (target && typeof target === 'object') {
    if (typeof target.key === 'string' && target.key.length > 0) {
      return target.key;
    }
    if (typeof target.id === 'string' && target.id.length > 0) {
      return target.id;
    }
  }

  if (fallbackProduct && typeof fallbackProduct === 'object') {
    if (typeof fallbackProduct.key === 'string' && fallbackProduct.key.length > 0) {
      return fallbackProduct.key;
    }
    if (typeof fallbackProduct.id === 'string' && fallbackProduct.id.length > 0) {
      return fallbackProduct.id;
    }
  }

  return null;
}

const initialState = {
  items: {},
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { key, product, quantity } = action.payload;
      const current = state.items[key];
      const nextQuantity = Math.max(0, (current?.quantity ?? 0) + quantity);

      if (nextQuantity <= 0) {
        if (!current) {
          return state;
        }
        const { [key]: removed, ...rest } = state.items;
        return { ...state, items: rest };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [key]: {
            product: product ?? current?.product ?? { key },
            quantity: nextQuantity,
          },
        },
      };
    }

    case 'SET_ITEM_QUANTITY': {
      const { key, product, quantity } = action.payload;
      if (!Number.isFinite(quantity) || quantity <= 0) {
        if (!state.items[key]) {
          return state;
        }
        const { [key]: removed, ...rest } = state.items;
        return { ...state, items: rest };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [key]: {
            product: product ?? state.items[key]?.product ?? { key },
            quantity,
          },
        },
      };
    }

    case 'REMOVE_ITEM': {
      const { key } = action.payload;
      if (!state.items[key]) {
        return state;
      }
      const { [key]: removed, ...rest } = state.items;
      return { ...state, items: rest };
    }

    case 'CLEAR':
      if (Object.keys(state.items).length === 0) {
        return state;
      }
      return initialState;

    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addItem = useCallback((product, quantity = 1) => {
    const key = resolveKey(product);
    if (!key || !Number.isFinite(quantity) || quantity === 0) {
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: { key, product, quantity },
    });
  }, []);

  const setItemQuantity = useCallback((target, quantity, fallbackProduct) => {
    const key = resolveKey(target, fallbackProduct);
    if (!key || !Number.isFinite(quantity)) {
      return;
    }

    dispatch({
      type: 'SET_ITEM_QUANTITY',
      payload: {
        key,
        product: fallbackProduct ?? (typeof target === 'object' ? target : undefined),
        quantity,
      },
    });
  }, []);

  const removeItem = useCallback((target) => {
    const key = resolveKey(target);
    if (!key) {
      return;
    }

    dispatch({ type: 'REMOVE_ITEM', payload: { key } });
  }, []);

  const clearOrder = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const getItemQuantity = useCallback(
    (target) => {
      const key = resolveKey(target);
      if (!key) {
        return 0;
      }
      return state.items[key]?.quantity ?? 0;
    },
    [state.items],
  );

  const isInOrder = useCallback(
    (target) => {
      const key = resolveKey(target);
      if (!key) {
        return false;
      }
      return Boolean(state.items[key]);
    },
    [state.items],
  );

  const items = useMemo(() => {
    return Object.entries(state.items).map(([key, entry]) => ({ key, ...entry }));
  }, [state.items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      itemsMap: state.items,
      totalQuantity,
      addItem,
      setItemQuantity,
      removeItem,
      clearOrder,
      getItemQuantity,
      isInOrder,
    }),
    [
      items,
      state.items,
      totalQuantity,
      addItem,
      setItemQuantity,
      removeItem,
      clearOrder,
      getItemQuantity,
      isInOrder,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
