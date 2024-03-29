import { FC } from 'react'
import { Leader } from './Leader'

export const TopLeader: FC<TopLeaderProp> = props => {
  const { title, user } = props

  return (
    <div className="shadow p-2 border rounded top-leader d-flex flex-column">
      <div className="text-center">{title}</div>
      <Leader {...user} />
    </div>
  )
}
