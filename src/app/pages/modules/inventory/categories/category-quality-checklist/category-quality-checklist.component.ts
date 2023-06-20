import { Component, ViewChild } from '@angular/core';
import { AddChecklistComponent } from '../add-checklist/add-checklist.component';
import { EditChecklistComponent } from '../edit-checklist/edit-checklist.component';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

@Component({
  selector: 'app-category-quality-checklist',
  templateUrl: './category-quality-checklist.component.html',
  styleUrls: ['./category-quality-checklist.component.scss']
})
export class CategoryQualityChecklistComponent {
  
  constructor(
    private inventoryApi: InventoryApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addChecklistComponentReference', { read: AddChecklistComponent, static: false }) addChecklist!: AddChecklistComponent;
  @ViewChild('editChecklistComponentReference', { read: EditChecklistComponent, static: false }) editChecklist!: EditChecklistComponent;
  
  checklistListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";

  lastItem = 0;

  ngOnInit(): void {
    this.getChecklistList();
  }

  getChecklistList(){
    this.isFetchingData = true;

    this.inventoryApi.getCategoryChecklistList()
      .then(
        (res: any) => {
          console.log(res);
          this.checklistListData = res;

          try { this.lastItem = Number((res[res.length - 1]).item_number) }
          catch{ this.lastItem = 0 }

          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createCategoryChecklist(data: any) {
    this.addChecklist.isItemSaving = true;

    console.log(data);

    this.inventoryApi.createCategoryChecklist(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          this.getChecklistList();

          this.addChecklist.isItemSaving = false;
          this.addChecklist.dismissButton.nativeElement.click();
          this.addChecklist.resetForm();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.addChecklist.isItemSaving = false;
      });
  }

  updateCategoryChecklist(categorychecklist_item: any) {
    this.editChecklist.isItemSaving = true;
    
    const id = sessionStorage.getItem('inventory_categorychecklist_id') as string;

    this.inventoryApi.updateCategoryChecklist(categorychecklist_item.id, categorychecklist_item.data)
      .then((res) => {
        console.log(res);
        this.editChecklist.isItemSaving = false;
        this.editChecklist.dismissButton.nativeElement.click();
        this.getChecklistList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.editChecklist.isItemSaving = false;
      });
  }

  deleteCategoryChecklist() {
    this.editChecklist.isItemDeleting = true;

    this.inventoryApi.deleteCategoryChecklist(this.deleteId)
      .then((res) => {
        console.log(res);
        this.editChecklist.isItemDeleting = false;
        this.getChecklistList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.editChecklist.isItemDeleting = false;
      });
  }

  openEditItem(data: any){
    console.log(data);
    this.editChecklist.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
}
