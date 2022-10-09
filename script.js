let validate = () =>{
    let confirmValidate = document.getElementById('confirm-all-container')
    let name = document.getElementById('name-reservation')
    let email = document.getElementById('email-reservation')
    let phone = document.getElementById('phone-reservation')
    let date = document.getElementById('date-reservation')
    let promo = document.getElementById('promo-reservation')
    let people = document.getElementById('people-reservation')
    let note = document.getElementById('note-reservation')
    let errormsg = []
    
    validateName(name, errormsg)
    validateEmail(email, errormsg)
    validatePhone(phone, errormsg)
    validateDate(date, errormsg)
    validatePeople(people)
    validatePromo(promo, errormsg)
    validateNote(note)

    if(errormsg.length === 0){
        // untuk munculkan popup
        confirmValidate.style.display = "flex"
    }else{
        alert(errormsg.join('\n'))
    }
}
let validateName = (name, errormsg) =>{
    let namecek = 0 
    // untuk validasi name tidak boleh selain huruf
    for(let namectr = 0 ; namectr < name.value.length ; namectr++){
        if(name.value[namectr] >= 'a' && name.value[namectr] <= 'z'){
            namecek = 0
        }else if(name.value[namectr] >= 'A' && name.value[namectr] <= 'Z'){
            namecek = 0
        }else {
            namecek = 1
            break
        }
    }
    if(namecek == 1) errormsg.push('Name must be in alphabet')
    else{
        // name tidak boleh kosong
        // name tidak boleh kurang dari 3
        if(name.value == ""){
            errormsg.push("Name Required")
        }else if(name.value.length < 3){
            errormsg.push('The name length must more than or equal to 3')
        }else{
            let confirmName = document.getElementById("confirm-name")
            confirmName.innerHTML = name.value
        }
    }
}
let validateEmail = (email, errormsg) => {
    // email ga boleh kosong
    // email ga boleh di awali dengan . atau @
    // email tidak boleh diawali . setelah @
    // email harus di akhiri oleh @binus.ac.id
    if(email.value == ""){
        errormsg.push('Email required')
    }else if(email.value.startsWith('@') || email.value.startsWith('.')){
        errormsg.push('Email cannot start with . or @')
    }else if(email.value.indexOf('.') == (email.value.indexOf('@')+1) ){
        errormsg.push('Email cannot contain . after @')
    }else if(!email.value.endsWith('@binus.ac.id')){
        errormsg.push('Email must end with @binus.ac.id')
    }else{
        let confirmEmail = document.getElementById("confirm-email")
        confirmEmail.innerHTML = email.value
    }
}
let validatePhone = (phone, errormsg) => {
    // validasi phone tidak boleh selain angka
    let phoneceknum = 0 
    for(let phonectr = 0 ; phonectr < phone.value.length ; phonectr++){
        if(phone.value[phonectr] < '0' || phone.value[phonectr] > '9'){
            phoneceknum = 1
            break
        }
    }
    if(phoneceknum == 1) errormsg.push('Phone must be number')
    else{
        // phone tidak boleh kosong
        // phone harus memiliki panjang 11-12 angka
        // phone harus di awali dengan 08
        if(phone.value == ""){
            errormsg.push('Phone Required')
        }else if(phone.value.length < 11 || phone.value.length > 12){
            errormsg.push('The phone number length must between 11 - 12 digits')
        }else if(!phone.value.startsWith("08")){
            errormsg.push('The phone number must be start with "08"')
        }else{
            let confirmPhone = document.getElementById("confirm-phone")
            confirmPhone.innerHTML = phone.value
        }
    }
}

