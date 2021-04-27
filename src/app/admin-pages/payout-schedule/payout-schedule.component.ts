import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Payout_ScheduleService } from 'src/app/services/payout-schedule.service';
declare var $:any;

@Component({
  selector: 'app-payout-schedule',
  templateUrl: './payout-schedule.component.html',
  styleUrls: ['./payout-schedule.component.scss']
})
export class PayoutScheduleComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

 registerForm: FormGroup;
 submitted = false;


  Payout_SchedulecolumnDefs = [
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
    {headerName: 'Payout_Schedule', field: 'Payout_Schedule', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  Payout_ScheduleForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Payout_Schedule: any;

  constructor(private formBuilder:FormBuilder, private Payout_ScheduleService:Payout_ScheduleService,
              private toastr:ToastrManager) { 
    this.Payout_ScheduleForm = this.formBuilder.group({
      Payout_Schedule:['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
    });

    this.addmode = true;
    this.editmode = false;
    this.Payout_ScheduleService.listPayout_Schedule().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Payout_Schedule = data['data'];
      } else {
        this.showError(data['message']);
        this.Payout_Schedule = null;
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
    this.addPayout_Schedule();
}


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}



  addPayout_Schedule(){
    this.Payout_ScheduleForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if(this.Payout_ScheduleForm.valid)
    {
      this.Payout_ScheduleService.addPayout_Schedule(this.Payout_ScheduleForm.value).subscribe(data=>{
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

  editPayout_Schedule(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addPayout_Schedule').modal('show');
      this.Payout_ScheduleForm.patchValue({
        id:selectedData[0].id,
        Payout_Schedule_name:selectedData[0].Payout_Schedule_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updatePayout_Schedule(){
    this.Payout_ScheduleService.updatePayout_Schedule(this.Payout_ScheduleForm.value).subscribe(data=>{
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
      $('#deletePayout_Schedule').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }
  
  deletePayout_Schedule(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.Payout_ScheduleService.deletePayout_Schedule(selectedData[i].uid).subscribe(data=>{
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
    this.Payout_ScheduleForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.Payout_ScheduleForm.reset();
    this.Payout_ScheduleService.listPayout_Schedule().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Payout_Schedule = data['data'];
      } else {
        this.showError(data['message']);
        this.Payout_Schedule = null;
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
