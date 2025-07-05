"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderNotification {
  id: string;
  type: 'new_order' | 'status_update';
  orderId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface OrderNotificationContextType {
  notifications: OrderNotification[];
  addNotification: (notification: Omit<OrderNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
}

const OrderNotificationContext = createContext<OrderNotificationContextType | undefined>(undefined);

export const useOrderNotification = () => {
  const context = useContext(OrderNotificationContext);
  if (context === undefined) {
    throw new Error('useOrderNotification must be used within an OrderNotificationProvider');
  }
  return context;
};

interface OrderNotificationProviderProps {
  children: ReactNode;
}

export const OrderNotificationProvider: React.FC<OrderNotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);

  const addNotification = (notification: Omit<OrderNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: OrderNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <OrderNotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      unreadCount
    }}>
      {children}
    </OrderNotificationContext.Provider>
  );
}; 