let bodyBlock = document.querySelector('body');
let negotiatedSalary = document.querySelector('#res_negotiated-salary');
if (negotiatedSalary) {
    let desiredSalary = document.querySelector('#res_salary');
    let negotiatedSalaryLabel = document.querySelector('.neg-label');
    negotiatedSalary.addEventListener('change', function () {
        if(negotiatedSalary.checked){
            desiredSalary.style.opacity = '0.4';
            desiredSalary.disabled = true;
            desiredSalary.value = '';
            negotiatedSalaryLabel.querySelector('div').style.background = '#50A718';
        }else{
            desiredSalary.style.opacity = '1';
            desiredSalary.disabled = false;
            negotiatedSalaryLabel.querySelector('div').style.background = 'transparent';
        }
    })
}
let driverLicense = document.querySelector('#res_has_dl');
if (driverLicense) {
    let driverInput = document.querySelector('#res_dl');
    let driverLicenseLabel = document.querySelector('.cdl-label');
    driverLicense.addEventListener('change', function () {
        if(driverLicense.checked){
            driverLicenseLabel.querySelector('div').style.background = '#50A718';
            driverInput.classList.remove('disabled-input');
            driverInput.required = true;
        }else{
            driverLicenseLabel.querySelector('div').style.background = 'transparent';
            driverInput.classList.add('disabled-input');
            driverInput.required = false;
        }
    })
}

let inputBlock = document.querySelector('.photo-block');
if(inputBlock){
    let label = document.querySelector('.cv-form-file-label')
    let inputHidden = document.querySelector('#res_photo');
    inputBlock.addEventListener('change', function () {
        label.innerHTML = inputHidden.files['0'].name;
    })
}


