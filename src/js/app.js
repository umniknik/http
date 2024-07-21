import HelpDesk from './HelpDesk';
import TicketService from './TicketService';
import TicketForm from './TicketForm';


const root = document.getElementById('root');

const app = new HelpDesk(root);

//Выводим кнопку "добавить тикет"
const addTicketButton = document.createElement('button');
    addTicketButton.textContent = 'Добавить тикет';
    addTicketButton.addEventListener('click', () => {
      
      ticketForm.createPopupWindow();  //запускаем метод создания формы
    });
root.appendChild(addTicketButton);

const ticketForm = new TicketForm();



//Выводим таблицу
const ticketService = new TicketService();
ticketService.list();

