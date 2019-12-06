/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import express from 'express';
import React from 'react';
import { matchRoutes } from 'react-router-config';
import compression from 'compression'; // Активирует gzip сжатие для express
import htmlTemplateRenderer from './until/htmlTemplateRenderer';
import createStore from './redux/store';
import Routes from './routes';

const app = express();

// проверка на необходимость сжатия
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

app.use(
  compression({
    level: 2, // Устанавливаем уровень сжатия от 1 до 9 (6 по умолчанию)
    filter: shouldCompress
  })
);

const port = process.env.PORT || 3000;

// Указываем путь к статическим файлам
app.use(express.static('public'));

app.get('*', (req, res) => {
  const params = req.params[0].split('/');
  const id = params[2];
  // Создаем store перед рендером, так как в htmlTemplateRenderer мы его получаем
  const store = createStore();

  // Сравниваем текущий роут со всеми возможными роутами приложения что бы получить необходимый компонент для рендера
  const routes = matchRoutes(Routes, req.path);

  // Тут мы запрашиваем все необходимые для рендера данные и оборачиваем их в еще один промис
  // это позволит обработать возможные ошибки уже после рендера и они не сломают наш рендер

  const promises = routes
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, id) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  // Ждем получения всех данных и отправляем отрендеренный html в браузер
  Promise.all(promises).then(() => {
    const context = {};
    const content = htmlTemplateRenderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
