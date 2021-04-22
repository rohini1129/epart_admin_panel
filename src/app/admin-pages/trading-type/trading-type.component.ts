import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TrandingTypeService } from 'src/app/services/tranding-type.service';

@Component({
  selector: 'app-trading-type',
  templateUrl: './trading-type.component.html',
  styleUrls: ['./trading-type.component.scss']
})
export class TradingTypeComponent implements OnInit {

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
      id:['', Validators.required],
      TradingType_name:['', Validators.required],
      status:['', Validators.required]
    });
  }

  ngOnInit(): void {
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


  addTradingType(){
    this.TradingTypeForm.patchValue({
      created:new Date(),
      status:'active'
    });
    this.TradingTypeService.addTranding_Type(this.TradingTypeForm.value).subscribe(data=>{
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }
  editTranding_Type(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addTranding_Type').modal('show');
      this.TradingTypeForm.patchValue({
        id:selectedData[0].id,
        Tranding_Type_name:selectedData[0].Tranding_Type_name,
        status:selectedData[0].status,
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


