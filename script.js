        // Placeholder function for event creation
        function addEvent() {
            const eventName = document.getElementById('eventName').value;
            const eventDate = document.getElementById('eventDate').value;
            const eventLocation = document.getElementById('eventLocation').value;
            const eventTime = document.getElementById('eventTime').value;
            const eventNote = document.getElementById('eventNote').value;

            // Create a new event item
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');

            // Construct the HTML for the event
            eventItem.innerHTML = `
                <div class="event-details">
                    <h3>${eventName}</h3>
                    <p><strong>Date:</strong> ${eventDate}</p>
                    <p><strong>Time:</strong> ${eventTime}</p>
                    <p><strong>Location:</strong> ${eventLocation}</p>
                    <p><strong>Notes:</strong> ${eventNote}</p>
                    <button onclick="showEditForm(this.parentNode.parentNode)">Edit</button>
                    <button class="delete-button" onclick="deleteEvent(this.parentNode.parentNode)">Delete</button>
                </div>
            `;

            // Append the event item to the calendar
            document.getElementById('calendar').appendChild(eventItem);

            // Store event in local storage
            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.push({ name: eventName, date: eventDate, location: eventLocation, time: eventTime, note: eventNote });
            localStorage.setItem('events', JSON.stringify(events));

            // Clear the input fields after adding the event
            document.getElementById('eventName').value = '';
            document.getElementById('eventDate').value = '';
            document.getElementById('eventLocation').value = '';
            document.getElementById('eventTime').value = '';
            document.getElementById('eventNote').value = '';
        }

        // Function to show event creation form
        function showEventForm() {
            const eventForm = document.getElementById('eventForm');
            eventForm.style.display = 'block';
        }

        // Function to switch between pages
        function navigateTo(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show the selected page
            const selectedPage = document.getElementById(pageId);
            selectedPage.classList.add('active');
        }

        // Placeholder function for user authentication
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Example authentication logic (replace with actual authentication logic)
            if (username === 'admin' && password === 'password') {
                // Replace "Login" link with the username
                const loginLink = document.getElementById('loginLink');
                loginLink.textContent = username;
                loginLink.removeAttribute('href');

                // Show "Logout" link
                document.getElementById('logoutLink').style.display = 'inline';

                // Show events
                showEvents();

                alert('Login successful!');
                // Redirect to home page after successful login
                navigateTo('homePage');
            } else {
                alert('Invalid username or password. Please try again.');
            }
        }

        // Function to show events when user logs in
        function showEvents() {
            const events = JSON.parse(localStorage.getItem('events')) || [];
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';
            events.forEach((event, index) => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event-item');
                eventItem.innerHTML = `
                    <div class="event-details">
                        <h3>${event.name}</h3>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <p><strong>Time:</strong> ${event.time}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p><strong>Notes:</strong> ${event.note}</p>
                        <button onclick="showEditForm(${index})">Edit</button>
                        <button class="delete-button" onclick="deleteEvent(${index})">Delete</button>
                    </div>
                `;
                calendar.appendChild(eventItem);
            });
        }

        // Function to show edit form with pre-filled event details
        function showEditForm(index) {
            const events = JSON.parse(localStorage.getItem('events')) || [];
            const event = events[index];

            // Populate the edit form with event details
            document.getElementById('editEventName').value = event.name;
            document.getElementById('editEventDate').value = event.date;
            document.getElementById('editEventLocation').value = event.location;
            document.getElementById('editEventTime').value = event.time;
            document.getElementById('editEventNote').value = event.note;
            document.getElementById('editEventIndex').value = index;

            // Show the edit form
            document.getElementById('editEventForm').style.display = 'block';
        }

        // Function to update event details
        function updateEvent() {
            // Get the index of the event being edited
            const index = document.getElementById('editEventIndex').value;

            // Get updated event details from the edit form
            const eventName = document.getElementById('editEventName').value;
            const eventDate = document.getElementById('editEventDate').value;
            const eventLocation = document.getElementById('editEventLocation').value;
            const eventTime = document.getElementById('editEventTime').value;
            const eventNote = document.getElementById('editEventNote').value;

            // Update the event details in the local storage
            let events = JSON.parse(localStorage.getItem('events')) || [];
            events[index] = { name: eventName, date: eventDate, location: eventLocation, time: eventTime, note: eventNote };
            localStorage.setItem('events', JSON.stringify(events));

            // Refresh the calendar to reflect the changes
            showEvents();

            // Hide the edit form after updating the event
            document.getElementById('editEventForm').style.display = 'none';
        }

        // Function to delete an event
        function deleteEvent(index) {
            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.splice(index, 1);
            localStorage.setItem('events', JSON.stringify(events));
            showEvents(); // Refresh event list
        }

        // Function to log out
        function logout() {
            // Clear events from local storage
            localStorage.removeItem('events');

            // Clear events from the calendar UI
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';

            // Reset navigation
            const loginLink = document.getElementById('loginLink');
            loginLink.textContent = 'Login';
            loginLink.href = '#';

            // Hide "Logout" link
            document.getElementById('logoutLink').style.display = 'none';

            // Redirect to home page after logout
            navigateTo('homePage');

            alert('Logout successful!');
        }

        // Event listener for navigation links
        document.getElementById('homeLink').addEventListener('click', function() {
            navigateTo('homePage');
        });

        document.getElementById('eventsLink').addEventListener('click', function() {
            navigateTo('eventsPage');
        });

        document.getElementById('calendarLink').addEventListener('click', function() {
            navigateTo('calendarPage');
        });

        document.getElementById('loginLink').addEventListener('click', function() {
            navigateTo('loginPage');
        });

        // Initial page load
        window.onload = function() {
            navigateTo('homePage');
        };

        // Function to select event type when clicked
        function selectEventType(type) {
            document.getElementById('eventName').value = type;
        }