let socialMediaBlock = document.querySelector('.social-section');
if(socialMediaBlock){
    let add = socialMediaBlock.querySelector('.add');
    let addBlock = socialMediaBlock.querySelector('.add-item-block');
    let addItem = socialMediaBlock.querySelector('.add-item');
    add.addEventListener('click', function () {
        if(addBlock.children.length < 5){
            let socialMediaBlockClone = addItem.cloneNode(true);
            socialMediaBlockClone.querySelector('.res_sc_plat').value = '';
            socialMediaBlockClone.querySelector('.res_sc_link').value = '';
            socialMediaBlockClone.querySelector('.res_sc_link').readOnly = true;
            socialMediaBlockClone.querySelector('.res_sc_link').classList.add('disabled-input');
            addBlock.appendChild(socialMediaBlockClone);
        }
        if(addBlock.children.length > 1){
            let remove =  socialMediaBlock.querySelectorAll('.remove');
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
    addBlock.addEventListener('click', function (e) {
        let remove =  socialMediaBlock.querySelectorAll('.remove');
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();
            }
        }
        if(addBlock.children.length > 1){
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
}

let languageBlock = document.querySelector('.lang-section');
if(languageBlock){
    let add = languageBlock.querySelector('.add');
    let addBlock = languageBlock.querySelector('.add-item-block');
    let addItem = languageBlock.querySelector('.add-item');
    let numLanguage = addBlock.querySelector('.dropdown').querySelectorAll('.dropdown-item').length -1;
    add.addEventListener('click', function () {
        if(addBlock.children.length <= numLanguage){
            let languageBlockClone = addItem.cloneNode(true);
            languageBlockClone.querySelector('.cv-field-lang').value = '';
            languageBlockClone.querySelector('.cv-field-skill').value = '';
            languageBlockClone.querySelector('#res_language-skills').classList.remove('dropdown-header');
            languageBlockClone.querySelector('#res_language-skills').classList.add('disabled-input');
            addBlock.appendChild(languageBlockClone);
        }
        if(addBlock.children.length > 1){
            let remove =  languageBlock.querySelectorAll('.remove');
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
    addBlock.addEventListener('click', function (e) {
        let remove =  languageBlock.querySelectorAll('.remove');
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();

            }
        }
        if(addBlock.children.length > 1){
            let remove =  languageBlock.querySelectorAll('.remove');
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
}


function onlyOne(checkbox) {
    let checkboxes = document.getElementsByName('document');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    })
}



let jobBlock = document.querySelector('.job-block');
if(jobBlock){
    let add = jobBlock.querySelector('.add');
    let addBlock = jobBlock.querySelector('.add-item-block');
    let addItem = jobBlock.querySelector('.add-item');
    add.addEventListener('click', function () {
        if(addBlock.children.length < 5){
            let jobBlockClone = addItem.cloneNode(true);
            jobBlockClone.querySelector('.cv-field-position').value = '';
            addBlock.appendChild(jobBlockClone);
        } 
        if(addBlock.children.length > 1){
            let remove =  addBlock.querySelectorAll('.remove');
           for (let i = 0; i < remove.length; i++) {
               remove[i].classList.remove('hide-remove')  
           }
        }else{
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.add('hide-remove')  
            }
        }
    })
    addBlock.addEventListener('click', function (e) {
        let remove =  addBlock.querySelectorAll('.remove');
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();

            }
        }
        if(addBlock.children.length > 1){
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
}
let eduBlock = document.querySelector('.edu-block');
if(eduBlock){
    let add = eduBlock.querySelector('.add');
    let addContainer = eduBlock.querySelector('.cv-form-items-edu');
    let addBlock = eduBlock.querySelector('.cv-form-items-edu .cv-form-items-dop');
    let addItem = eduBlock.querySelector('.add-item');
    let dopEdu = document.querySelector('#dop-edc');
    dopEdu.addEventListener('change', function () {
        if(dopEdu.checked){
            dopEdu.closest('.dop-edc').querySelector('.input-checkbox-label div').style.background = '#50A718';
            eduBlock.querySelector('.edu-institution').disabled = true;
            eduBlock.querySelector('.edu-institution').classList.add('disabled-input');
            eduBlock.querySelector('#res_speciality').disabled = true;
            addContainer.style.display = 'none';
        }else{
            dopEdu.closest('.dop-edc').querySelector('.input-checkbox-label div').style.background = 'transparent';
            eduBlock.querySelector('.edu-institution').disabled = false;
            eduBlock.querySelector('.edu-institution').classList.remove('disabled-input');
            eduBlock.querySelector('#res_speciality').disabled = false;
            addContainer.style.display = 'block';
        }
    })
    addBlock.addEventListener('change', function (e) {
        if(e.target.classList.contains('edu-institution')){
            if(e.target.value){
                e.target.closest('.add-item').children[1].querySelector('input').classList.remove('disabled-input');
                e.target.closest('.add-item').children[1].querySelector('input').disabled = false;
            }else{
                e.target.closest('.add-item').children[1].querySelector('input').classList.add('disabled-input');
                e.target.closest('.add-item').children[1].querySelector('input').disabled = true;
            }
        }
        
    })
    add.addEventListener('click', function () {
        if(addBlock.children.length < 5){
            let eduBlockClone = addItem.cloneNode(true);
            eduBlockClone.querySelector('#res_edu_institution').value = '';
            eduBlockClone.querySelector('#res_speciality').value = '';
            eduBlockClone.querySelector('#res_speciality').disabled = true;
            eduBlockClone.querySelector('#res_speciality').classList.add('disabled-input');
            addBlock.appendChild(eduBlockClone);
        }
        if(addBlock.children.length > 1){
            let remove =  eduBlock.querySelectorAll('.remove');
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
    addBlock.addEventListener('click', function (e) {
        let remove =  eduBlock.querySelectorAll('.remove');
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();
            }
        }
        if(addBlock.children.length > 1){
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
}

let expBlock = document.querySelector('.exp-block');
if(expBlock){
    let add = expBlock.querySelector('.add');
    let addContainer = expBlock.querySelector('.cv-form-items-exp');
    let addBlock = expBlock.querySelector('.cv-form-items-exp .cv-form-items-dop');
    let addItem = expBlock.querySelector('.add-item');
    let dopExp = document.querySelector('#dop-exp');
    dopExp.addEventListener('change', function () {
        if(dopExp.checked){
            dopExp.closest('.dop-exp').querySelector('.input-checkbox-label div').style.background = '#50A718';
            expBlock.querySelector('.work-place').disabled = true;
            expBlock.querySelector('.work-place').classList.add('disabled-input');
            expBlock.querySelector('#res_profession').disabled = true;
            expBlock.querySelector('#res_years_work').disabled = true;
            addContainer.style.display = 'none';
        }else{
            dopExp.closest('.dop-exp').querySelector('.input-checkbox-label div').style.background = 'transparent';
            expBlock.querySelector('.work-place').disabled = false;
            expBlock.querySelector('.work-place').classList.remove('disabled-input');
            expBlock.querySelector('#res_profession').disabled = false;
            expBlock.querySelector('#res_years_work').disabled = false;
            addContainer.style.display = 'block';
        }
    })
    addBlock.addEventListener('change', function (e) {
        if(e.target.classList.contains('work-place')){
            if(e.target.value){
                e.target.closest('.add-item').children[1].querySelector('input').classList.remove('disabled-input');
                e.target.closest('.add-item').children[2].querySelector('input').classList.remove('disabled-input');
                e.target.closest('.add-item').children[1].querySelector('input').disabled = false;
                e.target.closest('.add-item').children[2].querySelector('input').disabled = false;
            }else{
                e.target.closest('.add-item').children[1].querySelector('input').classList.add('disabled-input');
                e.target.closest('.add-item').children[2].querySelector('input').classList.add('disabled-input');
                e.target.closest('.add-item').children[1].querySelector('input').disabled = true;
                e.target.closest('.add-item').children[2].querySelector('input').disabled = true;
            }
        }
    })
    add.addEventListener('click', function () {
        if(addBlock.children.length < 5){
            let expBlockClone = addItem.cloneNode(true);
            expBlockClone.querySelector('#res_work_place').value = '';
            expBlockClone.querySelector('#res_profession').value = '';
            expBlockClone.querySelector('#res_years_work').value = '';
            expBlockClone.querySelector('#res_profession').disabled = true;
            expBlockClone.querySelector('#res_years_work').disabled = true;
            expBlockClone.querySelector('#res_profession').classList.add('disabled-input');
            expBlockClone.querySelector('#res_years_work').classList.add('disabled-input');
            addBlock.appendChild(expBlockClone);
        }
        if(addBlock.children.length > 1){
            let remove =  expBlock.querySelectorAll('.remove');
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
    addBlock.addEventListener('click', function (e) {
        let remove =  expBlock.querySelectorAll('.remove');
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();
            }
        }
        if(addBlock.children.length > 1){
            for (let i = 0; i < remove.length; i++) {
                remove[i].classList.remove('hide-remove')  
            }
         }else{
             for (let i = 0; i < remove.length; i++) {
                 remove[i].classList.add('hide-remove')  
             }
         }
    })
}

let form = document.querySelector('.cv-form');
if (form) {
    form.addEventListener('click', function (event) {
        if(event.target.closest('.dropdown-header')){
            event.target.parentNode.querySelector('.dropdown').classList.toggle('hide');
            event.target.parentNode.querySelector('.cv-form-svg-open').classList.toggle('rotate');
        }
        if(event.target.classList.contains('dropdown-item')){
            event.target.closest('.dropdown').parentNode.querySelector('.dropdown-header').value = event.target.textContent;
            event.target.closest('.dropdown').parentNode.querySelector('.dropdown-header').textContent = event.target.textContent;
            event.target.closest('.dropdown').classList.add('hide');
            event.target.closest('.dropdown').parentNode.querySelector('.cv-form-svg-open').classList.toggle('rotate');
        }
        bodyBlock.addEventListener('click', function (event) {
            console.log(event.target)
            if(!event.target.closest('.dropdown-block')){
                let dropdown = document.querySelectorAll('.dropdown');
                for (let i = 0; i < dropdown.length; i++) {
                    if(!dropdown[i].classList.contains('hide')){
                        dropdown[i].classList.add('hide');
                        dropdown[i].parentNode.querySelector('.cv-form-svg-open').classList.remove('rotate');
                    } 
                }
            }
        })
    })
}
let city = document.querySelector('.city-form-item');
if(city){
    let cityDropdown = city.querySelector('.dropdown-menu-multiple');
    let itemMultiple = city.querySelectorAll('.dropdown-item-multiple');
    let checkedCity = [];
    cityDropdown.addEventListener('change', function(e){
    if(e.target.checked){
        e.target.closest('.input-checkbox-label-dropdown').querySelector('div').style.background = '#50A718';
        checkedCity.push(e.target.value);
        e.target.closest('.dropdown-multiple').parentElement.querySelector('.dropdown-header-multiple').value = checkedCity.join('; '); 
    }else{
        e.target.closest('.input-checkbox-label-dropdown').querySelector('div').style.background = 'transparent';
        let index = checkedCity.indexOf(e.target.value);
        checkedCity.splice(index, 1);
        e.target.closest('.dropdown-multiple').parentElement.querySelector('.dropdown-header-multiple').value = checkedCity.join('; ');
    }
    if(checkedCity.length >= 5){
        for (let i = 0; i < itemMultiple.length; i++) {
            if(!itemMultiple[i].querySelector('.input-checkbox-hidden').checked){
                itemMultiple[i].classList.add('disabled-input');
            }
            
        }
        city.querySelector('.dropdown-multiple').classList.add('hide');
        city.querySelector('.cv-form-svg-open').classList.remove('rotate');
    }else{
        for (let i = 0; i < itemMultiple.length; i++) {
            if(!itemMultiple[i].querySelector('.input-checkbox-hidden').checked){
                itemMultiple[i].classList.remove('disabled-input');
            }
            
        }
    }
})
city.addEventListener('click', function (event) {
    if(event.target.closest('.dropdown-header-multiple')){
        event.target.parentNode.querySelector('.dropdown-multiple').classList.toggle('hide');
        event.target.parentNode.querySelector('.cv-form-svg-open').classList.toggle('rotate');
    } 
})
}
let catBlock = document.querySelector('.choose-cat');
if(catBlock){
    let catDropdown = catBlock.querySelector('.dropdown-menu-multiple');
    let catItemMultiple = catBlock.querySelectorAll('.dropdown-item-multiple');
    let checkedCat = [];
    catDropdown.addEventListener('change', function(e){
    if(e.target.checked){
        e.target.closest('.input-checkbox-label-dropdown').querySelector('div').style.background = '#50A718';
        checkedCat.push(e.target.value);
        e.target.closest('.dropdown-multiple').parentElement.querySelector('.dropdown-header-multiple').value = checkedCat.join('; '); 
    }else{
        e.target.closest('.input-checkbox-label-dropdown').querySelector('div').style.background = 'transparent';
        let index = checkedCat.indexOf(e.target.value);
        checkedCat.splice(index, 1);
        e.target.closest('.dropdown-multiple').parentElement.querySelector('.dropdown-header-multiple').value = checkedCat.join('; ');
    }
    if(checkedCat.length >= 5){
        for (let i = 0; i < catItemMultiple.length; i++) {
            if(!catItemMultiple[i].querySelector('.input-checkbox-hidden').checked){
                catItemMultiple[i].classList.add('disabled-input');
            }
            
        }
        catBlock.querySelector('.dropdown-multiple').classList.add('hide');
        catBlock.querySelector('.cv-form-svg-open').classList.remove('rotate');
    }else{
        for (let i = 0; i < catItemMultiple.length; i++) {
            if(!catItemMultiple[i].querySelector('.input-checkbox-hidden').checked){
                catItemMultiple[i].classList.remove('disabled-input');
            }
            
        }
    }
})
catBlock.addEventListener('click', function (event) {
    if(event.target.closest('.dropdown-header-multiple')){
        event.target.parentNode.querySelector('.dropdown-multiple').classList.toggle('hide');
        event.target.parentNode.querySelector('.cv-form-svg-open').classList.toggle('rotate');
    } 
})
}


function inputSc(inputLink) {
    let input = inputLink.closest('.cv-form-block').querySelector('.res_sc_plat');
    if(input.value){
        inputLink.readOnly = false;
        inputLink.classList.remove('disabled-input');
    }
}
function inputLang(languageSkill) {
    let language = languageSkill.closest('.cv-form-block').querySelector('#res_language');
    if(language.value){
        languageSkill.classList.add('dropdown-header');
        languageSkill.classList.remove('disabled-input');
    }
}
