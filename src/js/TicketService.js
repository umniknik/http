import TicketView from './ticketview.js';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  //метод получения списка тикетов
  list(callback) {
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
  }

  get(id, callback) {
    fetch(`http://localhost:7070/?method=ticketById&id=${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при получении тикетов');
      }
    })
    .then(ticket => {

      // ===========  НЕ получилось вернуть тикет ((( все время undefined =====
      // // Создать объект TicketView
      // //console.log(ticket);
      // // return ticket;
      // callback(ticket);
     const ticketView = new TicketView();
     ticketView.showDescription(id, ticket);
    })
    .catch(error => {
      console.error(error);
    });
  }

  create(data, callback) {
    fetch('http://localhost:7070/?method=createTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        this.list();
        return response.json();   
        
      } else {
        throw new Error('Ошибка при создании тикета');
      }
    })
    .then(newTicket => {
      if (typeof callback === 'function') {
        callback(newTicket);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  update(id, data, callback) {
    fetch(`http://localhost:7070/?method=updateById&id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        this.list();
        return response.json();   
        
      } else {
        throw new Error('Ошибка при создании тикета');
      }
    })
    .then(newTicket => {
      if (typeof callback === 'function') {
        callback(newTicket);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  delete(id, callback) {
    fetch(`http://localhost:7070/?method=deleteById&id=${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Обновим список тикетов
        this.list();
      } else {
        throw new Error('Ошибка при удалении тикета');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
}
