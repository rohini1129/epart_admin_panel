import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CityService } from 'src/app/services/city.service';
declare var $:any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  
 registerForm: FormGroup;
 submitted = false;

  CitycolumnDefs = [
    {headerName: 'UID', field: 'uid', width: 150, checkboxSelection: true,headerCheckboxSelection: true,sortable: true, filter: true},
    {headerName: 'Logo', field: 'logo', width: 120,cellRenderer: function(params) {
      return '<img style="height: 50px; width: auto;" src="'+params.value+'" alt="">';
    }},
    {headerName: 'Ecell', field: 'ecellname', resizable: true, sortable: true, filter: true},
    {headerName: 'Ecell Email', field: 'ecellemail', resizable: true, sortable: true, filter: true},
    {headerName: 'College Name', field: 'collegename', resizable: true, sortable: true, filter: true},
    {headerName: 'Type', field: 'type', sortable: true, filter: true},
    {headerName: 'Stream', field: 'stream', sortable: true, filter: true},
    {headerName: 'District', field: 'district', sortable: true, filter: true},
    {headerName: 'City', field: 'city', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  CityForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  City: any;

  constructor(private formBuilder:FormBuilder, private CityService:CityService,
              private toastr:ToastrManager) { 
    this.CityForm = this.formBuilder.group({
      city_name:['', Validators.required,Validators.maxLength(6)],
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
  });


    this.addmode = true;
    this.editmode = false;
    this.CityService.listCity().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.City = data['data'];
      } else {
        this.showError(data['message']);
        this.City = null;
      }
    });
  }

  get f() { return this.registerForm.controls; }
  

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.addCity();
}


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}


  addCity(){
    this.CityForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if(this.CityForm.valid){
      this.CityService.addCity(this.CityForm.value).subscribe(data=>{
        if (data['success']) {
          this.recall();
          this.showSuccess(data['message']);
        } else {
          this.showError(data['message']);
        }
      });
    }
    else{
      this.showError("Please Fill All Details");
    }
  }

  editCity(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addCity').modal('show');
      this.CityForm.patchValue({
        id:selectedData[0].id,
        city_name:selectedData[0].city_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateCity(){
    this.CityService.updateCity(this.CityForm.value).subscribe(data=>{
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  Validate(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    if (selectedData.length > 0) {
      $('#deleteCity').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteCity(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.CityService.deleteCity(selectedData[i].uid).subscribe(data=>{
        if (data['success']) {
          this.showSuccess(data['message']);
        } else {
          this.showError(data['message']);
        }
      });
    }
    this.recall();
  }

  cancel(){
    this.CityForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.CityForm.reset();
    this.CityService.listCity().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.City = data['data'];
      } else {
        this.showError(data['message']);
        this.City = null;
      }
    });
  }

  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }

  showError(msg) {
    this.toastr.errorToastr(msg);
  }

  showWarning(msg) {
    this.toastr.warningToastr(msg);
  }
}
