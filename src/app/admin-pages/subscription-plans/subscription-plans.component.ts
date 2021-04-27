import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SubscriptionPlansService } from 'src/app/services/subscription-plans.service';
declare var $:any;


@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  
 registerForm: FormGroup;
 submitted = false;


  SubscriptionPlanscolumnDefs = [
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
    {headerName: 'Subscription_plans', field: 'subscription_plans', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  SubscriptionPlansForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  SubscriptionPlans: any;
  Subscription_PlansForm: any;
  Subscription_Plans: any;

  constructor(private formBuilder:FormBuilder, private  Subscription_PlansService: SubscriptionPlansService,
              private toastr:ToastrManager) { 
    this. SubscriptionPlansForm = this.formBuilder.group({
       id:['', Validators.required],
       subscriptionplans_name:['', Validators.required],
       status:['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
  });
    this.addmode = true;
    this.editmode = false;
    this. Subscription_PlansService.listSubscription_Plan().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this. Subscription_Plans = data['data'];
      } else {
        this.showError(data['message']);
        this. Subscription_Plans = null;
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
    this.addSubscription_Plans();
}


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}


  addSubscription_Plans(){
    this. SubscriptionPlansForm.patchValue({
      created:new Date(),
      status:'active'
    });
    this. Subscription_PlansService.addSubscription_Plan(this. SubscriptionPlansForm.value).subscribe(data=>{
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  editSubscriptionPlans(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#add Subscription_Plans').modal('show');
      this.SubscriptionPlansForm.patchValue({
         subscriptionplans_name:selectedData[0]. subscriptionplans_name
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateSubscriptionPlans(){
    this.Subscription_PlansService.updateSubscription_Plans(this. SubscriptionPlansForm.value).subscribe(data=>{
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
      $('#delete Subscription_Plans').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteSubscription_Plans(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this. Subscription_PlansService.deleteSubscriptionPlans(selectedData[i].uid).subscribe(data=>{
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
    this. Subscription_PlansForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this. Subscription_PlansForm.reset();
    this. Subscription_PlansService.listSubscriptionPlans().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this. Subscription_Plans = data['data'];
      } else {
        this.showError(data['message']);
        this. Subscription_Plans = null;
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
function Plans() {
  throw new Error('Function not implemented.');
}

