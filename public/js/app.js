



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message01 = document.querySelector('#msg01')
const message02 = document.querySelector('#msg02')

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location=search.value 
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=> {

            if(data.error){
                message01.textContent='Error: ' + data.error
                message02.textContent=''
                console.log(data.error)
            }
            else{
                message01.textContent = ''
                message02.textContent = 'Temperature in ' +  data.locationData.location + ' is: ' + data.tempData.current_temp + '°C'
                console.log(data.locationData.location, data.tempData.current_temp)
            }
        })
    })
})