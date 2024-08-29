import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  filterVisible: boolean = false;
  filterPrice: number = 1000;
  minPrice: number = 50;
  filterCategory: string = '';
  searchQuery: string = '';

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.updatePaginatedProducts();
    });
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  toggleFilter(): void {
    this.filterVisible = !this.filterVisible;
  }

  updatePriceDisplay(): void {
    // Dynamically updates the displayed price range
  }

  applyFilter(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesPrice = product.price <= this.filterPrice;
      const matchesCategory = this.filterCategory ? 
        product.category?.toLowerCase().includes(this.filterCategory.toLowerCase()) ||
        product.name?.toLowerCase().includes(this.filterCategory.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.filterCategory.toLowerCase())
        : true;
      return matchesPrice && matchesCategory;
    });
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  clearFilter(): void {
    this.filterPrice = 1000;
    this.filterCategory = '';
    this.searchQuery = '';
    this.filteredProducts = this.products;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(product => 
      product.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
