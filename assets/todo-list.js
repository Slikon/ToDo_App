$(document).ready(() => {

  $('form').on('submit', () => {

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: (data) => {
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  })

  $('li').on('click', () => {
      let item = $(this).text().trim().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: `/todo/ + ${item}`,
        success: (data) => {
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
