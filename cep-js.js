var btnSubmit = document.querySelector('#div-cep form button')
var zipCodeField = document.querySelector('#div-cep form input')
var content = document.querySelector('#div-cep main')

btnSubmit.addEventListener('click', run)

function run(event){
    event.preventDefault() 
    //para n recarregar a pag com o click

    //tratando o que o usuario digitar

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.replace('-', '')
    zipCode = zipCode.trim()
    

    axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function (response) {
            if(response.data.error){
                throw new Error('CEP inválido')
            }
            content.innerHTML = ''
            console.log(response.data.logradouro) //ver os dados
            
            createLine(response.data.logradouro)
            createLine(response.data.bairro)
            createLine(response.data.localidade + '/'+ response.data.uf)
        })
        .catch(function (error) {
            content.innerHTML = ''
            createLine('Ops, algo deu errado')
        })
}

function createLine(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}
