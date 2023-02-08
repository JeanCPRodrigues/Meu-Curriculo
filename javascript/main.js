(function () {
    'use strict';

    // SELETOR DE ELEMENTOS
    const select = (el, all = false) => {
        el = el.trim();
        if(all){
            return [...document.querySelectorAll(el)];
        }else{
            return document.querySelector(el);
        }
    }

    // GATILHO
    const on = (type, el, listener, all = true) => {
        let selectEl = select(el, all);
        if(selectEl){
            if(all){
                selectEl.forEach(e => e.addEventListener(type, listener));
            }else{
                selectEl.addEventListener(type, listener);
            }
        }
    }

    


})