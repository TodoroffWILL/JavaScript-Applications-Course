import page from './node_modules/page/page.mjs';
import { homeView } from './views/home.js';
import { articlesView } from './views/articles.js';
import { aboutView } from './views/about.js';
import { articlesDetailsView } from './views/articleDetails.js';
import { createView } from './views/create.js';

page('/home', homeView);
page('/articles', articlesView);
page('/about', aboutView);
page('/articles/:articleId', articlesDetailsView);
page('/create', createView);
page.start();
