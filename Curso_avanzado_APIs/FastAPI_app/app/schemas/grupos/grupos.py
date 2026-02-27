from pydantic import BaseModel,ConfigDict
from typing import Optional, List


class GrupoBase(BaseModel):
    numero_grupo: int
    profesor_id: int
    materia_id: int


class GrupoCreate(GrupoBase):
    pass


class GrupoUpdate(BaseModel):
    numero_grupo: Optional[int] = None
    profesor_id: Optional[int] = None
    materia_id: Optional[int] = None


class AlumnoGrupoResponse(BaseModel):
    id: int
    alumno_id: int

    model_config = ConfigDict(from_attributes=True)


class GrupoResponse(GrupoBase):
    id: int
    alumnos_inscritos: List[AlumnoGrupoResponse] = []

    model_config = ConfigDict(from_attributes=True)
