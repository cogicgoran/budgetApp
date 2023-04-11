import { getByTestId, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecentReceipts from './RecentReceipts';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn(() => "")
    })
}))

describe('Home', () => {
  it('renders a loading state', () => {
    render(<RecentReceipts isLoading receipts={[]} />)

    const loadingElement = screen.getByTestId("loading");

    expect(loadingElement).toBeInTheDocument()
  })
})