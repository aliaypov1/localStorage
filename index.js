
const userReg = document.querySelector('.user-reg')
const passReg = document.querySelector('.pass-reg')
const emailReg = document.querySelector('.email-reg')
const nameReg = document.querySelector('.name-reg')
const phoneReg = document.querySelector('.phone-reg')
const btnReg = document.querySelector('.create-reg')
const btnLog = document.querySelector('.create-log')
const modalReg = document.querySelector('.modal1')
const modalLog = document.querySelector('.modal2')
const openModalReg = document.querySelector('.header__logo')
const openModalLog = document.querySelector('#log')
const out = document.querySelector('#out')
const userLog = document.querySelector('.user-log')
const passLog = document.querySelector('.pass-log')
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})
function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}


const createUser = async(e)=>{
    const resp =await fetch(`https://petstore.swagger.io/v2/user/createWithList`,{
        method:'POST',
        headers:{
            'accept': 'application/json',
            'Content-Type':' application/json'
        },
        body:JSON.stringify([{
            username: userReg.value,
            password: passReg.value,
            email: emailReg.value,
            firstName: nameReg.value,
            phone: phoneReg.value
        }]),
        
    });
   
    const data = await resp.json()
    console.log(data)
    
}
const getUser = async()=>{
    try{
    const resp = await fetch(`https://petstore.swagger.io/v2/user/${userReg.value}`,{
        method:'GET'
    })
    const data = await resp.json()
    console.log(data)
}catch(e){
    alert('ошибка попробуйте снова')
}
}
const getUsers = async()=>{
    try{
    const resp = await fetch(`https://petstore.swagger.io/v2/user/${userLog.value}`,{
        method:'GET'
    })
    const data = await resp.json()
    console.log(data)
}catch(e){
    alert('ошибка попробуйте снова')
}
}
const login = async(e)=>{
    const resp = await fetch(`https://petstore.swagger.io/v2/user/login?username=${userLog.value}&password=${passLog.value}`,{
        method:'GET'
    })
    const data = await resp.json()
    console.log(data)

}
const logout = async()=>{
    const resp = await fetch(`https://petstore.swagger.io/v2/user/logout/`,{
        method:'GET',
        headers:{
            'accept': 'application/json'
    }
    }
    
    )
const data = await resp.json()
console.log(data)
}

btnReg.addEventListener('click',(e)=>{
    e.preventDefault()
    createUser()
    setTimeout((el=>{
        getUser()
    }),1000)
    setTimeout((el=>{modalReg.style.display='none'}),1500)
    

})



openModalReg.addEventListener('click',()=>{
        setTimeout((el=>{
            modalReg.style.display='block'
            modalReg.style.justifyContent='center'
            modalReg.style.alignItems='center'
            modalReg.style.display='flex'
        }),400)
      
    
})


