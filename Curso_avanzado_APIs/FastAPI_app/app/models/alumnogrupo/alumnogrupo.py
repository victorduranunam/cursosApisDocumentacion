# app/models/alumnos/alumno_grupo.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.config.base import Base

class AlumnoGrupoModel(Base):
    __tablename__ = "alumnos_grupos"



    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    alumno_id = Column(Integer, ForeignKey("alumnos.id"), nullable=False)
    grupo_id = Column(Integer, ForeignKey("grupos.id"), nullable=False)

    # Relaciones usando strings
    alumno = relationship("AlumnoModel", back_populates="inscripciones")
    grupo = relationship("GrupoModel", back_populates="alumnos_inscritos")
