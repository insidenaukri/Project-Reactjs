import { useState } from 'react'
import Modal from '../components/modal/Modal'

export function Dummy() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const modalStyles = {
    content: {},
  }

  return (
    <main>
      <h2>Dummy</h2>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} styles={modalStyles}>
        <h2>Hello from the Modal!</h2>
        <p>
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tenetur minus nulla modi officiis possimus.
            Fuga nulla rerum ut suscipit molestiae earum iste nemo accusamus esse unde animi, dolores excepturi? Ducimus
            facere reprehenderit eius! Sequi, aut. Blanditiis illo nulla, dolor itaque eligendi, molestiae corporis
            deleniti consequuntur hic qui fugit optio atque culpa accusamus, impedit ducimus cum cupiditate veritatis
            incidunt nam. Possimus distinctio ab sequi pariatur id, totam facilis aspernatur esse vel hic laboriosam
            repellendus nisi quam architecto exercitationem porro! Aut saepe odit rem totam facilis sunt autem, commodi
            repudiandae blanditiis. Blanditiis vero assumenda ipsam itaque repellat veritatis modi quaerat optio nobis
            repudiandae minima animi quod ratione molestias suscipit, totam iure impedit consectetur id reprehenderit
            sapiente illum. In vel nostrum commodi. Ullam ipsam, tenetur eaque beatae rerum tempora quaerat sunt, a
            dolores, commodi odit blanditiis illo est! Laboriosam excepturi reiciendis dolores cumque consequuntur
            libero porro necessitatibus, dolore ad nostrum! Quod, praesentium? Aspernatur laborum necessitatibus ipsa!
            Ut suscipit neque quidem error alias tempora reiciendis amet dignissimos nulla hic. Excepturi mollitia,
            repudiandae magni perferendis quae ea. Minus eveniet unde aspernatur ut cupiditate iusto? Libero porro
            cumque eligendi voluptatibus consequatur aperiam officia commodi ratione repudiandae excepturi quas et vitae
            totam, veritatis ab sapiente quibusdam error minus aut quos quasi, facilis iure dicta tenetur. Nihil. Soluta
            nisi, laborum incidunt consectetur odio blanditiis unde odit aliquid recusandae ratione qui dolore tenetur
            veritatis facere eius eligendi deleniti at asperiores cupiditate facilis nobis distinctio, sint saepe?
            Recusandae, ea. Quam vel debitis ex porro nihil illum adipisci fugiat delectus modi sequi sunt totam quo
            incidunt ad dignissimos, ipsa voluptates corporis quod tempore? Harum fuga perferendis possimus consequatur,
            tenetur rem. Doloremque quo voluptate eveniet illo, voluptas quisquam laboriosam ea id dicta facere
            similique aut doloribus, corrupti sit consequuntur quam nisi deserunt iure rem nobis quibusdam vel vero. Et,
            rerum assumenda!
          </small>
        </p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </main>
  )
}
