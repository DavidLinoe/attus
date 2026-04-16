
export interface CartItem {
  name: string;
  price: number;
  amount: number;
}


export const MOCK_ITEMS_CART = Array.from({ length: 100000 }, (_, i) => ({
    name: `Item ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    amount: Math.floor(Math.random() * 20) + 1,
}));