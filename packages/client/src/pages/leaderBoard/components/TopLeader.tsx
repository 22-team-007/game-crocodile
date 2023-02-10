import { FC } from 'react'
import { Leader, IsLeader } from './Leader'

interface IsTopLeader extends IsLeader {
  title: string
}

export const TopLeader: FC<IsTopLeader> = props => {
  const { title, ...other } = props

  return (
    <div className="shadow p-2 border rounded top-leader d-flex flex-column">
      <div className="text-center">{title}</div>
      <Leader {...other} />
    </div>
  )
}
