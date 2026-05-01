/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { addressService } from '../services/addressService';

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  fullAddress: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const initialAddresses: Address[] = [
  {
    id: '1',
    title: 'Ev Adresim',
    fullName: 'Can Özdemir',
    phone: '0532 123 45 67',
    city: 'İstanbul',
    district: 'Ataşehir',
    neighborhood: 'Atatürk Mah.',
    fullAddress: 'Sülün Cad. No:12 D:4',
    isDefault: true,
    type: 'home'
  },
  {
    id: '2',
    title: 'İş Adresi',
    fullName: 'Can Özdemir',
    phone: '0532 123 45 67',
    city: 'İstanbul',
    district: 'Beşiktaş',
    neighborhood: 'Levent Mah.',
    fullAddress: 'Büyükdere Cad. No:193',
    isDefault: false,
    type: 'work'
  }
];

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = addressService.getAddresses();
    return saved.length > 0 ? saved : initialAddresses;
  });

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    let newAddresses;
    if (newAddress.isDefault) {
      newAddresses = addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress);
    } else {
      newAddresses = [...addresses, newAddress];
    }
    setAddresses(newAddresses);
    addressService.saveAddresses(newAddresses);
  };

  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    setAddresses(prev => {
      let newAddresses = prev.map(a => a.id === id ? { ...a, ...updatedFields } : a);
      if (updatedFields.isDefault) {
        newAddresses = newAddresses.map(a => a.id === id ? a : { ...a, isDefault: false });
      }
      addressService.saveAddresses(newAddresses);
      return newAddresses;
    });
  };

  const deleteAddress = (id: string) => {
    const newAddresses = addresses.filter(a => a.id !== id);
    setAddresses(newAddresses);
    addressService.saveAddresses(newAddresses);
  };

  const setDefaultAddress = (id: string) => {
    const newAddresses = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(newAddresses);
    addressService.saveAddresses(newAddresses);
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddresses must be used within an AddressProvider');
  }
  return context;
}
