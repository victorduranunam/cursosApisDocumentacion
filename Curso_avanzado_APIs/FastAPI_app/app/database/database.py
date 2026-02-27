from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config.base import Base

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:1234@127.0.0.1:3306/basepruebas"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,
    connect_args={"connect_timeout": 10}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Importar todos los modelos para que Base los conozca
import app.models.alumnos.alumno
import app.models.alumnogrupo.alumnogrupo
import app.models.grupos.grupo
import app.models.materias.materia
import app.models.profesores.profesor

def init_db():
    # Si tablas no existe puede activarse la siguiente instruccion
    # Base.metadata.create_all(bind=engine, checkfirst=True)
    
    # Comentado porque las tablas ya existen y no queremos recrearlas
     pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

