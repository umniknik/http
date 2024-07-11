/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor() {}

   // Метод для создания таблицы
   createTicketTable(tickets) {
     // Создать таблицу
     const table = document.createElement('table');

     const tableBody = document.createElement('tbody');
     tickets.forEach(ticket => {
       const tableRow = document.createElement('tr');
       const tableDataCells = [ticket.id, ticket.name, ticket.description, ticket.status, ticket.created];
       tableDataCells.forEach(cell => {
         const td = document.createElement('td');
         td.textContent = cell;
         tableRow.appendChild(td);
       });
       tableBody.appendChild(tableRow);
     });
 
     // Добавить тело таблицы в таблицу
     table.appendChild(tableBody);

     // Добавить таблицу в элемент #root
     const rootElement = document.getElementById('root');
     rootElement.appendChild(table);
  }
}
