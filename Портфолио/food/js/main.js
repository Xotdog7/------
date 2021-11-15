window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {

            item.style.display = 'none';
        });

        tabs.forEach(item => {

            item.classList.remove("tabheader__item_active");

        });
    }

    function showTabContent(i = 0) //Стандарт ES6 
    {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', event => {
        const target = event.target;


        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });
        };

    });

    // slide
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');
    let slideIndex = 5; // начало отсчета

    showSlides(slideIndex) // передает данные

    if(slides.length<10){
        total.textContent=`0${slides.length}`;
    }
    else{
        total.textContent=slides.length;
    }
    function showSlides(n) { //Получает данные
        if (n > slides.length) { // Условие если наш счетчик будет больше длины. То счетчик возращает 1, то есть возращает первую картину
            slideIndex = 1;
        }
        else if (n < 1) { // второе условие если меньше возращает длину псевдомассива
            slideIndex = slides.length;
        }
        console.log(n);

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';
        if(slides.length<10){
            current.textContent=`0${slideIndex}`;
        }
        else{
            current.textContent=slideIndex;
        }

    }

    function pluSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        pluSlides(-1);
    })

    next.addEventListener('click', () => {
        pluSlides(1);
    })


    // Calc
    const result = document.querySelector('.calculating__result span')

    let sex, height, weight, age, ratio;

    if ((localStorage.getItem('sex'))) {
        console.log('local ', localStorage.getItem('sex'));
        sex = localStorage.getItem('sex');
        console.log(sex);
    }
    else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if ((localStorage.getItem('ratio'))) {
        ratio = localStorage.getItem('ratio');
    }
    else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375)
    }

    function calcTotal() {


        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));

        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {

        let elements = document.querySelectorAll(`${parentSelector} div`)
        // Изучить этот момент
        elements.forEach(elem => {
            elem.addEventListener('click',
                (e) => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));

                    }
                    else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));

                    }


                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    })
                    e.target.classList.add(activeClass);
                    calcTotal();
                });
        })



    }

    getStaticInformation('#gender', 'calculating__choose-item_active');// передаем айди и класс. 


    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {

        const input = document.querySelector(selector);
        input.addEventListener('input',
            () => {
                if (input.value.match(/\D/g)) // Разобраться
                {
                    input.style.border = '1px solid red';

                }
                else {
                    input.style.border = 'none';
                }
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;


                }
            })
        calcTotal();
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    // Эксперимент с классами

    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentSelectore) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.transfer = 430;
    //         this.parent = document.querySelector(parentSelectore)
    //         this.changeToKZT();
    //     }
    //     changeToKZT() {
    //         this.price = this.price * this.transfer;
    //     }

    //     render() {
    //         const element = document.createElement('div');
    //         element.innerHTML = ` 
    //         <div class="menu__item">
    //         <img src=${this.src}  alt=${this.alt}>
    //         <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
    //         <div class="menu__item-descr">${this.descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${this.price}</span> /день</div>
    //         </div>
    //     </div>`;

    //         this.parent.append(element);

    //     }
    // }

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     "Меню Фитнес",
    //     ">Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    //     100,
    //     '.menu .container'

    // ).render();
});
