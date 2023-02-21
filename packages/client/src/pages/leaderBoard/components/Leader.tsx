import { FC } from 'react'

export const Leader: FC<LeaderProps> = props => {
  const { display_name, score, avatar, login } = props
  const name = display_name ? display_name : login
  return (
    <div className="leader">
      <div className={`leader__avatar ${avatar ? '' : 'no-avatar'}`}>
        <div className="leader__img-wrapper">
          {avatar ? <img src={avatar} /> : <div>no-avatar</div>}
        </div>
      </div>
      <div className="leader__info">
        <div className="leader__info-name text-nowrap font-weight-bold">
          {name ? name : 'пользователь не определен'}
        </div>
        <div className="leader__info-score">{score ? score : 0}</div>
      </div>
    </div>
  )
}