var cekDay
let validateDate = (date, errormsg) => {

    let day = date.value.split("-")[2]
    let month = date.value.split("-")[1]
    let year = date.value.split("-")[0]
    let cekday
    let cekmonth
    let currDate = new Date()
    let time = document.getElementById("time-reservation")
    let hours = time.value.split(":")[0]
    let minutes = time.value.split(":")[1]
    let cekAllDate = 0
    cekDay = new Date(date.value)
    

    if(currDate.getDate() < 10){
        cekday = "0" + currDate.getDate()
    }else{
        cekday = currDate.getDate()
    }
    cekmonth = currDate.getMonth()
    // date ga boleh kosong
    // date ga boleh di jadwal sebelumnya
    if(date.value == ""){
        errormsg.push("Date Required")
    }else if(year == currDate.getFullYear() && month-1 == cekmonth && day == cekday && hours == currDate.getHours() && minutes > currDate.getMinutes() && hours > "10" && hours < "22"){
        // jika pesan di tanggal dan jam yang sama tapi di menit yang berbeda
        cekAllDate = 1
    }else if(year == currDate.getFullYear() && month-1 == cekmonth && day == cekday && hours > currDate.getHours() && hours > "10" && hours < "22"){
        // jika pesan di tanggal yang sama dan di jam yang berbeda
        cekAllDate = 1
    }else if(year == currDate.getFullYear() && month-1 == cekmonth && day > cekday  && hours > "10" && hours < "22"){
        // jika pesan di tanggal yang berbeda
        cekAllDate = 1
    }else if(year == currDate.getFullYear() && month-1 > cekmonth  && hours > "10" && hours < "22"){
        // jika pesan di bulan yang berbeda
        cekAllDate = 1
    }else if(year > currDate.getFullYear() && hours > "10" && hours < "22"){
        cekAllDate = 1
    }else {
        errormsg.push("The entered date/time is not available")
    }

    if(cekAllDate == 1){
        let confirmDate = document.getElementById("confirm-date")
        let confirmTime = document.getElementById("confirm-time")
        confirmDate.innerHTML = day + "-" + month + "-" + year
        confirmTime.innerHTML = time.value
    }
}

let validatePeople = (people) => {
    // people ga boleh kurang dari 1 atau lebih dari 50
    if(people.value >= 1 && people.value <= 50){
        let confirmPeople = document.getElementById("confirm-people")
        confirmPeople.innerHTML = people.value + " Person"
    }
}

let validatePromo = (promo, errormsg) => {
    // promo tidak harus ada (optional)
    // jika promo tidak ditemukan maka akan print "your promo code is not found"
    let cekpromo = promo.value.toUpperCase()
    let promoImg1 = document.getElementById("40ababa")
    let promoImg2 = document.getElementById("comboababa")
    let promoImg3 = document.getElementById("fridayababa")
    let textpromo = document.getElementById("confirm-promo")
    if(promo.value == ""){
        textpromo.innerHTML = "-" 
        promoImg1.style.display = "none"  
        promoImg2.style.display = "none"  
        promoImg3.style.display = "none"  
    }else if(cekpromo == "DISC40ABABA"){
        promoImg1.style.display = "flex"
        promoImg2.style.display = "none"  
        promoImg3.style.display = "none"  
        textpromo.innerHTML = cekpromo
    }else if(cekpromo == "COMBOABABA"){
        promoImg2.style.display = "flex" 
        promoImg1.style.display = "none"  
        promoImg3.style.display = "none"   
        textpromo.innerHTML = cekpromo
    }else if(cekpromo == "TGIFABABA" && cekDay.getDay() == 5){
        promoImg3.style.display = "flex"  
        promoImg2.style.display = "none"  
        promoImg1.style.display = "none" 
        textpromo.innerHTML = cekpromo 
    }else {
        errormsg.push("Your promo code is not found")
    }
}
let validateNote = (note) => {
    // note tidak harus ada (optional)
    // jika note di isi maka akan print note
    let remNote = document.getElementById('remNote')
    let noteDisplay = document.getElementById('confirm-note')
    if(note.value == ""){
        remNote.style.display = "none"
    }else{
        remNote.style.display = "block"
        noteDisplay.innerHTML = note.value
    }
}

$("#confirm-button-last").click(()=>{
    let Dnone = document.getElementById('confirm-all-container')
    Dnone.style.display = "none"
})
$("#last-submit").click(()=>{
    alert("Reservation Success!")
})

setInterval(()=>{
    if($("#option1").attr("class") == 'option activeoption'){
        onClickOption(2)
    }else if($("#option2").attr("class") == 'option activeoption'){
        onClickOption(3)
    }else if($("#option3").attr("class") == 'option activeoption'){
        onClickOption(1)
    }
},5000)
function onClickOption(n){
    if(n == 1){
        $("#option1").attr("class", 'option activeoption')
        $("#option2").attr("class", 'option')
        $("#option3").attr("class", 'option')
        $(".slides").animate({left: "0%"})
    }else if(n == 2){
        $("#option2").attr("class", 'option activeoption')
        $("#option1").attr("class", 'option')
        $("#option3").attr("class", 'option')
        $(".slides").animate({left: "-100%"})
    }else if(n == 3){
        $("#option3").attr("class", 'option activeoption')
        $("#option1").attr("class", 'option')
        $("#option2").attr("class", 'option')
        $(".slides").animate({left: "-200%"})
    }
}

