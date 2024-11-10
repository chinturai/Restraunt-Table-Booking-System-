class Restaurant {
    constructor() {
        // Initialize tables using a HashMap
        this.tables = new Map([
            ['2-seater', { total: 2, available: 2 }],
            ['4-seater', { total: 2, available: 2 }],
            ['6-seater', { total: 2, available: 2 }]
        ]);

        // Queue for bookings
        this.bookings = [];
    }

    findSuitableTable(guests) {
        if (guests <= 2 && this.tables.get('2-seater').available > 0) return '2-seater';
        if (guests <= 4 && this.tables.get('4-seater').available > 0) return '4-seater';
        if (guests <= 6 && this.tables.get('6-seater').available > 0) return '6-seater';
        return null;
    }

    makeBooking(name, guests, time) {
        const tableType = this.findSuitableTable(guests);
        
        if (!tableType) {
            return false;
        }

        // Update available tables
        const tableInfo = this.tables.get(tableType);
        tableInfo.available--;
        
        // Add booking to queue
        this.bookings.push({
            name,
            guests,
            time,
            tableType
        });

        return true;
    }

    getAvailableTables() {
        return Object.fromEntries(this.tables);
    }

    getBookings() {
        return this.bookings;
    }
}

// Initialize restaurant
const restaurant = new Restaurant();

// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const tableStatus = document.getElementById('tableStatus');
const bookingsList = document.getElementById('bookingsList');

// Update displays
function updateDisplays() {
    // Update available tables display
    const availableTables = restaurant.getAvailableTables();
    tableStatus.innerHTML = Object.entries(availableTables)
        .map(([type, info]) => `
            <div class="table-item">
                ${type} - ${info.available} out of ${info.total} Tables available
            </div>
        `).join('');

    // Update bookings display
    const bookings = restaurant.getBookings();
    bookingsList.innerHTML = bookings
        .map(booking => `
            <div class="table-item">
                ${booking.name} - ${booking.guests} guests<br>
                Time: ${booking.time}<br>
                Table: ${booking.tableType}
            </div>
        `).join('');
}

// Handle form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const guests = parseInt(document.getElementById('guests').value);
    const time = document.getElementById('time').value;

    const success = restaurant.makeBooking(name, guests, time);

    if (success) {
        alert('Booking successful!');
        bookingForm.reset();
    } else {
        alert('Sorry, no suitable tables available for this number of guests!');
    }

    updateDisplays();
});

// Initial display update
updateDisplays(); 