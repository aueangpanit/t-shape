export enum TicketStatus {
  Open = 'OPEN',
  Done = 'DONE'
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
