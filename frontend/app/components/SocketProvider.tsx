"use client";
import React, { useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useOrderNotification } from '../context/OrderNotificationContext';

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const { socket, isConnected, isAuthenticated, joinUserRoom } = useSocket();
  const { addNotification } = useOrderNotification();

  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      joinUserRoom(user.userId);
    }

    socket.on('order_status', (data: any) => {
      const userData = localStorage.getItem('user');
      if (!userData) return;
      
      const user = JSON.parse(userData);
      if (data.customerId !== user.userId) return;
      
      addNotification({
        type: 'status_update',
        orderId: data.orderId,
        message: `Đơn hàng #${data.orderId.slice(-6)} - ${data.statusText}`
      });
    });

    return () => {
      socket.off('order_status');
    };
  }, [socket, isAuthenticated, joinUserRoom, addNotification]);

  return <>{children}</>;
} 