import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserTypeService } from 'src/app/services/user-type.service';
declare var $:any;

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  UserTypecolumnDefs = [
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
    {headerName: 'UserType', field: 'userType', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  UserTypeForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  UserType: any;

  constructor(private formBuilder:FormBuilder, private UserTypeService:UserTypeService,
              private toastr:ToastrManager) { 
    this.UserTypeForm = this.formBuilder.group({
        UserType_name:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addmode = true;
    this.editmode = false;
    this.UserTypeService.listUser_Type().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.UserType = data['data'];
      } else {
        this.showError(data['message']);
        this.UserType = null;
      }
    });
  }


  addUserType(){
    this.UserTypeForm.patchValue({
      created:new Date(),
      status:'active'
    });
    this.UserTypeService.addUser_Type(this.UserTypeForm.value).subscribe(data=>{
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  editUserType(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addUserType').modal('show');
      this.UserTypeForm.patchValue({
        UserType_name:selectedData[0].UserType_name
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateUserType(){
    this.UserTypeService.updateUser_Type(this.UserTypeForm.value).subscribe(data=>{
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
      $('#deleteUserType').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteUserType(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.UserTypeService.deleteUser_Type(selectedData[i].uid).subscribe(data=>{
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
    this.UserTypeForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.UserTypeForm.reset();
    this.UserTypeService.listUser_Type().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.UserType = data['data'];
      } else {
        this.showError(data['message']);
        this.UserType = null;
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
