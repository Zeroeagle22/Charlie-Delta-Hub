export interface Product {
  name: string;
  image: string;
  url: string;
  price?: string;
}

export const products: Product[] = [
  {
    name: "Mechanical Keyboard - RGB",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&q=80",
    url: "https://example.com/shop/rgb-keyboard",
    price: "$129",
  },
  {
    name: "Oversized Hoodie",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&q=80",
    url: "https://example.com/shop/oversized-hoodie",
    price: "$79",
  },
  {
    name: "Graphic Tee",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    url: "https://example.com/shop/graphic-tee",
    price: "$34",
  },
  {
    name: "Techwear Jacket",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=900&q=80",
    url: "https://example.com/shop/techwear-jacket",
    price: "$189",
  },
];