import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CurrencyService } from 'src/app/services/Currency.service';
declare var $:any;

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
 registerForm: FormGroup;
 submitted = false;


  CurrencycolumnDefs = [
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
    {headerName: 'Currency', field: 'Currency', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  CurrencyForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Currency: any;


  constructor(private formBuilder:FormBuilder, private CurrencyService:CurrencyService,
              private toastr:ToastrManager) { 
    this.CurrencyForm = this.formBuilder.group({
      Currency_name:['', Validators.required]
      
    });
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
  });

    this.addmode = true;
    this.editmode = false;
    this.CurrencyService.listCurrency().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Currency = data['data'];
      } else {
        this.showError(data['message']);
        this.Currency = null;
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
    this.addCurrency();
}


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}


  addCurrency(){
    this.CurrencyForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if(this.CurrencyForm.valid){
      this.CurrencyService.addCurrency(this.CurrencyForm.value).subscribe(data=>{
        if (data['success']) {
          this.recall();
          this.showSuccess(data['message']);
        } else {
          this.showError(data['message']);
        }
      });
    }
    else{
      this.showError("Please Fill All Details")
    }
  }

  editCurrency(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addCurrency').modal('show');
      this.CurrencyForm.patchValue({
        id:selectedData[0].id,
        Currency_name:selectedData[0].Currency_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateCurrency(){
    this.CurrencyService.updateCurrency(this.CurrencyForm.value).subscribe(data=>{
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
      $('#deleteCurrency').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteCurrency(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.CurrencyService.deleteCurrency(selectedData[i].uid).subscribe(data=>{
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
    this.CurrencyForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.CurrencyForm.reset();
    this.CurrencyService.listCurrency().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Currency = data['data'];
      } else {
        this.showError(data['message']);
        this.Currency = null;
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
