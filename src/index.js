
/*const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
});

export const fetchCountries = (name) => {
    return fetch(`${BASE_URL}${name}?${searchParams}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error(response.status);
            }
            return response.json();
        });
};*/

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




import axios from "axios";


//live_WfU35sW4GoFIy2gtPF0xU3gWNdbGZz97qy4KtwWrG9TWrzoKkAC6CJ47Nj1nHJf5
axios.defaults.headers.common["x-api-key"] = "live_WfU35sW4GoFIy2gtPF0xU3gWNdbGZz97qy4KtwWrG9TWrzoKkAC6CJ47Nj1nHJf5";


//https://api.thecatapi.com/v1/images/search
//https://api.thecatapi.com/v1/images/search?limit=10
//https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME



const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT = `breeds`;

const refs = {
    selectEl: document.querySelector('breed-select'),
    contentEl: document.querySelector('cat-info'),
    itemEl: document.querySelector('js-item')
}

function fetchBreeds() {
    const option = new URLSearchParams({
        limit: 25,
        page: 0,
    })
    return fetch(`${BASE_URL}${END_POINT}?${option}`).then((response) => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    });

}
fetchBreeds()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    
   function fetchCatByBreed(breedId) {  
    const END_POINT = `images/search`
    const option = new URLSearchParams({
        breed_ids: 'abys, beng, scot, meti, bure, birm, java, cora,',
    })
    return fetch(`${BASE_URL}${END_POINT}?${option}`).then((response) => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    });
   }
   fetchCatByBreed()
    .then(data => console.log(data))
    .catch(err => console.log(err));
