import { ReactNode } from 'react'

const OrdersLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <h1>Order Management</h1>
      {children}
    </div>
  )
}

export default OrdersLayout
