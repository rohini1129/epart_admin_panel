import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StatusService } from 'src/app/services/status.service';
declare var $:any;


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
 registerForm: FormGroup;
 submitted = false;


  StatuscolumnDefs = [
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
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  StatusForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Status: any;

  constructor(private formBuilder:FormBuilder, private StatusService:StatusService,
              private toastr:ToastrManager) { 
    this.StatusForm = this.formBuilder.group({
      status_name:['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
  });
    this.addmode = true;
    this.editmode = false;
    this.StatusService.listStatus().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Status = data['data'];
      } else {
        this.showError(data['message']);
        this.Status = null;
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
    this.addStatus();
}


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}



  addStatus(){
    this.StatusForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if( this.StatusForm.valid)
    {
      this.StatusService.addStatus(this.StatusForm.value).subscribe(data=>{
        if (data['success']) {
          this.recall();
          this.showSuccess(data['message']);
        } else {
          this.showError(data['message']);
        }
      });
    }
    else
    {
      this.showError("Please Fill All Details")
    }
  }

  editStatus(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addStatus').modal('show');
      this.StatusForm.patchValue({
        id:selectedData[0].id,
        Status_name:selectedData[0].Status_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateStatus(){
    this.StatusService.updateStatus(this.StatusForm.value).subscribe(data=>{
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
      $('#deleteStatus').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteStatus(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.StatusService.deleteStatus(selectedData[i].uid).subscribe(data=>{
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
    this.StatusForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.StatusForm.reset();
    this.StatusService.listStatus().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Status = data['data'];
      } else {
        this.showError(data['message']);
        this.Status = null;
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
