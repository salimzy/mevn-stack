<script setup>
import { onMounted, ref } from 'vue'

// give each todo a unique id
let id = 0

const newTodo = ref('')
const todos = ref([])

async function getTasks() {
  const response = await fetch('http://localhost:3000/tasks')
  todos.value = await response.json()
}

onMounted(getTasks)

async function addTodo() {
  // ...
  newTodo.value = ''
  const newTask = {
    id: ++id,
    text: newTodo.value,
    completed: false
  }
//   todos.value.push(newTask)
const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  const data = await response.json()
  todos.value.push(data)
}

async function removeTodo(todo) {
  // ...
  const index = todos.value.indexOf(todo)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
  const response = await fetch(`http://localhost:3000/tasks/${todo.id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    console.error('Failed to delete task')
  }
  if(response.ok){
    console.log('Task deleted successfully')
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>