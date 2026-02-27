# app/models/alumnos/alumno.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.config.base import Base

class AlumnoModel(Base):
    __tablename__ = "alumnos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)
    edad = Column(Integer, nullable=True)
    direccion = Column(String(100), nullable=True)
    correo = Column(String(50), nullable=False, unique=True)

    # Relación muchos a muchos con tabla intermedia
    inscripciones = relationship(
        "AlumnoGrupoModel",
        back_populates="alumno"
    )
