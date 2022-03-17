function getWidth(url, fixedH = 0){
    return new Promise((resolve, reject) => {
        let imgT = new Image();
        imgT.setAttribute("crossOrigin", "anonymous");
        imgT.onload = () => {
            let imgW = imgT.width;
            let imgH = imgT.height;
            if (fixedH ? fixedH=fixedH : fixedH=imgH);
            imgW = (fixedH * imgW) / imgH;
            resolve(imgW);
        };
        imgT.onerror = error => {
            reject(error);
        };
        imgT.src = url;
    });
}

function getBase64ImageFromURL(url, ) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
            let canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            let dataURL = canvas.toDataURL("image/png");

            resolve(dataURL);
        };

        img.onerror = error => {
            reject(error);
        };

        img.src = url;
    });
}

async function createPdf(){

    let res_user = getResUser();

    let langs = res_user.langs;
    let langsUl = [];
    for (let i = 0; i < langs.length; i++){
        langsUl.push(langs[i].lang + '(' + langs[i].skill + ')');
    }

    let city = res_user.city;
    let salary = res_user.salary;

    let inpFiles = document.querySelector('#res_photo').files;
    let usrPhoto = inpFiles[0];
    let imgPath = './unknown.jpg';
    let imgHei = 200;

    if (usrPhoto){
        imgPath = URL.createObjectURL(usrPhoto);
    }
    let dd = {
        // header: {
        //     image: await this.getBase64ImageFromURL('./Template/header.png'),
        // },
        content: [
            {
                image: await this.getBase64ImageFromURL(imgPath, imgHei),
                width: await this.getWidth(imgPath, imgHei),
                height: imgHei,
            },
            {
                text: res_user.f_name + ' ' + res_user.l_name,
                style: [ 'header', 'mainStyle' ]
            },
            {
                text:'\nСтрана проживания: ' +res_user.country +
                    '\nТелефон: ' + res_user.phone +
                    '\nВозраст: ' + res_user.age +
                    '\nEmail: ' + res_user.email +
                    '\nСоциальные сети:',
                style: [ 'mainStyle' ],
            },
            {
                text: `\nОсновная информация`,
                style: 'subheader'
            },
            {
                text: '' + (city == '' ? '' : 'Желаемый город работы:'),
                style: [ 'mainStyle' ],
            },
            {
                text: city,
                style: [ 'mainStyle' ],
            },
            {
                text: (langsUl == '' ? '' : 'Владение языками:'),
                style: [ 'mainStyle' ],
            },
            {
                ul: langsUl,
                style: [ 'mainStyle' ],
            },
            {
                text: (salary == '' ? 'Желаемая заработная плата: Договорная' : 'Желаемая заработная плата: ' + salary),
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.hasDoc ? '\nДокументы': ''),
                style: ['subheader', 'mainStyle' ],
            },
            {
                ul :[
                    (res_user.bio ? 'Биометрия': ''),
                    (res_user.visa ? 'Рабочая виза': ''),
                    (res_user.gcart ? 'Green card': ''),
                ],
                style: [ 'mainStyle' ],
            },
            {
                text: '\nНаправление работы',
                style: ['subheader', 'mainStyle' ],
            },
            {
                text: 'Категория: ' + res_user.job_cat +
                    '\nЖелаемая должность: ',
                style: [ 'mainStyle' ],
            },
            {
                ul : res_user.position,

                style: [ 'mainStyle' ],
            },
            {
                text: '\nДополнительная информация',
                style: ['subheader', 'mainStyle' ],
            },
            {
                text: 'Тип занятости: ' + res_user.emp_type + '\n' +
                    (res_user.hasAdt ? 'Додатково: ' : ''),
                style: [ 'mainStyle' ],
            },
            {
                ul: [
                    (res_user.no_lang ? 'Без знания языка': ''),
                    (res_user.no_exp ? 'Без образовния': ''),
                    (res_user.no_edc? 'Без опыта работы': ''),
                ],
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.desc == '' ? '': '\nОписание'),
                style: ['subheader', 'mainStyle' ],
            },

            {
                text: (res_user.desc == '' ? '' : res_user.desc),
                style: [ 'mainStyle' ],
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            mainStyle:{
                lineHeight: 1.2,
                markerColor: '#5E9734',
            },
            mainStyle:{
              lineHeight: 1.2,
              markerColor: '#5E9734',
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            }
        }

    };
    pdfMake.createPdf(dd).download();
};