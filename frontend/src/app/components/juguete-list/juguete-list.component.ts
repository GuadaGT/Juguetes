import {Component, OnInit} from '@angular/core';
import {Juguete} from "../../common/juguete";
import {JugueteService} from "../../services/juguete.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faCirclePlus, faCircleXmark, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FormValidators} from "../../validators/validaciones";


@Component({
  selector: 'app-juguete-list',
  templateUrl: './juguete-list.component.html',
  styleUrls: ['./juguete-list.component.css']
})
export class JugueteListComponent implements OnInit {

  juguetes: Juguete[] = [];
  formJuguete: FormGroup = this.formbuilder.group(
    {
      _id: [''],
      __v: [0],
      nombre: ['', [Validators.minLength(1),
        Validators.required,
        FormValidators.notOnlyWhiteSpace]],
      edad_minima: ['',[Validators.required,
        Validators.min(0),
        Validators.max(18)
      ]],
      precio: ['',[Validators.required,
        Validators.min(0)]],
      categoria: ['', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        FormValidators.notOnlyWhiteSpace]],
      imagen: ['']
    }
  );
  mynewCategoria = new FormGroup(
    {
      newCategoria: new FormControl('')
    }
  );
  categoria: string[] = [];
  editar = false;

  constructor(private jugueteService: JugueteService,
              private formbuilder: FormBuilder) {
  }

  // Getters del formulario.
  get nombre(): any {
    return this.formJuguete.get('nombre');
  }

  get edad_minima(): any {
    return this.formJuguete.get('edad_minima');
  }

  get precio(): any {
    return this.formJuguete.get('precio');
  }

  get categoriaF(): any {
    return this.formJuguete.get('categoriaF');
  }

  get imagen(): any {
    return this.formJuguete.get('imagen');
  }

  get newCategoria(): any {
    return this.mynewCategoria.get('newCategoria');
  }

  ngOnInit(): void {
    this.loadJuguetesList();
  }

  private loadJuguetesList() {
    this.jugueteService.getJugueteList().subscribe(
      {
        next: value => {
          this.juguetes = value;
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
          console.log('Complete');
        }
      }
    );
    this.jugueteService.getCategorias().subscribe(
      {
        next: value => {
          this.categoria = value;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Complete');
        }
      }
    )
  }
  onSubmit()
  {
    if(this.editar)
    {
      const id = this.formJuguete.getRawValue()._id;
      this.jugueteService.updateJuguete(id,this.formJuguete.getRawValue()).subscribe(
        {
          next: value =>{
            this.loadJuguetesList();
            alert(value.status);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
      );
    }
    else {
      this.jugueteService.addJuguete(this.formJuguete.getRawValue()).subscribe(
        {
          next: value =>{
            this.loadJuguetesList();
            alert(value.status);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
      );
    }
  }

  loadJuguete(juguete: Juguete)
  {
    this.formJuguete.setValue(juguete);
    this.editar = true;
  }

  newJuguete()
  {
    this.formJuguete.reset();
    this.editar = false;
  }

  addNewCategoria(newCategoria: string)
  {
    let newCategorias;
    if (!this.editar) this.categoria.push(newCategoria)
    else {
      newCategorias =newCategoria;
      this.categoria.push(newCategoria);
      this.formJuguete.setControl('genres', new FormControl(newCategorias)
      );
      this.mynewCategoria.reset();
    }
  }

  removeJuguete(juguete: Juguete){
    if(confirm('Desea borrar' + juguete.nombre + '?'))
    {
      this.jugueteService.deleteJuguete(juguete._id).subscribe(
        {
          next: value => {
            alert(value.status)
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
      )
    }
  }

  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faTrashCan = faTrashCan;
}
