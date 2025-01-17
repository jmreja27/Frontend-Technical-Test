import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Homepage from '../pages/Home'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import getData from '../Faker'
import results from '../mocks/results.json'
import ResultsPage from '../pages/Results'

jest.mock('../Faker')

beforeEach(() => {
  getData.mockReturnValue(results)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Homepage tests', () => {
  test('Render homepage', () => {
    const { container } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )
    const searchInput = container.querySelector('.search-homepage')

    expect(searchInput).toBeInTheDocument()
  })

  test('Writing in homepage search bar', () => {
    const { container } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')
    fireEvent.change(searchInput, { target: { value: 'Dog' } })
    expect(searchInput.value).toBe('Dog')
  })

  test('Write and remove in the search bar', () => {
    const { container } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')
    fireEvent.change(searchInput, { target: { value: 'Dog' } })
    expect(searchInput.value).toBe('Dog')

    fireEvent.change(searchInput, { target: { value: '' } })
    expect(searchInput.value).toBe('')
  })

  test('Navigate to results page clicking button', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search/:searchText" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')
    const searchButton = screen.getByRole('button', { name: /Buscar/i })

    fireEvent.change(searchInput, { target: { value: 'Cat' } })
    expect(searchInput.value).toBe('Cat')

    fireEvent.click(searchButton)

    await waitFor(async () => {
      const items = await screen.findAllByText(/cat/i)
      expect(items.length).toBe(2)
    })
  })

  test('Navigate to results page pressing Enter key', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search/:searchText" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')

    fireEvent.change(searchInput, { target: { value: 'Cat' } })
    expect(searchInput.value).toBe('Cat')

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })

    await waitFor(async () => {
      const items = await screen.findAllByText(/cat/i)
      expect(items.length).toBe(2)
    })
  })

  test('Try to navigate to results page without results', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search/:searchText" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')

    fireEvent.change(searchInput, { target: { value: '' } })
    expect(searchInput.value).toBe('')

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })

    const searchHomepage = container.querySelector('.search-homepage')
    expect(searchHomepage).toBeInTheDocument()
  })

  test('Cleaning search bar', async () => {
    const { container } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')

    fireEvent.change(searchInput, { target: { value: 'Cat' } })
    expect(searchInput.value).toBe('Cat')

    const removeIcon = container.querySelector('.remove-text-icon')
    fireEvent.click(removeIcon)
    expect(searchInput.value).toBe('')
  })
})
