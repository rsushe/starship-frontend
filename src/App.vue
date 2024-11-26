<script setup>

</script>

<template>
  <div id="app">
<!--    <div class="header">-->
<!--      <h1>Space Marines</h1>-->
<!--    </div>-->
    <div class="table-wrapper">

    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Координаты</th>
          <th>Дата создания</th>
          <th>Здоровье</th>
          <th>Категория</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="marines in spaceMarines" :key="marines.id">
          <td>{{ marines.id }}</td>
          <td>{{ marines.name }}</td>
          <td>X: {{ marines.coordinates.x }}, Y: {{ marines.coordinates.y }}</td>
          <td>{{ marines.creationDate }}</td>
          <td>{{ marines.health }}</td>
          <td>{{ marines.category }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    </div>

    <div class="pagination">
      <div v-if="totalPages != null">
        <button v-for="n in totalPages" :key="n" @click="fetchSpaceMarines(n)">{{ n }}</button>
      </div>
    </div>

<!--    <div class="actions">-->
<!--      <button @click="toggleSearchId">Найти по id</button>-->
<!--      <button @click="sortById">Отсортировать по id</button>-->

<!--      &lt;!&ndash; Поле ввода для поиска по id &ndash;&gt;-->
<!--      <div v-if="showSearchId" class="search-id">-->
<!--        <input v-model="searchId" type="number" placeholder="Введите id для поиска"/>-->
<!--        <button @click="findById">Поиск</button>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>

export default {
  el: '#app',
  data() {
    return {
      spaceMarines: [],
      searchId: '',
      currentPage: 1,
      pageSize: 10,
      totalPages: null,
      backendUrl: 'http://localhost:8080/api/space-marines', // URL для получения данных
    }
  },
  created() {
    this.fetchSpaceMarines();
  },
  methods: {
    fetchSpaceMarines(page = 1) {
      this.currentPage = page;
      this.$axios.get(`${this.backendUrl}?page=${this.currentPage}&size=${this.pageSize}`)
          .then(response => {
            this.spaceMarines = response.data.spaceMarines;
            this.totalPages = response.data.totalPages;  // Предполагаем, что сервер вернёт общее количество страниц
          })
          .catch(error => {
            console.error("Ошибка при получении данных:", error);
            this.loadFakeData(page);  // Вы можете использовать это для загрузки фейковых данных
          });

    },
    loadFakeData(page) {
      this.spaceMarines = Array.from({length: this.pageSize}, (_, i) => ({
        id: i + page,
        name: `Marine ${i + page}`,
        coordinates: {x: 10 * (i + page), y: 5.5 * (i + page)},
        creationDate: new Date().toISOString().slice(0, 10),
        health: 100 + i + page,
        category: ['AGGRESSOR', 'ASSAULT', 'SUPPRESSOR', 'TERMINATOR'][i % 4]
      }));
      this.totalPages = 5
    },
    sortById() {
      this.spaceMarines.sort((a, b) => a.id - b.id);
    },
    findById() {
      if (this.searchId) {
        const found = this.spaceMarines.find(marine => marine.id === Number(this.searchId));
        this.spaceMarines = found ? [found] : [];
        this.currentPage = 1;
      } else {
        this.fetchSpaceMarines();  // Reload all data
      }
    }
  },
};
</script>

<style scoped>

.header {
  width: 100vw;
}

.table-wrapper {
  width: 100vw; /* Оболочка для полной ширины экрана */
  height: 100vh; /* Полная высота экрана */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.table-container {
  width: 100%; /* Занимает всю доступную ширину */
  height: 30vh; /* 30% от высоты экрана */
  overflow-y: auto; /* Вертикальная прокрутка, если необходимо */
  overflow-x: hidden; /* Скрытие горизонтальной прокрутки */
}

table {
  width: 99%; /* Таблица на всю доступную ширину */
  border-collapse: collapse;
  position: absolute; top: 0; bottom: 0; left: 0; right: 0;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

thead {
  background-color: #f9f9f9;
}



/* Действия */
.actions {
  margin-top: 10px;
}

/* Пагинация */
.pagination {
  margin-top: 10px;
}

/* Поле поиска по id */
.search-id {
  margin-top: 10px;
}


</style>
