import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TrandingTypeService } from 'src/app/services/tranding-type.service';
declare var $:any;

@Component({
  selector: 'app-trading-type',
  templateUrl: './trading-type.component.html',
  styleUrls: ['./trading-type.component.scss']
})
export class TradingTypeComponent implements OnInit {
  
 registerForm: FormGroup;
 submitted = false;


  Trading_typecolumnDefs = [
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
    {headerName: 'Trading_type', field: 'trading_type', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  TradingTypeForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  TradingType: any;
  agGrid: any;

  constructor(private formBuilder:FormBuilder, private TradingTypeService:TrandingTypeService,
              private toastr:ToastrManager) { 
    this.TradingTypeForm = this.formBuilder.group({
      TradingType_name:['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
  });
    this.addmode = true;
    this.editmode = false;
    this.TradingTypeService.listTranding_Type().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.TradingType = data['data'];
      } else {
        this.showError(data['message']);
        this.TradingType = null;
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
    this.addTrading_type();
}
  addTrading_type() {
    throw new Error('Method not implemented.');
  }


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}



  addTradingType(){
    this.TradingTypeForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if(this.TradingTypeForm.valid)
    {
      this.TradingTypeService.addTranding_Type(this.TradingTypeForm.value).subscribe(data=>{
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
  editTranding_Type(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addTranding_Type').modal('show');
      this.TradingTypeForm.patchValue({
        Tranding_Type_name:selectedData[0].Tranding_Type_name
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateTradingType(){
    this.TradingTypeService.updateTranding_Type(this.TradingTypeForm.value).subscribe(data=>{
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
      $('#deleteTradingType').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteTradingType(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.TradingTypeService.deleteTranding_Type(selectedData[i].uid).subscribe(data=>{
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
    this.TradingTypeForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.TradingTypeForm.reset();
    this.TradingTypeService.listTranding_Type().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.TradingType = data['data'];
      } else {
        this.showError(data['message']);
        this.TradingType = null;
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


