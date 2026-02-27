# app/models/alumnos/profesor.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.config.base import Base

class ProfesorModel(Base):
    __tablename__ = "profesores"


    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)
    correo = Column(String(50), nullable=False, unique=True)

    grupos = relationship("GrupoModel", back_populates="profesor")
