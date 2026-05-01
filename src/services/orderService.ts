/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrderItem {
  title: string;
  author: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  statusType: 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

class OrderService {
  private ORDERS_KEY = 'kitapn_orders';

  getOrders(): Order[] {
    const saved = localStorage.getItem(this.ORDERS_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-2024-001',
        date: '24 Mart 2026',
        total: '245.00',
        status: 'Hazırlanıyor',
        statusType: 'preparing' as const,
        items: [
          { title: 'İnsanlığımı Yitirirken', author: 'Osamu Dazai', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=1200' },
          { title: '1984', author: 'George Orwell', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=100&w=1200' }
        ]
      },
      {
        id: 'ORD-2024-002',
        date: '18 Mart 2026',
        total: '185.00',
        status: 'Teslim Edildi',
        statusType: 'delivered' as const,
        items: [
          { title: 'Simyacı', author: 'Paulo Coelho', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=1200' }
        ]
      }
    ];
  }

  saveOrders(orders: Order[]): void {
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  addOrder(order: Order): void {
    const orders = this.getOrders();
    this.saveOrders([order, ...orders]);
  }
}

export const orderService = new OrderService();
