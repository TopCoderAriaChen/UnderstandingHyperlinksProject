// The function updates the active state of document table of contents links based on the scroll position when the window is scrolled.

// It listens to window scrolling events using $(window).scroll().
$(window).scroll(function () {
  // Retrieves all document table of contents links with $('.document-toc-link').
  const documentTocLinks = $('.document-toc-link');
  // Gets the current window scroll position with $(window).scrollTop().
  const windowScrollPosition = $(window).scrollTop();
  // Initializes the active index activeIndex as -1.
  let activeIndex = 0;
  documentTocLinks.each(function (i) {
    // Iterates over the document TOC links, setting each link's aria-current attribute to false.
    $(this).attr('aria-current', 'false');
    // Obtains the top offset of the element pointed by the current link, subtracting 40 from it.
    let elementOffsetTop = $($(this).attr('href')).offset().top - 40
    // If it's the first link and the scroll position is less than the element's top offset, sets the active index to 0 and terminates the loop.
    if (i == 0) {
      if (windowScrollPosition < elementOffsetTop) {
        activeIndex = 0
        return true
      }
    }
    // If the scroll position is greater than the element's top offset, sets the active index to the current index.
    if (windowScrollPosition > elementOffsetTop) {
      activeIndex = i;
    } else {
      if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        activeIndex = documentTocLinks.length - 1
      }
    }
  });
  // sets the aria-current attribute of the link at the active index to true.
  $(documentTocLinks[activeIndex]).attr('aria-current', 'true');
});

function getUrlParam(name = '') {
  let params = window.location.search.split('?')[1] || ''
  if (params) {
    params = params.split('&')
  }
  let paramsObj = {}
  for (let i = 0; i < params.length; i++) {
    let temp = params[i].split('=')
    paramsObj[temp[0]] = temp[1]
  }
  if (name) {
    return paramsObj[name]
  } else {
    return paramsObj
  }
}
if (getUrlParam('name') == 'A') $('.note').hide()

function handleClcik() {
  $.ajax({
    url: 'https://api.github.com/users',
    type: 'get',
    success: function (res) {
      alert(JSON.stringify(res.map(i => i.id)))
      if (res.findIndex(i => i.id == 1) > -1) {
        $('.note').hide()
      }
    }
  });

}

function foldHandleClcik(el) {
  $(el).parent().toggleClass('open')
}
