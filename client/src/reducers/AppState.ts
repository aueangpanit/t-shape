import { Ticket, User } from 'models'

export interface AppState {
  tickets: Ticket[]
  users: User[]
  user: User
}
