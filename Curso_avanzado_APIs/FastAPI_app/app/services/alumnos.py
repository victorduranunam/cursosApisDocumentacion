from sqlalchemy.orm import Session
from app.models.alumnos.alumno import AlumnoModel
from app.schemas.alumnos.alumnos import AlumnoCreate,AlumnoResponse,AlumnoUpdate

class AlumnoService:
    def __init__(self, db: Session):
        self.db = db

    def create_alumno(self, alumno: AlumnoCreate) -> AlumnoModel:
        """
        Crea un nuevo alumno en la base de datos.
        Realiza commit y refresca el objeto para obtener el ID generado.
        """
        new_alumno = AlumnoModel(**alumno.model_dump())
        self.db.add(new_alumno)
        self.db.commit()        # Guarda el registro en la base de datos
        self.db.refresh(new_alumno)  # Trae el ID y demás campos actualizados
        return new_alumno


    # Método para obtener todos los alumnos
    def get_alumnos(self) -> list[AlumnoModel]:
        """
        Obtiene todos los alumnos de la base de datos.
        Returns:
            List[AlumnoModel]: Lista de objetos AlumnoModel
        """
        result = self.db.query(AlumnoModel).all()
        return result
    

    # Método para obtener un alumno por ID
    def get_alumno(self, id: int) -> AlumnoModel | None:
        """
        Obtiene un alumno de la base de datos por su ID.
        
        Args:
            id (int): ID del alumno a buscar.
            
        Returns:
            AlumnoModel | None: Objeto AlumnoModel si se encuentra, None si no existe.
        """
        result = self.db.query(AlumnoModel).filter(AlumnoModel.id == id).first()
        return result


    # Método para actualizar un alumno por ID
    def update_alumno(self, id: int, data: AlumnoUpdate) -> AlumnoModel | None:
        """
        Actualiza los datos de un alumno existente.

        Args:
            id (int): ID del alumno a actualizar
            data (Alumno): Objeto Alumno con los nuevos datos

        Returns:
            AlumnoModel | None: Objeto Alumno actualizado si se encuentra, None si no existe
        """
        alumno = self.db.query(AlumnoModel).filter(AlumnoModel.id == id).first()
        if not alumno:
            return None

        alumno.nombre = data.nombre
        alumno.edad = data.edad
        # Aquí puedes actualizar otros campos que tenga tu modelo
        self.db.commit()
        self.db.refresh(alumno)  # Para devolver el objeto actualizado
        return alumno
    

    
    def delete_alumno(self, id: int) -> bool:
        """
        Elimina un alumno por su ID.

        Args:
            id (int): ID del alumno a eliminar.

        Returns:
            bool: True si se eliminó correctamente, False si no se encontró.
        """
        alumno = self.db.query(AlumnoModel).filter(AlumnoModel.id == id).first()
        if not alumno:
            return False

        self.db.delete(alumno)
        self.db.commit()
        return True
