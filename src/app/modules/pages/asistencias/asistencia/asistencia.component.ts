import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

// import jspdf from 'jspdf';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements AfterViewInit {
  displayedColumns: string[] = ['matricula', 'nombre', 'asistencia'];
  dataSource = new MatTableDataSource<EstudianteElement>(ESTUDIANTE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  colorDinamico(valor:any){
    if(valor === 'Presente') return "estado-green"

    if(valor === 'Excusa') return "estado-yellow"

    if(valor === 'Ausente') return "estado-red"

    return "estado-gris"
  }

  exportarPDF(){
    console.log('exportando!');
    const pdf = new jsPDF('p', 'pt', 'a3');

    let elementHTML: any = document.getElementById('tabla');
    pdf.html(elementHTML, {
      callback: function(pdf){
        pdf.save('asistencia.pdf');
      }
    });
  }
}

export interface EstudianteElement {
  matricula: string;
  nombre: string;
  apellido: string;
  estado: string;
}

const ESTUDIANTE_DATA: EstudianteElement[] = [
  {matricula: '2022-1111', nombre: 'Nombre1', apellido: 'Estudiante', estado: 'Ausente'},
  {matricula: '2022-2222', nombre: 'Nombre', apellido: 'Estudiante2', estado: 'Presente'},
  {matricula: '2022-3333', nombre: 'Nombre3', apellido: 'Estudiante', estado: 'Excusa'},
  {matricula: '2022-4444', nombre: 'Nombre', apellido: 'Estudiante4', estado: 'Retirado'}
];
