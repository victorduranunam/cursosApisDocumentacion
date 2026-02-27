# app/models/alumnos/grupo.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.config.base import Base

class GrupoModel(Base):
    __tablename__ = "grupos"



    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    numero_grupo = Column(Integer, nullable=False)
    profesor_id = Column(Integer, ForeignKey("profesores.id"), nullable=False)
    materia_id = Column(Integer, ForeignKey("materias.id"), nullable=False)

    # Relaciones usando strings
    profesor = relationship("ProfesorModel", back_populates="grupos")
    materia = relationship("MateriaModel", back_populates="grupos")
    alumnos_inscritos = relationship("AlumnoGrupoModel", back_populates="grupo")
