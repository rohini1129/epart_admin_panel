import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/services/role.service';
declare var $:any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  RolecolumnDefs = [
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
    {headerName: 'Role', field: 'role', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  RoleForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Role: any;

  constructor(private formBuilder:FormBuilder, private RoleService:RoleService,
              private toastr:ToastrManager) { 
    this.RoleForm = this.formBuilder.group({
      id:['', Validators.required],
      Role_name:['', Validators.required],
      status:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addmode = true;
    this.editmode = false;
    this.RoleService.listRole().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Role = data['data'];
      } else {
        this.showError(data['message']);
        this.Role = null;
      }
    });
  }


  addRole(){
    this.RoleForm.patchValue({
      created:new Date(),
      status:'active'
    });
    this.RoleService.addRole(this.RoleForm.value).subscribe(data=>{
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  editRole(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addRole').modal('show');
      this.RoleForm.patchValue({
        id:selectedData[0].id,
        Role_name:selectedData[0].Role_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateRole(){
    this.RoleService.updateRole(this.RoleForm.value).subscribe(data=>{
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
      $('#deleteRole').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteRole(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.RoleService.deleteRole(selectedData[i].uid).subscribe(data=>{
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
    this.RoleForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.RoleForm.reset();
    this.RoleService.listRole().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Role = data['data'];
      } else {
        this.showError(data['message']);
        this.Role = null;
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
