$(document).ready(function() {
  $('.delete-contact').on('click', function(e) {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');

    if (confirm('Are you sure to delete this contact?')) {
      $.ajax({
        type: 'DELETE',
        url: `/api/contacts/${id}`,
        success: function(res) {
          alert(res);
          window.location.href = '/contacts';
        },
        error: function(err) {
          console.log(err);
        }
      });
    } else {
      return;
    }
  });

  let url = window.location.href;

  $('a.nav-item')
    .filter(function() {
      return this.href == url;
    })
    .addClass('active');
});
