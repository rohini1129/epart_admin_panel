import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CountryService } from 'src/app/services/country.service';
declare var $:any;
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  

 registerForm: FormGroup;
 submitted = false;


  CountrycolumnDefs = [
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
    {headerName: 'Country', field: 'Country', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  CountryForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Country: any;


  constructor(private formBuilder:FormBuilder, private CountryService:CountryService,
              private toastr:ToastrManager) { 
    this.CountryForm = this.formBuilder.group({
      country_name:['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  this.registerForm = this.formBuilder.group({
    title: ['', Validators.required]
});


    this.addmode = true;
    this.editmode = false;
    this.CountryService.listCountry().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Country = data['data'];
      } else {
        this.showError(data['message']);
        this.Country = null;
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
    this.addCountry();
}



onReset() {
  this.submitted = false;
  this.registerForm.reset();
}


  addCountry(){
    this.CountryForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if(this.CountryForm.valid){
      this.CountryService.addCountry(this.CountryForm.value).subscribe(data=>{
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

  editCountry(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addCountry').modal('show');
      this.CountryForm.patchValue({
        id:selectedData[0].id,
        country_name:selectedData[0].country_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateCountry(){
    this.CountryService.updateCountry(this.CountryForm.value).subscribe(data=>{
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
      $('#deleteCountry').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteCountry(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.CountryService.deleteCountry(selectedData[i].uid).subscribe(data=>{
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
    this.CountryForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.CountryForm.reset();
    this.CountryService.listCountry().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Country = data['data'];
      } else {
        this.showError(data['message']);
        this.Country = null;
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
