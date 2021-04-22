import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ReasonService } from 'src/app/services/reason.service';
declare var $:any;
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  ReasoncolumnDefs = [
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
    {headerName: 'Reason', field: 'Reason', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  ReasonForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Reason: any;

  constructor(private formBuilder:FormBuilder, private ReasonService:ReasonService,
              private toastr:ToastrManager) { 
    this.ReasonForm = this.formBuilder.group({
      id:['', Validators.required],
      Reason_name:['', Validators.required],
      status:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addmode = true;
    this.editmode = false;
    this.ReasonService.listReason().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Reason = data['data'];
      } else {
        this.showError(data['message']);
        this.Reason = null;
      }
    });
  }


  addReason(){
    this.ReasonForm.patchValue({
      created:new Date(),
      status:'active'
    });
    this.ReasonService.addReason(this.ReasonForm.value).subscribe(data=>{
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  editReason(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addReason').modal('show');
      this.ReasonForm.patchValue({
        id:selectedData[0].id,
        Reason_name:selectedData[0].Reason_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateReason(){
    this.ReasonService.updateReason(this.ReasonForm.value).subscribe(data=>{
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
      $('#deleteReason').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteReason(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.ReasonService.deleteReason(selectedData[i].uid).subscribe(data=>{
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
    this.ReasonForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.ReasonForm.reset();
    this.ReasonService.listReason().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Reason = data['data'];
      } else {
        this.showError(data['message']);
        this.Reason = null;
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
