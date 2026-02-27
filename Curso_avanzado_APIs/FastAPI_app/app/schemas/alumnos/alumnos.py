from pydantic import BaseModel, EmailStr
from typing import Optional, List

class AlumnoBase(BaseModel):
    nombre: str
    edad: Optional[int] = None
    direccion: Optional[str] = None
    correo: EmailStr

class AlumnoCreate(AlumnoBase):
    pass

class AlumnoUpdate(BaseModel):
    nombre: Optional[str] = None
    edad: Optional[int] = None
    direccion: Optional[str] = None
    correo: Optional[EmailStr] = None

class AlumnoGrupoResponse(BaseModel):
    id: int
    grupo_id: int

    model_config = dict(from_attributes=True)

class AlumnoResponse(AlumnoBase):
    id: int
    inscripciones: List[AlumnoGrupoResponse] = []

    model_config = dict(from_attributes=True)
