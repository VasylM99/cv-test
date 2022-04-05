function getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
            let canvas = document.createElement("canvas");

            let imgW = img.width;
            let imgH = img.height;

            canvas.width = 150;
            canvas.height = 150;

            console.log(canvas.width);
            console.log(canvas.height);

            let set;
            if (canvas.height > canvas.width){
                set = canvas.width/2;
            }
            else {
                set = canvas.height/2;
            }
            console.log(set);

            let ctx = canvas.getContext("2d");
            ctx.save();
            ctx.beginPath();
            ctx.arc(set + 1, set + 1, set - 2, 0, Math.PI * 2, true);
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, 150, (imgH * 150)/imgW);


            let dataURL = canvas.toDataURL("image/png");

            resolve(dataURL);
        };

        img.onerror = error => {
            reject(error);
        };

        img.src = url;
    });
}

function createPdfValid() {
    let requiredField = document.querySelector('.cv-form').querySelectorAll('[required]');
    let invalidField = [];
    for (let i = 0; i < requiredField.length; i++) {
        if (!requiredField[i].value) {
            invalidField.push(requiredField[i]);
        }else{
            requiredField[i].style.borderColor = '#E9E9E9';
        }
    }
    if(invalidField.length){
        for (let i = 0; i < invalidField.length; i++) {
            invalidField[i].style.borderColor = 'red';  
        }
    }else{
        createPdf();
    }  
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

    let contactInfo = [];
    contactInfo.push([{text:'Контактная информация', fontSize: 15}, ''])
    if (res_user.country.length){contactInfo.push(['Страна проживания', res_user.country])}
    if (res_user.phone.length){contactInfo.push(['Телефон', res_user.phone])}
    if (res_user.email.length){contactInfo.push(['Email', res_user.email])}
    if (res_user.age.length){contactInfo.push(['Год рождения', res_user.age])}
    console.log(contactInfo.length);

    let socialInfo = [];
    socialInfo.push([{text:'\nСоциальные сети', fontSize: 15}, ''])
    for (let i = 0; i < social.length; i++){
        socialInfo.push([social[i].platform, social[i].link ]);
    }

    let tableContact = {
        layout: 'lightHorizontalLines',
        table: {
            headerRows: 1,
            widths: ['auto', '*'],
            body: contactInfo,
        }
    };

    let tableSocial = {
        layout: 'lightHorizontalLines',
        table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: socialInfo,
        }
    };
    let jobExp = {

    }
    let line = {
        table : {
            headerRows : 1,
            widths: ['100%'],
            body : [
                [{text:'',border: [false, true, false,false]}]
            ] 
        },
        layout : {
            hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? '#d9d9d9' : '#d9d9d9';
            }
        },
        margin: [0, 25, 0, 25]
    };
    let city = res_user.city;
    let position = res_user.position;
    let job = res_user.job;
    let salary = res_user.salary;
    let sal_period = res_user.sal_period;
    let inpFiles = document.querySelector('#res_photo').files;
    let usrPhoto = inpFiles[0];
    let imgPath = './unknown.jpg';

    if (usrPhoto){ imgPath = URL.createObjectURL(usrPhoto);}

    let dd = {
        // header: {
        //     image: await this.getBase64ImageFromURL('./Template/header.png'),
        // },
        content: [
            { 
                columns: [ 
                    { 
                        width: 150,
                        image: await this.getBase64ImageFromURL(imgPath),
                    }, 
                    { 
                        width: 'auto',
                        type: 'none',
                        ol: [
                                {
                                    text: 'this date',
                                    style: 'textHeader'
                                },
                                {
                                    text: res_user.f_name + ' ' + res_user.l_name,
                                    margin: [0, 0, 0, 20],
                                    color: '#3D4857',
                                    fontSize: 30,
                                    bold: true
                                },
                                {
                                    text: 'Короткое описание:',
                                    style: 'textHeader'
                                },
                                {
                                    text: res_user.s_desc,
                                    margin: [0, 0, 0, 15],
                                    color: '#3D4857',
                                    bold: true,
                                    fontSize: 20
                                },
                                {
                                    columns: [
                                        {
                                            width: 'auto',
                                            text: (res_user.emp_type.length ? 'Тип занятости: ' : ''),
                                            style: 'textHeader'
                                        },
                                        {
                                            width: 'auto',
                                            text:  (res_user.emp_type.length ? res_user.emp_type : ''), 
                                            style: 'textHeader',
                                            color: '#3D4857'
                                        }
                                    ],
                                    columnGap: 10
                                },
                                {
                                    columns: [
                                        {
                                            width: 'auto',
                                            text:'Год рождения: ', 
                                            style:'textHeader'
                                        },
                                        {
                                            width: 'auto',
                                            text: res_user.age,
                                            style:'textHeader',
                                            color: '#3D4857'
                                        },
                                        {
                                            width: 'auto',
                                            text:'Страна проживания: ', 
                                            style:'textHeader'
                                        },
                                        {
                                            width: 'auto',
                                            text: res_user.country,
                                            style:'textHeader',
                                            color: '#3D4857'
                                        }
                                    ],
                                    columnGap: 10
                                }
                        ]
                    } 
                ] 
            },
            line,
            tableContact,
            tableSocial,
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
            },
            textHeader: {
                fontSize: 10,
                bold: true,
                color: '#8492A4'
            }
        }

    };
    pdfMake.createPdf(dd).download();
};