import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import OrderForm from './OrderForm'

const mockOnSave = jest.fn()

describe('OrderForm', () => {
  it('renders the form fields correctly', () => {
    render(<OrderForm order={null} onSave={mockOnSave} />)
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('validates form fields and shows error messages', () => {
    render(<OrderForm order={null} onSave={mockOnSave} />)
    fireEvent.click(screen.getByText('Save'))

    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(
      screen.getByText('Quantity must be greater than zero'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Price must be greater than zero'),
    ).toBeInTheDocument()
  })

  it('calls onSave with correct data when form is valid', () => {
    render(<OrderForm order={null} onSave={mockOnSave} />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test Order' },
    })
    fireEvent.change(screen.getByPlaceholderText('Quantity'), {
      target: { value: '10' },
    })
    fireEvent.change(screen.getByPlaceholderText('Price'), {
      target: { value: '100' },
    })

    fireEvent.click(screen.getByText('Save'))

    expect(mockOnSave).toHaveBeenCalledWith({
      id: undefined,
      name: 'Test Order',
      quantity: 10,
      price: 100,
    })
  })
})
