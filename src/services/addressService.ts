/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '../context/AddressContext';

class AddressService {
  private ADDRESS_KEY = 'kitapn_addresses';

  getAddresses(): Address[] {
    const saved = localStorage.getItem(this.ADDRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  saveAddresses(addresses: Address[]): void {
    localStorage.setItem(this.ADDRESS_KEY, JSON.stringify(addresses));
  }
}

export const addressService = new AddressService();
