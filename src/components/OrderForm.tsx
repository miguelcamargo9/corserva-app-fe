import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Order } from '../types/types'

interface OrderFormProps {
  order?: Order | null
  onSave: () => void
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onSave }) => {
  const [name, setName] = useState(order?.name || '')
  const [quantity, setQuantity] = useState(order?.quantity || 0)
  const [price, setPrice] = useState(order?.price || 0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') setName(value)
    if (name === 'quantity') setQuantity(Number(value))
    if (name === 'price') setPrice(Number(value))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const data: Order = { name, quantity, price }
    if (order && order.id) {
      await axios.put(
        `http://localhost:3002/sale-order-items/${order.id}`,
        data,
      )
    } else {
      await axios.post('http://localhost:3002/sale-order-items', data)
    }
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        value={price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  )
}

export default OrderForm
