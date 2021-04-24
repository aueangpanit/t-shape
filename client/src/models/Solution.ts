import { User } from './User'

export interface Solution {
  solutionId: number
  author: User
  description: string
  dateCreated: Date
  dateUpdated: Date
}
