let adv = document.querySelector('.adv');
let books = document.querySelector('.books');
let book = document.querySelectorAll('.book');

// Восстановить порядок книг.
book[0].before(book[1]);
book[2].before(book[4]);
book[2].before(book[3]);
book[2].before(book[5]);
console.log(book);

// Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
let titleBook3 = book[4];
titleBook3.childNodes[1].childNodes[1].textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
adv.remove();

// Восстановить порядок глав во второй и пятой книге
// книга 2
let book2 = document.querySelectorAll('.book')[1];
let listBooks2 = book2.getElementsByTagName('li');
listBooks2[3].after(listBooks2[6])   
listBooks2[4].after(listBooks2[8])   

// книга 5
let book5 = document.querySelectorAll('.book')[4];
let listBooks5 = book5.getElementsByTagName('li');
listBooks5[1].after(listBooks5[9]);
listBooks5[2].after(listBooks5[4]);
listBooks5[3].after(listBooks5[5]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let book6 = document.querySelectorAll('.book')[5];
let list8 = document.createElement('li');
let li6 = book6.getElementsByTagName('li');
let listBooks6 = book6.getElementsByTagName('ul')[0];
list8.textContent = 'Глава 8: За пределами ES6';
console.log(listBooks6);
li6[10].after(li6[11]);
listBooks6.append(list8);


