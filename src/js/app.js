import HelpDesk from './HelpDesk';
import TicketView from './ticketview.js';

const root = document.getElementById('root');

const app = new HelpDesk(root);

// Получить массив тикетов с сервера
fetch('http://localhost:7070/?method=allTickets')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Ошибка при получении тикетов');
    }
  })
  .then(tickets => {
    // Создать объект TicketView
    const ticketView = new TicketView();

    // Создать таблицу тикетов
    const table = ticketView.createTicketTable(tickets);
  })
  .catch(error => {
    console.error(error);
  });
