# Проект Космической бургерной

### В данном проекте использовались:

* Figma
* TypeScript
* React
* Redux
* React router dom
* WebSocet
* Drag n Drop
* Jest
* Cypress
* Модули
* Функциональные компоненты
* Сookie

![Начальная страница сайта](https://github.com/SemaJenya/burger-project/repository_cleaning/src/images/main-page.png)






На данном этапе на нашем сайте работают: открытие и закрытие модальных окон, скрол информации, полученной с сервера, валидация пропсов. Использовались готовые функциональные компоненты и были написаны свои.

Произошли обновления. Наш сайт начал работать с хранилищем Redux. Появились несколько стейтов. Иноформация хранится в сторе. Высчитывается сумма заказа. Добавлять ингредиенты в бургер можно перетаскивая их. Менять расположение ингредиентов. При этом при добавлении увеличивается счетчик. При удалении - уменьшается. 

Ко всему этому добавлена функциональность перехода на страницы: логина, регистрации, восстановления пароля. Имеются зашишенные маршруты, на которые может перейти только авторизованный пользователь. А также маршруты, куда не может перейти зарегестрированный юзер. 

Подключен TypeScript и типизированы все компоненты и часть стора.

Добавлены страницы всех заказов и заказов пользователя. Использован WS для непрерывного обмена заказами.

В заключительной части нашей разработки - покрытие приложения тестами. Написаны unit-тесты для всех редьюсеров, а также написаны e2e тесты для функциональности конструктора бургера, которая включает в себя: 

1. Проверка открытия приложения на локальном сервере
2. Тестирование открытия модальных окон
3. Перетаскивание ингредиентов в конструктор
4. Получение информации о заказе

Работа завершена и я очень уставшая и довольная. Всем спасибо, что участвовал со мной в этом процессе!

**GitHub Pages**

[https://semajenya.github.io/burger-project/]
[https://sardelka.nomoredomains.rocks]
