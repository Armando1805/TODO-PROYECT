import { Todo } from '../models/todo.model';

if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permiso para notificaciones concedido.');
      } else {
        console.log('El usuario no concedió permiso para notificaciones.');
      }
    });
  }
  
  // Resto de tu código de la aplicación cliente
  // ...
  

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error('A TODO object is required');

  const { done, description, id } = todo;

  const html = `
    <div class="view">
      <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
      <label>${description}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  `;

  const liElement = document.createElement('li');
  liElement.innerHTML = html;
  liElement.setAttribute('data-id', id);

  if (todo.done) liElement.classList.add('completed');

  // Envía una notificación cuando se crea un TODO
  sendNotification(description);

  return liElement;
};

function sendNotification(description) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.showNotification('Nuevo TODO', {
          body: description,
        //   icon: '/icon.png', // Ruta a un ícono para la notificación
        });
      })
      .catch((error) => {
        console.error('Error al enviar la notificación:', error);
      });
  }
}
