/* eslint-disable react/react-in-jsx-scope */
import Homepage from './pages/Home.jsx'
import ResultsPage from './pages/Results.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/" element={<ResultsPage />} />
        <Route path="/search/:searchText?" element={<ResultsPage />} />
      </Routes>
    </main>
  )
}

export default App
