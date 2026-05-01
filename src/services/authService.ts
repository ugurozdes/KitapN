/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

class AuthService {
  private USER_KEY = 'kitapn_user';

  getUser(): User | null {
    const saved = localStorage.getItem(this.USER_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  async login(email: string, password?: string): Promise<User> {
    // Mock login logic
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          name: 'Can Özdemir',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        this.saveUser(user);
        resolve(user);
      }, 1000);
    });
  }
}

export const authService = new AuthService();
