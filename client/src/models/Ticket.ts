export enum TicketStatus {
  open = 'OPEN',
  done = 'DONE'
}

export interface Ticket {
  id: number
  title: string
  status: TicketStatus
  author: string
  description: string
  dateCreated: Date
  dateUpdated: Date
}
