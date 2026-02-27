from sqlalchemy import Column, Integer, String # Importa los elementos para definir los tipos de datos
from app.config.base import Base # Importa la clase Base la cual nos permite crear las tablas

class AlumnoModel(Base):
  __tablename__ = "alumnos" # Nombre de la tabla en la base de datos 
  id = Column(Integer, primary_key=True, index=True) #Campo tipo llave primaria y entero
  nombre = Column(String(255)) # Definir el nombre como  VARCHAR de 255 caracteres 
  edad = Column(Integer) # Definir la edad como entero.
