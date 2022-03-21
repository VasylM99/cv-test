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
        }else{
            driverLicenseLabel.querySelector('div').style.background = 'transparent';
            driverInput.classList.add('disabled-input');
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
    let scPlat = socialMediaBlock.querySelector('.res_sc_plat');
    let scLink = socialMediaBlock.querySelector('.res_sc_link');
   function required() {
    if(scPlat.value){
        console.log(scPlat);
        scLink.required = true;
    }
   }
    // scPlat.addEventListener('change', function(){

    // })
    add.addEventListener('click', function () {
        console.log(addBlock.children.length)
        if(addBlock.children.length < 5){
            let socialMediaBlockClone = addItem.cloneNode(true);
            socialMediaBlockClone.querySelector('.res_sc_plat').value = '';
            socialMediaBlockClone.querySelector('.res_sc_link').value = '';
            addBlock.appendChild(socialMediaBlockClone);
        }
    })
    addBlock.addEventListener('click', function (e) {
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();
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
        console.log(numLanguage)
        if(addBlock.children.length <= numLanguage){
            let languageBlockClone = addItem.cloneNode(true);
            languageBlockClone.querySelector('.cv-field-lang').value = '';
            languageBlockClone.querySelector('.cv-field-skill').value = '';
            addBlock.appendChild(languageBlockClone);
        }
    })
    addBlock.addEventListener('click', function (e) {
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();

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
            jobBlockClone.querySelector('#res_job_cat').value = '';
            addBlock.appendChild(jobBlockClone);
        }
    })
    addBlock.addEventListener('click', function (e) {
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();

            }
        }
    })
}

let cvFormDop = document.querySelector('.cv-form-items-dop');
if(cvFormDop){
    cvFormDop.addEventListener('change', function(e){
        if(e.target.checked){
            e.target.closest('.dop-item').querySelector('.input-checkbox-label div').style.background = '#50A718';
        }else{
            e.target.closest('.dop-item').querySelector('.input-checkbox-label div').style.background = 'transparent';
        }
    })
}

let expBlock = document.querySelector('.exp-block');
if(expBlock){
    let add = expBlock.querySelector('.add');
    let addBlock = expBlock.querySelector('.cv-form-items-exp');
    let addItem = expBlock.querySelector('.add-item');
    add.addEventListener('click', function () {
        if(addBlock.children.length < 5){
            let expBlockClone = addItem.cloneNode(true);
            expBlockClone.querySelector('#res_work_place').value = '';
            expBlockClone.querySelector('#res_profession').value = '';
            expBlockClone.querySelector('#res_years_work').value = '';
            addBlock.appendChild(expBlockClone);
        }
    })
    addBlock.addEventListener('click', function (e) {
        if(addBlock.children.length > 1){
            if(e.target.classList.contains('remove')){
                e.target.closest('.add-item').remove();
            }
        }
    })
}

let form = document.querySelector('.cv-form');
if (form) {
    form.addEventListener('click', function (event) {
        if(event.target.closest('.dropdown-header')){
            event.target.parentNode.querySelector('.dropdown').classList.toggle('hide');
        }
        if(event.target.classList.contains('dropdown-item')){
            event.target.closest('.dropdown').parentNode.querySelector('.dropdown-header').value = event.target.textContent;
            event.target.closest('.dropdown').classList.add('hide');
        }
        bodyBlock.addEventListener('click', function (event) {
            if(!event.target.closest('.cv-form-item') && !event.target.closest('.cv-btns-gnr')){
                if(!document.querySelector('.dropdown-multiple').classList.contains('hide')){
                    document.querySelector('.dropdown-multiple').classList.add('hide');
                }
                let dropdownEl = document.querySelectorAll('.dropdown');
                for (let i = 0; i < dropdownEl.length; i++) {
                    if(!dropdownEl[i].classList.contains('hide')){
                        dropdownEl[i].classList.add('hide');
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
        e.target.closest('.dropdown-multiple').parentElement.querySelector('.dropdown-header-multiple').value = checkedCity.join();
    }
    if(checkedCity.length >= 5){
        for (let i = 0; i < itemMultiple.length; i++) {
            if(!itemMultiple[i].querySelector('.input-checkbox-hidden').checked){
                itemMultiple[i].classList.add('disabled-input');
            }
            
        }
        city.querySelector('.dropdown-multiple').classList.add('hide');
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
    } 
})
}
