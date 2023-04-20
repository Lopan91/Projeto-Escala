const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sfuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0){
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
console.log(edit)
    if (edit) {
        sNome.value = itens[index].nome
        sfuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index  
        console.log(id)
    } else {
        sNome.value = ''
        sfuncao.value = ''
        sSalario.value = ''
    }

}

function editItem(index) {

    openModal(true, index)
}

async function deleteItem(index) {
    await deleteCadastro(itens[index])
    await loadItens()

}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>R$ ${item.salario}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || sfuncao.value == '' || sSalario.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].funcao = sfuncao.value
        itens[id].salario = sSalario.value
    } else {
        itens.push({'nome' : sNome.value, 'funcao': sfuncao.value, 'salario': sSalario.value})
    }

    setItensBD({ "nome": sNome.value, "funcao": sfuncao.value, "salario": sSalario.value })

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

async function loadItens() {
    itens = await getItensBD()
    console.log("b",itens)
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

}

const getItensBD = async () => {
    const itemBD = await getCadastro()
    console.log(itemBD)
    return itemBD
}
const setItensBD = async (item) => {
    const profile = await setCadastro(item)
    return profile
}

const getCadastro = async () => {
    const response = await fetch("https://oqkrzfawsgcqynrdbcco.supabase.co/rest/v1/cadastro_escala", {
        method: "GET", // or 'PUT'
        headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },        
    });
    const result = await response.json()
    return result
}

const setCadastro = async (item) => {
    const response = await fetch("https://oqkrzfawsgcqynrdbcco.supabase.co/rest/v1/cadastro_escala", {
        method: "POST", // or 'PUT'
        headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },
        body: JSON.stringify(item),        
    });
    const result = await response.json()
    console.log(result)
    return result
}

const patchCadastro = async (item) => {
    const response = await fetch(`https://oqkrzfawsgcqynrdbcco.supabase.co/rest/v1/cadastro_escala?id=eq.${item.id}`, {
        method: "PATCH",
        headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },
        body: JSON.stringify(item),        
    });
    const result = await response.json()
    console.log(result)
    return result
}

const deleteCadastro = async (item) => {
    const response = await fetch(`https://oqkrzfawsgcqynrdbcco.supabase.co/rest/v1/cadastro_escala?id=eq.${item.id}`, {
        method: "DELETE",
        headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3J6ZmF3c2djcXlucmRiY2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NjE1MDUsImV4cCI6MTk5NzUzNzUwNX0.UrcITfVg4x_Y-SS-ny8HnaYuXE2mp5419qUvUSwKFh4"
        },      
    });
    const result = await response.json()
    console.log(result)
    return result
}
  

loadItens()
updateTable()