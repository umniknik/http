import TicketService from './TicketService';
import TicketForm from './TicketForm';
/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor() { }

  // Метод для создания таблицы
  createTicketTable(tickets) {


    // //Удаляем старую таблицу
    if (document.querySelector('table')) {
      // Получить ссылку на таблицу
      const table = document.querySelector('table');
      // Удалить таблицу из DOM
      table.parentNode.removeChild(table);
    }


    // Создать таблицу
    const table = document.createElement('table');

    const tableBody = document.createElement('tbody');
    tickets.forEach(ticket => {
      const tableRow = document.createElement('tr');
      const tableDataCells = [ticket.id, ticket.status, ticket.name, ticket.description, ticket.created];

      tableDataCells.forEach(cell => {

        const td = document.createElement('td');
        if (cell === false) {
          // Создать кнопки "Статус - сделано - не сделано"
          const statusButton = document.createElement('button');
          statusButton.textContent = '✔'
          statusButton.classList.add('editBtn');
          statusButton.dataset.id = ticket.id;
          statusButton.addEventListener('click', () => {
            //открытие формы редактирования тикета
            const ticketForm = new TicketForm();
            const ticketId = event.target.dataset.id; // Получаем ID тикета из атрибута data-id
            ticketForm.updatePopupWindow(ticketId);
          });
          td.appendChild(statusButton);
          tableRow.appendChild(td);

        } else {
          console.log(cell);
          td.textContent = cell;
          tableRow.appendChild(td);

        }

      });

      //Показать полное описание тикета при клике на строчку
      tableRow.dataset.id = ticket.id;
      tableRow.addEventListener('click', () => {
        //Проверяем не отображено ли уже описание у этого тикета
        if (tableRow.querySelector('.description')) { //сначала проверяем есть ли описание у кликнутой строки, если есть то удаляем
          const element = tableRow.querySelector("span.description");
          element.remove();

        } else {
          if (document.querySelector('.description')) { //у кликнутой строки нет описания, значит проверяем нет ли в таблице др строки с описанием, чтобы и его закрыть перед открытием нового
            const element = document.querySelector("span.description");
            element.remove();
          }

          const ticketId = tableRow.querySelector('td:first-child').textContent.trim(); //берем id тикета из первой ячейки
          const ticketService = new TicketService();
          ticketService.get(ticketId); // отправляем запрос на получение информации о кликнутом тикете
          
          // =========== Здесь я пытался получить тикет зерез сервис get, но выходило undefined((( не знаю в чем дело ============
          // ticketService.get(ticketId).then(ticket => {
          //   console.log(ticket);
          // });// отправляем запрос на получение информации о кликнутом тикете
          // const ticket = await ticketService.get(ticketId);
          // console.log(ticket);
          // ticketService.get(ticketId).then(ticket => {
          //   console.log(ticket);
          // });
          // const ticket = await ticketService.get(ticketId);
          // console.log(ticket);
        }

      });

      // Создать кнопки "Редактировать"
      const editButton = document.createElement('button');
      editButton.textContent = '✎';
      editButton.classList.add('editBtn');
      editButton.dataset.id = ticket.id;
      editButton.addEventListener('click', () => {
        //открытие формы редактирования тикета
        const ticketForm = new TicketForm();
        const ticketId = event.target.dataset.id; // Получаем ID тикета из атрибута data-id
        ticketForm.updatePopupWindow(ticketId);
      });

      // Создать кнопки "Удалить"
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'x';
      deleteButton.classList.add('editBtn');
      deleteButton.dataset.id = ticket.id; // Добавляем атрибут data-id
      deleteButton.addEventListener('click', () => {
        // Удаление тикета
        const ticketForm = new TicketForm();
        const ticketId = event.target.dataset.id; // Получаем ID тикета из атрибута data-id
        ticketForm.deletePopupWindow(ticketId);
      });

      // Добавить кнопки "Редактировать" и "Удалить" в конец строки
      const actionCell = document.createElement('td');
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
      tableRow.appendChild(actionCell);


      tableBody.appendChild(tableRow);
    });

    // Добавить тело таблицы в таблицу
    table.appendChild(tableBody);

    // Добавить таблицу в элемент #root
    const rootElement = document.getElementById('root');
    rootElement.appendChild(table);

    //Форматирование дат в человекопонятный вид
    this.formatAllDate();

  }

  //отображение описания у тикета
  showDescription(id, ticket) {
    const row = document.querySelector(`tr[data-id="${id}"]`); // наъодим строчку с id
    const sell = row.querySelector('td:nth-child(3)'); //выбираем ячейку, которую будет изменять
    // Добавляем HTML-код во эту ячейку
    sell.innerHTML = `${ticket.name}<span class = 'description'>${ticket.description}</span>`; // замените на нужный HTML
    console.log(row);
  }

  //Форматирование дату
  formatDate(ddate) {
    const date = new Date(parseInt(ddate));
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedDate = date.toLocaleString('ru-RU', options).replace(',', '');
    return formattedDate;
  }

  //Форматирование всех дат в таблице
  formatAllDate() {
    // Получаем все элементы таблицы
    const tableRows = document.querySelectorAll("tr");

    // Перебираем строки таблицы
    for (const row of tableRows) {
      // Получаем данные из текущей строки
      //const id = row.getAttribute("data-id");
      const dateCell = row.querySelector("td:nth-child(5)");
      const dateValue = dateCell.textContent;

      // Форматируем дату с помощью функции
      const formattedDate = this.formatDate(dateValue);

      // Обновляем содержимое ячейки с датой
      dateCell.textContent = formattedDate;
    }
  }
}
