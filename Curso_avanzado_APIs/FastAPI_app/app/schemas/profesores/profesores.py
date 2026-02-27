from pydantic import BaseModel, EmailStr
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
    numero_grupo: int

    class Config:
        orm_mode = True


class ProfesorResponse(ProfesorBase):
    id: int
    grupos: List[GrupoResponse] = []

    class Config:
        orm_mode = True
