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

describe('Results page tests', () => {
  test('Render results page', () => {
    const { container } = render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    )
    const searchInput = container.querySelector('.search-input')
    expect(searchInput).toBeInTheDocument()
  })

  test('Writing empty string in results page search bar', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search/cat']}>
        <Routes>
          <Route path="/search/:searchText?" element={<ResultsPage />} />
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

    await waitFor(() => {
      const searchBarContent = container.querySelector('.search-no-text')
      expect(searchBarContent).toBeInTheDocument()
    })
  })

  test('Writing no empty string but without results', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search/']}>
        <Routes>
          <Route path="/search/:searchText?" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')
    fireEvent.change(searchInput, { target: { value: 'fish' } })
    expect(searchInput.value).toBe('fish')

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })

    await waitFor(() => {
      const searchBarContent = container.querySelector('.search-no-results')
      expect(searchBarContent).toBeInTheDocument()
    })
  })

  test('Searching with results', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search/']}>
        <Routes>
          <Route path="/search/:searchText?" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')
    fireEvent.change(searchInput, { target: { value: 'cat' } })
    expect(searchInput.value).toBe('cat')

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

  test('Clicking in result', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search/']}>
        <Routes>
          <Route path="/search/:searchText?" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = container.querySelector('input')
    fireEvent.change(searchInput, { target: { value: 'cat' } })
    expect(searchInput.value).toBe('cat')

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })

    await waitFor(() => {
      const individualResult = screen.getByText('cat1')
      fireEvent.click(individualResult)

      const imageResult = container.querySelector('.image-result')
      expect(imageResult).toBeInTheDocument()
    })
  })

  test('Return to homepage', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search/fish']}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search/:searchText?" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const googleImage = container.querySelector('.image-google-results')
    fireEvent.click(googleImage)

    const homepageScreen = container.querySelector('.search-homepage')
    expect(homepageScreen).toBeInTheDocument()
  })
})