window.addEventListener("load" , ()=>{
    
    $("#people-reservation").change(function(){
        let people = document.getElementById("people-reservation")
        if(people.value < 1){
            people.value = 1
        }else if(people.value > 50){
            people.value = 50
        }
    })
    
    $("#note-reservation").on('input' ,function(){
        let cekNoteLength = document.getElementById("ctrformax")
        let notectr = document.getElementById("note-reservation")
        cekNoteLength.innerHTML = notectr.value.length + "/15"
    })

    var x = 0
    home_menu()
    function home_menu(){
        var slides = $(".slide-show")
        for(var i = 0 ; i < slides.length; i++){
            slides[i].style.display = "none"
        }
        x++
        if(x > slides.length){
            x = 1
        }
        slides[x-1].style.display = "block"
        setTimeout(home_menu, 3000)
    }
})

function onClickMenu(){
    document.getElementById("menu").classList.toggle("change")
    document.getElementById("navbar").classList.toggle("change")
    document.getElementById("menu-bg").classList.toggle("change-bg")
}
function onClickBar1(){
    document.getElementById("clickBar1_1").classList.toggle("change-bar")
    if($("#clickBar1").attr("class") == "desc-menu-food"){
        $("#clickBar1").attr("class", 'popDesc')
    }else{
        $("#clickBar1").attr("class", "desc-menu-food")
    }
}
function onClickBar2(){
    document.getElementById("clickBar1_2").classList.toggle("change-bar")
    if($("#clickBar2").attr("class") == "desc-menu-food"){
        $("#clickBar2").attr("class", 'popDesc')
    }else{
        $("#clickBar2").attr("class", "desc-menu-food")
    }
}
function onClickBar3(){
    document.getElementById("clickBar1_3").classList.toggle("change-bar")
    if($("#clickBar3").attr("class") == "desc-menu-food"){
        $("#clickBar3").attr("class", 'popDesc')
    }else{
        $("#clickBar3").attr("class", "desc-menu-food")
    }
}
function onClickBar4(){
    document.getElementById("clickBar1_4").classList.toggle("change-bar")
    if($("#clickBar4").attr("class") == "desc-menu-food"){
        $("#clickBar4").attr("class", 'popDesc')
    }else{
        $("#clickBar4").attr("class", "desc-menu-food")
    }
}
function onClickBar5(){
    document.getElementById("clickBar1_5").classList.toggle("change-bar")
    if($("#clickBar5").attr("class") == "desc-menu-food"){
        $("#clickBar5").attr("class", 'popDesc')
    }else{
        $("#clickBar5").attr("class", "desc-menu-food")
    }
}
function onClickBar6(){
    document.getElementById("clickBar1_6").classList.toggle("change-bar")
    if($("#clickBar6").attr("class") == "desc-menu-food"){
        $("#clickBar6").attr("class", 'popDesc')
    }else{
        $("#clickBar6").attr("class", "desc-menu-food")
    }
}
function onClickBar7(){
    document.getElementById("clickBar1_7").classList.toggle("change-bar")
    if($("#clickBar7").attr("class") == "desc-menu-food"){
        $("#clickBar7").attr("class", 'popDesc')
    }else{
        $("#clickBar7").attr("class", "desc-menu-food")
    }
}
function onClickBar8(){
    document.getElementById("clickBar1_8").classList.toggle("change-bar")
    if($("#clickBar8").attr("class") == "desc-menu-food"){
        $("#clickBar8").attr("class", 'popDesc')
    }else{
        $("#clickBar8").attr("class", "desc-menu-food")
    }
}
function onClickBar9(){
    document.getElementById("clickBar1_9").classList.toggle("change-bar")
    if($("#clickBar9").attr("class") == "desc-menu-food"){
        $("#clickBar9").attr("class", 'popDesc')
    }else{
        $("#clickBar9").attr("class", "desc-menu-food")
    }
}
function onClickBar10(){
    document.getElementById("clickBar1_10").classList.toggle("change-bar")
    if($("#clickBar10").attr("class") == "desc-menu-food"){
        $("#clickBar10").attr("class", 'popDesc')
    }else{
        $("#clickBar10").attr("class", "desc-menu-food")
    }
}
function onClickBar11(){
    document.getElementById("clickBar1_11").classList.toggle("change-bar")
    if($("#clickBar11").attr("class") == "desc-menu-food"){
        $("#clickBar11").attr("class", 'popDesc')
    }else{
        $("#clickBar11").attr("class", "desc-menu-food")
    }
}