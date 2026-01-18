import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post("/api/login", ({request, params, cookies}) => {
            return HttpResponse.json({
                status: 200,
                statusText: "OK",
            })
    }),
    // Мок для GET /api/users
    http.get('/api/todos', () => {
    }),
    // Мок для POST /api/posts
    http.post('/api/todos', () => {
    }),
];