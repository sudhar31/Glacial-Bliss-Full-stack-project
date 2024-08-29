import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  aboutContent = {
    title: 'Discover Our Story and Values',
    description: 'We are dedicated to bringing you the best ice cream experience. Our team is passionate about crafting unique flavors and delivering exceptional service. Learn more about our journey and what drives us.',
    iconBoxes: [
      { icon: 'bi bi-people', title: 'Our Team', description: 'Meet the dedicated individuals behind our delicious creations and exceptional service.', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { icon: 'bi bi-star', title: 'Quality Ingredients', description: 'We use only the finest ingredients to ensure every scoop is a delightful experience.', image: 'https://images.unsplash.com/photo-1556910101-a533e487de15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { icon: 'bi bi-geo-alt', title: 'Our Locations', description: 'Find us at various locations and enjoy our unique flavors wherever you are.', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { icon: 'bi bi-calendar-check', title: 'Our History', description: 'Discover the story behind our brand and how we\'ve evolved to become your favorite ice cream destination.', image: 'https://img.freepik.com/free-photo/cute-family-spring-park_1157-21798.jpg?t=st=1722241316~exp=1722244916~hmac=d6e9c41c92934b2869398492fe230a807874e951b3bf6aa2fb38036ddcd0a44a&w=996' }
    ]
  };
  constructor(){}

  ngOnInit(): void {
    // Initialization code can go here if needed
  }

  loading = false;
  errorMessage: string | null = null;
  sentMessage = false;

  onSubmit() {
    this.loading = true;
    this.errorMessage = null;
    this.sentMessage = false;

    // Simulate form submission
    setTimeout(() => {
      this.loading = false;
      this.sentMessage = true;
    }, 2000);
  }

  //Gallery Content 
  galleryItems = [
    { title: 'Icecream', description: 'Delicious ice cream varieties are here', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Cookies', description: 'Get hooked on our cookies', image: 'https://images.unsplash.com/photo-1514910639405-4b96568e5017?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Desserts', description: 'Satisfy your sweet tooth with our desserts.', image: 'https://images.unsplash.com/photo-1644566477973-3a41bfde233a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Milkshakes', description: 'Take your taste buds on a milkshake adventure.', image: 'https://images.unsplash.com/photo-1698413463655-02ba420bc3ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Smoothies', description: 'Sip, smile, repeat. Our Smoothies', image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Icecream', description: 'Taste our Icecream salads.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

  showPopup = false;
  selectedItem: any = null;

  openPopup(item: any): void {
    // Handle the logic to open the popup with item details
    const modal = document.getElementById('modal') as HTMLElement;
    if (modal) {
      modal.classList.add('show');
      // Set the content of the modal based on the item
    }
  }

  closePopup(): void {
    const modal = document.getElementById('modal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
    }
  }

}