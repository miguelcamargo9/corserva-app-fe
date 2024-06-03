'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import OrderForm from '../../components/OrderForm'
import { Order } from '../../types/types'

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:3002/sale-order-items')
      console.log('fetchOrders', response.data)
      setOrders(response.data)
    }
    fetchOrders()
  }, [])

  const handleSave = () => {
    setSelectedOrder(null)
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:3002/sale-order-items')
      setOrders(response.data)
    }
    fetchOrders()
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3002/sale-order-items/${id}`)
    setOrders(orders.filter((order) => order.id !== id))
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>
      <OrderForm order={selectedOrder} onSave={handleSave} />
      <div className="mt-8">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                Name
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                Quantity
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                Price
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">
                  {order.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {order.quantity}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  ${order.price}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id!)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersPage
