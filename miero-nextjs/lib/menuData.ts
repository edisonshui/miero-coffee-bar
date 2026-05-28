export interface MenuItem {
  name: string
  desc?: string
  prices: [string, string] | [string]
  featured?: boolean
}

export interface MenuCategory {
  id: string
  label: string
  count: number
  sub: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'signatures',
    label: 'Signatures',
    count: 5,
    sub: 'Iced only — 12 oz / 16 oz',
    items: [
      { name: 'Toffee Miso', desc: 'Espresso, milk, vanilla, toffee miso cream.', prices: ['7.75', '8.50'], featured: true },
      { name: 'Vanilla Bean', desc: 'Espresso, milk, vanilla, vanilla cream.', prices: ['7.50', '8.25'] },
      { name: 'Matcha Matcha', desc: 'Ceremonial matcha, milk, vanilla, matcha cream.', prices: ['8.00', '8.75'], featured: true },
      { name: 'Strawberry Matcha', desc: 'Ceremonial matcha, milk, strawberry purée.', prices: ['7.75', '8.50'] },
      { name: 'Pistachio Cream', desc: 'Espresso, milk, pistachio, vanilla cream.', prices: ['7.75', '8.50'] },
    ],
  },
  {
    id: 'coffee',
    label: 'Coffee',
    count: 4,
    sub: 'Hot or iced — 12 oz / 16 oz',
    items: [
      { name: 'Americano', prices: ['4.50', '4.75'] },
      { name: 'Latte', prices: ['5.50', '6.00'] },
      { name: 'Mocha', prices: ['6.00', '6.75'] },
      { name: 'Espresso', desc: 'Two shots.', prices: ['3.75'] },
    ],
  },
  {
    id: 'not-coffee',
    label: 'Not Coffee',
    count: 6,
    sub: '12 oz / 16 oz',
    items: [
      { name: 'Matcha Latte', prices: ['6.50', '7.50'] },
      { name: 'Chai Latte', prices: ['6.00', '6.50'] },
      { name: 'Beet Latte', prices: ['5.75', '6.25'] },
      { name: 'Turmeric Latte', prices: ['5.50', '6.00'] },
      { name: 'Strawberry Milk', prices: ['5.50', '6.00'] },
      { name: 'Hot Tea', prices: ['4.00'] },
    ],
  },
  {
    id: 'cieros',
    label: 'Cieros',
    count: 2,
    sub: 'Iced, sparkling — with caffeinated cream',
    items: [
      { name: 'Strawberry Ciero', desc: 'Sparkling water, strawberry purée, vanilla, caffeinated cream.', prices: ['6.50', '6.75'], featured: true },
      { name: 'White Peach Ciero', desc: 'Sparkling water, white peach, vanilla, caffeinated cream.', prices: ['6.50', '6.75'] },
    ],
  },
]
