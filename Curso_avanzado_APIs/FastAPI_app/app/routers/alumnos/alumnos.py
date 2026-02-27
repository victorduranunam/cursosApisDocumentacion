from fastapi import APIRouter, Depends, Path, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schemas.alumnos.alumnos import AlumnoBase, AlumnoCreate,AlumnoUpdate,AlumnoResponse
from app.database.database import get_db
from app.services.alumnos import AlumnoService

alumno_router = APIRouter()

@alumno_router.post('/alumnos/crearAlumno', tags=['Alumnos'], status_code=201, response_model=AlumnoResponse)
def create_alumno(alumno: AlumnoCreate, db: Session = Depends(get_db)):
    # 1. Instanciamos el servicio pasando la sesión de BD
    alumno_service = AlumnoService(db)
    
    # 2. Llamamos al método del servicio para crear
    nuevo_alumno = alumno_service.create_alumno(alumno)
    
    # 3. Retornamos la respuesta
    return JSONResponse(
        status_code=201, 
        content={
            "message": "Alumno correctamente registrado",
            "id": nuevo_alumno.id
        }
    )


@alumno_router.get('/alumnos/listaAlumnos', tags=['Alumnos'], status_code=200)
def get_alumnos(db: Session = Depends(get_db)):
    result = AlumnoService(db).get_alumnos()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@alumno_router.get('/alumnos/VerAlumno/{id}', tags=['Alumnos'])
def get_alumno(id: int, db: Session = Depends(get_db)):
    result = AlumnoService(db).get_alumno(id)
    if not result:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    return jsonable_encoder(result)


@alumno_router.put('/alumnos/modificarAlumno/{id}', tags=['Alumnos'], response_model=AlumnoBase)
def update_alumno(id: int, data: AlumnoUpdate, db: Session = Depends(get_db)):
    """
    Actualiza los datos de un alumno existente por su ID.
    """
    alumno_actualizado = AlumnoService(db).update_alumno(id, data)
    if not alumno_actualizado:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    return alumno_actualizado



@alumno_router.delete('/borrarAlumno/{id}', tags=['Alumnos'], status_code=200)
def delete_alumno(id: int, db: Session = Depends(get_db)):
    """
    Elimina un alumno por su ID.
    """
    service = AlumnoService(db)
    eliminado = service.delete_alumno(id)
    
    if not eliminado:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    
    return {"message": "Se ha eliminado el registro correctamente"}

