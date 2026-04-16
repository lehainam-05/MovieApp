const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("backend/db.json");
const middlewares = jsonServer.defaults();

// Bind json-server-auth
app.db = router.db;

app.use(middlewares);
app.use(auth);
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n  JSON Server Auth is running!`);
    console.log(`  http://localhost:${PORT}`);
    console.log(`  Database: backend/db.json\n`);
    console.log(`  Routes:`);
    console.log(`    POST   /register    -> Dang ky tai khoan`);
    console.log(`    POST   /login       -> Dang nhap (nhan JWT)`);
    console.log(`    GET    /metrics     -> Lay danh sach trending`);
    console.log(`    POST   /metrics     -> Tao moi trending entry`);
    console.log(`    PATCH  /metrics/:id -> Cap nhat count`);
    console.log(`    GET    /favorites       -> Lay danh sach phim yeu thich`);
    console.log(`    POST   /favorites       -> Them phim yeu thich`);
    console.log(`    DELETE /favorites/:id    -> Xoa phim yeu thich\n`);
});
