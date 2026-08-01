export interface Product {
  name: string;
  image: string;
  url: string;
  price?: string;
}

export const products: Product[] = [
  {
    name: "Aurora Mousepad",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=900&q=80",
    url: "https://example.com/shop/aurora-mousepad",
    price: "$39",
  },
  {
    name: "Merch Hoodie",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&q=80",
    url: "https://example.com/shop/merch-hoodie",
    price: "$89",
  },
  {
    name: "Delta Keyboard",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&q=80",
    url: "https://example.com/shop/delta-keyboard",
    price: "$149",
  },
  {
    name: "Desk Mat",
    image:
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=900&q=80",
    url: "https://example.com/shop/desk-mat",
    price: "$29",
  },
];
