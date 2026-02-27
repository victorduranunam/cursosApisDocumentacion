from pydantic import BaseModel,ConfigDict
from typing import Optional


class AlumnoGrupoBase(BaseModel):
    grupo_id: int
    alumno_id: int


class AlumnoGrupoCreate(AlumnoGrupoBase):
    pass


class AlumnoGrupoUpdate(BaseModel):
    grupo_id: Optional[int] = None
    alumno_id: Optional[int] = None


class AlumnoGrupoResponse(AlumnoGrupoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
