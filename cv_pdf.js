function linePdf(){
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
    return line;
}

function tablesPdf(tables){
    let res = [];
    let j = 0;
    let line = linePdf();
    for (let i = 0; i < Math.floor(tables.length/2); i++){
        res.push({
            columns: [
                tables[j],
                tables[j+1],
            ],
            columnGap: 25
        });
        res.push(line);
        j += 2;
    }
    if (tables.length % 2){
        res.push({
            columns: [
                tables[tables.length - 1],
                [],
            ],
            columnGap: 25
        });
        res.push(line);
    }
    console.log(res);
    return res;
}

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

            let set;
            if (canvas.height > canvas.width){
                set = canvas.width/2;
            }
            else {
                set = canvas.height/2;
            }

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

    let tables = [];

    let social = res_user.social;
    let contactInfo = [];
    if (res_user.phone.length){contactInfo.push([{text:'Телефон', color: '#8492a4'}, {text: res_user.phone, color: '#3D4857',}])}
    if (res_user.email.length){contactInfo.push([{text:'Email', color: '#8492a4'}, {text: res_user.email, color: '#3D4857',}])}

    for (let i = 0; i < social.length; i++){
        contactInfo.push([{text: social[i].platform, color: '#8492a4'}, {text: social[i].link, color: '#3D4857'} ]);
    }

    let tableContact = [
        {
            text:'Контактная информация:',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#8492a4'
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: ['auto', '*'],
                body: contactInfo,
            }
        }
    ];


    let docInfo = [];

    let doc = '';
    if(res_user.visa){doc = 'Рабочая виза'}
    else if(res_user.bio){doc = 'Биометрия'}
    else if(res_user.gcart){doc = 'Green card'}

    if (doc.length){docInfo.push([{text:'Документы', color: '#8492a4'}, {text: res_user.driver, color: '#3D4857',}])}
    if (res_user.driver.length){docInfo.push([{text:'Водительские права', color: '#8492a4'}, {text: res_user.driver, color: '#3D4857',}])}

    let tableDoc = [
        {
            text:'Опыт работы:',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#8492a4'
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: ['auto', '*'],
                body: docInfo,
            }
        }
    ];

    let langs = res_user.langs;
    let langStr ='';
    for (let i = 0; i < langs.length; i++){
        langStr += (i ? '\n' : '') + langs[i].lang + ', ' + langs[i].skill;
    }

    let mainInfo = (langStr.length ? [[{text: 'Владение языками', color:'#8492a4'}, {text: langStr, color:'#3D4857'}]] : []);

    let tableMain = [
        {
            text:'Основная информация:',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#8492a4'
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: ['auto', '*'],
                body: mainInfo,
            }
        }
    ];


    let edu = res_user.education;
    let edcInfo = [];
    for (let i = 0; i < edu.length; i++) {
        let edplace = 'Учебное заведение';
        let edplaceval = edu[i].inst;
        if (i > 0){ edplace = '\n' + edplace; edplaceval = '\n' + edplaceval}

        edcInfo.push([{text: edplace, color: '#8492A4'}, {text: edplaceval, color: '#3D4857',}]);
        edcInfo.push([{text:'Специальность', color: '#8492A4'}, {text: edu[i].spec, color: '#3D4857',}]);
    }
    if (res_user.no_edc){
        edcInfo = [[{text:'Без образования', color: '#8492A4'}, {text: '', color: '#3D4857',}]];
    }

    let tableEdc = [
        {
            text:'Образование:',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#8492a4'
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: ['auto', '*'],
                body: edcInfo,
            }
        }
    ];

    let exp = res_user.experience;
    let expInfo = [];
    for (let i = 0; i < exp.length; i++) {

        let wplace = 'Место работы';
        let wplaceval = exp[i].place;
        if (i > 0){ wplace = '\n' + wplace; wplaceval = '\n' + wplaceval}

        expInfo.push([{text: wplace, color: '#8492A4'}, {text: wplaceval, color: '#3D4857',}]);
        expInfo.push([{text:'Профессия', color: '#8492A4'}, {text: exp[i].prof, color: '#3D4857',}]);
        expInfo.push([{text:'Период работы', color: '#8492A4'}, {text: exp[i].stand, color: '#3D4857',}]);
    }
    if (res_user.no_exp){
        expInfo = [[{text:'Без опыта работы', color: '#8492A4'}, {text: '', color: '#3D4857',}]]
    }

    let tableExp = [
        {
            text:'Опыт работы:',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#8492a4'
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: ['auto', '*'],
                body: expInfo,
            }
        }
    ];

    let positionStr = '';
    for ( let i = 0; i < res_user.position.length; i++){
        positionStr += res_user.position[i] + ( i < res_user.position.length - 1 ? ', ' : '');
    }

    let jobStr = '';
    for ( let i = 0; i < res_user.job.length; i++){
        jobStr += res_user.job[i] + ( i < res_user.job.length - 1 ? ', ' : '');
    }

    let cityStr = '';
    for ( let i = 0; i < res_user.city.length; i++){
        cityStr += res_user.city[i] + ( i < res_user.city.length - 1 ? ', ' : '');
    }


    let jobInfo = [];
    if (res_user.salary.length){jobInfo.push([{text:'Зарплата', color: '#8492a4'}, {text: res_user.salary + ' ' + res_user.sal_period, color: '#3D4857',}])}
    else if(res_user.fixedSalary){jobInfo.push([{text:'Зарплата', color: '#8492a4'}, {text: 'Договорная', color: '#3D4857',}])}
    if (res_user.job[0].length){jobInfo.push([{text:'Категория', color: '#8492a4'}, {text: jobStr, color: '#3D4857',}])}
    if (res_user.position.length){jobInfo.push([{text:'Должность', color: '#8492a4'}, {text: positionStr, color: '#3D4857',}])}
    if (res_user.city[0].length){jobInfo.push([{text:'Город', color: '#8492a4'}, {text: cityStr, color: '#3D4857',}])}

    console.log(res_user.job);

    let tableJob = [
        {
            text:'Желаемая работа:',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#8492a4'
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: ['auto', '*'],
                body: jobInfo,
            }
        }
    ];

    if(contactInfo.length){tables.push(tableContact);}
    if(docInfo.length){tables.push(tableDoc);}
    if(mainInfo.length){tables.push(tableMain);}
    if(edcInfo.length){tables.push(tableEdc);}
    if(expInfo.length){tables.push(tableExp);}
    if(jobInfo.length){tables.push(tableJob);}

    let line = linePdf();

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
            tablesPdf(tables),
            {
                text: (res_user.desc.length ? '\nОписание': ''),
                fontSize: 15,
                lineHeight: 1.5,
                color: '#8492a4'
            },

            {
                text: (res_user.desc.length ? res_user.desc : ''),
                color: '#3D4857',
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
