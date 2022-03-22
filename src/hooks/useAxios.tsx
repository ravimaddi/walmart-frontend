import { useState, useEffect } from "react"
import axios from "../config/axios"

export const useAxios = (props: { url: string }) => {
  const { url } = props
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        setLoading(false)
        setData(response.data)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error)
      }
    }
    fetchData()
  }, [url])

  return {
    loading,
    error,
    data,
  }
}
