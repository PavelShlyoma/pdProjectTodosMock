import { http, HttpResponse, passthrough } from 'msw';
import { useTodosMockStore } from "../stores/mockTodos.js";

export const handlers = [
    http.post("https://todos:8080/login", async ({request, params, cookies}) => {
      const data = await request.clone().json();
      if (data?.email === "admin@test.ru" && data?.password === "testTEST1!") {
        return HttpResponse.json({
          status: 200,
          statusText: "OK",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5ydSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoyMDg0MTc2MDIwLCJpYXQiOjE3Njg4MTYwMjB9.AzPJMM659qeDb4Wa8pinXNAsEFi2l1uxfRZPVYRMQxc",
          headers: {
            'set-cookie': 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5ydSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoyODA0MTc2MDIwLCJpYXQiOjE3Njg4MTYwMjB9.cOZjvyMsTCylmTg_iqzHa-74QTX7Rgq2zP5b_yPCo0o',
          }
        })
      }
            return  HttpResponse.json({
              message: "Invalid credentials",
              status: "error",
            }, {
              status: 400,
            })
    }),
    http.get("https://todos:8080/refresh", async () => {
      return HttpResponse.json({
        status: "success",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5ydSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoyMDg0MTc2MDIwLCJpYXQiOjE3Njg4MTYwMjB9.AzPJMM659qeDb4Wa8pinXNAsEFi2l1uxfRZPVYRMQxc"
      }, {
        status: 200,
      })
    }),
    // Мок для GET /api/users
    http.get('https://todos:8080/todos',   async ({request, params, cookies}) => {
      const mockStore = useTodosMockStore();
      const url = new URL(request.url);
      const complete = url.searchParams.get("complete");
      const todosFilter = mockStore.getFilteredTodos(complete);
      const totalFilter = todosFilter.length;
      const page = url.searchParams.get("page");
      const todosPage = mockStore.getPageTodos(page, todosFilter);
      return HttpResponse.json({
        status: "success",
        total: totalFilter,
        todos: todosPage,
      }, {
        status: 200,
      })
    }),
    // Мок для POST /api/posts
    http.post('https://todos:8080/todos', async ({request}) => {
      const data = await request.clone().json();
      if (data?.text) {
        const mockStore = useTodosMockStore();
        mockStore.todos.push({
          text: data.text,
          is_complete: false,
          id: mockStore.total,
          created_at: '2000-00-00T00:00:00Z'
        });
        console.log(mockStore.todos);
        return HttpResponse.json({
          status: "success",
        }, {
          status: 201,
        })
      }
    }),
  http.patch('https://todos:8080/todos/:id/action/:complete', async ({request}) => {
    const url = new URL(request.url);
    const stringPath = url.pathname;
    const id = stringPath.split('/')[2];
    const complete = stringPath.split('/')[4];
    const mockStore = useTodosMockStore();
    mockStore.pathTodoElement(id, complete);
    return HttpResponse.json({
      status: "success",
    }, {
      status: 201,
    })
  }),
  http.put('https://todos:8080/todos/:id', async ({request}) => {
    const url = new URL(request.url);
    const stringPath = url.pathname;
    const id = stringPath.split('/')[2];
    const data = await request.clone().json();
    if (data?.text) {
    const mockStore = useTodosMockStore();
    mockStore.putTodoElement(id, data?.text, data?.complete);
    }
    return HttpResponse.json({
      status: "success",
    }, {
      status: 201,
    })
  }),
  http.delete('https://todos:8080/todos/:id', async ({request}) => {
    const url = new URL(request.url);
    const stringPath = url.pathname;
    const id = stringPath.split('/')[2];
    const mockStore = useTodosMockStore();
    mockStore.deleteTodoElement(id);
    return HttpResponse.json({
      status: "success",
    }, {
      status: 201,
    })
  })
];