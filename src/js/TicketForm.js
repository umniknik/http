import TicketService from './TicketService';
/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() { }

  createPopupWindow() {
    // Создать попап-окно
    const popup = document.createElement('div');
    popup.classList.add('popuper');

    // Создать заголовок попап-окна
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = 'Добавить тикет';
    popupTitle.classList.add('popuper-title');

    // Создать поле для краткого описания
    const shortDescriptionLabel = document.createElement('label');
    shortDescriptionLabel.textContent = 'Краткое описание:';
    const shortDescriptionInput = document.createElement('input');
    shortDescriptionInput.type = 'text';
    shortDescriptionInput.classList.add('popuper-content');

    // Создать поле для подробного описания
    const longDescriptionLabel = document.createElement('label');
    longDescriptionLabel.textContent = 'Подробное описание:';
    const longDescriptionInput = document.createElement('textarea');
    longDescriptionInput.classList.add('popuper-content');

    // Создать кнопку "Отмена"
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Отмена';
    cancelButton.classList.add('btn');
    cancelButton.addEventListener('click', () => {
      popup.remove();
    });

    // Создать кнопку "ОК"
    const okButton = document.createElement('button');
    okButton.textContent = 'ОК';
    okButton.classList.add('btn');
    okButton.addEventListener('click', () => {
      // Jбработчик клика на кнопку "ОК", сохранение данных тикета*

      //формируем данные тикета
      const newTicket = {
        name: shortDescriptionInput.value,
        description: longDescriptionInput.value,
        status: false
      };

      const ticketService = new TicketService();
      ticketService.create(newTicket);

      // ...
      popup.remove();
    });

    // Добавить элементы в попап-окно
    popup.appendChild(popupTitle);
    popup.appendChild(shortDescriptionLabel);
    popup.appendChild(shortDescriptionInput);
    popup.appendChild(longDescriptionLabel);
    popup.appendChild(longDescriptionInput);
    popup.appendChild(cancelButton);
    popup.appendChild(okButton);

    // Добавить попап-окно в DOM
    document.body.appendChild(popup);
  }

  updatePopupWindow(ticketId) {
    // Создать попап-окно
    const popup = document.createElement('div');
    popup.classList.add('popuper');
    // Создать заголовок попап-окна
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = 'Добавить тикет';
    popupTitle.classList.add('popuper-title');

    // Создать поле для краткого описания
    const shortDescriptionLabel = document.createElement('label');
    shortDescriptionLabel.textContent = 'Краткое описание:';
    const shortDescriptionInput = document.createElement('input');
    shortDescriptionInput.type = 'text';
    shortDescriptionInput.classList.add('popuper-content');
    //shortDescriptionInput.value = id.description;
    console.log(ticketId);

    // Создать поле для подробного описания
    const longDescriptionLabel = document.createElement('label');
    longDescriptionLabel.textContent = 'Подробное описание:';
    const longDescriptionInput = document.createElement('textarea');
    longDescriptionInput.classList.add('popuper-content');

    // Создать кнопку "Отмена"
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Отмена';
    cancelButton.classList.add('btn');
    cancelButton.addEventListener('click', () => {
      popup.remove();
    });

    // Создать кнопку "ОК"
    const okButton = document.createElement('button');
    okButton.textContent = 'ОК';
    okButton.classList.add('btn');
    okButton.addEventListener('click', () => {

      //формируем данные тикета
      const newTicket = {
        name: shortDescriptionInput.value,
        description: longDescriptionInput.value,
        status: false
      };


      // Отправить новые данные тикета на сервер
      const ticketService = new TicketService();
      ticketService.update(ticketId, newTicket);
      // ...
      popup.remove();
    });

    // Добавить элементы в попап-окно
    popup.appendChild(popupTitle);
    popup.appendChild(shortDescriptionLabel);
    popup.appendChild(shortDescriptionInput);
    popup.appendChild(longDescriptionLabel);
    popup.appendChild(longDescriptionInput);
    popup.appendChild(cancelButton);
    popup.appendChild(okButton);

    // Добавить попап-окно в DOM
    document.body.appendChild(popup);
  }

  deletePopupWindow(ticketId) {
    // Создать попап-окно
    const popup = document.createElement('div');
    popup.classList.add('popuper');
    // Создать заголовок попап-окна
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = 'Удалить тикет';
    // Создать текст попап-окна
    const popupText = document.createElement('p');
    popupText.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.'

    // Создать кнопку "Отмена"
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Отмена';
    cancelButton.classList.add('btn');
    cancelButton.addEventListener('click', () => {
      popup.remove();
    })

    // Создать кнопку "ОК"
    const okButton = document.createElement('button');
    okButton.textContent = 'Ок';
    okButton.classList.add('btn');
    okButton.addEventListener('click', () => {
      // Удаление тикета
      const ticketService = new TicketService();
      ticketService.delete(ticketId); // Вызываем метод deleteTicket с ID тикета
      popup.remove();
    })

    // Добавить элементы в попап-окно
    popup.appendChild(popupTitle);
    popup.appendChild(popupText);
    popup.appendChild(cancelButton);
    popup.appendChild(okButton);

    // Добавить попап-окно в DOM
    document.body.appendChild(popup);
  }

}
