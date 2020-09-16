// Polyfills
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
import 'scroll-behavior-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

// Modules
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothScrollDown from './modules/smoothScrollDown';
import tabs from './modules/tabs';
import slider from './modules/slider';
import hoverOverImage from './modules/hoverOverImage';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';

// Init modules

// Timer
countTimer('21 september 2020 21:00');

// Menu
toggleMenu();

// Popups
togglePopup();

// Smooth Scrolling to service-block
smoothScrollDown();

// Tabs
tabs();

// Slider
slider();

// Image hover
hoverOverImage();

// Calculator
calculator();

// Send ajax form
sendForm();
