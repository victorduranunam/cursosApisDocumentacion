from pydantic import BaseModel, EmailStr,ConfigDict
from typing import Optional, List


class ProfesorBase(BaseModel):
    nombre: str
    correo: EmailStr


class ProfesorCreate(ProfesorBase):
    pass


class ProfesorUpdate(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[EmailStr] = None


class GrupoResponse(BaseModel):
    id: int
    nombre: str

    model_config = ConfigDict(from_attributes=True)


class ProfesorResponse(ProfesorBase):
    id: int
    grupos: List[GrupoResponse] = []

    model_config = ConfigDict(from_attributes=True)
