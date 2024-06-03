import { Order } from '@/types/types'
import React, { useEffect, useState } from 'react'

interface OrderFormProps {
  order: Order | null
  onSave: (order: Order) => void
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onSave }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (order) {
      setName(order.name)
      setQuantity(order.quantity)
      setPrice(order.price)
    } else {
      setName('')
      setQuantity(0)
      setPrice(0)
    }
  }, [order])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ id: order?.id, name, quantity, price })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className={`w-full p-2 rounded-lg text-white ${order ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'}`}
      >
        {order ? 'Update' : 'Save'}
      </button>
    </form>
  )
}

export default OrderForm
