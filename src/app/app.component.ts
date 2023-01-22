import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Mahasiswa } from './mahasiswa';
import { MahasiswaService } from './mahasiswa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public mahasiswa?: Mahasiswa[];
  public updateMahasiswa?: Mahasiswa;
  public deleteMahasiswa?: Mahasiswa;

  constructor(private mahasiswaService: MahasiswaService) {}

  ngOnInit(): void {
    this.getMahasiswa();
  }

  public onSearchMahasiswa(key: String): void {
    const results: Mahasiswa[] = []
    for (const m of this.mahasiswa? this.mahasiswa : []) {
      if (
        m.nama.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        m.jurusan.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(m)
      }
    }

    this.mahasiswa = results;
    if (results.length == 0 || !key) {
      this.getMahasiswa()
    }
  }

  public onOpenModal(mode: String, mahasiswa?: Mahasiswa): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'add') button.setAttribute('data-target', '#addMahasiswaModal')
    if (mode === 'update') {
      this.updateMahasiswa = mahasiswa;
      button.setAttribute('data-target', '#updateMahasiswaModal')
    }

    if (mode === 'delete') {
      this.deleteMahasiswa = mahasiswa;
      button.setAttribute('data-target', '#deleteMahasiswaModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddMahasiswa(addForm: NgForm): void {
    document.getElementById('tutupButtonAddMahasiswaModal')?.click()
    this.mahasiswaService.addMahasiswa(addForm.value).subscribe(
      (response: Mahasiswa) => {
        this.getMahasiswa()
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onUpdateMahasiswa(mahasiswa: Mahasiswa): void {
    document.getElementById('tutupButtonUpdateMahasiswaModal')?.click()
    mahasiswa.id = this.updateMahasiswa != null ? this.updateMahasiswa.id : "";
    this.mahasiswaService.updateMahasiswa(mahasiswa).subscribe(
      (response: Mahasiswa) => {
        this.getMahasiswa()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onDeleteMahasiswa(id: String): void {
    document.getElementById('tutupButtonDeleteMahasiswaModal')?.click()
    this.mahasiswaService.deleteMahasiswa(id).subscribe(
      (response: void) => {
        this.getMahasiswa()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getMahasiswa(): void {
    this.mahasiswaService.getMahasiswa().subscribe(
      (response: Mahasiswa[]) => {
        this.mahasiswa = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
