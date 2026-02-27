from pydantic import BaseModel,ConfigDict
from typing import Optional, List


class MateriaBase(BaseModel):
    clave_materia: str
    nombre: str


class MateriaCreate(MateriaBase):
    pass


class MateriaUpdate(BaseModel):
    clave_materia: Optional[str] = None
    nombre: Optional[str] = None


class GrupoResponse(BaseModel):
    id: int
    numero_grupo: int

    model_config = ConfigDict(from_attributes=True)


class MateriaResponse(MateriaBase):
    id: int
    grupos: List[GrupoResponse] = []

    model_config = ConfigDict(from_attributes=True)
