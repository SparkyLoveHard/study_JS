"use strict";

// 1) Сделать класс DomElement, который содержит свойства- selector, - height, - width, - bg, - fontSize
const DomElement = function(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
};

DomElement.prototype.createElem = function() {
    let newElement;
    let newClassName;
    let newId;
    let selectorSubStr = this.selector.substring(1);

    if(this.selector[0] === '.') {
        newElement = document.createElement('div');
        newClassName = selectorSubStr;
        newElement.classList.add(newClassName);
    } else if(this.selector === '#') {
        newElement = document.createElement('p');
        newId = selectorSubStr;
        newElement.id = newId;
    }
	newElement.style.cssText = `
        height: ${this.height}px;
        width: ${this.width}px;
        background-color: ${this.bg};
        font-size: ${this.fontSize}px;
	`;
    document.body.appendChild(newElement);
};

let newDomElement = new DomElement('.block', 200, 200, '#ff5424', '14');
newDomElement.createElem();