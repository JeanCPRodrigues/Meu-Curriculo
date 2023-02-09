(function () {
    'use strict';

    const inputFilter = "#inputFinderAptidao";
    const listaUlAptidao = "#ulListAptidao";

    // SELETOR DE ELEMENTOS
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    }

    // GATILHO
    const on = (type, el, listener, all = true) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    }

    // FUNCAO QUE FILTRA LISTA
    const filterList = async () => {

        try {

            var input, filter, ul, ol, label, i, txtValue;
            input = document.getElementById(inputFilter.replace(/[#]/g, ''));
            filter = input.value.toUpperCase();
            ul = document.getElementById(listaUlAptidao.replace(/[#]/g, ''));
            ol = ul.getElementsByTagName("ol");
            for (i = 0; i < ol.length; i++) {
                label = ol[i].getElementsByTagName("label")[0];
                txtValue = label.textContent || label.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    ol[i].style.display = "";
                } else {
                    ol[i].style.display = "none";
                }
                console.log(ol[i]);
            }

        } catch (x) {
            console.log(x);
        }

    }
    filterList();

    // AO DIGITAR NO INPUT FILTER LIST
    on('keydown', inputFilter, function (e) {

        try {
            filterList();
            console.log('KeyPress');
        } catch (x) {
            console.log(x);
        }

    });

})();