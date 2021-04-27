import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductTypeService } from 'src/app/services/product-type.service';
declare var $:any;


@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
 @ViewChild('agGrid') agGrid: AgGridAngular;

 registerForm: FormGroup;
 submitted = false;


  Product_typecolumnDefs = [
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
    {headerName: 'Product_type', field: 'product_type', sortable: true, filter: true},
    {headerName: 'Address', field: 'address', resizable: true,sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Created', field: 'created', sortable: true, filter: true}
  ];
  Product_TypeForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Product_type: any;

  constructor(private formBuilder:FormBuilder, private Product_TypeService:ProductTypeService,
              private toastr:ToastrManager) { 
    this.Product_TypeForm = this.formBuilder.group({
    product_type_name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
    });
    this.addmode = true;
    this.editmode = false;
    this.Product_TypeService.listProduct_Type().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Product_type = data['data'];
      } else {
        this.showError(data['message']);
        this.Product_type = null;
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
    this.addProduct_type();
}


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}



  addProduct_type(){
    this.Product_TypeForm.patchValue({
      created:new Date(),
      status:'active'
    });
    if(this.Product_TypeForm.valid){
      
    this.Product_TypeService.addProduct_Type(this.Product_TypeForm.value).subscribe(data=>{
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

  editProduct_type(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addProduct_type').modal('show');
      this.Product_TypeForm.patchValue({
        id:selectedData[0].id,
        Product_type_name:selectedData[0].Product_type_name,
        status:selectedData[0].status,
      });
    } else {
      this.showError("Select only One record");
    }
    
  }

  updateProduct_type(){
    this.Product_TypeService.updateProduct_Type(this.Product_TypeForm.value).subscribe(data=>{
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
      $('#deleteProduct_type').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteProduct_type(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );

    for (let i = 0; i < selectedData.length; i++) {
      this.Product_TypeService.deleteProduct_Type(selectedData[i].uid).subscribe(data=>{
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
    this.Product_TypeForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall(){
    this.Product_TypeForm.reset();
    this.Product_TypeService.listProduct_Type().subscribe(data=>{
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Product_type = data['data'];
      } else {
        this.showError(data['message']);
        this.Product_type = null;
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
