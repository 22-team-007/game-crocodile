import { Link } from 'react-router-dom'
import './style.scss'

const StartPage = () => {
  return (
    <>
      <div className="greeting p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Добро пожаловать!</h1>
          <figure>
            <blockquote className="blockquote">
              <p className="col-md-8 fs-4">
                Рады приветствовать, в нашей игре - <b>Крокодил</b>!
              </p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Пригласите друзей, и играйте вместе
            </figcaption>
          </figure>
          <Link className="btn btn-primary btn-lg" to="signin">
            Начать играть
          </Link>
        </div>
      </div>
      <div className="rules-list">
      <h2 id="rules">Правила игры</h2>
      <hr />
      <p>Чтобы начать игру, вам нужно создать комнату и пригласить игроков.</p>
      <p>
        В комнате должно быть больше одного играка, тогда Игра начнет загадывать
        слова.
      </p>
      <p>
        Игроки по очереди рисуют загаданные слова, а остальные игроки пишут в
        чат свои варианты.
      </p>
      <p>
        Первому отгадавшему верное слова, будут начаслены <b>10 баллов</b>.
      </p>
      <p>
        За участие в игре будет начислен <b>1 балл</b>.
      </p>
      <p>После начисления баллов произойдет переход хода к другому игроку.</p>
      <p>
        <u>Запрещается писать слово на рисунке и однокоренные слова!</u>
      </p>
      <p>
        Игра продолжается X раундов, по завершении которой, очки за игру
        начисляются в общую копилку.
      </p>
      <p>
        Список лидеров строится на основании баллов заработанных играком, те кто
        хорошо объясняют слова и те кто по рисунку легко определяют слова будут
        лидерами игры.
      </p>
      </div>
    </>
  )
}
export default StartPage
