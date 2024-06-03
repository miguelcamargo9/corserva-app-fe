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
  const [errors, setErrors] = useState<{
    name?: string
    quantity?: string
    price?: string
  }>({})

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

  const validate = () => {
    const newErrors: { name?: string; quantity?: string; price?: string } = {}
    if (!name) newErrors.name = 'Name is required'
    if (quantity <= 0) newErrors.quantity = 'Quantity must be greater than zero'
    if (price <= 0) newErrors.price = 'Price must be greater than zero'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSave({ id: order?.id, name, quantity, price })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
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
