# app/models/alumnos/materia.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.config.base import Base

class MateriaModel(Base):
    __tablename__ = "materias"



    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    clave_materia = Column(String(10), unique=True, nullable=False)
    nombre = Column(String(50), nullable=False)

    grupos = relationship("GrupoModel", back_populates="materia")
