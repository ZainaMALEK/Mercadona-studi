import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProduitsComponent } from './produits.component';
import { ProductsService } from 'src/app/services/products.service';
import { FormsModule } from '@angular/forms';

describe('ProduitsComponent', () => {
  let component: ProduitsComponent;
  let fixture: ComponentFixture<ProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ ProduitsComponent ],
      providers: [ProductsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
