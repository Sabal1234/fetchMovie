import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GetMovie } from './component/GetMovie'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

function App() {
  const client = new QueryClient();

  return (
     < QueryClientProvider client={client}>
      <GetMovie />
      </QueryClientProvider>
     )
}

export default App
