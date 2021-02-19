const images = [];

const Carrosel = {
    
    init() {
        Carrosel.getImages();
        Carrosel.carroselMap();
        Carrosel.validateMap();
        DOM.innerImage(images[0].image);
    },

    getImages() {
        const carrosel = document.querySelectorAll("img");

        carrosel.forEach((element, index) => {
            const url = new URL(element.src)
            this.addImages(url.pathname, index);
        });

    },

    addImages(url, index) {
        images.push({image: url, index: index});
    },

    backImage() {
        const carrosel = document.querySelector(".carrosel");
        var index = images[0].index;

        if(carrosel.classList.length == 2) {
            index = Number(carrosel.classList[1]);

            if(index > 0 && index < images.length) {
                index--;
                
                DOM.innerImage(images[index].image);
                carrosel.classList.remove(`${index + 1}`);
                carrosel.classList.add(`${index}`);
                
                if(index == 0) {
                    carrosel.classList.remove(`${index}`);
                    carrosel.classList.add(`${index}`);
                }

                this.validateMap();
                return;
            } 

            if(index === 0) {
                index = images.length - 1;
                DOM.innerImage(images[index].image);

                carrosel.classList.remove(`${'0'}`);
                carrosel.classList.add(`${index}`);

                this.removeSelect();
                this.validateMap();
            }

            return;
        }
    

        if(index === 0) {
            index = images.length - 1;
            DOM.innerImage(images[index].image);

            carrosel.classList.add(`${index}`);
            this.removeSelect()
            this.validateMap();
        }
    },

    nextImage() {
        const carrosel = document.querySelector(".carrosel");
        var index = images[0].index;

        if(carrosel.classList.length == 2 && carrosel.classList[1] != '0') {
            index = Number(carrosel.classList[1]);

            if(index == 5) {
                index = 0;
              
                this.removeSelect();
                carrosel.classList.remove(`${images.length - 1}`);
                carrosel.classList.add(`${index}`);

                DOM.innerImage(images[index].image);
                this.validateMap();

                return;
            }

            if(index > 0 && index < images.length && index != 5) {
                index++;

                if(index == images.length) {
                    index = 0;
                    DOM.innerImage(images[index].image);
                    carrosel.classList.remove(`${images.length - 1}`);
                    carrosel.classList.add(`${index}`);

                    return; 
                }

                DOM.innerImage(images[index].image);
                carrosel.classList.remove(`${index - 1}`);
                carrosel.classList.add(`${index}`);
                
                if(index == 0) {
                    carrosel.classList.remove(`${index}`);
                }

                this.validateMap();
            } 
            return;
        }

        if(index === 0 || index === '0') {
            index++;
            this.removeSelect();
            DOM.innerImage(images[index].image);
            carrosel.classList.remove(`0`);
            carrosel.classList.add(`${index}`);
         
        }

        this.validateMap();
    },

    carroselMap() {
        const map = document.querySelector("#map");

        images.forEach((element, index)=> {
            map.children[index].style.backgroundImage = `url(${element.image})`;
            map.children[index].index = index;
        });
    },

    validateMap() {
        const carrosel = document.querySelector(".carrosel");
        const map = document.querySelector("#map");
        indexCarrosel = Number(carrosel.classList[1]);

        this.removeSelect();

        for(let i = 0; i < images.length; i++) {

            if(i === indexCarrosel) {
                map.children[i].classList.add("select")
        
                return;
            }
        }

    },

    removeSelect() {
        const mapItem = document.querySelectorAll("#map div");

        mapItem.forEach((element)=> {
            if(element.classList.length >= 2) {
                element.classList.remove("select")
            }
        });
    }
}

const DOM = {
    innerImage(urlImage) {
        const carrosel = document.querySelector(".carrosel");

        carrosel.style.backgroundImage = `url(${urlImage})`;
    }
}

Carrosel.init();