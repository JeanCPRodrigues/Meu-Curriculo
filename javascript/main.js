(function () {
    'use strict';

    const inputFilter = "#inputFinderAptidao";
    const listaUlAptidao = "#ulListAptidao";
    const spanInfoViewListAptidao = ".totalItemFindAptidaoView";
    const spanInfoStarListAptidao = ".totalItemStarAptidaoView";

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

            var input, filter, ul, ol, label, i, txtValue, visible, totalItemOl, star, totalStar, totalStarFill;
            input = document.getElementById(inputFilter.replace(/[#]/g, ''));
            filter = input.value.toUpperCase();
            ul = document.getElementById(listaUlAptidao.replace(/[#]/g, ''));
            ol = ul.getElementsByTagName("ol");
            totalItemOl = ol.length;
            totalStar = 0;
            totalStarFill = 0;
            visible = 0;
            for (i = 0; i < ol.length; i++) {

                label = ol[i].getElementsByTagName("label")[0];
                star = ol[i].getElementsByTagName("i");
                

                // VERIFICA SE O VALOR INFORMADO NO INPUT EXISTE
                txtValue = label.textContent || label.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    ol[i].style.display = "";
                    visible++;

                    // VERIFICAR QUANTAS ESTRELAS PREENCHIDAS EXISTEM
                    for (let x = 0; x < star.length; x++) {
                        var startRow = star[x].className;
                        if (startRow == "bi bi-star-fill") {
                            totalStarFill++;
                        }
                    }

                    totalStar += star.length;
                } else {
                    ol[i].style.display = "none";
                }

            }

            // SELECIONANDO SPAN
            var spanInfoFindAptidao = select(spanInfoViewListAptidao);
            var spanInfoStarAptidao = select(spanInfoStarListAptidao);

            // ALTER TEXT SPAN INFO TOTAL LIST
            var percentListView_Hide = (visible / totalItemOl * 100).toFixed(0);
            spanInfoFindAptidao.innerText = `Lista: ${visible} de ${totalItemOl} (${percentListView_Hide}%)`;

            // ALTER TEXT SPAN INFO TOTAL STAR
            var percentStarView_Hide = (visible / totalItemOl * 100).toFixed(0);
            var porcentagemStarFill = !(totalStarFill/totalStar*100)?'0':(totalStarFill/totalStar*100).toFixed(0);
            spanInfoStarAptidao.innerText = `${totalStarFill} 🌟 (${porcentagemStarFill}%) de ${totalStar} 🌟`;

            // RESUMO DA OPERACAO EM UM ARRAY
            console.groupCollapsed(`RESUMO OPERACAO: "filterList", FILD: "${filter}"`)
            console.log({
                "star": {
                    "total_star": totalStar,
                    "total_star_fill": totalStarFill
                }
            });
            console.groupEnd();

        } catch (x) {
            console.log(x);
        }

    }

    // AO DIGITAR NO INPUT FILTER LIST
    on('keyup', inputFilter, function (e) {

        try {
            filterList();
        } catch (x) {
            console.log(x);
        }

    });


    setTimeout(function () {
        filterList();
    }, 1);

})();