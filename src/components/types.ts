export interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  address: Address
}

interface Address {
  city: string
}

export interface post {
  userId: number
  id: number
  title: string
  body: string
}

export interface album {
  userId: number
  title: string
  id: number
}

export interface photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
