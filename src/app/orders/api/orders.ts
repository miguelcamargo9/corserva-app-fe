import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Order } from '../../../types/types'

const API_BASE_URL = 'http://localhost:3002'

const OrderService = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(`${API_BASE_URL}/sale-order-items`)
        res.status(200).json(response.data)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' })
      }
      break
    case 'POST':
      try {
        const newOrder: Order = req.body
        const response = await axios.post(
          `${API_BASE_URL}/sale-order-items`,
          newOrder,
        )
        res.status(201).json(response.data)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create order' })
      }
      break
    case 'PUT':
      try {
        const { id } = req.query
        const updatedOrder: Order = req.body
        const response = await axios.put(
          `${API_BASE_URL}/sale-order-items/${id}`,
          updatedOrder,
        )
        res.status(200).json(response.data)
      } catch (error) {
        res.status(500).json({ error: 'Failed to update order' })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        await axios.delete(`${API_BASE_URL}/sale-order-items/${id}`)
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default OrderService
