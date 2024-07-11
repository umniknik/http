/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    return fetch('http://localhost:7070/?method=allTickets')
      .then((response) => response.json())
        then((data) => {
          console.log(data);
        })
  }

  get(id, callback) {}

  create(data, callback) {}

  update(id, data, callback) {}

  delete(id, callback) {}
}
