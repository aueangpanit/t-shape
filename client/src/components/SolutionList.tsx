import { Button, List } from 'antd'
import { useDeleteSolution, useEditSolution } from 'hooks'
import { Solution } from 'models'
import React, { FC, useState } from 'react'
import { SolutionForm } from './SolutionForm'

export interface SolutionListProps {
  ticketId: number
  solutions: Solution[]
  fetchSolutions: () => void
}

export const SolutionList: FC<SolutionListProps> = ({
  ticketId,
  solutions,
  fetchSolutions
}) => (
  <List
    header="Solutions"
    itemLayout="horizontal"
    dataSource={solutions}
    renderItem={solution => (
      <SolutionItem
        ticketId={ticketId}
        solution={solution}
        fetchSolutions={fetchSolutions}
      />
    )}
  />
)

interface SolutionItemProps {
  ticketId: number
  solution: Solution
  fetchSolutions: () => void
}

const SolutionItem: FC<SolutionItemProps> = ({
  ticketId,
  solution,
  fetchSolutions
}) => {
  const [editing, setEditing] = useState(false)
  const [editSolution, editSolutionLoading] = useEditSolution(
    solution.solutionId,
    ticketId
  )
  const [deleteSolution, deleteSolutionLoading] = useDeleteSolution(
    solution.solutionId
  )

  if (editing) {
    return (
      <SolutionForm
        style={{ marginTop: 16 }}
        title={`${solution.author.name} (editing)`}
        initialValues={solution}
        loading={editSolutionLoading}
        onCancel={() => setEditing(false)}
        onFinish={async values => {
          await editSolution(values)
          fetchSolutions()
          setEditing(false)
        }}
      />
    )
  }

  return (
    <List.Item
      actions={[
        <Button type="link" onClick={() => setEditing(true)}>
          edit
        </Button>,
        <Button
          loading={deleteSolutionLoading}
          type="link"
          onClick={async () => {
            await deleteSolution()
            fetchSolutions()
          }}
        >
          delete
        </Button>
      ]}
    >
      <List.Item.Meta
        title={solution.author.name}
        description={solution.author.email}
      />
      {solution.description}
    </List.Item>
  )
}
