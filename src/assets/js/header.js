// Get references to the sidebar, toggle button, and close button elements
const sidebar = document.querySelector("#sidebar");
const toggle = document.querySelector("#toggle");
const close = document.querySelector("#close");

// Add a click event listener to the toggle button
toggle.addEventListener('click', () => {
  // Check if the sidebar is currently visible
  const isVisible = sidebar.getAttribute('data-visible') === 'true';

  if (isVisible) {
    // If the sidebar is visible, hide it
    sidebar.setAttribute('data-visible', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    sidebar.style.zIndex = '1';
  } else {
    // If the sidebar is hidden, show it
    sidebar.setAttribute('data-visible', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    sidebar.style.zIndex = '100';
  }
});

// Add a click event listener to the close button
close.addEventListener('click', () => {
  // Hide the sidebar when the close button is clicked
  sidebar.setAttribute('data-visible', 'false');
  toggle.setAttribute('aria-expanded', 'false');
  sidebar.style.zIndex = '1';
});


// Add a click event listener to the entire document
document.addEventListener('click', (event) => {
  // Check if the click occurred inside the sidebar
  const isClickInsideSidebar = sidebar.contains(event.target);
  // Check if the click occurred on the toggle button or close button
  const isClickOnToggle = toggle.contains(event.target) || close.contains(event.target);

  // If the click was outside the sidebar and not on the toggle or close button
  if (!isClickInsideSidebar && !isClickOnToggle) {
    // Hide the sidebar
    sidebar.setAttribute('data-visible', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    sidebar.style.zIndex = '1';
  }
});
