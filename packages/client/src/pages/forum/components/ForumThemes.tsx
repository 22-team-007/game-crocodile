// React
import { memo } from 'react'
// Components
import { ListGroup, Image } from 'react-bootstrap'
// Hooks
import { useNavigate } from 'react-router-dom'
import useGetForumThemes from '../../../hooks/useGetForumThemes'


const ForumMessages = () => {

  const navigate = useNavigate()
  const { themes } = useGetForumThemes();

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h5>Последние темы</h5>
        <span>Ответы</span>
      </div>

      <ListGroup as="nav" className="forum-themes">
        {
          themes.map(theme =>
            <ListGroup.Item
              key={`theme-${theme.id}`}
              as="li"
              className="d-flex align-items-center justify-content-between"
              onClick={() => navigate(`${theme.id}`)}
            >
              <div className="d-flex align-items-center left">
                <Image
                  width={30}
                  height={30}
                  rounded={true}
                  src="https://place-hold.it/30x30/000"
                  alt="theme-image"
                />
                <div className="d-flex flex-column">
                  <span>{theme.subject}</span>
                  <div>
                    user1 <small>(5 минут назад)</small>
                  </div>
                </div>
              </div>
              <div className="right">
                <b>3</b>
              </div>
            </ListGroup.Item>
          )
        }
      </ListGroup>
    </>
  )
}
export default memo(ForumMessages)
