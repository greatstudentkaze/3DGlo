'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothScrollDown from './modules/smoothScrollDown';
import tabs from './modules/tabs';
import slider from './modules/slider';
import hoverOverImage from './modules/hoverOverImage';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';

// Timer
countTimer('24 september 2020 00:00');

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
