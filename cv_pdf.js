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

function getBase64ImageFromURL(url) {
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
        langsUl.push(langs[i].lang + ': ' + langs[i].skill );
    }

    let edu = res_user.education;
    let eduUl = [];
    for (let i = 0; i < edu.length; i++) {
        eduUl.push(edu[i].inst + ': ' + edu[i].spec);
    }

    let exp = res_user.experience;
    let expUl = [];
    for (let i = 0; i < exp.length; i++) {
        expUl.push(exp[i].place + ': ' + exp[i].prof + ' ' + exp[i].stand);
    }

    let social = res_user.social;
    let socialUl = [];
    for (let i = 0; i < social.length; i++){
        socialUl.push(social[i].platform + ': ' + social[i].link );
    }

    let city = res_user.city;
    let position = res_user.position;
    let job = res_user.job;
    let salary = res_user.salary;
    let sal_period = res_user.sal_period;

    let inpFiles = document.querySelector('#res_photo').files;
    let usrPhoto = inpFiles[0];
    let imgPath = './unknown.jpg';
    let imgHei = 200;

    if (usrPhoto){ imgPath = URL.createObjectURL(usrPhoto);}

    let dd = {
        // header: {
        //     image: await this.getBase64ImageFromURL('./Template/header.png'),
        // },
        content: [
            {
                image: await this.getBase64ImageFromURL(imgPath),
                width: await this.getWidth(imgPath, imgHei),
                height: imgHei,
            },
            {
                text: res_user.f_name + ' ' + res_user.l_name,
                style: [ 'header', 'mainStyle' ]
            },
            {
                text:(res_user.country.length ? '\nСтрана проживания: ' + res_user.country : '') +
                    (res_user.phone.length ? '\nТелефон: ' + res_user.phone : '') +
                    (res_user.email.length ? '\nEmail: ' + res_user.email : '') +
                    (res_user.age.length ? '\nГод рождения: ' + res_user.age : ''),
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.has_dl ? '\nВодительские права: ' + res_user.driver : ''),
                style: [ 'mainStyle' ],
            },
            {
                text: (socialUl.length ? '\nСоциальные сети:' : ''),
                style: [ 'mainStyle' ],
            },
            {
                ul: socialUl,
                style: [ 'mainStyle' ],
            },
            {
                text: `\nОсновная информация`,
                style: 'subheader'
            },
            {
                text: (position.length ? '\nДолжность:' : ''),
                style: [ 'mainStyle' ],
            },
            {
                ul: position,
                style: [ 'mainStyle' ],
            },
            {
                text: (job[0].length ? '\nКатегория:' : ''),
                style: [ 'mainStyle' ],
            },
            {
                ul: job,
                style: [ 'mainStyle' ],
            },
            {
                text: (city[0].length ? '\nЖелаемый город работы: ' : ''),
                style: [ 'mainStyle' ],
            },
            {
                ul: city,
                style: [ 'mainStyle' ],
            },
            {
                text: (langsUl.length ? '\nВладение языками:' : ''),
                style: [ 'mainStyle' ],
            },
            {
                ul: langsUl,
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.fixedSalary ? '\nЖелаемая заработная плата: Договорная' : (salary.length ? '\nЖелаемая заработная плата: ' + salary : '' )),
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.fixedSalary ? '' :(salary.length ? 'Период заработной платы: ' + sal_period : '')),
                style: [ 'mainStyle' ],
            },

            {
                text: (res_user.hasDoc ? '\nДокументы: ': '') + (res_user.bio ? 'Биометрия': '') +
                    (res_user.visa ? 'Рабочая виза': '') + (res_user.gcart ? 'Green card': ''),
                style: ['mainStyle' ],
            },
            {
                text: (res_user.no_exp ? '\nОпыт работы': (expUl.length ? '\nОпыт работы: ' : '')),
                style: ['subheader', 'mainStyle' ],
            },
            {
                text: (res_user.no_exp ? 'Без опыта работы' : ''),
                style: [ 'mainStyle' ]
            },
            {
                ul : expUl,
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.no_edc ? '\nОбразование: ' :(eduUl.length ? '\nОбразование: ' : '')),
                style: ['subheader', 'mainStyle' ],
            },
            {
                text: (res_user.no_edc ? 'Без образования' : ''),
                style: [ 'mainStyle' ]
            },
            {
                ul : eduUl,
                style: [ 'mainStyle' ],
            },
            {
                text: '\nДополнительная информация',
                style: ['subheader', 'mainStyle' ],
            },
            {
                text: (res_user.emp_type.length ? 'Тип занятости: ' + res_user.emp_type : ''),
                style: [ 'mainStyle' ],
            },
            {
                text: (res_user.desc.length ? '\nОписание': ''),
                style: ['subheader', 'mainStyle' ],
            },

            {
                text: (res_user.desc.length ? res_user.desc : ''),
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
                lineHeight: 1.4,
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