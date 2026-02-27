from fastapi import FastAPI
from app.database.database import init_db
from app.routers.alumnos.alumnos import alumno_router

app = FastAPI(
    title="MiApp",
    version="2.0",
    description="API de pruebas"
)

# Routers
app.include_router(alumno_router, prefix="/alumnos", tags=["Alumnos"])

# Inicializar base de datos solo al inicio
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/", tags=["Home"])
def root():
    return {"mensaje": "Bienvenido a mi API de pruebas"}
