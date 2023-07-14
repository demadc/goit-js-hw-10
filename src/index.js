/*
Колекція порід

Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід. 
Для цього необхідно виконати GET-запит на ресурс 
https://api.thecatapi.com/v1/breeds, що повертає масив об'єктів. 
У разі успішного запиту, необхідно наповнити select.breed-select опціями так, 
щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася 
назва породи.
Напиши функцію fetchBreeds(), яка виконує HTTP-запит і повертає проміс із 
масивом порід - результатом запиту. Винеси її у файл cat-api.js та зроби 
іменований експорт.
*/

/*
Інформація про кота

Коли користувач обирає якусь опцію в селекті, необхідно виконувати запит 
за повною 
інформацією про кота на ресурс https://api.thecatapi.com/v1/images/search. 
Не забудь вказати в цьому запиті 
параметр рядка запиту breed_ids з ідентифікатором породи.

Ось як буде виглядати URL-запит для отримання повної інформації про собаку за ідентифікатором породи:

https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи

Напиши функцію fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP-запит і повертає проміс 
із даними про кота - результатом запиту. Винеси її у файл cat-api.js і зроби іменований експорт.

Якщо запит був успішний, під селектом у блоці div.cat-info з'являється зображення і розгорнута інформація 
про кота: назва породи, опис і темперамент.

Опрацювання стану завантаження

Поки відбувається будь-який HTTP-запит, необхідно показувати завантажувач - елемент p.loader. 
Поки запитів немає або коли запит завершився, завантажувач необхідно приховувати. Використовуй для цього додаткові CSS класи.

Поки виконується запит за списком порід, необхідно приховати select.breed-select та показати p.loader.
Поки виконується запит за інформацією про кота, необхідно приховати div.cat-info та показати p.loader.
Як тільки будь-який запит завершився, p.loader треба приховати.
Опрацювання помилки

Якщо у користувача сталася помилка під час будь-якого HTTP-запиту, наприклад, впала мережа, була втрата пакетів тощо, т
обто проміс було відхилено, необхідно відобразити елемент p.error, а при кожному наступному запиті приховувати його. Використовуй для цього додаткові CSS класи.

Протестувати працездатність відображення помилки дуже просто - зміни адресу запиту додавши в кінець будь-який символ, 
наприклад замість https://api.thecatapi.com/v1/breeds використай https://api.thecatapi.com/v1/breeds123. 
Запит отримання списку порід буде відхилено з помилкою. Аналогічно для запиту інформації про кота за породою.

Інтерфейс

Додай мінімальне оформлення елементів інтерфейсу.
Замість select.breed-select можеш використовувати будь-яку бібліотеку з красивими селектом, наприклад https://slimselectjs.com/
Замість p.loader можеш використовувати будь-яку бібліотеку з красивими CSS-завантажувачами, наприклад https://cssloaders.github.io/
Завантажувач p.error можеш використовувати будь-яку бібліотеку з гарними сповіщеннями, наприклад Notiflix
*/
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createMarkup } from './js/cat-card-template';
import { refs } from './js/refs';

refs.selectEl.addEventListener('change', onHandleBreed);

fetchBreeds()
  .then(data => {
    refs.selectEl.classList.remove('is-hidden');
    refs.loaderEl.classList.add('is-hidden');

    const markup = data
      .map(catInfo => {
        return `<option value="${catInfo.id}">${catInfo.name}</option>`;
      })
      .join('');

    refs.selectEl.innerHTML = markup;
  })
  .catch(err => {
    console.log(err.message);
    refs.loaderEl.classList.add('is-hidden');
    refs.errorEl.classList.remove('is-hidden');
  });

function onHandleBreed(evt) {
  const catId = evt.target.value;
  refs.contentEl.innerHTML = '';
  refs.loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(catId)
    .then(data => {
      const catInfo = {
        url: data[0].url,
        name: data[0].breeds[0].name,
        temperament: data[0].breeds[0].temperament,
      };

      refs.loaderEl.classList.add('is-hidden');
      refs.contentEl.innerHTML = createMarkup(catInfo);
    })
    .catch(err => {
      console.log(err.message);
      refs.loaderEl.classList.add('is-hidden');
      refs.errorEl.classList.remove('is-hidden');
    });
}
