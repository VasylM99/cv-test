
function loadFile(url,callback){
    JSZipUtils.getBinaryContent(url,callback);
}

function getResUser(){
    let res_user = {
        f_name : "",
        l_name : "",
        phone : "",
        email : "",
        social : [],
        country: "",
        age: "",
        driver: "",
        position: [],
        city: [],
        salary: "",
        sal_period: "",
        fixedSalary: false,
        job: [],
        langs: [],
        education: [],
        experience: [],
        has_dl: false,
        hasDoc: false,
        bio: false,
        visa: false,
        gcart: false,
        hasAdt: false,
        no_edc: false,
        no_exp: false,
        emp_type: "",
        desc: "",
    };

    res_user.f_name = document.querySelector('#res_name').value;
    res_user.l_name = document.querySelector('#res_surname').value;
    res_user.phone = document.querySelector('#res_phone').value;
    res_user.email = document.querySelector('#res_email').value;
    res_user.country = document.querySelector('#res_country').value;
    res_user.age = document.querySelector('#res_age').value;
    res_user.city = document.querySelector('#res_city').value.split('; ');
    res_user.salary = document.querySelector('#res_salary').value;
    res_user.desc = document.querySelector('#res_desc').value;
    res_user.emp_type = document.querySelector('#res_employment_type').value;
    res_user.driver = document.querySelector('#res_dl').value;
    res_user.job = document.querySelector('#res_job_cat').value.split('; ');
    res_user.sal_period = document.querySelector('#res_period').value;

    res_user.has_dl = (document.querySelector('#res_has_dl:checked')) ? true : false;
    res_user.fixedSalary = (document.querySelector('#res_negotiated-salary:checked')) ? true : false;
    res_user.bio = (document.querySelector('#document-biometrics:checked')) ? true : false;
    res_user.visa = (document.querySelector('#document-visa:checked')) ? true : false;
    res_user.gcart = (document.querySelector('#document-card:checked')) ? true : false;
    if(res_user.bio || res_user.visa || res_user.gcart){res_user.hasDoc = true};
    res_user.no_exp = (document.querySelector('#dop-exp:checked')) ? true : false;
    res_user.no_edc = (document.querySelector('#dop-edc:checked')) ? true : false;

    let socialPlatforms = document.querySelector('#social-section').querySelectorAll('.res_sc_plat');
    let socialLinks = document.querySelector('#social-section').querySelectorAll('.res_sc_link');
    for (let i = 0; i < socialPlatforms.length; i++){
        if (socialPlatforms[i].value && socialLinks[i].value){
            res_user.social.push({platform: socialPlatforms[i].value, link: socialLinks[i].value});
        }
    }

    let jobPositions = document.querySelector('#job-section').querySelectorAll('.cv-field-position');
    for (let i = 0; i < jobPositions.length; i++){
        if (jobPositions[i].value ){
            res_user.position.push(jobPositions[i].value);
        }
    }

    let languages = document.querySelector('#lang-section').querySelectorAll('.cv-field-lang');
    let skills = document.querySelector('#lang-section').querySelectorAll('.cv-field-skill');
    for (let i = 0; i < languages.length; i++){
        if (languages[i].value && skills[i].value){
            res_user.langs.push({lang: languages[i].value, skill: skills[i].value});
        }
    }


    let eduInst = document.querySelector('#cv-form-items-edu').querySelectorAll('.edu-institution');
    let eduSpec = document.querySelector('#cv-form-items-edu').querySelectorAll('.edu-speciality');
    for (let i = 0; i < eduInst.length; i++){
        if (eduInst[i].value && eduSpec[i].value && !res_user.no_edc){
            res_user.education.push({inst: eduInst[i].value, spec: eduSpec[i].value});
        }
    }

    let expPlace = document.querySelector('#cv-form-items-exp').querySelectorAll('.work-place');
    let expProf = document.querySelector('#cv-form-items-exp').querySelectorAll('.work-prof');
    let expStand = document.querySelector('#cv-form-items-exp').querySelectorAll('.work-years');
    for (let i = 0; i < expPlace.length; i++){
        if (expPlace[i].value && expProf[i].value && expStand[i] && !res_user.no_exp ){
            res_user.experience.push({place: expPlace[i].value, prof: expProf[i].value, stand: expStand[i].value});
        }
    }

    return res_user;
}

function generate() {

    let res_user = getResUser();

    let inpFiles = document.querySelector('#res_photo').files;
    let usrPhoto = inpFiles[0];
    let imgPath = './unknown.jpg';
    if (usrPhoto){
        imgPath = URL.createObjectURL(usrPhoto);
    }

    loadFile("Template/template.docx",function(error,content){
        if (error) { throw error };

        let opts = {}
        opts.centered = false;
        opts.getImage = function (tagValue, tagName) {
            return new Promise(function (resolve, reject) {
                JSZipUtils.getBinaryContent(tagValue, function (error, content) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(content);
                });
            });
        }


        opts.getSize = function (img, tagValue, tagName) {
            // FOR FIXED SIZE IMAGE :
            // return [741, 486];

            return new Promise(function (resolve, reject) {
                let image = new Image();
                image.src = imgPath;
                image.onload = function () {

                    let imgW = image.width;
                    let imgH = image.height;

                    let fixedH = 200;
                    imgW =  (fixedH * imgW)/imgH;
                    imgH = fixedH;

                    resolve([imgW, imgH]);
                };
                image.onerror = function (e) {
                    console.log('img, tagValue, tagName : ', img, tagValue, tagName);
                    alert("An error occured while loading " + tagValue);
                    reject(e);
                }
            });
        }

        let imageModule = new ImageModule(opts);

        let zip = new JSZip(content);
        let doc=new window.docxtemplater()
            .loadZip(zip)
            .attachModule(imageModule)
            .compile({ paragraphLoop: true });

        let hasDesc =  (res_user.desc == '' ? false : true);
        console.log(hasDesc);

        doc.resolveData({
            image: imgPath,
            first_name: res_user.f_name,
            last_name: res_user.l_name,
            phone: res_user.phone,
            email: res_user.email,
            social: res_user.social,
            country: res_user.country,
            age: res_user.age,
            driver: res_user.driver,

            city: res_user.city,
            salary: res_user.salary,
            sal_period: res_user.sal_period,
            fixedSalary: res_user.fixedSalary,
            job: res_user.job,
            position: res_user.position,
            langs: res_user.langs,
            education: res_user.education,
            experience: res_user.experience,

            has_dl: res_user.has_dl,
            bio: res_user.bio,
            visa: res_user.visa,
            green_cart: res_user.gcart,
            hasDoc: res_user.hasDoc,
            no_edc: res_user.no_edc,
            no_exp: res_user.no_exp,
            hasAdt: res_user.hasAdt,
            emp_type: res_user.emp_type,
            description: res_user.desc,
        }).then(function () {
            console.log('ready');
            doc.render();
            let out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            let resumeName = res_user.f_name.trim() + " " + res_user.l_name.trim() + " resume.docx";
            saveAs(out, resumeName);
        });

    });
};
