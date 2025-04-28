export interface Booking {
  id?: number,
  name: string,
  type: string,
  days: number,
  price: number,
  startDate: string,
  createdAt?: string,
  updatedAt?: string
}