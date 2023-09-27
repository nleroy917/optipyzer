import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ServerInfo } from '../..'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getServerVersion = async () => {
  const { data } = await axios.get<ServerInfo>(`${API_URL}`)
  return data
}

export const useServerVersion = () => {
  return useQuery(['serverVersion'], getServerVersion)
}
